/* Runs: the core data-table management surface + detail drawer. */
const Icon = window.HNSIcon;

function RunDrawer({ run, onClose }) {
  const { StatusBadge, Stat, Button, IconButton, DataTable, Badge } = window.HarnessOpsDesignSystem_019284;
  const { CASES } = window.HNSData;
  if (!run) return null;
  return (
    <React.Fragment>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'var(--overlay-scrim)', zIndex: 40, animation: 'hns-fade 160ms ease' }} />
      <aside style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '480px', maxWidth: '92vw', background: 'var(--surface-1)', borderLeft: '1px solid var(--border-default)', boxShadow: 'var(--shadow-lg)', zIndex: 41, display: 'flex', flexDirection: 'column', animation: 'hns-slide 220ms var(--ease-out)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--border-subtle)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{run.id}</span>
          <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, flex: 1 }}>{run.suite}</span>
          <IconButton label="닫기" variant="ghost" onClick={onClose}><Icon name="x" size={18} /></IconButton>
        </div>

        <div style={{ padding: 'var(--space-5)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <StatusBadge status={run.status} />
            <Badge tone="neutral"><Icon name="cpu" size={12} style={{ marginRight: 4 }} />{run.model}</Badge>
            <Badge tone="neutral"><Icon name="gitBranch" size={12} style={{ marginRight: 4 }} />{run.branch}</Badge>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-5)', padding: 'var(--space-4)', background: 'var(--surface-2)', borderRadius: 'var(--radius-md)' }}>
            <Stat label="케이스" value={run.cases.toLocaleString()} />
            <Stat label="통과율" value={run.passRate == null ? '—' : run.passRate.toFixed(1)} unit={run.passRate == null ? '' : '%'} />
            <Stat label="평균 지연" value={run.latency} unit="ms" />
            <Stat label="비용" value={'$' + run.cost} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>케이스 결과</span>
              <Button variant="ghost" size="sm" iconLeft={<Icon name="download" size={14} />}>내보내기</Button>
            </div>
            <DataTable
              columns={[
                { key: 'id', header: 'ID', mono: true, width: '74px' },
                { key: 'name', header: '케이스', primary: true },
                { key: 'status', header: '', render: (v) => <StatusBadge status={v} /> },
                { key: 'score', header: '점수', align: 'right', mono: true, render: (v) => v == null ? '—' : v.toFixed(2) },
              ]}
              rows={CASES}
              getRowId={(r) => r.id}
            />
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', gap: 'var(--space-2)', padding: 'var(--space-4) var(--space-5)', borderTop: '1px solid var(--border-subtle)' }}>
          <Button variant="primary" iconLeft={<Icon name="refresh" size={15} />}>재실행</Button>
          <Button variant="secondary" iconLeft={<Icon name="fileText" size={15} />}>로그</Button>
          <div style={{ flex: 1 }} />
          <IconButton label="더보기" variant="ghost"><Icon name="more" size={18} /></IconButton>
        </div>
      </aside>
    </React.Fragment>
  );
}

function RunsScreen({ openRun, setOpenRun }) {
  const { Tabs, Button, IconButton, Tag, DataTable, StatusBadge, ProgressBar, Badge } = window.HarnessOpsDesignSystem_019284;
  const { RUNS, timeAgo } = window.HNSData;
  const [tab, setTab] = React.useState('all');
  const [selected, setSelected] = React.useState(() => new Set());
  const [filters, setFilters] = React.useState(['model:gpt-4o', 'env:staging']);

  const counts = {
    all: RUNS.length,
    failed: RUNS.filter(r => r.status === 'failed' || r.status === 'error').length,
    running: RUNS.filter(r => r.status === 'running' || r.status === 'queued').length,
    passed: RUNS.filter(r => r.status === 'passed').length,
  };
  const rows = RUNS.filter(r => {
    if (tab === 'failed') return r.status === 'failed' || r.status === 'error';
    if (tab === 'running') return r.status === 'running' || r.status === 'queued';
    if (tab === 'passed') return r.status === 'passed';
    return true;
  });

  const toggle = (id) => setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const allOn = rows.length > 0 && rows.every(r => selected.has(r.id));

  return (
    <div style={{ maxWidth: 'var(--container-max)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
        <Tabs value={tab} onChange={setTab} items={[
          { value: 'all', label: '전체', count: counts.all },
          { value: 'failed', label: '실패', count: counts.failed },
          { value: 'running', label: '진행', count: counts.running },
          { value: 'passed', label: '통과', count: counts.passed },
        ]} />
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="secondary" size="sm" iconLeft={<Icon name="filter" size={14} />}>필터</Button>
          <Button variant="primary" size="sm" iconLeft={<Icon name="play" size={14} />}>새 실행</Button>
        </div>
      </div>

      {(filters.length > 0 || selected.size > 0) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {selected.size > 0 && (
            <React.Fragment>
              <Badge tone="accent" pill>{selected.size} 선택됨</Badge>
              <Button variant="ghost" size="sm" iconLeft={<Icon name="refresh" size={14} />}>재실행</Button>
              <Button variant="ghost" size="sm" iconLeft={<Icon name="download" size={14} />}>내보내기</Button>
              <div style={{ width: 1, height: 20, background: 'var(--border-default)', margin: '0 4px' }} />
            </React.Fragment>
          )}
          {filters.map((f) => <Tag key={f} onRemove={() => setFilters(filters.filter(x => x !== f))}>{f}</Tag>)}
        </div>
      )}

      <div className="hns-table-wrap">
        <table className="hns-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}><input type="checkbox" checked={allOn} onChange={() => setSelected(allOn ? new Set() : new Set(rows.map(r => r.id)))} style={{ accentColor: 'var(--accent)' }} /></th>
              <th>Run ID</th><th>Suite</th><th>Model</th><th>상태</th>
              <th style={{ width: 150 }}>통과율</th>
              <th className="hns-th--num">케이스</th>
              <th className="hns-th--num">지연</th>
              <th className="hns-th--num">비용</th>
              <th className="hns-th--num">시각</th>
              <th style={{ width: 44 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className={selected.has(r.id) ? 'is-selected' : ''} style={{ cursor: 'pointer' }} onClick={() => setOpenRun(r)}>
                <td onClick={(e) => { e.stopPropagation(); }}>
                  <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggle(r.id)} style={{ accentColor: 'var(--accent)' }} />
                </td>
                <td className="hns-td--mono" style={{ color: 'var(--text-secondary)' }}>{r.id}</td>
                <td className="hns-table__primary">{r.suite}</td>
                <td className="hns-td--mono" style={{ fontSize: 'var(--text-xs)' }}>{r.model}</td>
                <td><StatusBadge status={r.status} /></td>
                <td>
                  {r.passRate == null
                    ? <span style={{ color: 'var(--text-tertiary)' }}>—</span>
                    : <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ProgressBar value={r.passRate} tone={r.passRate < 75 ? 'warning' : 'success'} style={{ width: 80 }} />
                        <span className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{r.passRate.toFixed(0)}%</span>
                      </div>}
                </td>
                <td className="hns-td--num hns-td--mono">{r.cases.toLocaleString()}</td>
                <td className="hns-td--num hns-td--mono">{r.latency}ms</td>
                <td className="hns-td--num hns-td--mono">${r.cost}</td>
                <td className="hns-td--num" style={{ color: 'var(--text-tertiary)' }}>{timeAgo(r.hoursAgo)}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <IconButton label="행 옵션" variant="ghost" size="sm"><Icon name="more" size={16} /></IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RunDrawer run={openRun} onClose={() => setOpenRun(null)} />
    </div>
  );
}

window.HNSRuns = RunsScreen;
