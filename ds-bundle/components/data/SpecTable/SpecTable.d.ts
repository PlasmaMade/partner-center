import * as React from 'react';

/**
 * SpecTable — from @plasmamade/ds@1.0.0.
 */
export interface SpecTableProps {
  /** Label/value rows. Zebra-striped; labels muted, values bold. */
  rows: { label: string; value: ReactNode; }[];
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const SpecTable: React.ComponentType<SpecTableProps>;
