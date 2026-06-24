EmptyState from @plasmamade/ds. Use via `window.PlasmaMade.EmptyState` (bundle loaded from the root `_ds_bundle.js`).

Centred empty-state placeholder for lists, searches and tables with no
results. Pair a muted icon with a short title and one line of guidance.

@category Feedback

## Props

```ts
interface EmptyStateProps {
  /** Large muted icon shown above the title. */
  icon?: React.ReactNode;
  /** Headline, e.g. "Geen resultaten gevonden". */
  title: string;
  /** Supporting description / suggested next step. */
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}
```

## Examples

### NoResults

```jsx
() => (
  <div style={{ maxWidth: 420 }}>
    <EmptyState icon={<IconSearch />} title="Geen resultaten gevonden">
      Pas je zoekopdracht of filters aan om meer producten te zien.
    </EmptyState>
  </div>
)
```

### WithAction

```jsx
() => (
  <div style={{ maxWidth: 420 }}>
    <EmptyState icon={<IconInbox />} title="Nog geen bestellingen">
      <span style={{ display: 'block', marginBottom: 14 }}>
        Zodra je een order plaatst, verschijnt die hier.
      </span>
      <Button size="sm">Naar de webshop</Button>
    </EmptyState>
  </div>
)
```
