import React from 'react';

const LABELS = {
  passed: '통과',
  failed: '실패',
  error: '오류',
  running: '실행 중',
  queued: '대기',
  skipped: '건너뜀',
};

/**
 * Run-lifecycle status pill with a colored dot. The `running` state
 * pulses. Pass `label` to override the default Korean label.
 */
export function StatusBadge({ status = 'queued', label, className = '', ...rest }) {
  const cls = ['hns-status', `hns-status--${status}`, className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      <span className="hns-status__dot" aria-hidden="true" />
      <span>{label ?? LABELS[status] ?? status}</span>
    </span>
  );
}
