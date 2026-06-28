import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic color. @default "neutral" */
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
  /** Fill treatment. @default "soft" */
  variant?: 'soft' | 'solid' | 'outline';
  /** Fully rounded pill shape. */
  pill?: boolean;
}

/**
 * Badge — compact metadata / count label.
 *
 * @startingPoint section="Feedback" subtitle="Badges, status pills, tags & spinners" viewport="700x200"
 */
export function Badge(props: BadgeProps): JSX.Element;
