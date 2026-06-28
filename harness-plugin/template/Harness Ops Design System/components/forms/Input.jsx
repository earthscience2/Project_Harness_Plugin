import React from 'react';

/**
 * Text field with optional label, hint, error, and leading icon.
 * Pass `mono` for identifier / numeric inputs.
 */
export function Input({
  label,
  hint,
  error,
  required = false,
  optional = false,
  size = 'md',
  mono = false,
  iconLeft = null,
  id,
  className = '',
  ...rest
}) {
  const fieldId = id || (label ? `hns-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const inputCls = [
    'hns-input',
    size !== 'md' ? `hns-input--${size}` : '',
    mono ? 'hns-input--mono' : '',
    error ? 'hns-input--invalid' : '',
    className,
  ].filter(Boolean).join(' ');

  const control = iconLeft ? (
    <div className="hns-input-group">
      <span className="hns-input-group__icon" aria-hidden="true">{iconLeft}</span>
      <input id={fieldId} className={inputCls} aria-invalid={!!error || undefined} {...rest} />
    </div>
  ) : (
    <input id={fieldId} className={inputCls} aria-invalid={!!error || undefined} {...rest} />
  );

  if (!label && !hint && !error) return control;

  return (
    <div className="hns-field">
      {label && (
        <label className="hns-label" htmlFor={fieldId}>
          {label}
          {required && <span className="hns-label__req" aria-hidden="true">*</span>}
          {optional && <span className="hns-label__opt">선택</span>}
        </label>
      )}
      {control}
      {error
        ? <span className="hns-error">{error}</span>
        : hint && <span className="hns-hint">{hint}</span>}
    </div>
  );
}
