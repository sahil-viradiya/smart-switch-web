# Agent Development Rules & Conventions for Smart Switch

This repository contains the **Smart Switch** architectural smart-home electrical switch **marketing website**. It is a single Next.js app. The only server code is `POST /api/inquiries` (`src/app/api/inquiries`, `src/server/inquiries`), which saves demo requests, contact messages and subscriptions to an Excel sheet. There is no database or authentication; do not add any unless the user asks.

## Architectural Principles
1. **Single Next.js App** (App Router, `src/`):
   - `src/app`: routes. `src/components/{layout,product,forms,ui}`: UI.
   - `src/theme`: look. `src/config`: `ROUTES`, `PAGES`, `CTA`, `APP_CONFIG`, `SPEC`, `IMAGES`. `src/content`: copy. `src/lib/validation`: Zod schemas. `src/types`: shared types.
   - Import via the `@/` alias. Link only through `ROUTES`.
2. **Strict Hardware Integrity**:
   - Never fabricate unverified electrical ratings, certifications, or protocol compatibilities.
   - If a specification is unverified, clearly document it as provisional or pending lab confirmation (see `docs/requirements.md` §2.2).
3. **Security & Forms**:
   - Forms post to `/api/inquiries`. Only show a success state (with the server-issued reference) after the API confirms; on failure show `SubmitError` with WhatsApp/email/phone fallbacks. Never log or commit inquiry data (`data/` is git-ignored).
   - Contact details live only in `src/config/site.ts`.
   - Validate all form input with Zod.
4. **Design rules (strict)**:
   - Single sources of truth (see `docs/customization.md`): look → `src/theme/`; routes, page names/SEO/nav, CTA labels, brand/contact, specs, images → `src/config/`; copy → `src/content/`.
   - Use rem (not px) for sizes so large screens scale; viewport media queries stay in px.
   - Never hard-code a colour, font, route path, spec number, contact detail or CTA label elsewhere. `npm run check` must pass.
   - Dark/paper section rhythm, gold pill CTAs, numbered gold eyebrows, Inter. Visuals are SVG placeholders until real assets exist.
   - Page copy lives in `src/content/`; keep claims provisional unless verified.
5. **Code Quality**:
   - TypeScript `strict: true`; `npm run check` and `npm run build` must pass.
   - Semantic HTML, WCAG 2.1 AA keyboard accessibility, honour `prefers-reduced-motion` for all animation.
   - Zero broken links (`href="#"` is strictly prohibited).
