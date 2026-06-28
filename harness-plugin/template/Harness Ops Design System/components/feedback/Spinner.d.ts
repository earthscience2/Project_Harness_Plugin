import * as React from 'react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Diameter in px. @default 16 */
  size?: number;
}

/** Spinner — indeterminate loading indicator (accent ring). */
export function Spinner(props: SpinnerProps): JSX.Element;
