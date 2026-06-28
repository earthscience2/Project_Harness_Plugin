import React from 'react';

/**
 * Square icon-only button. Provide an aria-label for accessibility.
 */
export function IconButton({
  variant = 'ghost',
  size = 'md',
  label,
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const cls = [
    'hns-btn', 'hns-btn--icon',
    `hns-btn--${variant}`,
    size !== 'md' ? `hns-btn--${size}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} className={cls} aria-label={label} title={label} disabled={disabled} {...rest}>
      <span className="hns-icon" aria-hidden="true">{children}</span>
    </button>
  );
}
