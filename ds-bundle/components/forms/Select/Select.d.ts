import * as React from 'react';

/**
 * Select — from @plasmamade/ds@1.0.0.
 * @replaces select
 */
export interface SelectProps {
  /** <option> / <optgroup> elements. */
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export declare const Select: React.ComponentType<SelectProps>;
