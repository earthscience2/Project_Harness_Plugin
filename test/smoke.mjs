#!/usr/bin/env node
// area-harness 플러그인 스모크 테스트. 프레임워크 없음 — assert + 종료코드.
// 실행: node test/smoke.mjs   (repo 루트에서)
// 검사: ① 매니페스트 정합성  ② /harness-init 산출물이 check-registry 게이트를 통과(exit 0)
import { readFileSync, existsSync, cpSync, rmSync, mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PLUGIN = join(ROOT, 'harness-plugin');
const TEMPLATE = join(PLUGIN, 'template');
let fails = 0;
const ok = (c, m) => { console.log(`${c ? '✓' : '✗'} ${m}`); if (!c) fails++; };
const json = p => JSON.parse(readFileSync(p, 'utf8'));

// ① 매니페스트
const plugin = json(join(PLUGIN, '.claude-plugin', 'plugin.json'));
ok(plugin.name && /^\d+\.\d+\.\d+$/.test(plugin.version || ''), `plugin.json: name + semver version (${plugin.version})`);

const mkt = json(join(ROOT, '.claude-plugin', 'marketplace.json'));
const entry = (mkt.plugins || []).find(p => p.name === plugin.name);
ok(entry, `marketplace.json: '${plugin.name}' 항목 존재`);
ok(entry && existsSync(join(ROOT, entry.source)), `marketplace source 경로 존재 (${entry?.source})`);

// 명령어 파일이 실재하는지
for (const c of ['harness-init', 'harness-adopt', 'harness-area', 'harness-status', 'harness-research-init'])
  ok(existsSync(join(PLUGIN, 'commands', `${c}.md`)), `command: ${c}.md`);

// ② /harness-init 산출물 → check-registry exit 0
const tmp = mkdtempSync(join(tmpdir(), 'harness-smoke-'));
try {
  cpSync(TEMPLATE, tmp, { recursive: true });
  // init 이 하는 일: TODO 날짜 채우기 (오늘 날짜는 테스트 결정성 위해 고정값)
  const D = '2026-01-01';
  for (const f of ['GLOBAL.md', 'registry.json', 'logs/log.jsonl']) {
    const p = join(tmp, f);
    if (existsSync(p)) writeFileSync(p, readFileSync(p, 'utf8').replaceAll('TODO', D));
  }
  execFileSync('node', ['check-registry.mjs'], { cwd: tmp, stdio: 'pipe' });
  ok(true, 'check-registry.mjs: 템플릿 산출물 통과 (exit 0)');
} catch (e) {
  ok(false, `check-registry.mjs 실패:\n${e.stdout?.toString() || ''}${e.stderr?.toString() || e.message}`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

// ③ 수용(contained) 두 칸 구조: 중간다리(ssot/NOTES.md, content/ 비움) + 말단(ssot/ + content/ 코드)
//    check-registry 가 새 구조에서 통과하고, content/ 코드를 용량에 세고, ssot/NOTES.md 누락을 게이트하는지.
const CHECK = join(TEMPLATE, 'check-registry.mjs');
const runCheck = (dir) => { try { execFileSync('node', [CHECK, join(dir, 'registry.json')], { stdio: 'pipe' }); return { code: 0 }; }
  catch (e) { return { code: 1, out: (e.stdout?.toString() || '') + (e.stderr?.toString() || '') }; } };
const w = (dir, rel, body) => { mkdirSync(join(dir, dirname(rel)), { recursive: true }); writeFileSync(join(dir, rel), body); };

const fx = mkdtempSync(join(tmpdir(), 'harness-contained-'));
try {
  w(fx, 'registry.json', JSON.stringify({
    version: '0.1.0', project: 'fx', root: 'global', contained: true, token_budget: 1000000,
    areas: [
      { id: 'global', title: '전역', role: 'global', file: 'GLOBAL.md', children: ['api'] },
      { id: 'api', title: 'API', role: 'bridge', path: 'areas/api/', parent: 'global', children: ['users', 'orders'] },
      { id: 'users', title: 'Users', role: 'leaf', path: 'areas/api/users/', parent: 'api', children: [], ssot: [] },
      { id: 'orders', title: 'Orders', role: 'leaf', path: 'areas/api/orders/', parent: 'api', children: [], ssot: [] },
    ], shared_ssot: [],
  }));
  w(fx, 'GLOBAL.md', '# 전역\n');
  w(fx, 'areas/api/ssot/NOTES.md', '# API\n자식: users, orders\n');       // 중간다리: NOTES 만, content/ 없음
  w(fx, 'areas/api/users/ssot/NOTES.md', '# Users\n[코드](../content/app.py)\n');
  w(fx, 'areas/api/users/content/app.py', 'def users():\n    return []\n');   // 코드는 content/ 직속
  w(fx, 'areas/api/orders/ssot/NOTES.md', '# Orders\n');
  w(fx, 'areas/api/orders/content/app.py', 'def orders():\n    return []\n');

  ok(runCheck(fx).code === 0, 'check-registry: 두 칸 구조(중간다리+말단, content/ 코드) 통과');

  // 말단 content/app.py 가 용량에 잡히는지(sizes 사이드카는 harness/ 있을 때만 — 여기선 stdout 만)
  const okOut = execFileSync('node', [CHECK, join(fx, 'registry.json')], { encoding: 'utf8' });
  ok(/users/.test(okOut) && /orders/.test(okOut), 'check-registry: 말단 크기 출력에 content/ 영역 포함');

  // 게이트: 말단에서 ssot/NOTES.md 를 지우면 exit 1
  rmSync(join(fx, 'areas/api/orders/ssot/NOTES.md'));
  const broke = runCheck(fx);
  ok(broke.code === 1 && /NOTES\.md/.test(broke.out || ''), 'check-registry: ssot/NOTES.md 누락 → 게이트 실패(exit 1)');
} catch (e) {
  ok(false, `contained 픽스처 실패: ${e.message}`);
} finally {
  rmSync(fx, { recursive: true, force: true });
}

console.log(fails ? `\n✗ ${fails}개 실패` : '\n✓ 전부 통과');
process.exit(fails ? 1 : 0);
