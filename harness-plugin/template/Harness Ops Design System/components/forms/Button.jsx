import React from 'react';

/**
 * Primary action control. Variants map to the token system:
 * primary (accent fill), secondary (neutral), ghost, subtle (accent tint), danger.
 */
export function Button({
  variant = 'secondary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const cls = [
    'hns-btn',
    `hns-btn--${variant}`,
    size !== 'md' ? `hns-btn--${size}` : '',
    loading ? 'is-loading' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading
        ? <span className="hns-spinner hns-btn__spinner" aria-hidden="true" />
        : iconLeft && <span className="hns-icon" aria-hidden="true">{iconLeft}</span>}
      {children != null && <span>{children}</span>}
      {!loading && iconRight && <span className="hns-icon" aria-hidden="true">{iconRight}</span>}
    </button>
  );
}
