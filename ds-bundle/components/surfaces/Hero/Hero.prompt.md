Hero from @plasmamade/ds. Use via `window.PlasmaMade.Hero` (bundle loaded from the root `_ds_bundle.js`).

Full-width gradient-green hero banner with eyebrow, headline, copy, actions
and optional product media. The flagship page header for partner & marketing
surfaces.

@category Surfaces

## Props

```ts
interface HeroProps {
  /** Small uppercase eyebrow above the title. */
  eyebrow?: string;
  /** Main heading. */
  title: React.ReactNode;
  /** Supporting paragraph. */
  description?: React.ReactNode;
  /** Action buttons — use Button with variant="white". */
  actions?: React.ReactNode;
  /** Optional media on the right (e.g. a product image). */
  media?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
```

## Examples

### Default

```jsx
() => (
  <Hero
    eyebrow="Partner Center"
    title="Schone lucht, sterke verkoop"
    description="Alles wat je nodig hebt om PlasmaMade te verkopen: producten, marketing en kennis op één plek."
    actions={
      <>
        <Button variant="white" iconRight={<IconArrowRight />}>Aan de slag</Button>
        <Button variant="white">Bekijk producten</Button>
      </>
    }
    media={<img src={unitImg} alt="PlasmaMade unit" />}
  />
)
```
