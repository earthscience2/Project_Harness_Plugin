**Select** — styled native dropdown; pass `options` (strings or `{label,value}`) or `<option>` children.

```jsx
<Select label="Model" options={['gpt-4o','claude-3.7','llama-3.1']} />
<Select label="상태" options={[{label:'전체',value:'all'},{label:'실패만',value:'failed'}]} />
```

Native `<select>` under the hood — keyboard & a11y come free. Sizes `sm | md | lg`.
