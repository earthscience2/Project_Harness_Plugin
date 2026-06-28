import * as React from 'react';

export interface TabItem {
  value: string;
  label: React.ReactNode;
  /** Optional count chip on the right of the label. */
  count?: number;
  /** Optional leading icon node. */
  icon?: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Tab definitions. */
  items: TabItem[];
  /** Controlled active value. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  /** Called with the newly selected value. */
  onChange?: (value: string) => void;
  /** Visual style. @default "underline" */
  variant?: 'underline' | 'enclosed';
}

/**
 * Tabs — section switcher. `underline` for page-level nav, `enclosed`
 * (segmented) for in-panel filters.
 *
 * @startingPoint section="Navigation" subtitle="Underline & enclosed tab strips" viewport="700x140"
 */
export function Tabs(props: TabsProps): JSX.Element;
