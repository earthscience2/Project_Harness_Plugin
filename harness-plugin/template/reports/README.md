# 보고서 (reports)

연구 보고서를 **HTML** 로 관리한다. 목록 페이지 `index.html` 이 `reports.json` 을 읽어 갤러리로 보여준다(정적, 백엔드 없음).

## 새 보고서 만들기
1. `_template.html` 복사 → `YYYY-MM-DD-제목.html` (예: `2026-06-28-baseline.html`). 디자인시스템 스타일을 그대로 쓴다.
2. 내용 작성(결과 표·차트·런 id 인용).
3. `reports.json` 의 `reports` 배열에 한 줄 추가:
```json
{ "id": "r1", "title": "베이스라인 분석", "date": "2026-06-28",
  "area": "experiments", "file": "2026-06-28-baseline.html", "summary": "..." }
```
- `file` 은 이 폴더 기준 상대경로. `area` 는 `registry.json` 영역 id.

## 보기
`index.html` 을 브라우저로 열거나, 마인드맵에서 `보고서` 영역 → NOTES 의 링크.

## 키우기
많아지면 연/주제별 하위 폴더로 나눈다(그때 `file` 경로만 맞추면 됨).
