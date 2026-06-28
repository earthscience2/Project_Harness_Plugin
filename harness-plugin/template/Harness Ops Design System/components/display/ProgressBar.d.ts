import * as React from 'react';

export interface ProgressSegment { value: number; color: string; }

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fill percentage 0–100 (ignored when `segments` is set). */
  value?: number;
  /** Fill color tone. @default "accent" */
  tone?: 'accent' | 'success' | 'warning' | 'danger';
  /** Stacked segments (e.g. pass/fail/skip). Each width is its `value` in %. */
  segments?: ProgressSegment[];
}

/** ProgressBar — single or stacked-segment linear progress. */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
