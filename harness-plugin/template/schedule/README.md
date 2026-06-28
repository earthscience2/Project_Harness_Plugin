# 일정 (schedule)

Claude Code 가 유지하는 일정 데이터. 웹 「일정」 탭이 `schedule.json` 을 **읽기 전용**으로 본다.
파일이 단일 소스다 — 추가/수정/완료 표시는 Claude Code 에게 요청하면 파일을 고친다(정적 페이지는 못 씀).

## schedule.json
```json
{ "events": [
  { "id": "e1", "date": "YYYY-MM-DD", "time": "HH:MM", "title": "...",
    "area": "<area id | global>", "done": false }
]}
```
- `time` 은 선택(없으면 종일).
- `area` 는 `registry.json` 의 영역 id, 또는 `global`.
- `done` 은 **파일 필드**(완료 표시). 달력·상세에서 취소선으로 보임. AI/사람이 작업을 끝내면 Claude 가 `true` 로 바꾸고 `logs/log.jsonl` 에 남긴다.

## 키우기
커지면 월별로 쪼갠다: `2026-06.json`, `2026-07.json` … (그때 fetch 로직도 같이 손봄).
