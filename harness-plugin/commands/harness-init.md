---
description: 현재 저장소에 영역 하네스 골격을 생성(빈 프로젝트). 코드는 건드리지 않음.
allowed-tools: Bash, Read, Write, Glob
---

현재 저장소 루트에 **영역 하네스 골격**을 깐다. 기존 코드/파일은 절대 건드리지 않는다(오버레이).

## 절차
1. 루트에 `registry.json` 이 이미 있으면 **중단** — 이미 하네스다(`/harness-status` 안내). 덮어쓰지 마라.
2. 플러그인 템플릿을 복사한다(없는 것만, 기존 파일 보존):
   - `${CLAUDE_PLUGIN_ROOT}/template/` 의 `registry.json` · `GLOBAL.md` · `check-registry.mjs` · `web/` · `Harness Ops Design System/` · `_ssot/` · `schedule/` · `automation/` · `logs/` · `reports/` 를 저장소 루트로 복사.
   - 복사는 `cp` 로 하되, 루트에 같은 이름이 있으면 건너뛴다.
3. `GLOBAL.md` 와 `registry.json` 의 `updated`/`ts` 가 `TODO` 면 오늘 날짜로 채운다. `logs/log.jsonl` 의 placeholder 줄도 오늘 날짜로.
4. `node check-registry.mjs` 실행 → 통과 확인(exit 0).
5. `logs/log.jsonl` 에 한 줄 append: `{"ts":"<오늘>","actor":"ai","op":"area:add","target":"global","summary":"하네스 초기화"}`.
6. 사용자에게: 골격 완료, 코드가 있으면 **`/harness-adopt`** 로 영역을 매핑하라고 안내. 마인드맵은 `python -m http.server` → `http://localhost:8000/web/`.

## 규칙
- 소스 코드 파일을 만들거나 옮기거나 수정하지 마라. 하네스 골격 파일만 생성.
- `git` 저장소가 아니면 그대로 진행하되(하네스는 git 없이도 동작) 한 줄 알린다.
