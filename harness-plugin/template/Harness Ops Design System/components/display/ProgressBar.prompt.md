**ProgressBar** — linear progress. Single value, or `segments` for a stacked pass/fail/skip distribution bar.

```jsx
<ProgressBar value={72} tone="success" />
<ProgressBar segments={[
  { value: 84, color: 'var(--success)' },
  { value: 11, color: 'var(--danger)' },
  { value: 5,  color: 'var(--neutral-status)' },
]} />
```

Segment widths are percentages and should sum to ~100.
