**Card** — the standard panel surface. Two ways to use it:

```jsx
// shortcut header
<Card title="실행 요약" subtitle="최근 24시간" actions={<IconButton label="옵션"><MoreIcon/></IconButton>}>
  <Card.Body>…</Card.Body>
</Card>

// fully composed
<Card>
  <Card.Header>…</Card.Header>
  <Card.Body>…</Card.Body>
  <Card.Footer><Button variant="primary">저장</Button></Card.Footer>
</Card>
```

`inset` for nested wells, `interactive` for clickable cards.
