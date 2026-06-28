/* Dashboard: KPIs, trend, active runs, suite breakdown. */
const Icon = window.HNSIcon;

function DashboardScreen({ onOpenRun }) {
  const { Card, Stat, ProgressBar, StatusBadge, Badge, Button, DataTable } = window.HarnessOpsDesignSystem_019284;
  const { RUNS, timeAgo } = window.HNSData;
  const recent = RUNS.slice(0, 6);
  const active = RUNS.filter(r => r.status === 'running' || r.status === 'queued').slice(0, 3);

  // 14-day pass-rate trend (mock)
  const trend = [88, 90, 87, 91, 93, 92, 94, 91, 95, 93, 96, 94, 95, 94.2];
  const maxT = 100, minT = 80;

  const suiteBreak = [
    { name: 'reasoning-v3', pass: 96, fail: 3, skip: 1 },
    { name: 'rag-grounding', pass: 88, fail: 9, skip: 3 },
    { name: 'safety-redteam', pass: 71, fail: 26, skip: 3 },
    { name: 'multilingual-ko', pass: 84, fail: 12, skip: 4 },
    { name: 'tool-use', pass: 92, fail: 6, skip: 2 },
  ];

  const grid = { display: 'grid', gap: 'var(--space-5)' };

  return (
    <div style={{ ...grid, maxWidth: 'var(--container-max)' }}>
      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-5)' }}>
        <Card><Card.Body><Stat label="전체 통과율" value="94.2" unit="%" delta="+1.4%" trend="up" /></Card.Body></Card>
        <Card><Card.Body><Stat label="활성 실행" value="4" delta="2 대기" trend="flat" /></Card.Body></Card>
        <Card><Card.Body><Stat label="평균 지연" value="312" unit="ms" delta="-8ms" trend="down" /></Card.Body></Card>
        <Card><Card.Body><Stat label="24h 비용" value="$48.10" delta="+$3.2" trend="up" /></Card.Body></Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 'var(--space-5)', alignItems: 'start' }}>
        {/* Trend chart */}
        <Card title="통과율 추세" subtitle="최근 14일" actions={<Badge tone="success" variant="soft">+1.4%</Badge>}>
          <Card.Body>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '150px', padding: '0 2px' }}>
              {trend.map((v, i) => {
                const h = ((v - minT) / (maxT - minT)) * 100;
                const last = i === trend.length - 1;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                    <div title={v + '%'} style={{ height: h + '%', background: last ? 'var(--accent)' : 'var(--accent-soft)', borderRadius: 'var(--radius-xs) var(--radius-xs) 0 0', minHeight: '4px', transition: 'height var(--duration-slow) var(--ease-out)' }} />
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
              <span>14일 전</span><span>오늘 94.2%</span>
            </div>
          </Card.Body>
        </Card>

        {/* Active runs */}
        <Card title="활성 실행" actions={<Button variant="ghost" size="sm">전체 보기</Button>}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {active.map((r) => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: 'var(--space-3) var(--space-5)', borderTop: '1px solid var(--border-subtle)' }}>
                <Icon name="flask" size={16} style={{ color: 'var(--text-tertiary)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{r.suite}</div>
                  <div style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{r.id} · {r.model}</div>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 'var(--space-5)', alignItems: 'start' }}>
        {/* Recent runs table */}
        <Card title="최근 실행" actions={<Button variant="secondary" size="sm" iconLeft={<Icon name="external" size={14} />}>실행 목록</Button>}>
          <DataTable
            columns={[
              { key: 'id', header: 'Run ID', mono: true },
              { key: 'suite', header: 'Suite', primary: true },
              { key: 'status', header: '상태', render: (v) => <StatusBadge status={v} /> },
              { key: 'passRate', header: '통과율', align: 'right', mono: true, render: (v) => v == null ? '—' : v.toFixed(1) + '%' },
              { key: 'hoursAgo', header: '시각', align: 'right', render: (v) => <span style={{ color: 'var(--text-tertiary)' }}>{timeAgo(v)}</span> },
            ]}
            rows={recent}
            getRowId={(r) => r.id}
            onRowClick={(r) => onOpenRun && onOpenRun(r)}
            style={{ border: 'none', borderRadius: 0 }}
          />
        </Card>

        {/* Suite breakdown */}
        <Card title="스위트별 통과율">
          <Card.Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {suiteBreak.map((s) => (
                <div key={s.name} style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{s.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: s.pass < 80 ? 'var(--warning-text)' : 'var(--text-primary)' }}>{s.pass}%</span>
                  </div>
                  <ProgressBar segments={[
                    { value: s.pass, color: 'var(--success)' },
                    { value: s.fail, color: 'var(--danger)' },
                    { value: s.skip, color: 'var(--neutral-status)' },
                  ]} />
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

window.HNSDashboard = DashboardScreen;
