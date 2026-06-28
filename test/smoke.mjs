#!/usr/bin/env node
// area-harness 플러그인 스모크 테스트. 프레임워크 없음 — assert + 종료코드.
// 실행: node test/smoke.mjs   (repo 루트에서)
// 검사: ① 매니페스트 정합성  ② /harness-init 산출물이 check-registry 게이트를 통과(exit 0)
import { readFileSync, existsSync, cpSync, rmSync, mkdtempSync, writeFileSync } from 'node:fs';
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
for (const c of ['harness-init', 'harness-adopt', 'harness-area', 'harness-status'])
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

console.log(fails ? `\n✗ ${fails}개 실패` : '\n✓ 전부 통과');
process.exit(fails ? 1 : 0);
