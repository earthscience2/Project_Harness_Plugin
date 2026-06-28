# 자동화 (automation)

Claude Code 가 유지하는 자동화 정의. 웹이 `automation.json` 을 **읽기 전용**으로 본다
(켜기/끄기·실행은 Claude Code 가 파일과 실제 매핑을 바꾼다 — 정적 페이지는 토글 못 함).

**탭은 `engine`(런타임)으로 갈린다:**
- `engine:"api"` → **「자동화」 탭** — 외부 API 키로 도는 작업(직접 API 호출·스크립트).
- `engine:"claude-code"` → **「Claude Code」 탭** — Claude Code 에이전트로 도는 작업(/loop·훅·예약·스킬).

각 탭 안에서는 `type`(루프·크론·트리거·액션)으로 그룹핑한다. 프롬프트냐 스크립트냐는 `run` 필드 유무로 결정(있으면 스크립트, 없으면 `prompt`+`model`).

### 무엇으로 실행되나 (카드에 표시)
각 자동화 카드·상세에 **실행 주체**가 칩으로 뜬다:
- **LLM 자동화**(`prompt`+`model`) → **모델명** 표시. 제공자별 색: `gpt-*`(OpenAI) · `claude-*`(Anthropic) · `gemini-*`(Google).
  - `engine:"claude-code"` → **Claude Code 구독**으로 실행(`ANTHROPIC_API_KEY` 불필요).
  - `engine:"api"` → **설정 탭의 API 키**로 실행(예: `gpt-4o-mini` = `OPENAI_API_KEY`, `claude-*` = `ANTHROPIC_API_KEY`).
- **스크립트 자동화**(`run`) → `python/node 스크립트` 표시. `engine:"api"` 면 그 스크립트가 **서비스 키**(Kaggle/W&B/Telegram 등)로 외부 API 를 호출.

> 즉 **「자동화」(api) 탭 = 설정 탭의 키로 동작**한다 — LLM 키(OpenAI·Anthropic)거나 서비스 키(Telegram·Kaggle·W&B). 어떤 모델/키를 쓰는지는 카드의 모델 칩과 상세의 「모델·실행」 줄에서 확인.

## automation.json
```json
{ "automations": [
  {
    "id": "au1",
    "type": "loop | cron | trigger | action",
    "engine": "claude-code | api",   // 탭/런타임 (생략=claude-code)
    "title": "...",
    "area": "<area id | null>",
    "prompt": "...",                 // run 없을 때 (프롬프트)
    "model": "claude-opus-4-8",      // 프롬프트일 때
    "run": "python scripts/x.py",    // 스크립트일 때 (경로는 automation/ 기준)
    "schedule": "0 9 * * 1 | null",  // cron 식
    "cadence": "5m | null",          // loop: /loop 주기 (생략=자기조절)
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
| `loop` | `loop` | `/loop` 반복 실행(세션 내) | `cadence`·`ref` |
| `cron` | `cron` | 예약 에이전트(크론 스케줄) | `ref`(예약 id) |
| `trigger` | `hook` | settings.json 훅(파일/툴 이벤트) | `event`·`matcher`·`ref` |
| `action` | `manual` | 사람/슬래시 요청으로 1회 | — |

> 정적 페이지는 cron/hook 을 만들 수 없다. **활성화·실행·연결은 Claude Code 에게 요청**하면, Claude 가 매핑을 만들고 `binding.ref` 와 `logs/log.jsonl` 을 갱신한다.

## scripts/ — 실행 + 테스트
`run` 이 가리키는 실제 스크립트(`automation/scripts/` 에 모은다). **크론·트리거·액션을 만들 때는 그 `run` 스크립트도 반드시 같이 만든다** — 그래야 웹의 「테스트」 버튼이 실제로 작동한다.

웹 상세 패널 버튼:
- **액션** → `[실행] [테스트]` (끄기 없음 — 액션은 수동 실행이 본분)
- **크론·트리거·루프** → `[끄기/켜기] [테스트]` (테스트 = 조건/스케줄 무시하고 액션 1회 발사)

`serve.py` 가 떠 있으면 버튼 클릭 = **실제 실행**(POST `/__run`). 스크립트는 다음을 지킨다:
- `automation.env` 의 키를 환경변수로 받음(서버가 주입). 출력은 UTF-8.
- **`HARNESS_TEST=1`**(테스트 모드)일 때 **안전 동작**: 알림은 `[테스트]` 접두사, 제출 등 위험 작업은 **dry-run**. (예: `kaggle_submit.py` 는 `--confirm` + 비테스트일 때만 실제 제출.)
- 프롬프트(LLM) 자동화는 `run` 이 없어 서버가 못 돌린다 → Claude Code/에이전트가 실행.
