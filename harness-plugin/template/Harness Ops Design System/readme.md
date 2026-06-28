# Harness Ops — Design System

A dark-first, highly-legible design system for **Harness Ops**, an operations console for managing **ML evaluation & test harnesses** — pipelines that run eval suites against models, track pass/fail at the case level, and surface regressions. The aesthetic brief: *accurate, readable, calm — non-stimulating colors on a neutral-grey dark canvas.*

> **Sources.** This system was built **from scratch** — no codebase, Figma, or brand assets were provided. "Harness" here means an **ML eval/test harness** (per the brief). If you have an existing product, brand, or screenshots, share them and this system will be re-grounded against the real thing.

---

## 1. Product context

Harness Ops is a back-office, data-dense web console. The two primary surfaces (confirmed with the user) are:

- **Dashboard** — at-a-glance health: pass-rate KPIs & trend, active runs, suite-level breakdown.
- **Runs data table** — the workhorse: list/filter/select runs, drill into a run's case-level results via a detail drawer.

Secondary surfaces (Suites, Datasets, Metrics, Settings) share the same shell. The audience is internal ML/platform engineers, so the UI favors **information density, scannability, and tabular precision** over marketing polish.

---

## 2. Content fundamentals

How copy is written in this product:

- **Language:** Korean-first UI. Labels are short noun phrases — `실행`, `스위트`, `통과율`, `재실행`. Buttons are verbs/short imperatives — `새 실행`, `내보내기`, `저장`.
- **Tone:** neutral, technical, calm. No exclamation, no marketing voice, no cheerleading. State facts ("실패 (3)", "방금", "4 대기").
- **Person:** the system addresses the operator implicitly; avoid "당신/you". Prefer object-labels over sentences.
- **Casing:** Korean has no case; **Latin identifiers stay lowercase** and monospace — `gpt-4o`, `r-8842`, `eval/safety`. Acronyms uppercase — `RAG`, `ID`, `ms`.
- **Numbers:** always tabular monospace, with units adjacent — `94.2%`, `312ms`, `$48.10`, `1,284`. Thousands separators on counts.
- **Time:** relative and terse — `방금`, `12분 전`, `3시간 전`, `2일 전`.
- **Emoji:** **none.** Status is carried by color + a small dot, never emoji. Icons are line-drawn (Lucide), never pictographic.
- **Empty/placeholder copy:** honest and plain — "이 화면은 이 데모에 포함되지 않았습니다."

Example microcopy in context: a failed run row reads `r-8839 · safety-redteam · 실패 · 71.0% · 2시간 전`. Concise, scannable, no adjectives.

---

## 3. Visual foundations

**Overall vibe.** Quiet, instrument-panel calm. Think a well-designed observability tool at night: deep neutral greys, one restrained accent, color reserved almost entirely for *status meaning*. Nothing glows or pulses except a live "running" indicator.

- **Color & temperature.** Foundation is a **hueless neutral grey ramp** (no blue/warm tint) — `--n-0 #09090a` … `--n-1000 #fff`. Surfaces step up in lightness (`--bg-app` → `--bg-canvas` → `--surface-1/2/3`) rather than relying on shadow. The **accent is a desaturated teal** (`#45a08c`) — calm, technical, legible on dark. Three alternate accents ship (blue/amber/violet) via `[data-accent]`. Imagery, if any, should be cool and low-saturation; avoid warm or vivid photography.
- **Status colors** are deliberately **muted, never neon**: success `#5d9e72`, warning `#c79a4e`, danger `#c96a6a`, info `#5f8bc4`. Each has a `-soft` (≈14% alpha tint) for badge fills and a `-text` (lifted) for legible text on dark.
- **Type.** **Pretendard** for all Hangul/UI text; **JetBrains Mono** for every number, identifier, and code token (run IDs, scores, latency, cost). Tabular figures (`font-feature-settings: "tnum"`) are on by default for numerics so columns align. Generous scale (14px UI base, roomy line-height 1.55) per the "여유로운" density choice.
- **Spacing & layout.** 4px base grid. Fixed app chrome: 248px sidebar, 56px topbar, both `position`-stable while the main pane scrolls. Roomy row height (44px) for tables. Max content width 1440px.
- **Backgrounds.** Flat neutral fills only — **no gradients**, no textures, no patterns, no full-bleed hero imagery. Depth comes from surface-lightness steps + hairline borders + a hint of inset top-highlight (`--edge-highlight`).
- **Borders.** Hairline (1px) in three tiers: `--border-subtle` (row dividers), `--border-default` (inputs/cards), `--border-strong` (hover/emphasis). Borders do more work than shadows on dark.
- **Shadows / elevation.** Restrained. `--shadow-sm/md/lg` are soft black, low-alpha; reserved for cards, popovers, and the detail drawer. No colored glows.
- **Corner radii.** Soft but not pill-y for containers: inputs/buttons `--radius-md (7px)`, cards `--radius-lg (10px)`, badges `--radius-sm (5px)`. Pills only for status counts and toggles.
- **Cards.** `--surface-1` fill, 1px `--border-subtle`, `--radius-lg`, `--shadow-sm` + inset top-highlight. Header/body/footer split by hairlines. `inset` variant (surface-2, no shadow) for nested wells.
- **Animation.** Functional and quick — `120–280ms`, standard/`ease-out` curves. **No bounce.** Only motion: drawer slide-in (220ms), scrim fade (160ms), progress-fill width, and the single "running" status dot pulse. All respect `prefers-reduced-motion`.
- **Hover states.** Subtle: ghost controls get a `--surface-hover` (4% white) wash; rows tint with `--surface-hover`; primary buttons lighten to `--accent-hover`. **Press states** darken (`--accent-active`) — no shrink/scale.
- **Transparency & blur.** Used sparingly — only the modal scrim (`--overlay-scrim`) and the `-soft` status tints use alpha. No glassmorphism/backdrop-blur.
- **Selection.** Selected rows tint with `--surface-sel` (10% accent). Text selection uses `--accent-soft-hover`.

---

## 4. Iconography

- **Set:** [**Lucide**](https://lucide.dev) (MIT) — line icons, **1.75 stroke**, drawn on a 24px grid, rendered at 16/17/18px in UI. This is a **substitution** chosen for a from-scratch brand: clean, neutral, technical, and freely licensable. If you adopt a different icon set, swap it here and in `ui_kits/harness-console/icons.jsx`.
- **Usage:** icons are monochrome, inherit `currentColor`, and sit at `--text-tertiary`/`--text-secondary` by default; active nav icons take `--accent-text`. Icons accompany labels; they rarely stand alone except in `IconButton` (which always carries an `aria-label`).
- **In the foundation cards** (`guidelines/iconography.card.html`) Lucide is loaded from CDN for the specimen. **In the UI kit** the needed icons are **inlined** as SVG path data (`icons.jsx`) so the kit is self-contained — no runtime CDN dependency.
- **Emoji / unicode glyphs:** never used as icons.
- **Logo:** a minimal geometric **node-graph mark** (`assets/logo-mark.svg`) evoking a harness/pipeline, paired with a `Harness` wordmark (Pretendard 700) + `ops` mono tag. See `guidelines/brand-logo.card.html`.

---

## 5. Index / manifest

**Foundations**
- `styles.css` — the single entry point consumers link (an `@import` manifest only).
- `tokens/colors.css` — neutral ramp, dark surfaces, accent (+ 3 variants), status, viz, **light mode**.
- `tokens/typography.css` — families, scale, weights, leading, tracking, numeric helpers.
- `tokens/spacing.css` — 4px spacing scale, radii, control heights, layout sizes.
- `tokens/elevation.css` — shadows + focus rings (dark & light).
- `tokens/motion.css` — durations, easings, reduced-motion.
- `tokens/base.css` — reset + app defaults + scrollbars.
- `tokens/components.css` — class-based component styles (shipped with the bundle).
- `tokens/fonts.css` — `@font-face` (Pretendard + JetBrains Mono, **CDN**, see caveat).

**Components** (`components/<group>/`) — React primitives, namespace `window.HarnessOpsDesignSystem_019284`:
- `forms/` — Button, IconButton, Input, Select, Checkbox, Radio, Switch
- `feedback/` — Badge, StatusBadge, Tag, Spinner
- `display/` — Card, Stat, ProgressBar, DataTable
- `navigation/` — Tabs

**UI kit** (`ui_kits/harness-console/`) — interactive console: `index.html` (app shell + nav + accent/theme toggles), `DashboardScreen`, `RunsScreen` (+ detail drawer), Settings, `icons.jsx`, `data.jsx`. See its `README.md`.

**Specimen cards** (`guidelines/*.card.html`) — populate the Design System tab: Colors, Type, Spacing, Brand groups.

**Other**
- `assets/logo-mark.svg` — brand mark.
- `SKILL.md` — Agent-Skill manifest for downloadable use.

---

## Caveats

- **Fonts load from CDN** (jsDelivr): Pretendard + JetBrains Mono via `@font-face`. For a fully offline/production system, download the woff2 binaries into `tokens/` and re-point the `src` URLs. Flag if you want this done.
- **Lucide is a substituted icon set** (no brand icon set was provided).
- The brand **logo/wordmark is original** (no logo was provided) — replace if you have one.
