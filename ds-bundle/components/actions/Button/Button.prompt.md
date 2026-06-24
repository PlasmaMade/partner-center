Button from @plasmamade/ds. Use via `window.PlasmaMade.Button` (bundle loaded from the root `_ds_bundle.js`).

Primary action control — the PlasmaMade button. Gradient-green primary,
bordered ghost, dark, and white-on-colour variants, in three sizes, with
optional leading/trailing icons.

@category Actions

## Props

```ts
interface ButtonProps {
  /** Visual style. `primary` is the green-gradient CTA, `ghost` a bordered secondary, `dark` the near-black action, `white` f */
  variant?: "dark" | "primary" | "ghost" | "white";
  /** Size of the button. */
  size?: "sm" | "md" | "lg";
  /** Stretch to the full width of the container. */
  block?: boolean;
  /** Optional leading icon (an inline svg or icon element). */
  icon?: React.ReactNode;
  /** Optional trailing icon. */
  iconRight?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
```

## Examples

### Variants

```jsx
() => (
  <Row>
    <Button variant="primary">Offerte aanvragen</Button>
    <Button variant="ghost">Meer informatie</Button>
    <Button variant="dark">Inloggen</Button>
  </Row>
)
```

### Sizes

```jsx
() => (
  <Row>
    <Button size="sm">Klein</Button>
    <Button size="md">Normaal</Button>
    <Button size="lg">Groot</Button>
  </Row>
)
```

### WithIcons

```jsx
() => (
  <Row>
    <Button icon={<IconDownload />}>Brochure downloaden</Button>
    <Button variant="ghost" iconRight={<IconArrowRight />}>Naar de webshop</Button>
  </Row>
)
```

### States

```jsx
() => (
  <Row>
    <Button>Bestellen</Button>
    <Button disabled>Niet beschikbaar</Button>
  </Row>
)
```
