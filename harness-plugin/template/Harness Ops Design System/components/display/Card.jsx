import React from 'react';

/**
 * Container surface. Compose with Card.Header / Card.Body / Card.Footer,
 * or pass `title`/`subtitle`/`actions` for the common header shortcut.
 */
export function Card({ title, subtitle, actions, inset = false, interactive = false, className = '', children, ...rest }) {
  const cls = [
    'hns-card',
    inset ? 'hns-card--inset' : '',
    interactive ? 'hns-card--interactive' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <div className={cls} {...rest}>
      {(title || actions) && (
        <div className="hns-card__header">
          <div>
            {title && <div className="hns-card__title">{title}</div>}
            {subtitle && <div className="hns-card__subtitle">{subtitle}</div>}
          </div>
          {actions && <div style={{ display: 'flex', gap: 'var(--space-2)' }}>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ className = '', children, ...rest }) {
  return <div className={['hns-card__header', className].filter(Boolean).join(' ')} {...rest}>{children}</div>;
};
Card.Body = function CardBody({ className = '', children, ...rest }) {
  return <div className={['hns-card__body', className].filter(Boolean).join(' ')} {...rest}>{children}</div>;
};
Card.Footer = function CardFooter({ className = '', children, ...rest }) {
  return <div className={['hns-card__footer', className].filter(Boolean).join(' ')} {...rest}>{children}</div>;
};
