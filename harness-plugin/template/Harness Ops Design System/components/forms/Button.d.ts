import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "secondary" */
  variant?: 'primary' | 'secondary' | 'ghost' | 'subtle' | 'danger';
  /** Control height. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Icon node placed before the label. */
  iconLeft?: React.ReactNode;
  /** Icon node placed after the label. */
  iconRight?: React.ReactNode;
  /** Shows a spinner and disables interaction. */
  loading?: boolean;
}

/**
 * Button — primary action control for the Harness Ops console.
 *
 * @startingPoint section="Forms" subtitle="Buttons in every variant, size & state" viewport="700x180"
 */
export function Button(props: ButtonProps): JSX.Element;
