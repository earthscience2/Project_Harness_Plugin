**Button** — the primary action control; use `variant="primary"` for the single main action per view, `secondary` for neutral actions, `ghost` for low-emphasis/toolbar actions, `danger` for destructive.

```jsx
<Button variant="primary" iconLeft={<PlayIcon/>}>Run suite</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost" size="sm">Filter</Button>
<Button variant="danger" loading>Deleting…</Button>
```

Variants: `primary | secondary | ghost | subtle | danger`. Sizes: `sm | md | lg`. Pass `loading` for an in-place spinner, `iconLeft`/`iconRight` for icons (16px line icons). One primary button per surface.
