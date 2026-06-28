---
description: 영역 추가·분열·이동·삭제 + 코드 이동(content/). registry.json 단일 편집 → 검사 → 로그.
argument-hint: "<add|split|move|rm> <대상> [옵션]"
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

영역 작업: $ARGUMENTS

> 단일 소스는 `registry.json`. 코드는 영역으로 **수용(contained)** 한다 — 말단 코드는 `areas/<path>/content/` 에 산다(밖을 가리키는 `sources` 없음). 영역 폴더 = 정확히 두 칸: `ssot/`+`content/`. 구조를 바꾸는 `move`/`split` 은 파일도 `git mv` 로 옮기고 깨지는 참조를 재작성한다. 변경 후 반드시 검사 + 로그.

> **잠금 확인 (먼저):** `registry.json` 에 `"locked": true` 면 잠긴 구조다(연구 프로필 등). `add`·`split`·`rm`·`id 변경 move` 를 **거부**하고 이유를 한 줄로 알린다 — "영역은 고정 골격이라 변형은 영역이 아니라 `runs/runs.jsonl` 의 `exp` 태그로 한다". `done`/내용 편집·로그·일정은 잠금과 무관하게 허용.

## 동작 (`$1`)
- **add** — 새 말단/중간다리 추가. 말단이면 `path`·`ssot` 채우고 **`areas/<...>/ssot/NOTES.md`**(본문) (+ 필요시 `ssot/<id>.md`, `category` 필수) 생성, 코드는 `content/` 에. 영역 폴더 = `ssot/`+`content/` 두 칸. 부모 `children` 갱신. **중간다리는 자식 ≥ 2 일 때만** 만들고 `ssot/NOTES.md`(자식 목록)만 두며 `content/` 는 비운다.
- **split** — 큰/혼합 말단을 분열. 기준은 **의미 우선**(하나의 책임으로 안 떨어지면 나눔), 그다음 토큰(검사기 크기). 기존 말단을 중간다리로 승격(`ssot/NOTES.md` 를 자식 목록으로 전환, `content/` 비움) + 하위 말단 생성하며 `content/` 파일·`ssot` 를 책임별로 재배분. **파일을 `git mv` 로 하위 영역 `content/` 로 옮기고 깨지는 참조를 재작성**(아래 안전장치 적용). 한 모듈을 ≥2 하위가 쓰면 `shared` 말단 `content/` 로(아래 「공유 코드」).
- **move** — `parent` 변경(+ 양쪽 `children` 갱신) 또는 `id`/`title`/`path` 변경. **`path` 가 바뀌면 영역 폴더 전체(`ssot/`+`content/`)를 `git mv` 로 새 경로로 옮기고**, `content/` 이동으로 깨지는 import·실행/배포 참조를 재작성(아래 안전장치 적용).
- **rm** — 영역 제거. 자식이 있으면 거부(먼저 처리). 부모 `children` 에서 제거, 영역 폴더 정리. **이 영역이 소유한 `content/` 코드는 어디로 갈지(다른 영역 흡수/삭제) 사용자에게 확인**하고 임의로 지우지 않는다.

## 파일을 옮기는 동작(`move`/`split`, `content/` 이동)의 안전장치
`/harness-adopt` 와 동일:
1. **clean tree 강제** — `git status --porcelain` 이 비어야 진행(아니면 중단·안내).
2. **`git mv`** 로만 이동(이력 보존).
3. **참조 재작성**(언어 인지: Python import·`pyproject`/pytest, JS/TS import·`package.json`/번들러, 실행/배포 문자열). 자동 재작성 불가 참조는 옮기지 말고 보고.
4. **빌드/테스트 게이트** — `pytest`/`npm run build` 등 실행. 실패하면 `git reset --hard HEAD`(+`git clean -fd`)로 **전체 롤백**하고 원인 보고.

## 공유 코드 (split 필수)
분열로 한 모듈이 ≥2 하위 영역에서 import 되면 한 `content/` 에만 못 둔다. import 그래프로 검출해 전용 **shared 말단**(`areas/shared/content/`)으로 모으고 소비 영역은 거기서 import. 자동 분류가 애매하면 사용자에게 되묻는다.

## 공통 절차 (모든 동작)
1. `registry.json` 만 편집(트리를 다른 문서에 복제하지 않음).
2. 공유 ssot 가 얽히면 `shared_ssot`(`canonical`·`shown_in`) 도 같이 갱신.
3. `node check-registry.mjs` → 오류 0 까지. 단일 자식 중간다리·끊긴 참조·말단 children·`ssot/NOTES.md` 누락·중간다리 content/ 코드 경고를 모두 해소.
4. `logs/log.jsonl` 에 한 줄 append: `{"ts":"<지금>","actor":"ai","op":"area:<동작>","target":"<영역 id>","summary":"..."}`. 파일을 옮겼으면 `code:move` 줄도(이동 경로 쌍).
5. 한 줄 결과 요약.
