# area-harness (Project Harness Plugin)

영역(Area) 중심 SSOT 하네스 — 코드를 **옮기지 않는** 오버레이 구조. 빈/기존
프로젝트를 영역·일정·자동화·로그로 관리하는 Claude Code 플러그인.

## 구조

```
.claude-plugin/marketplace.json   # 로컬 마켓플레이스 → ./harness-plugin
harness-plugin/                   # 플러그인 본체
  .claude-plugin/plugin.json      #   버전의 단일 진실 (semver)
  commands/                       #   /harness-init · adopt · area · status
  template/                       #   init 이 대상 repo 에 까는 골격 + check-registry.mjs
test/smoke.mjs                    # 프레임워크 없는 스모크 테스트
plan.md                           # 설계 문서
```

## 개발

플러그인은 `harness-plugin/commands/*.md`(슬래시 명령 동작)와
`harness-plugin/template/`(생성되는 골격) 두 부분이다. 둘 다 평범한 파일 —
빌드 단계 없음.

로컬에서 써보려면 이 repo 를 마켓플레이스로 추가:

```
/plugin marketplace add <이 repo 경로 또는 GitHub URL>
/plugin install area-harness
```

`template/` 나 `commands/` 를 고친 뒤에는 `/plugin` 새로고침(또는 재설치)하면
반영된다.

## 테스트

```
node test/smoke.mjs
```

검사 내용:
1. `plugin.json` name + semver, `marketplace.json` 의 항목·source 정합성
2. 4개 명령 파일 존재
3. `template/` 를 임시 디렉터리에 복사 → `/harness-init` 처럼 TODO 날짜를 채우고
   → `node check-registry.mjs` 가 **exit 0** (생성 골격이 자기정합적인지)

깨지면 `template/` 나 `check-registry.mjs` 가 망가진 것.

## 버전 / 릴리스

- 버전의 **단일 진실은 [harness-plugin/.claude-plugin/plugin.json](harness-plugin/.claude-plugin/plugin.json) 의 `version`**.
  `marketplace.json` 엔 버전 필드 없음 → 동기화할 곳 없음.
- semver: 버그픽스 `0.1.1` · 기능(template/command 변경) `0.2.0` · 안정화 `1.0.0`.
- 릴리스 = `plugin.json` 버전 올림 → `node test/smoke.mjs` 통과 → 커밋 → 태그(`git tag v0.x.y`) → push.
