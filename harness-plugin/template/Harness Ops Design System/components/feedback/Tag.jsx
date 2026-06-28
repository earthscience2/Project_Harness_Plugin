import React from 'react';

/**
 * Removable token, typically for filters/labels. Monospace by default.
 */
export function Tag({ onRemove, className = '', children, ...rest }) {
  return (
    <span className={['hns-tag', className].filter(Boolean).join(' ')} {...rest}>
      <span>{children}</span>
      {onRemove && (
        <button type="button" className="hns-tag__remove" aria-label="제거" onClick={onRemove}>
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>
        </button>
      )}
    </span>
  );
}
