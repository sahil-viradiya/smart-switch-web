# Customization guide — where to change what

Every value that appears in more than one place has **one** source file. Edit that
file and the whole site follows. `npm run check` fails if a value is hard-coded
somewhere else.

| I want to change… | Edit this one file | Notes |
| --- | --- | --- |
| **Any colour** (brand, text, backgrounds, gradients, SVG art, favicon, browser theme colour) | `src/theme/colors.ts` | Each key becomes `--key` and `--key-rgb` CSS variables. |
| **Font family** | `src/theme/typography.ts` (`fontFamily`, `fontFamilyOutline`) + `src/theme/fonts.ts` (font files) | Default is the **SF Pro** system stack: real SF Pro on iPhone/iPad/Mac, Inter everywhere else. Apple's licence forbids self-hosting SF on the web, so this is the correct way to use it. To use another font: `npm i @fontsource/<name>`, swap the imports in `fonts.ts`, put it first in `fontFamily`. Keep `fontFamilyOutline` on a static font (stroked text shows overlaps on variable fonts). |
| **Large-screen scaling** (how big type/layout get on 1920 / 2560 / ultrawide) | `src/theme/layout.ts` → `rootScale` and `container` | Root size is 16px up to 1440w, then grows to `max`. Everything is rem, so type, spacing and the container scale together. |
| **Font sizes, weights, letter-spacing, line-height** | `src/theme/typography.ts` | Headline scale lives here. |
| **Radius, container width, gutters, section spacing, header height, button size** | `src/theme/layout.ts` | Lengths are rem (scale with the screen). |
| **Easings, durations, hero carousel timing, intro length** | `src/theme/motion.ts` | CSS and JS read the same values. |
| **Product finishes / SVG art colours** | `src/theme/art.ts` | Finish names are in `src/content/product.ts`. |
| **Page names, SEO titles & descriptions, header nav, footer columns, sitemap priority** | `src/config/pages.ts` | Nav, breadcrumbs, footer, `<title>` and sitemap are all derived from it. |
| **URL paths** | `src/config/routes.ts` | |
| **Button labels & destinations** (Book a Demo, Contact us, …) | `src/config/cta.ts` | Render with `<CtaLink cta={CTA.BOOK_DEMO} />`. |
| **Brand name, tagline, email, phone, WhatsApp number, address, legal entity** | `src/config/site.ts` | Real phone/WhatsApp/email set. Confirm the email spelling; address is empty (hidden). |
| **Where inquiries are saved** (Excel file or Google Sheet), rate limit, timezone | `.env.local` (see `.env.example`) and `docs/inquiry-sheet.md` | Server-side only. |
| **Sheet columns** | `src/server/inquiries/rows.ts` | |
| **Product numbers** (voltage, load, box depth, warranty, connectivity) | `src/config/specs.ts` | All provisional. Copy interpolates `SPEC`. |
| **Real photos / product renders** | drop files in `public/images/`, register in `src/config/images.ts` | Falls back to SVG placeholders when empty. |
| **Page copy and data** (features, use cases, FAQ, product, rooms, hotspots, gallery, personas, stats, compatibility roadmap, wall-checker questions, construction layers) | `src/content/*.ts` | Typed data; sections render from it. |
| **Hotspot positions, gallery images, room tabs** | `src/content/home.ts`, `src/content/rooms.ts` | Gallery items reference product variants/finishes or scenes, so real images from `config/images.ts` flow through automatically. |
| **Scroll-scene timing** (how long each pinned scene lasts) | the `height` prop on `<ScrollScene/>` (in vh) in `components/home/*`, `components/product/ExplodedView.tsx` | Progress is exposed to CSS as `--p`. |
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

## Scroll & interaction building blocks

| Component | What it does |
| --- | --- |
| `motion/ScrollScene` | Pins a section and scrubs CSS with `--p` (0→1) as you scroll. Static under reduced motion. |
| `home/ZoomReveal`, `home/FeatureWheel`, `product/ExplodedView` | Pinned scenes: rotating/zooming image diamond, feature wheel, exploded construction view. Steps are clickable and scroll the page to that point. |
| `motion/Counter`, `motion/Gauge` | Count-up numbers and a sweeping gauge when scrolled into view. |
| `motion/Marquee`, `motion/Parallax`, `motion/Tilt` | Outlined marquee, scroll parallax, pointer tilt. |
| `motion/ScrollProgress`, `motion/SectionNav`, `motion/ProgressRail` | Page progress line + back-to-top, section dots that follow/jump, progress rail on a list. |
| `media/Lightbox`, `MediaGallery`, `Zoomable` | Click any image to enlarge: `<dialog>`, focus trap, Esc, ←/→. |
| `home/HotspotRoom`, `home/RoomTabs`, `tools/WallChecker` | Clickable hotspots, room tabs, pre-install checklist. |

All of them respect `prefers-reduced-motion` and are covered by the Chrome test scripts.

## UI flow

```
Home ─┬─ Product ──── configurator (#configure), compare, gallery ──► Book a Demo
      ├─ Technology ─ exploded view, 4 feature pages ► Contact / Book a Demo
      ├─ Use Cases ── 3 use-case pages ──────────► Book a Demo (?intent=homeowner|architect)
      ├─ How It Works ─ wall checker ────────────► Book a Demo / Contact
      ├─ FAQ ────────────────────────────────────► Contact / Book a Demo
      ├─ About ──────────────────────────────────► Book a Demo / Contact
      └─ Contact · Book a Demo ─ form ─► mailto handoff (no backend) ─► success state
Footer: Explore · Company · Legal (Privacy, Terms, Cookies) — all driven by pages.ts
Mobile: hamburger menu + sticky dock (Book a Demo · Contact)
```
