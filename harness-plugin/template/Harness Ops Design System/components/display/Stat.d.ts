import * as React from 'react';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uppercase caption above the value. */
  label: React.ReactNode;
  /** The metric value (rendered in monospace). */
  value: React.ReactNode;
  /** Small unit suffix (e.g. "%", "ms"). */
  unit?: string;
  /** Delta text (e.g. "+2.1%"). */
  delta?: React.ReactNode;
  /** Delta direction + color. @default "flat" */
  trend?: 'up' | 'down' | 'flat';
}

/** Stat — single KPI block: label, large monospace value, trend delta. */
export function Stat(props: StatProps): JSX.Element;
