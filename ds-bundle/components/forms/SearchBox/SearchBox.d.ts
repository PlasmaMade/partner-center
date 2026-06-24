import * as React from 'react';

/**
 * SearchBox — from @plasmamade/ds@1.0.0.
 */
export interface SearchBoxProps {
  /** Leading icon; defaults to a search glyph. */
  icon?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const SearchBox: React.ComponentType<SearchBoxProps>;
