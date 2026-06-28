import React from 'react';

/**
 * Small label for counts, categories, metadata.
 */
export function Badge({ tone = 'neutral', variant = 'soft', pill = false, className = '', children, ...rest }) {
  const cls = [
    'hns-badge',
    `hns-badge--${tone}`,
    variant === 'solid' ? 'hns-badge--solid' : '',
    variant === 'outline' ? 'hns-badge--outline' : '',
    pill ? 'hns-badge--pill' : '',
    className,
  ].filter(Boolean).join(' ');
  return <span className={cls} {...rest}>{children}</span>;
}
