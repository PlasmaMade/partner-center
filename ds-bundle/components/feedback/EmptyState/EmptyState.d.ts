import * as React from 'react';

/**
 * EmptyState — from @plasmamade/ds@1.0.0.
 */
export interface EmptyStateProps {
  /** Large muted icon shown above the title. */
  icon?: React.ReactNode;
  /** Headline, e.g. "Geen resultaten gevonden". */
  title: string;
  /** Supporting description / suggested next step. */
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export declare const EmptyState: React.ComponentType<EmptyStateProps>;
