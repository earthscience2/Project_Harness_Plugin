import React from 'react';

/**
 * Checkbox with a label. Use `radio` styling via the Radio export.
 */
export function Checkbox({ label, className = '', ...rest }) {
  return (
    <label className={['hns-check', className].filter(Boolean).join(' ')}>
      <input type="checkbox" {...rest} />
      <span className="hns-check__box" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      {label != null && <span>{label}</span>}
    </label>
  );
}

/**
 * Radio button with a label. Group via a shared `name`.
 */
export function Radio({ label, className = '', ...rest }) {
  return (
    <label className={['hns-check', 'hns-check--radio', className].filter(Boolean).join(' ')}>
      <input type="radio" {...rest} />
      <span className="hns-check__box" aria-hidden="true"><span className="hns-check__dot" /></span>
      {label != null && <span>{label}</span>}
    </label>
  );
}
