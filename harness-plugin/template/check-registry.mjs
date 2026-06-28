#!/usr/bin/env node
// registry.json 정합성 + 영역 크기 검사. 하네스 루트에서: node check-registry.mjs [경로/registry.json]
// AI 가 registry.json 을 편집하므로 끊긴 참조·고아·역할 오류를 즉시 잡고,
// 말단 크기(content/ + ssot/)를 실제 파일에서 추정한다 — 토큰 숫자를 손으로 적지 않는다.
// 코드는 영역 안으로 수용(contained): 말단 코드는 areas/<path>/content/ 에 산다(밖을 가리키는 sources 없음).
// errors → 종료코드 1 (편집/분열 후 게이트). 예산초과는 warn.
import { readFileSync, existsSync, statSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, isAbsolute, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const arg = process.argv[2];
const regPath = arg ? (isAbsolute(arg) ? arg : resolve(process.cwd(), arg))
                    : join(dirname(fileURLToPath(import.meta.url)), 'registry.json');
const ROOT = dirname(regPath);   // 상대경로(path·ssot canonical)는 레지스트리 폴더 기준
const errors = [], warns = [];
const E = m => errors.push(m), W = m => warns.push(m);

let reg;
try { reg = JSON.parse(readFileSync(regPath, 'utf8')); }
catch (e) { console.error('✗ registry.json 파싱 실패:', e.message); process.exit(1); }

// ---- 크기 측정 (텍스트 용량 bytes, 실측). 텍스트만 세고 빌드/의존성 폴더는 건너뜀 ----
const SKIP_DIR = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'vendor', '__pycache__', '.venv', 'coverage']);
const TEXT_EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.py', '.md', '.json', '.css', '.scss', '.html', '.sh',
  '.yml', '.yaml', '.txt', '.go', '.rs', '.java', '.c', '.h', '.cpp', '.vue', '.svelte', '.sql', '.toml', '.env',
  '.csv', '.tsv']);
// 이미지는 파일 크기 ≠ 토큰. 비전 추정 = 장당 고정 토큰(해상도/바이트 무시) → 게이지 bytes(=tokens×4)로 환산.
const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.tiff', '.avif', '.heic']);
const IMG_TOKENS = 1500;             // ponytail: 장당 고정 추정(상한 ~1600). 정밀히 하려면 (W×H)/750.
const IMG_BYTES = IMG_TOKENS * 4;
function bytesOf(p) {
  if (!existsSync(p)) return 0;
  const st = statSync(p);
  if (st.isFile()) {
    const ext = extname(p).toLowerCase();
    if (IMG_EXT.has(ext)) return IMG_BYTES;   // 이미지: 고정 토큰 환산(파일 크기 무시)
    return (TEXT_EXT.has(ext) && st.size < 2_000_000) ? st.size : 0;
  }
  if (!st.isDirectory()) return 0;
  let total = 0;
  for (const e of readdirSync(p, { withFileTypes: true })) {
    if (e.isDirectory() && SKIP_DIR.has(e.name)) continue;
    total += bytesOf(join(p, e.name));
  }
  return total;
}
const BUDGET = reg.token_budget || 1_000_000;
const BUDGET_B = BUDGET * 4;   // 예산을 텍스트 용량(bytes)으로 환산 — 게이지/표시는 KB/MB 실측(토큰 근사 안 씀)
const fmtB = b => b >= 1048576 ? (b / 1048576).toFixed(1) + 'MB' : (b / 1024).toFixed(0) + 'KB';

const areas = reg.areas || [];
const byId = {};
for (const a of areas) {
  if (byId[a.id]) E(`중복 id: ${a.id}`);
  byId[a.id] = a;
}
if (!byId[reg.root]) E(`root 영역 없음: ${reg.root}`);

// 잠긴 구조(연구 프로필): skeleton 과 영역 집합이 정확히 일치해야 — 추가/삭제 금지
if (reg.locked) {
  const skel = reg.skeleton || [];
  const ids = new Set(areas.map(a => a.id));
  for (const s of skel) if (!ids.has(s)) E(`locked: 골격 영역 '${s}' 삭제됨 — 잠긴 구조에서 삭제 불가`);
  for (const a of areas) if (!skel.includes(a.id)) E(`locked: 영역 '${a.id}' 추가됨 — 잠긴 구조에서 추가 불가(변형은 runs 원장 exp 태그로)`);
}

const sizes = [];
for (const a of areas) {
  if (!['global', 'bridge', 'leaf'].includes(a.role)) E(`${a.id}: 잘못된 role '${a.role}'`);
  if (a.role === 'global' && a.parent) E(`${a.id}: global 인데 parent 가 있음`);
  // parent ↔ children 양방향 일치
  if (a.parent && !byId[a.parent]) E(`${a.id}: parent '${a.parent}' 없음`);
  if (a.parent && byId[a.parent] && !(byId[a.parent].children || []).includes(a.id))
    E(`${a.id}: parent '${a.parent}' 의 children 에 자기 자신이 없음`);
  for (const c of a.children || []) {
    if (!byId[c]) { E(`${a.id}: child '${c}' 없음`); continue; }
    if (byId[c].parent !== a.id) E(`${a.id}: child '${c}' 의 parent 가 '${byId[c].parent}' (불일치)`);
  }
  // 중간다리 남용 방지: 자식 ≥ 2 일 때만 (1=불필요한 분할 신호, 0=깨짐)
  if (a.role === 'bridge') {
    const n = (a.children || []).length;
    if (n === 0) E(`${a.id}: 중간다리인데 자식 없음`);
    else if (n === 1) W(`${a.id}: 단일 자식 중간다리 → 자식을 부모로 끌어올려 병합 검토`);
  }
  if (a.role === 'leaf' && (a.children || []).length) E(`${a.id}: 말단인데 children 이 있음`);
  // 역할별 필수 필드
  if (a.role === 'leaf') {
    if (!a.path) E(`${a.id}: 말단인데 path 없음`);
    let bytes = 0;
    // 영역 폴더 = 정확히 두 칸: content/(수용된 실소스 — 폴더 구조 그대로) + ssot/(NOTES.md + 문서). 용량은 두 폴더 실측.
    if (a.path) {
      if (!existsSync(join(ROOT, a.path, 'ssot', 'NOTES.md'))) E(`${a.id}: ssot/NOTES.md 없음 (영역 1차 SSOT)`);
      bytes += bytesOf(join(ROOT, a.path, 'content'));
      bytes += bytesOf(join(ROOT, a.path, 'ssot'));
      const dir = join(ROOT, a.path);
      if (existsSync(dir)) for (const e of readdirSync(dir, { withFileTypes: true }))
        if (e.isDirectory() && !['content', 'ssot'].includes(e.name))
          W(`${a.id}: 영역 폴더에 '${e.name}/' — content·ssot 만 허용(코드는 content/, 문서는 ssot/)`);
    }
    // 추가 ssot: 공유는 외부 정본이라 따로 더함, 로컬은 ssot/ walk 에 이미 포함(존재만 검사).
    for (const s of a.ssot || []) {
      const sh = (reg.shared_ssot || []).find(x => x.id === s);
      if (sh) { if (existsSync(join(ROOT, sh.canonical))) bytes += bytesOf(join(ROOT, sh.canonical)); else E(`${a.id}: 공유 ssot '${s}' 정본 없음`); }
      else if (!(a.path && existsSync(join(ROOT, a.path, 'ssot', s + '.md')))) E(`${a.id}: ssot '${s}' 로컬파일(${a.path}ssot/${s}.md) 없음`);
    }
    sizes.push({ id: a.id, bytes });
    if (bytes >= BUDGET_B) W(`${a.id}: ${fmtB(bytes)} — 예산 초과, 분열 권고`);
    else if (bytes >= BUDGET_B * 0.8) W(`${a.id}: ${fmtB(bytes)} — 예산 80% 초과, 분열 임박`);
  } else if (a.role === 'bridge') {
    // 중간다리 = 자식 목록만. 영역 폴더에 ssot/NOTES.md(흡수된 _area.md), content/ 는 코드 없음.
    if (!a.path) E(`${a.id}: 중간다리인데 path 없음`);
    else {
      if (!existsSync(join(ROOT, a.path, 'ssot', 'NOTES.md'))) E(`${a.id}: ssot/NOTES.md 없음 (중간다리 자식 목록)`);
      if (bytesOf(join(ROOT, a.path, 'content'))) W(`${a.id}: 중간다리인데 content/ 에 코드 있음 — 실코드는 말단에만`);
    }
  } else if (!a.file) E(`${a.id}: ${a.role} 인데 file 없음`);   // global: GLOBAL.md
}

// shared_ssot 정합성
for (const s of reg.shared_ssot || []) {
  if (!s.canonical || !existsSync(join(ROOT, s.canonical))) E(`shared_ssot '${s.id}': 정본 파일 없음 (${s.canonical})`);
  for (const v of s.shown_in || []) if (!byId[v]) E(`shared_ssot '${s.id}': shown_in '${v}' 영역 없음`);
}

// 고아: root 에서 children 으로 도달 못 하는 영역
const seen = new Set();
(function walk(id) { if (!byId[id] || seen.has(id)) return; seen.add(id); (byId[id].children || []).forEach(walk); })(reg.root);
for (const a of areas) if (!seen.has(a.id)) E(`${a.id}: root 에서 도달 불가(고아)`);

// ---- 출력 ----
if (sizes.length) {
  console.log('말단 콘텐츠 용량(텍스트+이미지, 예산 ' + fmtB(BUDGET_B) + '):');
  for (const s of sizes.sort((a, b) => b.bytes - a.bytes))
    console.log(`  ${s.bytes >= BUDGET_B ? '✗' : s.bytes >= BUDGET_B * 0.8 ? '⚠' : '·'} ${s.id.padEnd(12)} ${fmtB(s.bytes).padStart(8)}`);
}
warns.forEach(w => console.log('  ⚠ ' + w));
if (errors.length) { errors.forEach(e => console.error('  ✗ ' + e)); console.error(`\n✗ ${errors.length}개 오류`); process.exit(1); }
// 게이지용 크기 사이드카 — 실파일에서 계산하므로 손기입/드리프트 없음. harness/ 있으면 자동 갱신.
const webDir = join(ROOT, 'harness');
if (existsSync(webDir)) {
  const sidecar = { unit: 'bytes', budget: BUDGET_B, leaves: Object.fromEntries(sizes.map(s => [s.id, s.bytes])) };
  writeFileSync(join(webDir, 'sizes.json'), JSON.stringify(sidecar) + '\n');
}
console.log(`✓ registry.json OK — 영역 ${areas.length} (말단 ${sizes.length}), 공유 ssot ${(reg.shared_ssot || []).length}, 경고 ${warns.length}`);
