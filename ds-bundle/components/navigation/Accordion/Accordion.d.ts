import * as React from 'react';

/**
 * Accordion — from @plasmamade/ds@1.0.0.
 */
export interface AccordionProps {
  /** The question/answer pairs to render. */
  items: { question: ReactNode; answer: ReactNode; }[];
  /** Index open by default. Use -1 for all closed. */
  defaultOpen?: number;
  /** Allow more than one panel open at a time. */
  multiple?: boolean;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Accordion: React.ComponentType<AccordionProps>;
