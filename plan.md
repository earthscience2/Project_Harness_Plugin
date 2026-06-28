# 영역(Area) 중심 하네스 — 설계 plan

> 기존 `ssot/`(폴더=도메인, `MD`+`index.html` 짝, 중앙 `MINDMAP.md`) 구조를 버리고,
> **전역 영역에서 뻗어나가는 영역 그래프**로 재설계한다.
> 이번 문서가 정하는 것 3가지: ① 영역의 정의 ② 전역 영역 단일 md 의 내용 ③ 마인드맵 표현 방식.

참고만 함: `Project-Harness`, `seed`, `SMARTCS-Displacement_Detection`, `ssot-plugin`, 기존 `AGROUNDS/ssot`.
구조·개념은 본 문서에 충실하게 새로 만든다(폴더=도메인 모델은 폐기).

---

## 1. 기존 ssot 와 무엇이 다른가

| 항목 | 기존 ssot | 새 영역 하네스 |
|------|-----------|----------------|
| 단위 | 도메인 폴더(`ssot/api/` 등) | **영역(Area)** — 그래프 노드 |
| 진입점 | `README.md` 인덱스 | **전역 영역**(항상 참조, 마인드맵 루트) |
| 크기 제어 | 없음 (파일이 커지면 분리는 수동) | **영역당 1M 토큰 상한 → 초과 시 분열** |
| 중간 계층 | 없음 (모든 도메인이 평평) | **중간다리 영역**(연결만, 실내용 없음) |
| 공유 문서 | 도메인마다 별도 / 횡단 SSOT 개념 | **공유 ssot = 단일 파일을 여러 영역이 참조**(자동 동기화) |
| 시각화 | 정적 `MINDMAP.md`(mermaid) + 도메인별 `index.html` | **단일 웹페이지** 마인드맵, 셀 클릭 → 파일 목록 |

---

## 2. 영역(Area)의 정의

### 2.1 영역이란

**영역 = AI 한 작업 세션이 한 번에 다룰 수 있는, 토큰 상한이 걸린 지식/작업 단위.**
마인드맵의 한 셀(노드)이 하나의 영역이다. 모든 영역은 전역 영역에서 출발하는 경로로 연결된다.

### 2.2 영역의 3종류

| 종류 | 역할 | 내부에 든 것 | 마인드맵 표시 |
|------|------|--------------|---------------|
| **전역 영역** (global) | 마인드맵의 루트. 하네스 설명서·영역 구조·사용법. 모든 영역이 항상 참조 | **md 파일 1개** (`GLOBAL.md`) | 루트 노드, 항상 표시 |
| **중간다리 영역** (bridge) | 흐름상 이해를 돕는 연결 노드. 예: `백엔드` → 그 아래 `API` | **연결 정보 md 1개만** (자식 영역 목록). 실내용 없음 | 속 빈(hollow) 노드 |
| **말단 영역** (leaf) | 실제 내용이 들어가는 곳. 모든 진짜 작업은 여기서 | **ssot + 내용** 2파트 | 채워진 노드 + 토큰 게이지 |

> 규칙: **실 내용은 말단 영역에만** 존재한다. 전역·중간다리는 길잡이일 뿐.
> 예) `API` 영역은 전역에서 바로 잇지 않고 `백엔드`(중간다리)를 거쳐 만든다.

### 2.3 말단 영역 셀의 구성 — ssot + 내용

말단 영역 셀은 크게 2가지로 구성된다.

- **ssot**: 그 영역의 단일 진실 문서. **다른 영역에 복사되어 보일 수 있다**(§2.5).
- **내용(content)**: 그 영역에서만 쓰는 작업 문서·메모·산출물.

```
areas/backend/api/        # 말단 영역 폴더
  _area.md                # 영역 매니페스트(이름·역할·부모·토큰)
  ssot/                   # ssot 파트 (공유 가능)
  content/                # 내용 파트 (영역 전용)
```

중간다리 영역은 `_area.md` 한 개뿐:

```
areas/backend/            # 중간다리 영역 폴더
  _area.md                # "연결된 자식 영역: api, db" 만 기술
```

### 2.4 크기 규칙 — 1M 토큰 상한과 분열

- 각 영역(말단)의 ssot+내용 합계는 **1,000,000 토큰을 넘길 수 없다**.
- 넘어가면 **영역 정의를 더 세분화해서 분열**한다.
  - 예) `디자인 시스템` 영역이 너무 커지면 → 그 영역을 **중간다리로 승격**하고 아래에 `컴포넌트` · `색상` · `레이아웃` 말단 영역으로 분열.
- 분열은 곧 "큰 말단 영역 → 중간다리 영역 + 여러 작은 말단 영역" 변환이다.
- 토큰 추정은 대략값(문자수/4 근사)이면 충분. 80%(800k) 도달 시 마인드맵에서 경고색, 100% 초과 시 분열 권고.

> `ponytail: 토큰 카운트는 문자수/4 근사. 정확한 토크나이저는 임계가 자주 틀릴 때만 도입.`

### 2.5 공유 ssot 동기화 — "복사처럼 보이되 실파일은 1개"

같은 ssot 문서가 여러 영역에서 필요할 수 있다(예: `API` ssot 는 API 를 **만드는** 영역과 **수신하는**(클라이언트) 영역 양쪽에서 참조).

**구현은 복제+동기화 엔진이 아니라 "단일 파일 참조"로 한다.**

- 공유 ssot 는 정본(canonical) 파일이 **딱 하나** 존재한다(`_ssot/<id>.md`).
- 여러 영역은 레지스트리에서 그 `id` 를 가리킨다.
- 마인드맵/웹페이지에서는 각 영역 셀에 **그 문서가 복사되어 있는 것처럼 표시**되지만, 디스크에는 한 파일뿐.
- 따라서 한쪽에서 고치면 = 같은 파일을 고친 것 = **모든 영역에 자동 반영**(동기화 코드 0줄).
- 셀에는 "공유됨 · 다른 영역: client" 배지를 달아 복사 관계를 보여준다.

> `ponytail: 공유 ssot = N개 복사+watcher 가 아니라 1개 파일을 N개 영역이 참조. 물리 복제는 외부 배포가 진짜 필요할 때만 빌드 스텝으로.`

---

## 3. 디스크 구조 (전체)

```
harness/
  GLOBAL.md                 # 전역 영역 셀 = md 1개 (설명서+레지스트리). §4
  _ssot/                    # 공유 ssot 정본 풀 (여러 영역이 참조)
    api-contract.md
  areas/
    backend/                # 중간다리
      _area.md
      api/                  # 말단
        _area.md
        ssot/  content/
      db/                   # 말단
        _area.md
        ssot/  content/
    frontend/               # 중간다리
      _area.md
      client/               # 말단
      design/               # 디자인이 커져 중간다리로 분열됨
        _area.md
        components/  colors/  layout/   # 말단들
  web/
    index.html              # 마인드맵 웹페이지 (사이드바: 영역/일정/자동화/로그). §5
```

영역 트리의 **단일 진실은 `GLOBAL.md` 안의 레지스트리 블록**이다. 웹페이지·AI 모두 이것만 읽는다.

---

## 4. 전역 영역 단일 md — `GLOBAL.md`

전역 영역 셀에는 **md 파일 1개만** 둔다. 그 안에 다음을 모두 담는다.

**목차(이 1개 파일이 담는 것)**
1. frontmatter — 영역 메타
2. 본 하네스란 / 목적
3. 영역의 정의·3종류·규칙 (요약)
4. **영역 레지스트리** — 트리 + 토큰 + 공유 ssot (웹페이지가 파싱하는 단일 소스, JSON 블록)
5. 사람용 트리 뷰 (레지스트리에서 생성)
6. 사용법 — AI/사람이 이 하네스를 쓰는 법
7. 사이드바 구성 안내
8. 변경 이력

> 레지스트리는 **JSON 펜스 블록**으로 둔다 → 브라우저가 `JSON.parse` 로 바로 읽음(yaml 파서 의존성 0).
> 사람용 트리·마인드맵은 이 JSON 에서 **생성**되는 뷰일 뿐, 손으로 따로 관리하지 않는다(drift 방지).

### 4.1 `GLOBAL.md` 전체 내용 (복사해서 바로 사용)

````markdown
---
area: GLOBAL
role: global
version: 0.1.0
updated: 2026-06-28
---

# 전역 영역 — 영역 하네스 설명서

## 이 하네스는 무엇인가
프로젝트 지식을 **영역(Area)** 단위로 쪼개 관리하는 SSOT 하네스다.
각 영역은 AI 한 세션이 한 번에 소화할 수 있는 크기(≤ 1M 토큰)로 제한되며,
전역 영역(이 문서)에서 출발하는 그래프로 연결된다. 항상 이 문서부터 읽는다.

## 영역의 정의
- **전역 영역**: 마인드맵 루트. 설명서·구조·사용법(이 파일 하나).
- **중간다리 영역**: 연결만 하는 노드. `_area.md` 에 자식 목록만. 실내용 없음.
- **말단 영역**: 실내용이 있는 곳. `ssot/`(공유 가능) + `content/`(전용) 2파트.

## 영역 규칙
1. 말단 영역 ssot+내용 합계 ≤ **1,000,000 토큰**. 초과 시 **분열**.
   - 분열 = 큰 말단을 중간다리로 승격하고 아래에 더 작은 말단들로 나눔.
   - 예: `디자인` 비대 → 중간다리화 후 `컴포넌트`/`색상`/`레이아웃` 으로 분열.
2. **실 내용은 말단에만.** 전역·중간다리는 길잡이.
3. 흐름대로 잇는다: 전역 → (중간다리) → 말단. 예) `백엔드` 거쳐 `API`.
4. **공유 ssot 는 정본 1파일을 여러 영역이 참조.** 한 곳 수정 = 전부 반영.

## 영역 레지스트리 (단일 소스)
> 웹페이지·AI 가 읽는 진실. 영역 추가/분열/공유 변경 시 이 블록만 고친다.

```json
{
  "version": "0.1.0",
  "root": "global",
  "areas": [
    { "id": "global", "title": "전역 영역", "role": "global",
      "file": "GLOBAL.md", "children": ["backend", "frontend"] },

    { "id": "backend", "title": "백엔드", "role": "bridge",
      "parent": "global", "file": "areas/backend/_area.md",
      "children": ["api", "db"] },
    { "id": "api", "title": "API", "role": "leaf",
      "parent": "backend", "path": "areas/backend/api/",
      "token": { "budget": 1000000, "used": 120000 },
      "ssot": ["api-contract"], "content": ["API_NOTES.md"] },
    { "id": "db", "title": "DB", "role": "leaf",
      "parent": "backend", "path": "areas/backend/db/",
      "token": { "budget": 1000000, "used": 300000 },
      "ssot": ["db-schema"], "content": ["DB_NOTES.md"] },

    { "id": "frontend", "title": "프론트엔드", "role": "bridge",
      "parent": "global", "file": "areas/frontend/_area.md",
      "children": ["client", "design"] },
    { "id": "client", "title": "클라이언트", "role": "leaf",
      "parent": "frontend", "path": "areas/frontend/client/",
      "token": { "budget": 1000000, "used": 90000 },
      "ssot": ["api-contract"], "content": ["CLIENT_NOTES.md"] },
    { "id": "design", "title": "디자인 시스템", "role": "bridge",
      "parent": "frontend", "file": "areas/frontend/design/_area.md",
      "children": ["components", "colors", "layout"] },
    { "id": "components", "title": "컴포넌트", "role": "leaf",
      "parent": "design", "path": "areas/frontend/design/components/",
      "token": { "budget": 1000000, "used": 540000 },
      "ssot": ["component-spec"], "content": ["COMPONENTS.md"] },
    { "id": "colors", "title": "색상", "role": "leaf",
      "parent": "design", "path": "areas/frontend/design/colors/",
      "token": { "budget": 1000000, "used": 80000 },
      "ssot": ["color-tokens"], "content": ["COLORS.md"] },
    { "id": "layout", "title": "레이아웃", "role": "leaf",
      "parent": "design", "path": "areas/frontend/design/layout/",
      "token": { "budget": 1000000, "used": 60000 },
      "ssot": [], "content": ["LAYOUT.md"] }
  ],
  "shared_ssot": [
    { "id": "api-contract", "canonical": "_ssot/api-contract.md",
      "shown_in": ["api", "client"] },
    { "id": "db-schema", "canonical": "_ssot/db-schema.md", "shown_in": ["db"] },
    { "id": "component-spec", "canonical": "_ssot/component-spec.md", "shown_in": ["components"] },
    { "id": "color-tokens", "canonical": "_ssot/color-tokens.md", "shown_in": ["colors"] }
  ]
}
```

## 영역 트리 (사람용 · 레지스트리에서 생성)
```
전역 영역
├─ 백엔드 (중간다리)
│  ├─ API (말단)  ssot: api-contract*
│  └─ DB  (말단)  ssot: db-schema
└─ 프론트엔드 (중간다리)
   ├─ 클라이언트 (말단)  ssot: api-contract*   ← API 와 같은 문서 공유
   └─ 디자인 시스템 (중간다리, 분열됨)
      ├─ 컴포넌트 (말단)
      ├─ 색상 (말단)
      └─ 레이아웃 (말단)
( * = 여러 영역이 공유하는 ssot )
```

## 사용법
1. **항상 이 전역 영역부터** 읽고 레지스트리에서 작업할 말단 영역을 찾는다.
2. 흐름을 따라 내려간다: 전역 → 중간다리 → 말단. 중간다리는 길잡이일 뿐 내용 없음.
3. **편집은 말단 영역에서만.** ssot 는 `ssot/`, 작업물은 `content/`.
4. 공유 ssot(`shared_ssot`)를 고치면 정본 1파일을 고치는 것 → 참조하는 모든 영역에 반영됨. 영향 영역(`shown_in`)을 확인하고 고친다.
5. 말단이 1M 토큰에 근접하면 **분열**한다(중간다리 승격 + 하위 말단 생성). 레지스트리 갱신.

## 사이드바
- **영역**: 마인드맵(기본 화면). 셀 클릭 → 파일 목록.
- **일정**: 작업 일정/마일스톤. (추후)
- **자동화**: 정기 작업·동기화·토큰 점검 트리거. (추후)
- **로그**: 영역/ssot 변경 이력. (추후)

## 변경 이력
> 최근 5개만 유지.
- **v0.1.0** (2026-06-28) — 영역 하네스 최초 정의. 전역 영역·레지스트리·공유 ssot 규칙.
````

---

## 5. 마인드맵 웹페이지

`web/index.html` 한 개. `GLOBAL.md` 의 JSON 레지스트리 블록만 읽어 화면을 그린다.

### 5.1 레이아웃
- **왼쪽 사이드바**: `영역`(기본) · `일정` · `자동화` · `로그` 탭.
- **본문(영역 탭)**: 마인드맵. 루트 = **전역 영역**(항상 표시, 시작점).
- **오른쪽 패널**: 셀 클릭 시 그 영역의 파일 목록.

### 5.2 노드 표현
| 종류 | 모양 |
|------|------|
| 전역 | 가장 큰 루트 노드, 강조색 |
| 중간다리 | 속 빈(테두리만) 노드 — 내용 없음을 시각적으로 |
| 말단 | 채워진 노드 + **토큰 게이지 바**(used/1M). 80%↑ 주황, 100%↑ 빨강+분열 권고 |
| 공유 ssot 보유 말단 | "🔗 공유" 배지 |

엣지: 부모→자식 실선. 전역에서 모든 가지가 뻗는 트리.

### 5.3 상호작용
- **셀 클릭** → 오른쪽 패널에 그 영역 파일 목록:
  - 말단: `ssot/` 문서들(공유면 `shown_in` 영역 함께 표기) + `content/` 문서들. 각 파일 열기 링크.
  - 중간다리: `_area.md`(자식 목록)만.
  - 전역: `GLOBAL.md`.
- **공유 ssot 클릭** → 정본 1파일을 열고, "이 문서를 공유하는 영역: api, client" 표시. 어느 셀에서 열어도 같은 파일.
- 토큰 초과 셀 → "분열 권고" 안내.

### 5.4 기술 (lazy)
- 정적 `index.html` 1개 + 바닐라 JS. 빌드·프레임워크 없음.
- `fetch('../GLOBAL.md')` → ```json 펜스 블록만 잘라 `JSON.parse`.
- 트리 레이아웃: SVG 또는 위치 지정 `<div>` 로 직접 그림(노드 수 수십 개 규모라 충분). 기존 ssot `index.html` 다크 테마 변수 재사용.
- `일정`/`자동화`/`로그` 탭은 자리만 잡아두고 비워둔다(이번 범위 밖).

> `ponytail: 페이지 1장 + 바닐라 JS, JSON.parse 로 레지스트리 읽음. mermaid/그래프 라이브러리/프레임워크 없음 — 노드 수십 개엔 과함.`

---

## 6. 이번 plan 범위 / 다음 작업

**이 문서가 확정한 것**: 영역 정의(3종류·1M 규칙·분열·ssot+내용·공유 동기화), `GLOBAL.md` 단일 md 내용, 마인드맵 표현.

**다음에 만들 것** (이번 범위 밖):
- `GLOBAL.md` 실제 생성 + `areas/`·`_ssot/` 골격.
- `web/index.html` 마인드맵 구현.
- 토큰 추정 스크립트(문자수/4) + 80%/100% 경고.
- `일정`/`자동화`/`로그` 탭은 필요해질 때 채운다(YAGNI).

skipped: 복제+동기화 엔진(공유 ssot 는 단일 파일 참조로 충분), 정확 토크나이저, 프레임워크. → 임계가 실제로 틀리거나 외부 배포가 필요해지면 그때 추가.
