import * as React from 'react';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Run lifecycle state. @default "queued" */
  status?: 'passed' | 'failed' | 'error' | 'running' | 'queued' | 'skipped';
  /** Override the default label text. */
  label?: string;
}

/**
 * StatusBadge — eval/test run state pill (dot + label). `running` pulses.
 */
export function StatusBadge(props: StatusBadgeProps): JSX.Element;
