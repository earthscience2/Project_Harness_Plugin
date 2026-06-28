---
description: 기존 코드베이스를 영역 하네스로 오버레이 매핑(파일 무이동). 영역 구조를 제안하고 registry.json 을 채운다.
argument-hint: "[경로/범위 — 생략 시 저장소 전체]"
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

기존 코드베이스 위에 **오버레이**로 영역을 입힌다. 범위: $ARGUMENTS (없으면 저장소 전체).

> **절대 코드를 옮기거나 고치지 않는다.** 영역은 실제 소스 경로를 `sources` 로 *가리키기만* 한다.

## 절차
1. **골격 보장**: 루트에 `registry.json` 이 없으면 먼저 `/harness-init` 절차를 수행(템플릿 복사).
2. **코드 스캔**: 디렉터리 구조·진입점·빌드 파일·언어를 파악한다(Glob/Grep/Read). 어디가 백엔드/프론트/엣지/배포 등 자연스러운 흐름인지 읽어낸다.
3. **영역 제안 (가장 중요)** — `GLOBAL.md` 「영역 규칙」을 따른다:
   - 경계는 **의미**로: 한 영역 = 하나의 책임·하나의 계약·한 명의 담당. `백엔드 → API` 처럼 흐름이 자연스럽게.
   - 불필요한 분할/병합 금지. **중간다리는 자식 ≥ 2 일 때만.** 중첩을 위한 중첩 금지.
   - 큰 묶음은 중간다리, 실제 코드 묶음은 말단.
   - 말단마다 `sources`(실경로/글롭, 무이동), 필요한 `ssot`(id), `content: ["NOTES.md"]`.
4. **사용자 확인**: 제안한 영역 트리(전역→중간다리→말단 + 각 sources)를 보여주고 **승인받는다**. 큰 변경이므로 쓰기 전에 멈춘다.
5. 승인되면 작성:
   - `registry.json` 갱신(단일 소스). `path` 는 `areas/<...>/`.
   - 각 말단에 `areas/<...>/content/NOTES.md`(실 소스 경로를 링크로 가리키는 지도) + 필요한 `ssot/<id>.md`(frontmatter `category` 필수). 중간다리는 `_area.md`(자식 목록).
   - 공유되는 규약은 `_ssot/<id>.md` 정본 + `shared_ssot.shown_in`.
6. `node check-registry.mjs` 실행 → 오류 0 까지 수정. `sources 경로 없음` 경고는 매핑이 맞는지 재확인.
7. `logs/log.jsonl` 에 영역별 `{"op":"area:add","target":"<id>",...}` 한 줄씩 append.
8. 결과 요약 + 마인드맵 보기 안내.

## 규칙
- 소스 코드 파일 생성·이동·수정 금지. 만드는 건 하네스 문서(registry/NOTES/ssot/_area)뿐.
- 크기가 1M 토큰을 넘을 말단은 처음부터 분열해 제안(검사기 크기 추정 참고).
