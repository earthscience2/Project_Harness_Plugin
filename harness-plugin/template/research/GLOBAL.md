---
area: GLOBAL
role: global
profile: research
version: 0.1.0
updated: TODO
---

# 전역 영역 — 연구 하네스 설명서

## 이 하네스는 무엇인가
**연구를 영역 단위로 관리하는 SSOT 하네스.** 일정을 짜고 → 계속 테스트하고 → 결과를 뽑고 → 인사이트를 쌓는 루프를 굴린다.
구조는 **고정**이다(아래 6영역). 항상 이 문서부터 읽는다.

> **이 구조는 잠겨 있다(`registry.json: locked`).** 영역을 추가·삭제·분열할 수 없다. 변형(모델 트랙·파라미터 조합)은 새 영역이 아니라 **`runs/runs.jsonl` 의 `exp` 태그**로 표현한다.

## 연구 목표 (강제 — 채워라)
> 모든 실험이 이 기준으로 심판된다. 한 번 정하면 `기억`처럼 다룬다.
- **목표/질문:** TODO
- **성공 기준(지표):** TODO  (정량 지표든 정성 기준이든)
- **제약(강제):** TODO  (compute 예산 · 마감 · 데이터 접근 · 평가 한도)
- **확정 검증 티어 유무:** 없음 / 있음(있으면 `runs/submissions.jsonl` 도 씀 → README 참고)

## 고정 영역 6개
| 영역 | 역할 |
|------|------|
| **전역**(이 문서) | 목표·기준·제약·구조 설명 |
| **가설/질문** | 알고 싶은 것. 각 항목 `status: open\|testing\|confirmed\|refuted` |
| **데이터/자료** | 입력. `sources` 로 데이터셋/코퍼스/시뮬을 가리킴(무이동) |
| **실험** | 트랙·방법. 런은 `runs/runs.jsonl` 에 append, 여기엔 방법·셋업 지도 |
| **인사이트** | 누적된 발견. run id 역참조. category `기억` |
| **보고서** | HTML 보고서 관리. 실파일은 `reports/`, 목록은 `reports/index.html` |

## 연구 루프 ↔ 조각
1. **계획** → `schedule/` (마감·테스트 배분)
2. **테스트** → `/loop` 가 사이클을 돌리며 매 tick `runs/runs.jsonl` 에 런 append
3. **결과 추출** → `실험` 영역 `content/NOTES.md`
4. **인사이트** → `인사이트` 영역, run id 인용
5. **보고** → `reports/` 에 HTML 추가, `reports/reports.json` 에 한 줄

## 반복 실행 — /loop
연구의 반복(테스트→추출→인사이트)은 자동화 셋(크론·트리거·액션) 대신 **Claude `/loop`** 가 돈다.
- 각 루프를 `automation/automation.json` 에 `type:"loop"` 로 등록(`engine:"ai"`, `cadence`, `prompt`, `area`, `enabled`, `runs[]`).
- **"어떤 루프가 도는지"는 「자동화」 탭에서 확인** — 카드 = 루프 명부(켜짐/꺼짐 · 마지막 실행), 클릭하면 실행 이력. (정적 페이지라 *라이브 실행 여부*가 아니라 등록·최근 tick 기준.)
- 매 tick: 전체 런 → `runs/runs.jsonl`, 짧은 한 줄(상태·요약) → 그 엔트리 `runs[]`.
- 진짜 무인·헤드리스 지속이 필요하면 그건 `/loop`(세션 한정)가 아니라 cron 루틴(`/schedule`).

## 런 원장 (runs/)
지식은 영역에, **이벤트(런)는 원장에.** 영역 그래프를 작고 안정적으로 유지하는 핵심. 스키마는 [`runs/README.md`](runs/README.md).

## 규칙
1. **구조 불변.** 6영역 고정. 추가/삭제 시도 = `check-registry.mjs` 가 막음.
2. **실 내용은 말단(5영역)에만.** 전역은 길잡이.
3. **변형은 영역이 아니라 런으로.** 모델/피처/파라미터 차이는 `exp` 태그.
4. **변경하면 로그 한 줄.** `logs/log.jsonl` 에 append.

## 사용법
1. 항상 전역부터. 목표/기준/제약을 먼저 채운다.
2. `node check-registry.mjs` 로 구조 점검(잠금 위반·끊긴 참조).
3. 마인드맵: `python -m http.server` → `http://localhost:8000/web/`. 보고서: `reports/index.html`.

## 변경 이력
> 최근 5개만 유지.
- **v0.1.0** — 연구 하네스 초기화(고정 6영역).
