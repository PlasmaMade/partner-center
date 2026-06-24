import * as React from 'react';

/**
 * KbCard — from @plasmamade/ds@1.0.0.
 */
export interface KbCardProps {
  /** Icon shown in the rounded green badge. */
  icon?: React.ReactNode;
  /** Uppercase green category label. */
  category?: string;
  /** Article / topic title. */
  title: string;
  /** Short summary. */
  description?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const KbCard: React.ComponentType<KbCardProps>;
