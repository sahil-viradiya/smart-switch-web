# Smart Switch — Design Brief (from reference analysis)

> Status: implemented. Tokens in `src/theme/` (colors, typography, layout, motion); keyframes in `src/styles/animations.css`. Screenshots in `docs/refrences/`.

Reference: LUEUR Smart Home website case study (Behance, screenshots in `docs/refrences/`).
Use: **structural and stylistic inspiration only.** Smart Switch must have its own logo, copy, photography/renders and component code. Do not reuse LUEUR's name, logo, images, text or exact layout.

## 1. What the reference does

**Visual language**
- Dark foundation (`#090B0A`), warm gold accent (`#C99C49`), warm paper off-white (`#F5F2EB`), plain white cards.
- Clean sans-serif, very large light-weight headlines; hierarchy through size, not weight.
- Signature headline device: two-line statement where line 2 is **outlined/ghosted text** ("Your home. / *Intuitively yours.*"), and second lines of other headings are dimmed grey.
- Small gold uppercase eyebrow labels with wide tracking ("INTELLIGENT SPACES. EFFORTLESS LIVING."), numbered section labels (01 / 02 ...).
- Pill buttons: filled gold primary + outlined secondary; header CTA is a pill with a small circular gold arrow.
- Rounded cards (large radius), hairline borders, generous whitespace, thin 1px dividers.
- Dark and light sections alternate: dark hero → paper/white product grid → dark app section → paper ecosystem → dark features → paper team → dark CTA band → dark footer.

**Page structure (home)**
1. Header: logo, Home / Products ▾ / Technology / Contact, "Book a Demo" pill.
2. Hero: eyebrow, 2-line headline, subcopy, two CTAs, tag row (Lighting · Comfort · Security · Control), arch-shaped image frame with a house-outline line drawing and floating labelled hotspots ("Smart Lighting", "Voice Control"…) plus a scene chip ("Explore the scene — Living Room").
3. Right-edge sticky side tabs: **Brochure**, **Video**. Floating WhatsApp button.
4. "One home. Every touchpoint connected." — product category card grid (image, label, 1-line description, spec chips).
5. About strip: "Designed to make smart living feel simple." with image.
6. Philosophy: dark band, 3 numbered principles.
7. Mobile app section: phone mockups, 3 numbered benefits, store badges.
8. Ecosystem diagram: central circle with orbiting labelled nodes.
9. "Why" section: dark, 2×2 numbered benefit grid.
10. Leadership cards; CTA band ("A smarter home should feel like a better home" + gold/white pill); footer with quick links, products, regional office cards, social.

**Product detail page (Smart Switch)**
- Dark hero with product render and "Ask about this product" / "Explore details".
- "Works with" integration strip.
- "Smart control. Beautifully simple." — 5 numbered feature cells with icons.
- Configuration: **Choose your module** (2 / 4 / 8 module image cards) and **Choose your finish** (colour swatches).
- "Control beyond the wall" app section, CTA band, footer.

**Product collection page**: dark hero, then stacked category sections (numbered, "View category →"), card grids, closing ecosystem CTA band.

**Mobile**: same identity; stacked hero, full-width pill CTAs, hamburger in a circle, **sticky bottom bar** with "Book a Demo" + "WhatsApp".

## 2. Mapping to Smart Switch (single product)

LUEUR sells a whole range; we sell one product, so we compress:

| LUEUR section | Smart Switch equivalent |
| --- | --- |
| Product category grid | Variants (1/2/3-gang, dimmer) and finishes — reuse existing `InteractiveSwitchPreview` as the hero/configurator |
| Ecosystem orbit diagram | Connectivity / local fail-safe diagram (provisional wording only) |
| Mobile app section | Cut (no app is verified); or replace with "Works without the internet" |
| Leadership cards | Cut unless real team content exists |
| Regional office cards | Single contact block from `APP_CONFIG` |
| Brochure / Video tabs | Only if a real file/video exists — otherwise no (no dead links) |
| WhatsApp button | Only if a real number is provided |

Existing routes stay. Hardware-integrity rule still applies: spec and compatibility claims remain **provisional**.

## 3. Proposed tokens

```
--bg-dark:   #090B0A   --accent-gold: #C99C49   --bg-paper: #F5F2EB   --bg-card: #FFFFFF
```
(Current site uses slate/emerald/indigo; this replaces it.) Fonts: one clean sans, large light weights (e.g. Inter or Geist via `next/font`).

## 4. Animation plan (the "pro animation" layer)

The screenshots are static, so motion is our design. Candidates, all honouring `prefers-reduced-motion`:
- Hero: headline line-by-line mask reveal; outlined line 2 fills with colour on load; house-outline SVG path draws itself; hotspots pulse and fade in sequentially.
- Scroll: section fade/translate reveals, staggered card entrance, numbered labels count in, dark↔paper section colour transitions.
- Product: switch preview with tactile press feedback, finish swatch cross-fade, gang module morph.
- Ecosystem diagram: nodes orbit slowly, connecting lines draw on scroll.
- Micro: pill button arrow slide, card lift/image zoom on hover, header shrink + blur on scroll, sticky mobile bottom bar.
- Library suggestion: Framer Motion (`motion`) for orchestration; CSS for hovers.

## 5. Findings from the live reference (lueur.io)

Technique study only; no code, copy or assets are reused. The live site is plain HTML/CSS/vanilla JS with Bootstrap, so **motion there is lightweight**: no GSAP, Lenis or Lottie. Smart Switch can match this with CSS + small hooks (and Framer Motion only where orchestration helps).

| Pattern | How it is done | Take-away for us |
| --- | --- | --- |
| Entry reveal | `@keyframes reveal` 0.75s ease, opacity 0→1 + translateY(20px)→0, `.reveal-up`, hero visual delayed 0.12s | Same recipe; add stagger |
| Intro splash | Fixed overlay ~2.65s: logo fades in, a hand "touches" it, gold ripple ring scales to 10x. Plays **once per session** (`sessionStorage`), only on a fresh navigation, skipped if load > 1.5s, skipped for `prefers-reduced-motion`, dismissible on any key/click, hard 3s timeout | Great idea for a *switch*: a "tap → light turns on" intro. Keep every safeguard |
| Hero scene carousel | Web Animations API, 2s hold + 2s "camera travel" (translate3d in perspective, scale 1.35→1, cross-fade), easing `cubic-bezier(.45,0,.2,1)`; pauses when tab hidden, off-screen (IntersectionObserver) or reduced-motion; preloads with `img.decode()` | Use for room scenes (switch on a wall in different rooms/finishes) |
| Floating captions | Glass chips: `rgba(8,11,9,.86)`, 16px backdrop blur, 1px gold border at 32% alpha, 11px radius | Reuse the *style* for hotspot labels |
| Ambient loops | `hero-image-float` (±7px), node float (±6px), orbit rotate cw/ccw, centre breath/glow, signal pulse rings, phone float L/C/R | Orbit diagram + gentle product float |
| Scroll triggers | `IntersectionObserver` at ~30% visibility, replays on re-entry for the ecosystem and app showcases | Reveal-on-view hook, replay optional |
| Hover | Cards lift `translateY(-4px)` and invert to dark; buttons lift 2px; transitions 0.25–0.6s; easings `cubic-bezier(.2,.7,.2,1)` / `(.22,1,.36,1)` | Adopt as our token easings |
| Reduced motion | 11 separate `prefers-reduced-motion` guards; global `animation:none; transition:none` | Single global guard + JS check |
| Mobile | Fixed bottom dock (Brochure / Video / Book a Demo / WhatsApp), details/summary hamburger | Dock with only real actions |
| Tokens | gold `#C99C49` (light `#D8AD5C`), black `#090B0A`, soft `#111310`, card `#161816`, ivory `#F4F1E9`, dark line `rgba(255,255,255,.10)`, font Inter | Matches our chosen palette |

Caveat: the live site differs slightly from the case-study screenshots (e.g. "Aura Series", villa room scenes), so treat the screenshots as the visual target and the live code as technique reference.

## 6. Decisions
1. **Palette: dark + gold (confirmed).**
2. Hero imagery: no assets yet; use CSS/SVG-drawn switch placeholders until renders are supplied.
3. Sticky Brochure/Video/WhatsApp: only with real assets/number.
4. Animation stack: CSS keyframes/transitions + a small `useReveal` (IntersectionObserver) hook; Framer Motion only if needed for orchestration. Everything honours `prefers-reduced-motion`.
