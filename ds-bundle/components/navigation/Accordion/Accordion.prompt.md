Accordion from @plasmamade/ds. Use via `window.PlasmaMade.Accordion` (bundle loaded from the root `_ds_bundle.js`).

FAQ-style accordion. Each header has a green plus badge that rotates to a
cross when open. Single-open by default; pass `multiple` to allow several.

@category Navigation

## Props

```ts
interface AccordionProps {
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
```

## Examples

### FAQ

```jsx
() => (
  <div style={{ maxWidth: 560 }}>
    <Accordion items={faq} />
  </div>
)
```

### AllClosed

```jsx
() => (
  <div style={{ maxWidth: 560 }}>
    <Accordion items={faq} defaultOpen={-1} />
  </div>
)
```
