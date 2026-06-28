# 로그 (logs)

**전영역 변경 이력의 단일 소스.** 영역·ssot·일정·자동화 — 하네스를 바꾸는 모든 행위가 여기 한 줄로 남는다.
별도 수집 시스템이 아니라, **변경을 한 그 행위의 부산물**이다. 변경 1건 = 한 줄 append.

## log.jsonl (append-only, 한 줄에 객체 1개 = JSONL)
```json
{ "ts": "2026-06-28T13:00", "actor": "ai|human|cron|trigger|manual",
  "op": "area:add|area:split|area:remove|area:rename|ssot:add|ssot:edit|schedule:edit|automation:edit|automation:run|settings:edit",
  "target": "<영역/ssot/자동화 id 또는 경로>",
  "status": "ok|fail",          // 선택 — 실행성 이벤트(automation:run)만
  "summary": "사람이 읽을 한 줄 요약" }
```

- **`op` 은 `category:action`.** 카테고리: `area` · `ssot` · `schedule` · `automation` · `settings`. 뷰어가 색으로 구분.
- **append 만.** 기존 줄을 고치거나 지우지 않는다(기록이므로). 파일 맨 끝에 추가.
- 자동화 실행 이력도 여기로 통합됐다(과거 `automation.json` 의 `runs[]` 폐지). 자동화 상세의 "실행 이력" 은 `target == <자동화 id>` 로 필터해 보여준다.

## 규칙 (GLOBAL.md 강제)
레지스트리/ssot/일정/자동화를 바꾸면 **그 작업을 한 주체(보통 Claude Code)가** `logs/log.jsonl` 에 한 줄 남긴다.

## 키우기
커지면 월별로 쪼갠다: `2026-06.jsonl`, `2026-07.jsonl` … (그때 fetch 로직도 같이 손봄).
