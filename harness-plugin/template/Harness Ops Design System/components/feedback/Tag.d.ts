import * as React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** When provided, renders a remove (×) button that calls this handler. */
  onRemove?: () => void;
}

/** Tag — removable monospace token for active filters and labels. */
export function Tag(props: TagProps): JSX.Element;
