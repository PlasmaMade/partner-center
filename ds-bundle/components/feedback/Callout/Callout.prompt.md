Callout from @plasmamade/ds. Use via `window.PlasmaMade.Callout` (bundle loaded from the root `_ds_bundle.js`).

Green left-accent callout for tips, notes and highlighted guidance inside
articles and knowledge content. Wrap key phrases in `<strong>` for emphasis.

@category Feedback

## Props

```ts
interface CalloutProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}
```

## Examples

### Tip

```jsx
() => (
  <div style={{ maxWidth: 560 }}>
    <Callout>
      <strong>Tip:</strong> Vervang het filter elke 12 maanden voor optimale geur- en
      fijnstofverwijdering. Bij intensief koken kan dat iets korter zijn.
    </Callout>
  </div>
)
```

### Note

```jsx
() => (
  <div style={{ maxWidth: 560 }}>
    <Callout>
      <strong>Goed om te weten:</strong> PlasmaMade-units werken op recirculatie — de gereinigde
      lucht gaat terug de ruimte in, dus een afvoer naar buiten is niet nodig.
    </Callout>
  </div>
)
```
