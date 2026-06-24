ProductCard from @plasmamade/ds. Use via `window.PlasmaMade.ProductCard` (bundle loaded from the root `_ds_bundle.js`).

Product catalogue card — image on a soft radial stage, type, name, short
copy and a compact spec row. Used in the product overview grids.

@category Catalog

## Props

```ts
interface ProductCardProps {
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
```

## Examples

### Default

```jsx
() => (
  <div style={{ maxWidth: 300 }}>
    <ProductCard
      image={unitImg}
      type="Recirculatie-unit"
      name="GUC1223"
      description="Krachtige plasma-unit voor afzuigkappen tot 1.000 m³/u."
      flag={<Badge tone="green">Bestseller</Badge>}
      specs={[
        { label: 'Capaciteit', value: '1.000 m³/u' },
        { label: 'Aansluiting', value: 'Ø150 mm' },
      ]}
      footer={
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <Button size="sm">Bestellen</Button>
          <Button size="sm" variant="ghost" icon={<IconDownload />}>Sheet</Button>
        </div>
      }
    />
  </div>
)
```

### Catalog

```jsx
() => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 16, maxWidth: 560 }}>
    <ProductCard
      image={unitImg}
      type="Recirculatie-unit"
      name="GUC1223"
      description="Voor afzuigkappen tot 1.000 m³/u."
      flag={<Badge tone="green">Bestseller</Badge>}
      specs={[{ label: 'Capaciteit', value: '1.000 m³/u' }]}
    />
    <ProductCard
      image={unitImg}
      type="Compacte unit"
      name="GUC1214"
      description="Compacte oplossing voor kleinere keukens."
      specs={[{ label: 'Capaciteit', value: '600 m³/u' }]}
    />
  </div>
)
```
