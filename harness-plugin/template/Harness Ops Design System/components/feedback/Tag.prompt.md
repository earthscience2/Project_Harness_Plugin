**Tag** — a removable token, ideal for active filter chips and dataset labels. Monospace by default.

```jsx
<Tag onRemove={() => removeFilter('model')}>model:gpt-4o</Tag>
<Tag>suite:nightly</Tag>
```

Omit `onRemove` for a static (non-removable) tag.
