import * as React from 'react';

/**
 * Field — from @plasmamade/ds@1.0.0.
 */
export interface FieldProps {
  /** Field label (rendered above the control). */
  label: string;
  /** Render a multiline textarea instead of a single-line input. */
  multiline?: boolean;
  /** Validation error message — shown in danger red and sets aria-invalid. */
  error?: string;
  /** Helper text shown under the field when there is no error. */
  hint?: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Field: React.ComponentType<FieldProps>;
