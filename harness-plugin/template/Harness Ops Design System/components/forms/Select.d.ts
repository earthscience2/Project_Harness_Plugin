import * as React from 'react';

export interface SelectOption { label: string; value: string; }

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Field label. */
  label?: string;
  /** Helper text. */
  hint?: string;
  /** Error message. */
  error?: string;
  /** Options as strings or {label,value}. Omit to pass <option> children. */
  options?: Array<string | SelectOption>;
  /** Control height. @default "md" */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Select — styled native dropdown with chevron, label, hint and error.
 */
export function Select(props: SelectProps): JSX.Element;
