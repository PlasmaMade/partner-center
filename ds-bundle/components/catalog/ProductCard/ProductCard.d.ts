import * as React from 'react';

/**
 * ProductCard — from @plasmamade/ds@1.0.0.
 */
export interface ProductCardProps {
  /** Product image URL, shown on the radial product stage. */
  image?: string;
  /** Image alt text (defaults to the product name). */
  imageAlt?: string;
  /** Small type/category line above the name, e.g. "Recirculatie-unit". */
  type?: string;
  /** Product name. */
  name: string;
  /** Short description. */
  description?: React.ReactNode;
  /** Compact key specs shown as a label/value row. */
  specs?: { label: string; value: string; }[];
  /** Optional element pinned top-left (e.g. a <Badge>). */
  flag?: React.ReactNode;
  /** Optional footer content (e.g. action buttons). */
  footer?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const ProductCard: React.ComponentType<ProductCardProps>;
