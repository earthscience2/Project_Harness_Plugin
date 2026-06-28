# area-harness — 플러그인 정리

코드를 **영역으로 수용(contained)** 하는 SSOT 하네스. `/harness-adopt` 가 소스를 각 영역의 `content/` 안으로 물리 이동해 디렉터리 구조 = 영역 트리로 정합시키고, 영역(Area) 지식 그래프 + 일정·자동화·로그·보고서를 얹고, Claude Code 가 그 위에서 일한다. 모든 비-전역 영역은 **정확히 두 칸**: `ssot/`(문서) + `content/`(코드).

## 두 가지 프로필

| | **서비스용**(기본) | **연구용** |
|---|---|---|
| 까는 명령 | `/harness-init`(빈) · `/harness-adopt`(기존 코드) | `/harness-research-init` |
| 영역 구조 | 자유 — 의미대로 추가·분열·이동·삭제 | **잠김** — 고정 6영역, 추가·삭제 불가 |
| `content/` | 실제 코드 | 데이터셋·노트북·스크립트 |
| 핵심 루프 | 짜고 → 배포·관리 | 계획 → 테스트 → 결과추출 → 인사이트 |
| 전용 조각 | — | `runs/`(런 원장), 2티어 평가 |
| 공통 | 영역 그래프 · `schedule` · `automation` · `logs` · **`reports`(HTML)** · web 콘솔 | |

두 프로필은 같은 뼈대(레지스트리·검사기·web·디자인시스템·서브시스템)를 쓴다. 연구용은 그 위에 **잠긴 registry + 연구 GLOBAL + 런 원장**만 더한 변형.

## 명령

| 명령 | 하는 일 |
|------|---------|
| `/harness-init` | 빈 저장소에 서비스용 골격 생성(이후 새 코드는 영역 `content/` 안에). |
| `/harness-adopt [범위]` | 기존 코드를 영역으로 **수용**(소스를 각 영역 `content/` 로 `git mv` 이동). 구조 제안 → 승인 → 이동 → 참조 재작성 → 빌드 게이트 → 작성. 실패 시 롤백. |
| `/harness-area <add\|split\|move\|rm>` | 영역 편집. `registry.json` 단일 편집 → 검사 → 로그. **잠긴 구조면 add/split/rm 거부.** |
| `/harness-status` | 상태 점검(말단 크기·분열 후보·끊긴 참조·최근 로그). 읽기 전용. |
| `/harness-research-init` | 연구용 골격 생성 — 잠긴 6영역 + 런 원장 + HTML 보고서. |

## 영역 모델

- **전역**: 마인드맵 루트. 설명서(`GLOBAL.md`).
- **중간다리**: 연결만 하는 노드(`ssot/NOTES.md` 자식 목록, `content/` 비움). **자식 ≥ 2 일 때만.**
- **말단**: 실내용. 영역 폴더 = **정확히 두 칸: `ssot/`(NOTES.md 본문 + `<id>.md` 문서) + `content/`(코드 — 폴더 구조 그대로)**. adopt 가 소스를 `content/` 로 이동, 코드 위치는 거기로 암묵 고정(밖을 가리키는 `sources` 없음).

**규칙:** 코드 수용(adopt 시 영역 `content/` 로 이동) · 경계는 의미로(1영역=1책임) · 공유 모듈은 `areas/shared/content/` · 토큰은 2차 가드레일 · 실내용은 말단에만 · 변경하면 `logs/log.jsonl` 한 줄.

### registry.json — 단일 소스
영역 트리의 유일한 진실. 추가/분열/공유 변경 시 이 파일만 고친다. 사람용 트리는 web 마인드맵이 실시간으로 그린다.

### check-registry.mjs — 게이트
편집 후 `node check-registry.mjs`. 끊긴 참조·고아·역할 오류 → exit 1. 말단 텍스트 용량을 **실파일에서** 측정(`token_budget`×4 bytes 기준)해 분열 시점을 경고하고, web 게이지용 `harness/sizes.json` 을 갱신한다. `locked` 면 `skeleton` 과 영역 집합 일치까지 강제.

### ssot 카테고리 (frontmatter `category` 필수)
`규칙`(권장) · `강제`(위반 불가) · `설명`(참고) · `기억`(결정 이력, 되돌리기 전 확인).

## 서브시스템 (web 콘솔 탭)

`harness/index.html` = 마인드맵 + 탭. 정적 페이지(백엔드 없음), 각 JSON 이 단일 소스. 편집은 Claude Code 가 파일을 고침.

| 탭 | 소스 | 내용 |
|----|------|------|
| 영역 | `registry.json` | 마인드맵(드래그·줌), 클릭 시 영역 파일 |
| 일정 | `schedule/schedule.json` | 달력(1달/1년), 완료 토글 |
| 자동화 | `automation/automation.json` | 크론·트리거·액션 관리 대시보드 |
| 로그 | `logs/log.jsonl` | 전영역 변경 이력(append-only) |
| **보고서** | `reports/reports.json` | **HTML 보고서 목록 → 클릭 시 본문 렌더(양 프로필 공통)** |
| 설정 | `settings.json` | 플랫폼·채널 키(브라우저 localStorage, env 파일로 내보내기) |

### 보고서 (reports/)
HTML 로 관리. `_template.html` 복사 → 작성 → `reports.json` 에 한 줄(`id·title·date·area·file·summary`). `index.html`(독립 갤러리)이나 web 콘솔 보고서 탭에서 봄. 디자인시스템 스타일 공유.

## 연구 프로필 상세

### 고정 6영역 (잠김)
```
전역 ─ 가설/질문 · 데이터/자료 · 실험 · 인사이트 · 보고서
```
추가·삭제·분열 불가(`check-registry` + `/harness-area` 두 곳에서 막음). **변형(모델·피처·파라미터)은 새 영역이 아니라 런의 `exp` 태그로.**

### 런 원장 (runs/)
지식은 영역에, **이벤트(런)는 원장에.**
- `runs.jsonl`(필수) — 싸고 잦은 평가. `{ts,exp,hyp,params,metrics,result,note}`.
- `submissions.jsonl`(선택) — 비싸고 드문 **확정 평가**(held-out·재현·실제 배포·대회 제출)가 있을 때만. 로컬↔확정 **갭**이 연구 신뢰성의 핵심 신호.

### 연구 루프 ↔ 조각
계획 `schedule/` → 테스트 `runs.jsonl`(+`automation/`) → 결과추출 `실험` NOTES → 인사이트 `인사이트` 영역(run id 인용) → 보고 `reports/`.

## 파일 레이아웃

```
harness-plugin/
  .claude-plugin/plugin.json        # 버전 단일 진실(semver)
  commands/                         # 슬래시 명령 5개
    harness-init · adopt · area · status · research-init .md
  template/                         # 서비스용 골격 — init/adopt 가 깖
    registry.json  GLOBAL.md  check-registry.mjs
    harness/                            #   마인드맵 + 탭 콘솔
    Harness Ops Design System/      #   공유 디자인시스템(토큰·컴포넌트)
    schedule/ automation/ logs/ reports/ _ssot/
    research/                       # 연구 프로필 — research-init 이 추가로 깖
      registry.json(잠김)  GLOBAL.md  areas/  runs/
```

## 로컬 사용

```
/plugin marketplace add <이 repo>
/plugin install area-harness
```
`template/`·`commands/` 수정 후엔 `/plugin` 새로고침. 마인드맵: 하네스 루트에서 `python -m http.server` → `http://localhost:8000/harness/`.
