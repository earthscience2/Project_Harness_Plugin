**Input** — single-line text field; renders bare when no `label`/`hint`/`error`, otherwise wraps with a label block.

```jsx
<Input label="Suite 이름" placeholder="예: nightly-eval" required />
<Input label="Run ID" mono iconLeft={<HashIcon/>} hint="자동 생성됩니다" />
<Input label="Threshold" error="0–1 사이 값이어야 합니다" defaultValue="2" />
```

Use `mono` for identifiers/numbers. `error` overrides `hint` and reddens the border. Sizes `sm | md | lg`.
