Field from @plasmamade/ds. Use via `window.PlasmaMade.Field` (bundle loaded from the root `_ds_bundle.js`).

Labelled form field — label, input (or textarea), and an error/hint line.
Green focus ring; danger border when `error` is set. The standard form row.

@category Forms

## Props

```ts
interface FieldProps {
  /** Field label (rendered above the control). */
  label: string;
  /** Render a multiline textarea instead of a single-line input. */
  multiline?: boolean;
  /** Validation error message — shown in danger red and sets aria-invalid. */
  error?: string;
  /** Helper text shown under the field when there is no error. */
  hint?: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
```

## Examples

### Form

```jsx
() => (
  <div style={{ maxWidth: 380 }}>
    <Field label="Bedrijfsnaam" name="company" placeholder="PlasmaMade B.V." defaultValue="PlasmaMade B.V." />
    <Field label="E-mailadres" name="email" type="email" placeholder="naam@bedrijf.nl" />
    <Field label="Vraag of opmerking" name="msg" multiline placeholder="Waarmee kunnen we je helpen?" />
  </div>
)
```

### WithError

```jsx
() => (
  <div style={{ maxWidth: 380 }}>
    <Field label="E-mailadres" name="email" type="email" defaultValue="naam@bedrijf" error="Vul een geldig e-mailadres in." />
    <Field label="Telefoonnummer" name="phone" hint="We bellen alleen bij vragen over je bestelling." />
  </div>
)
```
