import * as React from 'react';

export interface DataTableColumn<Row = any> {
  /** Object key into each row. */
  key: string;
  /** Header label. */
  header: React.ReactNode;
  /** Text alignment; "right" also enables tabular numeric styling. */
  align?: 'left' | 'right';
  /** Render cell in monospace. */
  mono?: boolean;
  /** Emphasize cell as the row's primary text. */
  primary?: boolean;
  /** Fixed column width (CSS value). */
  width?: string;
  /** Custom cell renderer. */
  render?: (value: any, row: Row) => React.ReactNode;
}

export interface DataTableProps<Row = any> extends React.HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  /** Derive a stable row id (defaults to index). */
  getRowId?: (row: Row) => string | number;
  /** Currently selected row id (highlights the row). */
  selectedId?: string | number;
  /** Row click handler. */
  onRowClick?: (row: Row, id: string | number) => void;
}

/**
 * DataTable — sticky-header table with selectable/clickable rows, the
 * core surface for harness run & case management.
 *
 * @startingPoint section="Display" subtitle="Sticky-header data table with selection" viewport="700x300"
 */
export function DataTable(props: DataTableProps): JSX.Element;
