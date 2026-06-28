---
name: harness-ops-design
description: Use this skill to generate well-branded interfaces and assets for Harness Ops — a dark, neutral-grey, highly-legible design system for ML evaluation/test-harness operations consoles (dashboards, data tables, run management). Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping or production.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `styles.css` — the single global entry point (link this; it `@import`s all tokens, fonts, and component styles).
- `tokens/` — colors (neutral ramp, dark surfaces, teal accent + blue/amber/violet variants, light mode, status, viz), typography (Pretendard + JetBrains Mono), spacing, radii, elevation, motion.
- `components/<group>/` — React primitives (Button, IconButton, Input, Select, Checkbox, Radio, Switch, Badge, StatusBadge, Tag, Spinner, Card, Stat, ProgressBar, DataTable, Tabs). Each has a `.prompt.md` with usage.
- `ui_kits/harness-console/` — a full interactive console (dashboard + runs table + detail drawer) showing the components composed in context.
- `guidelines/*.card.html` — visual specimens for colors, type, spacing, brand.
- `assets/logo-mark.svg` — the brand mark.

## House rules (summary — see readme.md §3)
- Dark-first, **neutral-grey** foundation; **one calm desaturated-teal accent**; color reserved for status meaning.
- **Muted, non-neon** status colors; status = colored dot + label, **never emoji**.
- Pretendard for Hangul/UI; **JetBrains Mono + tabular figures** for every number/identifier.
- Flat fills — **no gradients, textures, or glows**. Depth from surface-lightness steps + hairline borders.
- Quick, **bounce-free** motion (120–280ms); only the live "running" dot pulses.
- Korean-first, terse, technical copy. Latin identifiers stay lowercase mono.
