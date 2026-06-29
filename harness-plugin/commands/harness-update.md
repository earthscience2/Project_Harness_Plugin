---
description: 기존 하네스의 페이지·콘솔 골격을 플러그인 최신본으로 갱신(데이터는 보존). 구버전 디자인 → 최신 페이지 구조.
allowed-tools: Bash, Read
---

이미 깐 하네스의 **공유 페이지/콘솔 파일만** 플러그인 최신 템플릿으로 덮어쓴다. 영역·일정·자동화·로그·보고서 **데이터는 절대 건드리지 않는다**. 과거 페이지 디자인을 쓰는 프로젝트를 최신 페이지 구조로 올린다.

## 절차
1. 루트에 `registry.json` 이 없으면: 하네스 아님 → `/harness-init` 또는 `/harness-adopt` 안내하고 종료.
2. 아래 **페이지/인프라 파일만** `${CLAUDE_PLUGIN_ROOT}/template/` 에서 복사해 덮어쓴다(`cp -f`, 디렉터리는 `cp -rf`):
   - `index.html` (루트 리다이렉트)
   - `serve.py` (로컬 서버)
   - `check-registry.mjs` (검사기)
   - `harness/index.html` · `harness/gen-manifest.js` (콘솔 페이지)
   - `Harness Ops Design System/` (디자인 시스템 — 통째)
   - `reports/_template.html` · `reports/index.html` (보고서 골격)
3. **보존(덮어쓰지 마라):** `registry.json` · `GLOBAL.md` · `settings.json` · `.gitignore` · `harness/manifest.json` · `harness/sizes.json` · `automation/` · `schedule/` · `logs/` · `reports/reports.json` 과 실제 보고서 파일 · `_ssot/` · 영역 `content/`·`ssot/`. 위 2번 목록에 없는 건 전부 그대로 둔다.
4. `node check-registry.mjs` 실행 → 통과 확인(exit 0). 실패하면 사용자에게 출력 보여주고 멈춘다(데이터는 안 건드렸으니 안전).
5. `logs/log.jsonl` 에 한 줄 append: `{"ts":"<오늘>","actor":"ai","op":"area:update","target":"global","summary":"페이지 골격 최신본으로 갱신"}`.
6. 사용자에게: 갱신된 파일 목록 한 줄 + `/harness-open` 으로 최신 콘솔 확인 안내.

## 규칙
- 페이지/콘솔/디자인 파일만 교체. 데이터·설정·콘텐츠는 불변.
- 덮어쓰기다(init 처럼 "있으면 건너뛰기"가 아님) — 구버전 페이지를 최신으로 강제 교체하는 게 목적.
- git 저장소면 갱신 전후로 `git status` 가 페이지 파일만 바뀐 걸 보여 줘야 한다(데이터 변경 0).
