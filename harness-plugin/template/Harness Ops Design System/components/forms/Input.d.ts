import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the input. */
  label?: string;
  /** Helper text below the input. */
  hint?: string;
  /** Error message; turns the field red and overrides hint. */
  error?: string;
  /** Marks the field required (red asterisk). */
  required?: boolean;
  /** Shows a subtle "선택" optional marker. */
  optional?: boolean;
  /** Control height. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Use the monospace family (IDs, numbers, hashes). */
  mono?: boolean;
  /** Leading icon node. */
  iconLeft?: React.ReactNode;
}

/**
 * Input — single-line text field with label / hint / error / leading icon.
 */
export function Input(props: InputProps): JSX.Element;
