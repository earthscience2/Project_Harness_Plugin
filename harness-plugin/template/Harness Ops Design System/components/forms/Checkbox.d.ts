import * as React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label rendered to the right of the box. */
  label?: React.ReactNode;
}

/** Checkbox — labelled checkbox bound to the accent token. */
export function Checkbox(props: CheckboxProps): JSX.Element;

/** Radio — labelled radio button; group with a shared `name`. */
export function Radio(props: CheckboxProps): JSX.Element;
