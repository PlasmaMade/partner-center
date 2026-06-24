SectionTitle from @plasmamade/ds. Use via `window.PlasmaMade.SectionTitle` (bundle loaded from the root `_ds_bundle.js`).

Section header with a green accent bar, a flexible divider line, and an
optional "more" link. Use to title content blocks within a page.

@category Navigation

## Props

```ts
interface SectionTitleProps {
  /** Section heading text. */
  title: React.ReactNode;
  /** Optional "more" link label shown at the right. */
  moreLabel?: string;
  /** Destination for the "more" link. */
  moreHref?: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
```

## Examples

### WithLink

```jsx
() => (
  <div style={{ maxWidth: 560 }}>
    <SectionTitle title="Populaire producten" moreLabel="Alles bekijken" moreHref="#" />
  </div>
)
```

### Plain

```jsx
() => (
  <div style={{ maxWidth: 560 }}>
    <SectionTitle title="Laatste nieuws" />
  </div>
)
```
