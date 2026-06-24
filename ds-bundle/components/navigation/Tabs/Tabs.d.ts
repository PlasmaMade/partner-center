import * as React from 'react';

/**
 * Tabs — from @plasmamade/ds@1.0.0.
 */
export interface TabsProps {
  /** The tabs to show. Each needs a stable `id` and a `label`. */
  items: { id: string; label: ReactNode; }[];
  /** Controlled active tab id. */
  value?: string;
  /** Default active tab id (uncontrolled). Defaults to the first tab. */
  defaultValue?: string;
  /** Called with the id of the newly selected tab. */
  onChange?: (id: string) => void;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Tabs: React.ComponentType<TabsProps>;
