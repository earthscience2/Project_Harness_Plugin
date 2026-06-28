import * as React from 'react';

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visual style. @default "ghost" */
  variant?: 'primary' | 'secondary' | 'ghost' | 'subtle' | 'danger';
  /** Control size. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Required accessible label (also used as tooltip). */
  label: string;
  /** A single icon node. */
  children: React.ReactNode;
}

/**
 * IconButton — square, icon-only button for toolbars and table row actions.
 */
export function IconButton(props: IconButtonProps): JSX.Element;
