# 보고서 (reports)

연구 보고서를 **HTML** 로 관리한다. 목록 페이지 `index.html` 이 `reports.json` 을 읽어 갤러리로 보여준다(정적, 백엔드 없음).

## 새 보고서 만들기
1. `_template.html` 복사 → `YYYY-MM-DD-제목.html` (예: `2026-06-28-baseline.html`). 디자인시스템 스타일을 그대로 쓴다.
2. 내용 작성(결과 표·차트·런 id 인용).
3. `reports.json` 의 `reports` 배열에 한 줄 추가:
```json
{ "id": "r1", "title": "베이스라인 분석", "date": "2026-06-28", "type": "benchmark",
  "area": "experiments", "file": "2026-06-28-baseline.html", "summary": "..." }
```
- `file` 은 이 폴더 기준 상대경로. `area` 는 `registry.json` 영역 id.
- `type` = 보고서 **형태**(보고서 탭에서 필터칩으로 거름): `ppt`(발표) · `doc`(문서) · `benchmark`(벤치마크) · `experiment`(실험) · `demo`(데모/시연). 없거나 모르는 값이면 **기타**로 분류.

## 디자인 시스템 (보고서 스타일)
보고서는 **항상 디자인 시스템을 따른다**:
1. **저장소에 자체 디자인 시스템이 있으면 그걸 쓴다.** 대상 repo 에서 토큰·스타일·브랜드를 먼저 찾는다 — `**/tokens/*.css`, `:root{--…}` 토큰, `tailwind.config.*`, `*/design-system/`, `.storybook/`, 브랜드 `theme.css`/로고. 있으면 그 변수·클래스·색·서체를 보고서에 링크해 맞춘다.
2. **없으면 번들 `Harness Ops Design System`.** `_template.html` 처럼 `<link rel="stylesheet" href="../Harness Ops Design System/styles.css">` 후 토큰으로: 색 `--accent`·`--surface-1/2/3`·`--border-default`·상태 `--success/warning/danger`·차트 `--viz-1…6`, 서체 `--font-sans`/`--font-mono`, 간격 `--space-*`, 라운드 `--radius-*`. 다크 기본 · `data-theme="light"` / `data-accent="blue|amber|violet"`.

## 형식 — HTML 이 정본
보고서 탭은 **HTML 을 iframe 으로 렌더**한다(백엔드 없음, md/pdf 는 안 됨). 따라서:
- `reports/` 의 **정본은 언제나 `.html`** (위 DS 적용).
- 작성 소스는 형태별로 md/ipynb 여도 되지만 **하네스가 보여주는 산출물은 .html**. `pptx`·`pdf` 는 **부가 export(첨부)** — `reports/exports/` 에 두고 HTML 에서 링크.
- 기본은 **도구 없이** `_template.html` 복사해 HTML 직접 작성. 아래 도구는 **이득 있을 때만**.

## 형태별 도구·형식·목적
| type | 목적 | 정본(하네스) | 추천 도구 | 소스 | 부가 export |
|------|------|------|-----------|------|------|
| `ppt` | 결론을 슬라이드로 발표 | `.html` (reveal.js 임베드) | **Marp**(md→html+pptx) · 인터랙션 필요시 reveal.js | `.md`/`.html` | `.pptx`·`.pdf` |
| `doc` | 스펙·상세 서술 | `.html` (DS) | 자체 HTML · 길면 **Quarto/Pandoc**(md→html) | `.md`/`.html` | `.pdf` |
| `benchmark` | 수치·비교(표+차트) | `.html` (DS `--viz-*`) | **Chart.js**(CDN) · 재현형 Vega-Lite, 데이터 `runs/runs.jsonl` | `.html`/`.qmd` | — |
| `experiment` | 가설→방법→결과→결론(코드+플롯) | `.html` | **Quarto** · 기존 노트북이면 Jupyter+nbconvert | `.qmd`/`.ipynb` | `.pdf` |
| `demo` | 동작 화면·영상 워크스루(동결 증거) | `.html` + 미디어 | `<video>/<img>` 임베드 · 터미널 **asciinema/VHS** · 자동캡처 **Playwright** | `.html`+`assets/` | `.mp4`/`.gif` |

> 한 도구로 통합하려면 **Quarto** 하나로 doc·benchmark·experiment(+reveal 로 ppt)까지 HTML 로 뽑는다. 단순하면 도구 없이 HTML 직접.

## 도구 카탈로그 (목적별 — 필요할 때 고른다)
- **슬라이드**: Marp(md→html/pptx/pdf, 단순·CLI 자동화) · reveal.js(순수 HTML, 인터랙션) · Slidev(md+Vue, 코드/차트 강함; pptx export 시 텍스트가 이미지화될 수 있음)
- **문서·통합**: Quarto(md·ipynb→html/slides/pdf/docx, 코드실행·인용) · Pandoc(만능 변환 백본)
- **차트**: Chart.js(경량 CDN) · Vega-Lite·Observable Plot(선언적·재현) · ECharts(고기능)
- **실험/노트북**: Jupyter+nbconvert · Quarto
- **데모·캡처**: asciinema·VHS(터미널 세션) · Playwright·Puppeteer(스크린샷·HTML→PDF/PNG)
- **PPTX 직접 생성**: PptxGenJS(JS) · python-pptx — *편집 가능한 진짜 .pptx* 가 요구될 때만
- **PDF**: WeasyPrint·wkhtmltopdf(HTML+CSS→PDF, DS 유지) · Typst(LaTeX 대안)
- **상용 AI**: Gamma·Canva(빠르고 예쁨, 비개발자용 — 자동화/자체 플러그인화엔 부적합)

## 보기
`index.html` 을 브라우저로 열거나, 마인드맵에서 `보고서` 영역 → NOTES 의 링크.

## 키우기
많아지면 연/주제별 하위 폴더로 나눈다(그때 `file` 경로만 맞추면 됨).
