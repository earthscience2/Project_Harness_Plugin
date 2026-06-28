**Tabs** — section switcher with optional count chips. `underline` for page-level navigation, `enclosed` for segmented in-panel filters.

```jsx
<Tabs
  defaultValue="all"
  onChange={setTab}
  items={[
    { value: 'all', label: '전체', count: 1284 },
    { value: 'failed', label: '실패', count: 73 },
    { value: 'running', label: '실행 중', count: 4 },
  ]}
/>
<Tabs variant="enclosed" items={[{value:'table',label:'테이블'},{value:'chart',label:'차트'}]} />
```

Controlled (`value`+`onChange`) or uncontrolled (`defaultValue`).
