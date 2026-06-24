SearchBox from @plasmamade/ds. Use via `window.PlasmaMade.SearchBox` (bundle loaded from the root `_ds_bundle.js`).

Inline search input with a leading icon and a green focus ring. For the
toolbar/filter search field.

@category Forms

## Props

```ts
interface SearchBoxProps {
  /** Leading icon; defaults to a search glyph. */
  icon?: React.ReactNode;
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
  <div style={{ maxWidth: 360 }}>
    <SearchBox placeholder="Zoek producten, documenten…" />
  </div>
)
```

### Filled

```jsx
() => (
  <div style={{ maxWidth: 360 }}>
    <SearchBox defaultValue="GUC1223" placeholder="Zoeken…" />
  </div>
)
```
