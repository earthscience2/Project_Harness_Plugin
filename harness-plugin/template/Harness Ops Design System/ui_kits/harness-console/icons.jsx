/* Lucide-style line icons (MIT, stroke 1.75) used across the Harness Console kit. */
const _p = (...children) => children;
const ICONS = {
  dashboard: _p(<rect x="3" y="3" width="7" height="9" rx="1"/>, <rect x="14" y="3" width="7" height="5" rx="1"/>, <rect x="14" y="12" width="7" height="9" rx="1"/>, <rect x="3" y="16" width="7" height="5" rx="1"/>),
  list: _p(<line x1="8" y1="6" x2="21" y2="6"/>, <line x1="8" y1="12" x2="21" y2="12"/>, <line x1="8" y1="18" x2="21" y2="18"/>, <line x1="3" y1="6" x2="3.01" y2="6"/>, <line x1="3" y1="12" x2="3.01" y2="12"/>, <line x1="3" y1="18" x2="3.01" y2="18"/>),
  flask: _p(<path d="M10 2v7.31"/>, <path d="M14 9.3V2"/>, <path d="M8.5 2h7"/>, <path d="M14 9.3a6.5 6.5 0 1 1-4 0"/>, <path d="M5.58 16.5h12.85"/>),
  database: _p(<ellipse cx="12" cy="5" rx="9" ry="3"/>, <path d="M3 5v14a9 3 0 0 0 18 0V5"/>, <path d="M3 12a9 3 0 0 0 18 0"/>),
  gauge: _p(<path d="m12 14 4-4"/>, <path d="M3.34 19a10 10 0 1 1 17.32 0"/>),
  settings: _p(<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>, <circle cx="12" cy="12" r="3"/>),
  play: _p(<polygon points="6 3 20 12 6 21 6 3"/>),
  square: _p(<rect x="5" y="5" width="14" height="14" rx="2"/>),
  refresh: _p(<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>, <path d="M21 3v5h-5"/>, <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>, <path d="M3 21v-5h5"/>),
  plus: _p(<path d="M5 12h14"/>, <path d="M12 5v14"/>),
  search: _p(<circle cx="11" cy="11" r="8"/>, <path d="m21 21-4.3-4.3"/>),
  filter: _p(<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>),
  sliders: _p(<line x1="4" y1="21" x2="4" y2="14"/>, <line x1="4" y1="10" x2="4" y2="3"/>, <line x1="12" y1="21" x2="12" y2="12"/>, <line x1="12" y1="8" x2="12" y2="3"/>, <line x1="20" y1="21" x2="20" y2="16"/>, <line x1="20" y1="12" x2="20" y2="3"/>, <line x1="1" y1="14" x2="7" y2="14"/>, <line x1="9" y1="8" x2="15" y2="8"/>, <line x1="17" y1="16" x2="23" y2="16"/>),
  check: _p(<polyline points="20 6 9 17 4 12"/>),
  x: _p(<path d="M18 6 6 18"/>, <path d="m6 6 12 12"/>),
  chevronDown: _p(<path d="m6 9 6 6 6-6"/>),
  chevronRight: _p(<path d="m9 18 6-6-6-6"/>),
  circleCheck: _p(<circle cx="12" cy="12" r="10"/>, <path d="m9 12 2 2 4-4"/>),
  circleX: _p(<circle cx="12" cy="12" r="10"/>, <path d="m15 9-6 6"/>, <path d="m9 9 6 6"/>),
  alert: _p(<circle cx="12" cy="12" r="10"/>, <line x1="12" y1="8" x2="12" y2="12"/>, <line x1="12" y1="16" x2="12.01" y2="16"/>),
  clock: _p(<circle cx="12" cy="12" r="10"/>, <polyline points="12 6 12 12 16 14"/>),
  gitBranch: _p(<line x1="6" y1="3" x2="6" y2="15"/>, <circle cx="18" cy="6" r="3"/>, <circle cx="6" cy="18" r="3"/>, <path d="M18 9a9 9 0 0 1-9 9"/>),
  fileText: _p(<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>, <path d="M14 2v5h5"/>, <line x1="8" y1="13" x2="16" y2="13"/>, <line x1="8" y1="17" x2="13" y2="17"/>),
  bell: _p(<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>, <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>),
  more: _p(<circle cx="12" cy="12" r="1.4"/>, <circle cx="19" cy="12" r="1.4"/>, <circle cx="5" cy="12" r="1.4"/>),
  download: _p(<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>, <polyline points="7 10 12 15 17 10"/>, <line x1="12" y1="15" x2="12" y2="3"/>),
  copy: _p(<rect x="9" y="9" width="13" height="13" rx="2"/>, <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>),
  external: _p(<path d="M15 3h6v6"/>, <path d="M10 14 21 3"/>, <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>),
  trash: _p(<path d="M3 6h18"/>, <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>),
  user: _p(<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>, <circle cx="12" cy="7" r="4"/>),
  panelLeft: _p(<rect x="3" y="3" width="18" height="18" rx="2"/>, <line x1="9" y1="3" x2="9" y2="21"/>),
  zap: _p(<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>),
  cpu: _p(<rect x="4" y="4" width="16" height="16" rx="2"/>, <rect x="9" y="9" width="6" height="6"/>, <line x1="9" y1="1" x2="9" y2="4"/>, <line x1="15" y1="1" x2="15" y2="4"/>, <line x1="9" y1="20" x2="9" y2="23"/>, <line x1="15" y1="20" x2="15" y2="23"/>, <line x1="20" y1="9" x2="23" y2="9"/>, <line x1="20" y1="14" x2="23" y2="14"/>, <line x1="1" y1="9" x2="4" y2="9"/>, <line x1="1" y1="14" x2="4" y2="14"/>),
  calendar: _p(<rect x="3" y="4" width="18" height="18" rx="2"/>, <line x1="16" y1="2" x2="16" y2="6"/>, <line x1="8" y1="2" x2="8" y2="6"/>, <line x1="3" y1="10" x2="21" y2="10"/>),
  arrowUp: _p(<line x1="12" y1="19" x2="12" y2="5"/>, <polyline points="5 12 12 5 19 12"/>),
  arrowDown: _p(<line x1="12" y1="5" x2="12" y2="19"/>, <polyline points="19 12 12 19 5 12"/>),
};

function Icon({ name, size = 18, className = '', style }) {
  const children = ICONS[name];
  return (
    <svg className={['hns-icon', className].filter(Boolean).join(' ')} width={size} height={size}
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      {children}
    </svg>
  );
}

window.HNSIcon = Icon;
