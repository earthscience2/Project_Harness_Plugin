---
description: 영역 추가·분열·이동·삭제 + sources 재매핑. registry.json 단일 편집 → 검사 → 로그.
argument-hint: "<add|split|move|rm> <대상> [옵션]"
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

영역 작업: $ARGUMENTS

> 단일 소스는 `registry.json`. 코드는 옮기지 않는다(오버레이, `sources` 로만 가리킴). 변경 후 반드시 검사 + 로그.

## 동작 (`$1`)
- **add** — 새 말단/중간다리 추가. 말단이면 `path`·`sources`·`ssot`·`content:["NOTES.md"]` 채우고 `areas/<...>/content/NOTES.md`(+ 필요시 `ssot/<id>.md`, `category` 필수) 생성. 부모 `children` 갱신. **중간다리는 자식 ≥ 2 일 때만** 만든다.
- **split** — 큰/혼합 말단을 분열. 기준은 **의미 우선**(하나의 책임으로 안 떨어지면 나눔), 그다음 토큰(검사기 크기). 기존 말단을 중간다리로 승격(`_area.md` 작성, `path` 제거) + 하위 말단 생성하며 `sources`/`ssot` 를 책임별로 재배분. 코드는 그대로 두고 매핑만 나눈다.
- **move** — `parent` 변경(+ 양쪽 `children` 갱신) 또는 `id`/`title` 변경. 경로 이동이 필요하면 `path`·실제 폴더(하네스 문서만)도 함께.
- **rm** — 영역 제거. 자식이 있으면 거부(먼저 처리). 부모 `children` 에서 제거, 하네스 문서 정리. **소스 코드는 지우지 않는다.**

## 공통 절차 (모든 동작)
1. `registry.json` 만 편집(트리를 다른 문서에 복제하지 않음).
2. 공유 ssot 가 얽히면 `shared_ssot`(`canonical`·`shown_in`) 도 같이 갱신.
3. `node check-registry.mjs` → 오류 0 까지. 단일 자식 중간다리·끊긴 참조·말단 children 경고를 모두 해소.
4. `logs/log.jsonl` 에 한 줄 append: `{"ts":"<지금>","actor":"ai","op":"area:<동작>","target":"<영역 id>","summary":"..."}`.
5. 한 줄 결과 요약.
