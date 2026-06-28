# 런 원장 (runs)

실험 이벤트를 append-only 로 쌓는 곳. **지식은 영역에, 런은 여기에.** 영역 구조가 잠겨 있으므로(고정 6영역) 모든 변형은 런으로 표현한다.

## runs.jsonl — 싸고 잦은 평가(필수)
한 줄 = 한 런(JSON Lines):
```json
{"ts":"YYYY-MM-DDTHH:MM","exp":"lgbm-v3","hyp":"h2","params":{"lr":0.02},"metrics":{"cv":0.884},"result":"runs/2026-06-28-lgbm-v3/","note":"baseline +2%"}
```
- `exp` — 트랙 태그(`실험` 영역의 트랙과 맞춤). 새 모델/조합도 영역 대신 이 태그로 구분.
- `hyp` — 검증하는 가설 id(`가설` 영역).
- `metrics` — 자유 키. 로컬 CV/지표.
- `result` — 산출물 폴더/파일 경로(무이동, 가리키기만).

## submissions.jsonl — 비싸고 드문 확정 평가(선택)
held-out·재현·실제 배포·대회 제출처럼 **게이트된 확정 평가**가 있을 때만 만든다:
```json
{"ts":"...","run":"lgbm-v3","ext_score":0.879,"gap":-0.005,"note":"로컬 0.884 → 확정 0.879"}
```
- `run` — 어떤 런을 올렸나.
- `ext_score` — 외부/확정 점수. `gap` = 확정 − 로컬. **이 갭이 연구 신뢰성의 핵심 신호.**

## 키우기
커지면 월별로 쪼갠다: `runs/2026-06.jsonl` …
