import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shortcut header title. */
  title?: React.ReactNode;
  /** Shortcut header subtitle. */
  subtitle?: React.ReactNode;
  /** Header action node(s), right-aligned. */
  actions?: React.ReactNode;
  /** Recessed surface (surface-2, no shadow) for nesting. */
  inset?: boolean;
  /** Hover affordance for clickable cards. */
  interactive?: boolean;
}

/**
 * Card — primary container surface. Use the `title`/`actions` shortcut,
 * or compose `Card.Header`, `Card.Body`, `Card.Footer`.
 *
 * @startingPoint section="Display" subtitle="Card surfaces, stats & progress" viewport="700x260"
 */
export function Card(props: CardProps): JSX.Element & {
  Header: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Body: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Footer: React.FC<React.HTMLAttributes<HTMLDivElement>>;
};
