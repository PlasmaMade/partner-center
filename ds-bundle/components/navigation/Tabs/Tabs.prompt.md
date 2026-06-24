Tabs from @plasmamade/ds. Use via `window.PlasmaMade.Tabs` (bundle loaded from the root `_ds_bundle.js`).

Underlined tab bar with an animated green active indicator. Controlled via
`value`/`onChange`, or uncontrolled via `defaultValue`.

@category Navigation

## Props

```ts
interface TabsProps {
  /** The tabs to show. Each needs a stable `id` and a `label`. */
  items: { id: string; label: ReactNode; }[];
  /** Controlled active tab id. */
  value?: string;
  /** Default active tab id (uncontrolled). Defaults to the first tab. */
  defaultValue?: string;
  /** Called with the id of the newly selected tab. */
  onChange?: (id: string) => void;
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
  <div style={{ maxWidth: 560 }}>
    <Tabs items={items} defaultValue="spec" />
  </div>
)
```

### SecondActive

```jsx
() => (
  <div style={{ maxWidth: 560 }}>
    <Tabs items={items} defaultValue="install" />
  </div>
)
```
