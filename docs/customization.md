# Customization guide — where to change what

Every value that appears in more than one place has **one** source file. Edit that
file and the whole site follows. `npm run check` fails if a value is hard-coded
somewhere else.

| I want to change… | Edit this one file | Notes |
| --- | --- | --- |
| **Any colour** (brand, text, backgrounds, gradients, SVG art, favicon, browser theme colour) | `src/theme/colors.ts` | Each key becomes `--key` and `--key-rgb` CSS variables. |
| **Font family** | `src/theme/fonts.ts` (load files) + `src/theme/typography.ts` (`fontFamily`) | e.g. `npm i @fontsource/poppins`, swap the imports and the family name. |
| **Font sizes, weights, letter-spacing, line-height** | `src/theme/typography.ts` | Headline scale lives here. |
| **Radius, container width, gutters, section spacing, header height, button size** | `src/theme/layout.ts` | |
| **Easings, durations, hero carousel timing, intro length** | `src/theme/motion.ts` | CSS and JS read the same values. |
| **Product finishes / SVG art colours** | `src/theme/art.ts` | Finish names are in `src/content/product.ts`. |
| **Page names, SEO titles & descriptions, header nav, footer columns, sitemap priority** | `src/config/pages.ts` | Nav, breadcrumbs, footer, `<title>` and sitemap are all derived from it. |
| **URL paths** | `src/config/routes.ts` | |
| **Button labels & destinations** (Book a Demo, Contact us, …) | `src/config/cta.ts` | Render with `<CtaLink cta={CTA.BOOK_DEMO} />`. |
| **Brand name, tagline, email, phone, address, legal entity** | `src/config/site.ts` | **Placeholders today — replace before launch.** |
| **Product numbers** (voltage, load, box depth, warranty, connectivity) | `src/config/specs.ts` | All provisional. Copy interpolates `SPEC`. |
| **Real photos / product renders** | drop files in `public/images/`, register in `src/config/images.ts` | Falls back to SVG placeholders when empty. |
| **Page copy** (features, use cases, FAQ, product copy) | `src/content/*.ts` | |
| **Home / about / how-it-works headline copy** | the page file in `src/app/<page>/page.tsx` | Layout-specific copy. |
| **Component styling** (spacing, hover, layout) | `src/styles/{base,components,sections,animations}.css` | CSS may only use tokens — no colour literals. |

## How the theme reaches the page

`src/theme/*.ts` → `themeCss()` → `<style id="theme-tokens">` in `<head>` (see `app/layout.tsx`)
→ CSS uses `var(--gold)`, `rgb(var(--gold-rgb) / .3)`, `var(--fs-section)` … → SVG/TS art imports from `@/theme`.

## Guardrails

```bash
npm run check          # type-check + check:theme
npm run check:theme    # fails on hard-coded colours, fonts, route paths, spec values,
                       # contact details or inline CTA labels outside their single source
```

## UI flow

```
Home ─┬─ Product ──── configurator (#configure) ──► Book a Demo
      ├─ Technology ─ 4 feature pages ───────────► Contact / Book a Demo
      ├─ Use Cases ── 3 use-case pages ──────────► Book a Demo (?intent=homeowner|architect)
      ├─ How It Works ───────────────────────────► Book a Demo / Contact
      ├─ FAQ ────────────────────────────────────► Contact / Book a Demo
      ├─ About ──────────────────────────────────► Book a Demo / Contact
      └─ Contact · Book a Demo ─ form ─► mailto handoff (no backend) ─► success state
Footer: Explore · Company · Legal (Privacy, Terms, Cookies) — all driven by pages.ts
Mobile: hamburger menu + sticky dock (Book a Demo · Contact)
```
