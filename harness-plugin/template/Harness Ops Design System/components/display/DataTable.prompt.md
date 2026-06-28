**DataTable** — the console's primary surface. Sticky header, hover rows, selectable rows, custom cell renderers.

```jsx
<DataTable
  columns={[
    { key: 'id', header: 'Run ID', mono: true },
    { key: 'suite', header: 'Suite', primary: true },
    { key: 'status', header: '상태', render: (v) => <StatusBadge status={v} /> },
    { key: 'pass', header: '통과율', align: 'right', mono: true },
  ]}
  rows={runs}
  getRowId={(r) => r.id}
  selectedId={selected}
  onRowClick={(r) => setSelected(r.id)}
/>
```

Right-aligned columns get tabular numerals. Use `render` to drop in StatusBadge / ProgressBar / Tag cells.
