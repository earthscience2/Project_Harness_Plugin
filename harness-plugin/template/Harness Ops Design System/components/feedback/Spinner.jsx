import React from 'react';

/**
 * Indeterminate loading spinner. Size in px.
 */
export function Spinner({ size = 16, className = '', style, ...rest }) {
  return (
    <span
      className={['hns-spinner', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, ...style }}
      role="status"
      aria-label="로딩 중"
      {...rest}
    />
  );
}
