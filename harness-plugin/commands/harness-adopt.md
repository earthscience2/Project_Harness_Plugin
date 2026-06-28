---
description: 기존 코드베이스를 영역 하네스로 수용(adopt 시 소스를 각 영역 src/ 로 물리 이동). 구조 제안 → 승인 → git mv 이동 → 참조 재작성 → 빌드 게이트 → registry 작성.
argument-hint: "[경로/범위 — 생략 시 저장소 전체]"
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

기존 코드베이스를 영역으로 **수용(contained)** 한다. 범위: $ARGUMENTS (없으면 저장소 전체).

> **승인 전엔 아무것도 옮기지 않는다.** 승인 후 각 말단의 소스를 `git mv` 로 `areas/<path>/src/` 안으로 물리 이동하고, 깨지는 참조를 재작성하고, 빌드/테스트 통과를 게이트로 둔다. 실패하면 전체 롤백한다.

## 절차

1. **골격 보장**: 루트에 `registry.json` 이 없으면 먼저 `/harness-init` 절차를 수행(템플릿 복사).

2. **코드 스캔**: 디렉터리 구조·진입점·빌드 파일·언어를 파악(Glob/Grep/Read). 백엔드/프론트/엣지/배포 등 자연스러운 흐름을 읽어낸다.

3. **공유 코드 검출 (필수 — 건너뛰면 빌드가 깨진다)**: import 그래프를 만들어 **≥2 영역이 import 하는 모듈**을 찾는다.
   - Python: `import`/`from x import`(상대·절대), JS/TS: `import`/`require`, 동적 로더.
   - ≥2 영역이 쓰는 모듈 → 전용 **shared 말단 영역**(`areas/shared/src/`)으로 모으고 소비 영역은 거기서 import(영역 간 import 허용).
   - 어느 영역에도 깔끔히 안 떨어지는 코드가 많으면 **자동 강제 이동 금지** — 분할안을 사용자에게 되묻는다.

4. **영역 제안 (가장 중요)** — `GLOBAL.md` 「영역 규칙」을 따른다:
   - 경계는 **의미**로: 한 영역 = 하나의 책임·하나의 계약·한 명의 담당(`백엔드 → API`).
   - 불필요한 분할/병합 금지. **중간다리는 자식 ≥ 2 일 때만.** 중첩을 위한 중첩 금지.
   - 큰 묶음은 중간다리, 실제 코드 묶음은 말단. 말단마다 어떤 파일/글롭이 `src/` 로 들어갈지 매핑하고, 공유 모듈은 `shared` 로 표시.

5. **사용자 확인**: 제안한 영역 트리 + **이동 계획**(파일 → `areas/<path>/src/...` 쌍, shared 분류 포함)을 보여주고 **승인받는다**. 큰 변경이므로 이동 전에 멈춘다.

6. **선결 조건 강제**: `git status --porcelain` 으로 작업트리가 **clean** 인지 확인. 더러우면 **중단**하고 커밋/스태시를 안내한다(롤백 안전망이 깨지므로 진행 금지). git 저장소가 아니면 중단(수용은 `git mv` 이력 보존이 전제).

7. **이동 (`git mv`)**: 각 말단의 소스를 `areas/<path>/src/` 로 옮긴다. shared 모듈은 `areas/shared/src/` 로. 모든 이동은 `git mv`(이력 보존). 대상 폴더는 먼저 만든다.

8. **참조 재작성 (언어 인지)** — 이동으로 깨지는 참조를 전부 고친다:
   - **Python**: 패키지 import·상대 import(`from ..x import`)·`__init__` 경로·`pyproject.toml`/`setup.cfg`(packages·entry_points)·pytest `rootdir`/`testpaths`.
   - **JS/TS**: `import`/`require` 경로·`package.json` 스크립트·`tsconfig` paths·번들러/Capacitor 경로.
   - **실행/배포 문자열**: `uvicorn pkg.module:app`, systemd `WorkingDirectory`/`ExecStart`, nginx `root`, Dockerfile `COPY`/`WORKDIR`.
   - **자동 재작성이 불가능한 참조는 이동하지 말고 목록으로 보고**(추측 수정 금지).

9. **빌드/테스트 게이트**: 프로젝트의 빌드/테스트를 **실제로 실행**(예: `pytest`, `npm run build`/`npm test`). 통과해야 다음으로 간다.
   - **실패 시 전체 롤백**: `git restore --staged . && git restore . && git clean -fd`(또는 `git reset --hard HEAD`)로 이동·재작성을 전부 되돌리고, 실패 원인(깨진 참조/테스트)을 보고하고 중단한다.

10. **하네스 작성**(게이트 통과 후):
    - `registry.json` 갱신(단일 소스). 말단 `path` 는 `areas/<...>/`, `sources` 는 **영역 내부**(`areas/<path>/src/...`)를 가리킨다.
    - 각 말단에 `ssot/NOTES.md`(소스 지도 — 링크는 영역 내부 `src/...`) + 필요한 `ssot/<id>.md`(frontmatter `category` 필수). 전용 자료는 `content/`. 중간다리는 `_area.md`(자식 목록).
    - 공유되는 규약은 `_ssot/<id>.md` 정본 + `shared_ssot.shown_in`.

11. `node check-registry.mjs` 실행 → 오류 0 까지. `영역 밖 sources`(미수용 잔여) 경고가 남으면 그 코드도 수용했는지 재확인.

12. `logs/log.jsonl` 에 append: 영역별 `{"op":"area:add","target":"<id>",...}` + 이동별 `{"op":"code:move","target":"<id>","from":"<원경로>","to":"areas/<path>/src/...","summary":"..."}`.

13. 결과 요약(이동한 파일 수·shared 영역·게이트 결과) + 마인드맵 보기 안내.

## 규칙
- 승인 전 이동·수정 금지. 모든 이동은 clean tree 위에서 `git mv`, 실패하면 전체 롤백.
- 자동 재작성이 불가능한 참조는 추측하지 말고 보고. 빌드 게이트를 통과 못 하면 수용을 확정하지 않는다.
- 크기가 1M 토큰을 넘을 말단은 처음부터 분열해 제안(검사기 크기 추정 참고).
