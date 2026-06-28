# 자동화 (automation)

Claude Code 가 유지하는 자동화 정의. 웹 「자동화」 탭이 `automation.json` 을 **읽기 전용**으로 본다
(켜기/끄기·실행은 Claude Code 가 파일과 실제 매핑을 바꾼다 — 정적 페이지는 토글 못 함).

## automation.json
```json
{ "automations": [
  {
    "id": "au1",
    "type": "cron | trigger | action",
    "engine": "ai | code",
    "title": "...",
    "area": "<area id | null>",
    "prompt": "...",                 // engine=ai
    "run": "python scripts/x.py",    // engine=code (경로는 automation/ 기준)
    "model": "claude-opus-4-8",      // engine=ai
    "schedule": "0 9 * * 1 | null",  // cron 식
    "when": "ssot:<id> changed | null", // trigger 조건
    "enabled": true,
    "binding": { ... }               // 실제 Claude Code 매핑 (아래)
  }
]}
```
> 실행 이력은 `automation.json` 에 두지 않는다 → `logs/log.jsonl` 에 `op:"automation:run", target:"<id>"` 로 남긴다.
> 상세 패널의 "실행 이력" 은 로그를 그 id 로 필터해 보여준다.

## binding — 자동화 ↔ Claude Code 매핑
정의(`type`)를 실제로 무엇이 돌리는지. **Claude Code 가 활성화할 때** 실제 cron/hook 을 만들고 `ref` 에 그 id 를 적는다(없으면 `null` = 아직 미연결).

| type | binding.kind | 실체 (Claude Code) | 필드 |
|------|--------------|-------------------|------|
| `cron` | `cron` | 예약 에이전트(크론 스케줄) | `ref`(예약 id) |
| `trigger` | `hook` | settings.json 훅(파일/툴 이벤트) | `event`·`matcher`·`ref` |
| `action` | `manual` | 사람/슬래시 요청으로 1회 | — |

> 정적 페이지는 cron/hook 을 만들 수 없다. **활성화·실행·연결은 Claude Code 에게 요청**하면, Claude 가 매핑을 만들고 `binding.ref` 와 `logs/log.jsonl` 을 갱신한다.

## scripts/
`engine: "code"` 자동화가 돌리는 실제 스크립트. `run` 경로는 이 폴더 기준.
