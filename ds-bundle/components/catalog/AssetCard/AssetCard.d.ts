import * as React from 'react';

/**
 * AssetCard — from @plasmamade/ds@1.0.0.
 */
export interface AssetCardProps {
  /** Thumbnail content — an <img> or any node shown in the 4:3 thumb area. */
  thumb?: React.ReactNode;
  /** Use `contain` framing (padded, light background) instead of cover. */
  contain?: boolean;
  /** Small dark tag top-left, e.g. "PDF". */
  typeTag?: string;
  /** Small light tag top-right, e.g. "NL". */
  langTag?: string;
  /** Uppercase green category label. */
  category?: string;
  /** Asset title. */
  title: string;
  /** Short description. */
  description?: React.ReactNode;
  /** Meta row (file size, pages…). */
  meta?: React.ReactNode;
  /** Footer actions (e.g. download/preview buttons). */
  actions?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const AssetCard: React.ComponentType<AssetCardProps>;
