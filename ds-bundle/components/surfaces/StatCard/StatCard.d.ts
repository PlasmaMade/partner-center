import * as React from 'react';

/**
 * StatCard — from @plasmamade/ds@1.0.0.
 */
export interface StatCardProps {
  /** Metric label, e.g. "Omzet deze maand". */
  label: string;
  /** Optional icon shown beside the label. */
  icon?: React.ReactNode;
  /** The headline value, e.g. "€ 24.580". Rendered in a large tabular figure. */
  value: React.ReactNode;
  /** Optional sub-line under the value — wrap a delta in `<b>` for green emphasis. */
  sub?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const StatCard: React.ComponentType<StatCardProps>;
