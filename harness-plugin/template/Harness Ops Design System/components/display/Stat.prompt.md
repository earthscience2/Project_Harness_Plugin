**Stat** — a single KPI. Value renders in monospace tabular figures; the delta arrow color follows `trend`.

```jsx
<Stat label="통과율" value="94.2" unit="%" delta="+1.4%" trend="up" />
<Stat label="평균 지연" value="312" unit="ms" delta="-8ms" trend="down" />
<Stat label="총 케이스" value="1,284" />
```

Note: for accuracy/quality metrics "up" is good (green); for latency/cost metrics a downward trend is the good one — pick `trend` by meaning, not by sign.
