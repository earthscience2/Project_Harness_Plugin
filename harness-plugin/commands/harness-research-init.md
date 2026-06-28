---
description: 현재 저장소에 연구 하네스 골격을 생성 — 고정 6영역(잠김) + 런 원장 + HTML 보고서. 코드는 안 건드림.
allowed-tools: Bash, Read, Write, Glob
---

저장소 루트에 **연구 하네스 골격**을 깐다. 서비스용(`/harness-init`)과 달리 **영역 구조가 잠겨 있다** — 고정 6영역(전역·가설/질문·데이터/자료·실험·인사이트·보고서), 추가·삭제 불가. 변형은 영역이 아니라 `runs/runs.jsonl` 의 `exp` 태그로.

## 절차
1. 루트에 `registry.json` 이 이미 있으면 **중단** — 이미 하네스다(`/harness-status` 안내). 덮어쓰지 마라.
2. **공유 인프라** 복사(없는 것만, 기존 보존): `${CLAUDE_PLUGIN_ROOT}/template/` 의 `check-registry.mjs` · `settings.json` · `.gitignore` · `serve.py`(env 자동저장 서버) · `index.html`(→harness/ 리다이렉트) · `harness/` · `Harness Ops Design System/` · `schedule/` · `automation/` · `logs/` · `reports/` (+ 있으면 `_ssot/`) 를 루트로 `cp`.
3. **연구 오버레이** 복사: `${CLAUDE_PLUGIN_ROOT}/template/research/` 의 `registry.json` · `GLOBAL.md` · `areas/` · `runs/` 를 루트로 `cp`. (연구 registry/GLOBAL 을 쓴다 — 베이스 것 말고.)
4. `GLOBAL.md`·`registry.json` 의 `updated`/`ts` 가 `TODO` 면 오늘 날짜로. `logs/log.jsonl` placeholder 도. `registry.json` 의 `project` 가 `TODO` 면 **프로젝트 이름으로 채운다**(탭 제목).
5. `node check-registry.mjs` → 통과(exit 0). 잠금 검사(skeleton 일치)·끊긴 참조 0 확인. 영역 폴더는 `content/`(자료)+`ssot/`(NOTES) 둘만. (데이터 미입력 영역은 용량 0 으로 정상.)
6. `logs/log.jsonl` 에 한 줄: `{"ts":"<오늘>","actor":"ai","op":"area:add","target":"global","summary":"연구 하네스 초기화(고정 6영역)"}`.
7. 사용자에게: 골격 완료. **`GLOBAL.md` 의 「연구 목표」(목표·성공 기준·제약)를 먼저 채우라**고 안내. 마인드맵 `harness/`, 보고서 `reports/index.html`.

## 규칙
- 소스 코드 생성·이동·수정 금지. 하네스 문서만.
- 영역을 추가/삭제하지 마라 — 잠긴 구조다. 필요하면 사용자에게 "변형은 `runs` 의 `exp` 태그로" 안내.
- `git` 저장소 아니어도 진행(하네스는 git 없이 동작), 한 줄 알림.
