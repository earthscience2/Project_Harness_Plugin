#!/usr/bin/env node
// registry.json 정합성 + 영역 크기 검사. 하네스 루트에서: node check-registry.mjs [경로/registry.json]
// AI 가 registry.json 을 편집하므로 끊긴 참조·고아·역할 오류를 즉시 잡고,
// 말단 크기(ssot+노트+sources 코드)를 실제 파일에서 추정한다 — 토큰 숫자를 손으로 적지 않는다.
// errors → 종료코드 1 (편집/분열 후 게이트). sources 누락·예산초과는 warn(빈프로젝트·분열대상 신호).
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { dirname, join, isAbsolute, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const arg = process.argv[2];
const regPath = arg ? (isAbsolute(arg) ? arg : resolve(process.cwd(), arg))
                    : join(dirname(fileURLToPath(import.meta.url)), 'registry.json');
const ROOT = dirname(regPath);   // 상대경로(ssot·canonical·sources)는 레지스트리 폴더 기준
const errors = [], warns = [];
const E = m => errors.push(m), W = m => warns.push(m);

let reg;
try { reg = JSON.parse(readFileSync(regPath, 'utf8')); }
catch (e) { console.error('✗ registry.json 파싱 실패:', e.message); process.exit(1); }

// ---- 크기 추정 (bytes/4 ≈ tokens). 텍스트만 세고 빌드/의존성 폴더는 건너뜀 ----
const SKIP_DIR = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'vendor', '__pycache__', '.venv', 'coverage']);
const TEXT_EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.py', '.md', '.json', '.css', '.scss', '.html', '.sh',
  '.yml', '.yaml', '.txt', '.go', '.rs', '.java', '.c', '.h', '.cpp', '.vue', '.svelte', '.sql', '.toml', '.env']);
function bytesOf(p) {
  if (!existsSync(p)) return 0;
  const st = statSync(p);
  if (st.isFile()) return (TEXT_EXT.has(extname(p).toLowerCase()) && st.size < 2_000_000) ? st.size : 0;
  if (!st.isDirectory()) return 0;
  let total = 0;
  for (const e of readdirSync(p, { withFileTypes: true })) {
    if (e.isDirectory() && SKIP_DIR.has(e.name)) continue;
    total += bytesOf(join(p, e.name));
  }
  return total;
}
const BUDGET = reg.token_budget || 1_000_000;

const areas = reg.areas || [];
const byId = {};
for (const a of areas) {
  if (byId[a.id]) E(`중복 id: ${a.id}`);
  byId[a.id] = a;
}
if (!byId[reg.root]) E(`root 영역 없음: ${reg.root}`);

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
    for (const s of a.ssot || []) {
      const sh = (reg.shared_ssot || []).find(x => x.id === s);
      const file = sh ? join(ROOT, sh.canonical) : (a.path && join(ROOT, a.path, 'ssot', s + '.md'));
      if (sh ? existsSync(file) : (a.path && existsSync(file))) bytes += bytesOf(file);
      else E(`${a.id}: ssot '${s}' 가 shared 도 로컬파일(${a.path}ssot/${s}.md)도 아님`);
    }
    for (const f of a.content || []) if (a.path) bytes += bytesOf(join(ROOT, a.path, 'content', f));
    for (const src of a.sources || []) {
      if (!existsSync(join(ROOT, src))) W(`${a.id}: sources '${src}' 경로 없음`);
      else bytes += bytesOf(join(ROOT, src));
    }
    if (!(a.sources || []).length) W(`${a.id}: sources 비어 있음(매핑된 코드 없음)`);
    const tok = Math.round(bytes / 4);
    sizes.push({ id: a.id, tok });
    if (tok >= BUDGET) W(`${a.id}: ≈${(tok / 1000).toFixed(0)}k 토큰 — 예산 초과, 분열 권고`);
    else if (tok >= BUDGET * 0.8) W(`${a.id}: ≈${(tok / 1000).toFixed(0)}k 토큰 — 예산 80% 초과, 분열 임박`);
  } else if (!a.file) E(`${a.id}: ${a.role} 인데 file 없음`);
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
  console.log('말단 크기(추정, 예산 ' + (BUDGET / 1000).toFixed(0) + 'k):');
  for (const s of sizes.sort((a, b) => b.tok - a.tok))
    console.log(`  ${s.tok >= BUDGET ? '✗' : s.tok >= BUDGET * 0.8 ? '⚠' : '·'} ${s.id.padEnd(12)} ≈${(s.tok / 1000).toFixed(1)}k`);
}
warns.forEach(w => console.log('  ⚠ ' + w));
if (errors.length) { errors.forEach(e => console.error('  ✗ ' + e)); console.error(`\n✗ ${errors.length}개 오류`); process.exit(1); }
console.log(`✓ registry.json OK — 영역 ${areas.length} (말단 ${sizes.length}), 공유 ssot ${(reg.shared_ssot || []).length}, 경고 ${warns.length}`);
