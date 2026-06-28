import * as React from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label rendered to the right of the track. */
  label?: React.ReactNode;
}

/** Switch — binary on/off toggle for settings and live options. */
export function Switch(props: SwitchProps): JSX.Element;
