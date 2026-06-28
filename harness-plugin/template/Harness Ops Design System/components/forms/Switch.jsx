import React from 'react';

/**
 * Toggle switch with an optional label.
 */
export function Switch({ label, className = '', ...rest }) {
  return (
    <label className={['hns-switch', className].filter(Boolean).join(' ')}>
      <input type="checkbox" role="switch" {...rest} />
      <span className="hns-switch__track" aria-hidden="true"><span className="hns-switch__thumb" /></span>
      {label != null && <span>{label}</span>}
    </label>
  );
}
