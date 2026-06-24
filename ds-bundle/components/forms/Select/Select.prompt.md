Select from @plasmamade/ds. Use via `window.PlasmaMade.Select` (bundle loaded from the root `_ds_bundle.js`).

Styled native select with the brand chevron and green focus ring. Pass
`<option>` children. For a labelled field, use <Field> instead.

@category Forms

## Props

```ts
interface SelectProps {
  /** <option> / <optgroup> elements. */
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}
```

## Examples

### Default

```jsx
() => (
  <Select defaultValue="recirc" aria-label="Productcategorie">
    <option value="all">Alle categorieën</option>
    <option value="recirc">Recirculatie-units</option>
    <option value="compact">Compacte units</option>
    <option value="filters">Filters &amp; onderdelen</option>
  </Select>
)
```

### Sorting

```jsx
() => (
  <Select defaultValue="pop" aria-label="Sorteren">
    <option value="pop">Sorteer op: populariteit</option>
    <option value="new">Nieuwste eerst</option>
    <option value="price">Prijs oplopend</option>
  </Select>
)
```
