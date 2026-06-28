/* App shell: fixed sidebar + topbar. */
const Icon = window.HNSIcon;

const NAV = [
  { key: 'dashboard', label: '대시보드', icon: 'dashboard' },
  { key: 'runs', label: '실행', icon: 'list', badge: '4' },
  { key: 'suites', label: '스위트', icon: 'flask' },
  { key: 'datasets', label: '데이터셋', icon: 'database' },
  { key: 'metrics', label: '메트릭', icon: 'gauge' },
];

const shellStyles = {
  root: { display: 'grid', gridTemplateColumns: 'var(--sidebar-w) 1fr', gridTemplateRows: 'var(--topbar-h) 1fr', height: '100vh', background: 'var(--bg-app)', color: 'var(--text-primary)' },
  sidebar: { gridRow: '1 / 3', borderRight: '1px solid var(--border-subtle)', background: 'var(--bg-canvas)', display: 'flex', flexDirection: 'column', minHeight: 0 },
  brand: { height: 'var(--topbar-h)', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 var(--space-5)', borderBottom: '1px solid var(--border-subtle)' },
  word: { fontWeight: 700, fontSize: '16px', letterSpacing: '-0.01em' },
  ops: { fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '11px', color: 'var(--accent-text)', background: 'var(--accent-soft)', padding: '2px 5px', borderRadius: 'var(--radius-sm)' },
  nav: { padding: 'var(--space-4) var(--space-3)', display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, overflowY: 'auto' },
  navLabel: { fontSize: 'var(--text-2xs)', fontWeight: 600, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-tertiary)', padding: '0 var(--space-3)', margin: 'var(--space-3) 0 var(--space-2)' },
  sideFoot: { padding: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)' },
  topbar: { gridColumn: 2, display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: '0 var(--space-6)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-canvas)' },
  title: { fontSize: 'var(--text-md)', fontWeight: 600 },
  spacer: { flex: 1 },
  search: { position: 'relative', width: '260px' },
  main: { gridColumn: 2, overflowY: 'auto', minHeight: 0, padding: 'var(--space-7) var(--space-8)' },
};

function NavItem({ item, active, onClick }) {
  const base = { display: 'flex', alignItems: 'center', gap: '10px', height: '36px', padding: '0 var(--space-3)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: 'var(--text-sm)', fontWeight: 500, color: active ? 'var(--text-primary)' : 'var(--text-secondary)', background: active ? 'var(--surface-2)' : 'transparent', transition: 'var(--transition-colors)' };
  return (
    <div style={base} onClick={onClick}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--surface-hover)'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
      <Icon name={item.icon} size={17} style={{ color: active ? 'var(--accent-text)' : 'var(--text-tertiary)' }} />
      <span style={{ flex: 1 }}>{item.label}</span>
      {item.badge && <span className="hns-tab__count">{item.badge}</span>}
    </div>
  );
}

function AppShell({ active, onNav, title, actions, children, accent, onCycleAccent, theme, onToggleTheme }) {
  const { IconButton } = window.HarnessOpsDesignSystem_019284;
  return (
    <div style={shellStyles.root}>
      <aside style={shellStyles.sidebar}>
        <div style={shellStyles.brand}>
          <img src="./assets/logo-mark.svg" width="26" height="26" alt="" />
          <span style={shellStyles.word}>Harness</span>
          <span style={shellStyles.ops}>ops</span>
        </div>
        <nav style={shellStyles.nav}>
          <div style={shellStyles.navLabel}>워크스페이스</div>
          {NAV.map((it) => <NavItem key={it.key} item={it} active={active === it.key} onClick={() => onNav(it.key)} />)}
          <div style={shellStyles.navLabel}>시스템</div>
          <NavItem item={{ key: 'settings', label: '설정', icon: 'settings' }} active={active === 'settings'} onClick={() => onNav('settings')} />
        </nav>
        <div style={shellStyles.sideFoot}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px var(--space-3)' }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}><Icon name="user" size={15} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>김하네스</div>
              <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)' }}>ML 플랫폼팀</div>
            </div>
          </div>
        </div>
      </aside>

      <header style={shellStyles.topbar}>
        <span style={shellStyles.title}>{title}</span>
        <div style={shellStyles.spacer} />
        <div className="hns-input-group" style={shellStyles.search}>
          <span className="hns-input-group__icon"><Icon name="search" size={15} /></span>
          <input className="hns-input hns-input--sm" placeholder="run id, suite 검색…" />
        </div>
        <IconButton label="액센트 변경" variant="ghost" onClick={onCycleAccent}><Icon name="zap" size={17} /></IconButton>
        <IconButton label="테마 전환" variant="ghost" onClick={onToggleTheme}><Icon name={theme === 'light' ? 'cpu' : 'gauge'} size={17} /></IconButton>
        <IconButton label="알림" variant="ghost"><Icon name="bell" size={17} /></IconButton>
        {actions}
      </header>

      <main style={shellStyles.main}>{children}</main>
    </div>
  );
}

window.HNSAppShell = AppShell;
