AssetCard from @plasmamade/ds. Use via `window.PlasmaMade.AssetCard` (bundle loaded from the root `_ds_bundle.js`).

Download / marketing-asset card — thumbnail with type & language tags, a
category label, title, description, meta and footer actions. The unit of the
downloads and sales-tools libraries.

@category Catalog

## Props

```ts
interface AssetCardProps {
  /** Thumbnail content — an <img> or any node shown in the 4:3 thumb area. */
  thumb?: React.ReactNode;
  /** Use `contain` framing (padded, light background) instead of cover. */
  contain?: boolean;
  /** Small dark tag top-left, e.g. "PDF". */
  typeTag?: string;
  /** Small light tag top-right, e.g. "NL". */
  langTag?: string;
  /** Uppercase green category label. */
  category?: string;
  /** Asset title. */
  title: string;
  /** Short description. */
  description?: React.ReactNode;
  /** Meta row (file size, pages…). */
  meta?: React.ReactNode;
  /** Footer actions (e.g. download/preview buttons). */
  actions?: React.ReactNode;
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
    <AssetCard
      thumb={<img src={docThumb} alt="" />}
      contain
      typeTag="PDF"
      langTag="NL"
      category="Brochure"
      title="Totaalbrochure 2026"
      description="Het complete overzicht van het PlasmaMade-assortiment."
      meta={<><span>4,2 MB</span><span>24 pagina's</span></>}
      actions={<Button size="sm" variant="ghost" icon={<IconDownload />}>Download</Button>}
    />
  </div>
)
```

### Grid

```jsx
() => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 16, maxWidth: 560 }}>
    <AssetCard thumb={<img src={docThumb} alt="" />} contain typeTag="PDF" langTag="NL" category="Brochure" title="Totaalbrochure 2026" meta={<span>4,2 MB</span>} />
    <AssetCard thumb={<img src={docThumb} alt="" />} contain typeTag="PDF" langTag="EN" category="Productsheet" title="GUC1223 datasheet" meta={<span>1,1 MB</span>} />
  </div>
)
```
