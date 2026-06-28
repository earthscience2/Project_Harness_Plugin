# Harness Console — UI kit

An interactive, click-through recreation of the **Harness Ops** console (ML eval-harness operations). Open `index.html`.

## What's here
- **App shell** (`AppShell.jsx`) — fixed 248px sidebar (brand lockup, workspace nav, user), 56px topbar (page title, global search, accent/theme toggles, notifications, page action).
- **Dashboard** (`DashboardScreen.jsx`) — 4 KPI stats, 14-day pass-rate trend (CSS bar chart), active-runs list, recent-runs table, suite-level pass/fail/skip breakdown bars.
- **Runs** (`RunsScreen.jsx`) — the core data-table surface: filter tabs with counts, active filter chips, bulk-select toolbar, dense table (Run ID, suite, model, status, pass-rate bar, cases, latency, cost, time), and a **detail drawer** with run summary stats + case-level results.
- **Settings** — form components in context (Select, Input, Switch, Card footer actions).
- `icons.jsx` — inlined Lucide icons (self-contained, no CDN). `data.jsx` — mock runs & cases.

## Interactions
- Sidebar nav switches screens. Clicking a dashboard or runs row opens the **run detail drawer**.
- Topbar **⚡ accent toggle** cycles teal → blue → amber → violet (`data-accent`). The **theme toggle** flips dark ↔ light (`data-theme`).
- Runs: filter tabs, row checkboxes + select-all, removable filter chips, bulk-action bar when rows are selected.

## How it's built
Composes the design-system primitives from `window.HarnessOpsDesignSystem_019284` (loaded via `../../_ds_bundle.js`) over the global tokens (`../../styles.css`). Screens are plain `text/babel` scripts that register onto `window`; `index.html` wires them. This is a **cosmetic recreation** — data is mocked, no network.
