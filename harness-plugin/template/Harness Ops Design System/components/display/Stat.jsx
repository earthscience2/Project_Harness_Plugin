import React from 'react';

const ARROWS = { up: 'M8 3.5v9M4.5 7L8 3.5 11.5 7', down: 'M8 12.5v-9M4.5 9L8 12.5 11.5 9', flat: 'M3.5 8h9' };

/**
 * Single KPI: label, large monospace value, optional delta.
 */
export function Stat({ label, value, unit, delta, trend = 'flat', className = '', ...rest }) {
  return (
    <div className={['hns-stat', className].filter(Boolean).join(' ')} {...rest}>
      <div className="hns-stat__label">{label}</div>
      <div className="hns-stat__row">
        <span className="hns-stat__value">{value}{unit && <span style={{ fontSize: 'var(--text-lg)', color: 'var(--text-tertiary)', marginLeft: 2 }}>{unit}</span>}</span>
        {delta != null && (
          <span className={`hns-stat__delta hns-stat__delta--${trend}`}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d={ARROWS[trend]} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
