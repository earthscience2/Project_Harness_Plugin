import React from 'react';

/**
 * Linear progress bar. Single value (0–100) or a `segments` array
 * of {value,color} for stacked pass/fail/skip bars.
 */
export function ProgressBar({ value = 0, tone = 'accent', segments, className = '', style, ...rest }) {
  if (segments) {
    return (
      <div className={['hns-progress', 'hns-progress--split', className].filter(Boolean).join(' ')} style={style} {...rest}>
        {segments.map((s, i) => (
          <span key={i} className="hns-progress__seg" style={{ width: `${s.value}%`, background: s.color }} />
        ))}
      </div>
    );
  }
  return (
    <div className={['hns-progress', `hns-progress--${tone}`, className].filter(Boolean).join(' ')} style={style} {...rest}>
      <span className="hns-progress__fill" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
