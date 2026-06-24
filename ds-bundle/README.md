# PlasmaMade Design System — conventions

PlasmaMade makes plasma air-purification units; this design system powers its
partner-center and marketing surfaces. Brand colour is green `#13A538`; the
typeface is **Libre Franklin**. Interface copy is usually **Dutch**.

## Setup — no provider, just the stylesheet
There is **no React context or provider to wrap**. Load the DS `styles.css` once
at the app root. It does three things on its own:
- sets base typography globally (Libre Franklin on `body`, heading colours, a few
  resets) — so text is on-brand without any wrapper class;
- defines every design token on `:root`;
- `@import`s the brand fonts and the compiled component CSS.

Render the components directly. As long as `styles.css` is loaded, nothing comes
out unstyled — there is no theme object to pass.

## Styling idiom — CSS variables, not utilities
This DS has **no utility-class framework** (no Tailwind) and components are **not**
styled through style props. Two rules:
1. **Use the components** for all standard UI — buttons, cards, badges, forms,
   tables, tabs… Choose looks through semantic props (`variant`, `tone`, `size`),
   never by hand-building a lookalike.
2. **For your own layout glue**, style with the design tokens via `var(--*)`. Use
   the real token names below — never invent colours or raw hex.

Token vocabulary (all defined in `styles.css` `:root`):
- Brand: `--green` `--green-600` `--green-700` `--green-100` `--green-50` `--green-grad`
- Text / neutral: `--black` `--ink` (body text) `--muted` (secondary) `--line` (borders) `--bg` (page) `--surface` (cards) `--surface-2`
- Status: `--warn` `--info` `--danger`
- Radii: `--radius` `--radius-sm` `--radius-lg` `--radius-xl`
- Elevation: `--shadow-xs` `--shadow-sm` `--shadow` `--shadow-lg` `--shadow-green` `--ring-green`
- Type: `--font` (Libre Franklin)

## Where the truth lives
Before styling anything custom, read `styles.css` (the tokens plus every component
class) and the per-component `.prompt.md` / `.d.ts` for exact props. Components live
under `components/<group>/<Name>/`, grouped as: **actions, feedback, surfaces,
catalog, navigation, forms, data, media**.

## Idiomatic example
```jsx
<Hero
  eyebrow="Partner Center"
  title="Schone lucht, sterke verkoop"
  description="Alles voor de verkoop van PlasmaMade — op één plek."
  actions={<Button variant="white">Aan de slag</Button>}
/>

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--radius)' }}>
  <StatCard label="Omzet deze maand" value="€ 24.580" sub={<><b>+12%</b> t.o.v. vorige maand</>} />
  <StatCard label="Open bestellingen" value="38" />
  <StatCard label="Actieve dealers" value="126" />
</div>
```

Reach for `Tile`, `KbCard`, `ProductCard`, `AssetCard`, `CampaignCard`, `NewsItem`
in the partner-center content grids; `CompareTable` / `SpecTable` for product data;
`Badge`, `Chip`, `Callout`, `Toast`, `EmptyState` for status and feedback.

# PlasmaMade (@plasmamade/ds@1.0.0)

This design system is the published @plasmamade/ds React library, bundled as a single
browser global. All 26 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.PlasmaMade`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.PlasmaMade.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { Accordion } = window.PlasmaMade;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<Accordion />);
```

## Tokens

31 CSS custom properties from @plasmamade/ds. Names are
preserved verbatim from upstream. They are declared inside `_ds_bundle.css` (this DS ships one compiled stylesheet rather than separate token files).

- **color** (2): `--surface`, `--surface-2`
- **typography** (1): `--font`
- **radius** (4): `--radius`, `--radius-sm`, `--radius-lg`, …
- **shadow** (5): `--shadow-xs`, `--shadow-sm`, `--shadow`, …
- **other** (19): `--green`, `--green-600`, `--green-700`, …

## Components

### navigation
- `Accordion` — FAQ-style accordion. Each header has a green plus badge that rotates to a
- `SectionTitle` — Section header with a green accent bar, a flexible divider line, and an
- `Tabs` — Underlined tab bar with an animated green active indicator. Controlled via

### catalog
- `AssetCard` — Download / marketing-asset card  thumbnail with type  language tags, a
- `CampaignCard` — Campaign card  a full-bleed image with a dark bottom gradient and white
- `KbCard` — Knowledge-base topic card  an icon badge, category, title and summary.
- `NewsItem` — News / update list row  a green date badge beside a headline and excerpt.
- `ProductCard` — Product catalogue card  image on a soft radial stage, type, name, short

### media
- `Avatar` — User avatar  a circular green-gradient badge showing initials, or an image

### feedback
- `Badge` — Small status/label pill. The compact way to flag state (Nieuw, Actief),
- `Callout` — Green left-accent callout for tips, notes and highlighted guidance inside
- `EmptyState` — Centred empty-state placeholder for lists, searches and tables with no
- `Toast` — Dark, floating confirmation toast. Render inside a fixed corner container to

### actions
- `Button` — Primary action control  the PlasmaMade button. Gradient-green primary,
- `Chip` — Pill-shaped, toggleable filter chip. Use a row of chips to filter a
- `IconButton` — Square, bordered icon-only button for top bars and toolbars (notifications,

### surfaces
- `Card` — The base surface  white, rounded, subtly elevated. The building block for
- `Hero` — Full-width gradient-green hero banner with eyebrow, headline, copy, actions
- `StatCard` — KPI stat card  a labelled metric with a large tabular value and an optional
- `Tile` — Dashboard navigation tile  an icon badge, title, description and an

### data
- `CompareTable` — Feature comparison table with a dark header (one column can be green-
- `SpecTable` — Two-column specification table (label / value), zebra-striped. For product

### forms
- `Field` — Labelled form field  label, input (or textarea), and an error/hint line.
- `SearchBox` — Inline search input with a leading icon and a green focus ring. For the
- `Select` — Styled native select with the brand chevron and green focus ring. Pass
- `Switch` — Toggle switch with a green on track and a spring-animated knob. A styled
