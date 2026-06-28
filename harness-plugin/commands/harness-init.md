---
description: 현재 저장소에 영역 하네스 골격을 생성(빈 프로젝트). 코드는 건드리지 않음.
allowed-tools: Bash, Read, Write, Glob
---

현재 저장소 루트에 **영역 하네스 골격**을 깐다. 기존 코드/파일은 건드리지 않는다(골격만 추가). 이후 새로 짤 코드는 처음부터 영역 안(`areas/<path>/content/`)에 만든다. 영역 폴더 = 정확히 두 칸: `ssot/`+`content/`.

## 절차
1. 루트에 `registry.json` 이 이미 있으면 **중단** — 이미 하네스다(`/harness-status` 안내). 덮어쓰지 마라.
2. 플러그인 템플릿을 복사한다(없는 것만, 기존 파일 보존):
   - `${CLAUDE_PLUGIN_ROOT}/template/` 의 `registry.json` · `GLOBAL.md` · `check-registry.mjs` · `settings.json` · `.gitignore` · `serve.py`(env 자동저장 서버) · `index.html`(→harness/ 리다이렉트) · `harness/` · `Harness Ops Design System/` · `_ssot/` · `schedule/` · `automation/` · `logs/` · `reports/` 를 저장소 루트로 복사.
   - 복사는 `cp` 로 하되, 루트에 같은 이름이 있으면 건너뛴다.
3. `GLOBAL.md` 와 `registry.json` 의 `updated`/`ts` 가 `TODO` 면 오늘 날짜로 채운다. `logs/log.jsonl` 의 placeholder 줄도 오늘 날짜로. `registry.json` 의 `project` 가 `TODO` 면 **프로젝트 이름(저장소 폴더명 등)으로 채운다** — 마인드맵 탭 제목에 표시된다.
4. `node check-registry.mjs` 실행 → 통과 확인(exit 0).
5. `logs/log.jsonl` 에 한 줄 append: `{"ts":"<오늘>","actor":"ai","op":"area:add","target":"global","summary":"하네스 초기화"}`.
6. 사용자에게: 골격 완료. **이미 코드가 있으면 `/harness-adopt`** 로 영역에 수용(소스를 각 영역 `content/` 로 이동)하라고 안내. **빈 프로젝트면 새 코드를 처음부터 `areas/<path>/content/` 안에 만들라**고 안내(루트에 산포 금지) — 먼저 `/harness-area add` 로 말단을 만들고 그 `content/` 에 작성. 마인드맵은 `python -m http.server` → `http://localhost:8000/harness/`.

## 규칙
- init 자체는 골격 파일만 생성(기존 코드 무수정). 코드 수용/이동은 `/harness-adopt`·`/harness-area` 가 한다.
- 새 코드는 루트가 아니라 영역 `content/` 안에 만든다. 빈 프로젝트는 산포된 루트 코드 없이 영역 구조로 시작.
- `git` 저장소가 아니면 init 은 진행하되 한 줄 알린다(수용/이동은 `git mv` 가 전제이므로 git 필요).
