import * as React from 'react';

/**
 * Tile — from @plasmamade/ds@1.0.0.
 */
export interface TileProps {
  /** Icon shown in the rounded green badge. */
  icon?: React.ReactNode;
  /** Tile title. */
  title: string;
  /** Short supporting description. */
  description?: React.ReactNode;
  /** Call-to-action label shown at the foot (e.g. "Openen"). */
  linkLabel?: string;
  /** Destination URL; when set the tile renders as a link. */
  href?: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Tile: React.ComponentType<TileProps>;
