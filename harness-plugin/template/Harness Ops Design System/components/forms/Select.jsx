import React from 'react';

/**
 * Styled native select with a chevron. Options via `options` array
 * ({label,value} or string) or children.
 */
export function Select({
  label,
  hint,
  error,
  options,
  size = 'md',
  id,
  className = '',
  children,
  ...rest
}) {
  const fieldId = id || (label ? `hns-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const selCls = ['hns-select__el', size !== 'md' ? `hns-input--${size}` : '', className].filter(Boolean).join(' ');

  const control = (
    <div className="hns-select">
      <select id={fieldId} className={selCls} aria-invalid={!!error || undefined} {...rest}>
        {options
          ? options.map((o) => {
              const opt = typeof o === 'string' ? { label: o, value: o } : o;
              return <option key={opt.value} value={opt.value}>{opt.label}</option>;
            })
          : children}
      </select>
      <svg className="hns-select__chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  if (!label && !hint && !error) return control;
  return (
    <div className="hns-field">
      {label && <label className="hns-label" htmlFor={fieldId}>{label}</label>}
      {control}
      {error ? <span className="hns-error">{error}</span> : hint && <span className="hns-hint">{hint}</span>}
    </div>
  );
}
