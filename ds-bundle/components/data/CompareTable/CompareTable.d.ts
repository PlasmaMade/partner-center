import * as React from 'react';

/**
 * CompareTable — from @plasmamade/ds@1.0.0.
 */
export interface CompareTableProps {
  /** Column headers. Mark the PlasmaMade column `highlight` to give it the green header. */
  columns: { label: string; highlight?: boolean; }[];
  /** Rows — a feature label plus one cell per column. A boolean renders a check/dash; a string renders as text. */
  rows: { feature: string; cells: Array<boolean | string>; }[];
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const CompareTable: React.ComponentType<CompareTableProps>;
