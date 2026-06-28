import React from 'react';

/**
 * Tab strip. Controlled via `value`/`onChange`, or uncontrolled with
 * `defaultValue`. Items: {value,label,count?}.
 */
export function Tabs({ items = [], value, defaultValue, onChange, variant = 'underline', className = '', ...rest }) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value);
  const active = value !== undefined ? value : internal;
  const select = (v) => { if (value === undefined) setInternal(v); onChange && onChange(v); };

  const cls = ['hns-tabs', variant === 'enclosed' ? 'hns-tabs--enclosed' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls} role="tablist" {...rest}>
      {items.map((it) => (
        <button
          key={it.value}
          type="button"
          role="tab"
          aria-selected={active === it.value}
          className={['hns-tab', active === it.value ? 'is-active' : ''].filter(Boolean).join(' ')}
          onClick={() => select(it.value)}
        >
          {it.icon && <span className="hns-icon" aria-hidden="true">{it.icon}</span>}
          <span>{it.label}</span>
          {it.count != null && <span className="hns-tab__count">{it.count}</span>}
        </button>
      ))}
    </div>
  );
}
