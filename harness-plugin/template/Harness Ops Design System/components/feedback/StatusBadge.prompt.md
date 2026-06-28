**StatusBadge** — the canonical run/eval state indicator. Dot color + label encode the state; `running` pulses gently.

```jsx
<StatusBadge status="passed" />
<StatusBadge status="running" />
<StatusBadge status="failed" label="실패 (3)" />
```

States: `passed | failed | error | running | queued | skipped`. Default labels are Korean; override with `label`. Use this for lifecycle states; use **Badge** for everything else.
