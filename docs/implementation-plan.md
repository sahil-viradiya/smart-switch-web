# Smart Switch — Phased Implementation Plan

## 1. Plan Overview

This plan defines the step-by-step technical execution roadmap for building the **Smart Switch** product marketing website and companion Node.js Express REST API. 

Each phase includes distinct milestones, deliverables, verification criteria, and quality gates to ensure a modular, production-ready system.

---

## 2. Implementation Phases & Milestones

### Phase 1: Repository Audit, Initial Documentation & Environment Baseline (COMPLETED)
- [x] Workspace inspection and runtime verification (Node.js v24.21.0, npm 11.19.0 on macOS arm64).
- [x] Git repository initialization and default branch set to `main`.
- [x] Creation of core architecture and planning documents:
  - `docs/requirements.md`
  - `docs/architecture.md`
  - `docs/page-map.md`
  - `docs/user-flows.md`
  - `docs/implementation-plan.md`

---

### Phase 2: Monorepo Foundation, Workspace Configuration & Shared Tooling
- [ ] Root `package.json` with npm workspaces (`apps/*`, `packages/*`).
- [ ] Root TypeScript configuration (`tsconfig.base.json`).
- [ ] Create shared packages:
  - `packages/shared-types`: TypeScript interfaces for Leads, Contacts, Users, and API Responses.
  - `packages/shared-validation`: Zod schemas for forms and backend endpoints.
  - `packages/shared-config`: Shared constants, route paths, environment definitions.
- [ ] Setup unified linting, formatting, and build scripts.

---

### Phase 3: Express REST API Backend (`apps/api`)
- [ ] TypeScript Express application setup with strict type checking.
- [ ] Security middleware configuration:
  - Helmet for security headers.
  - CORS configuration with origin control.
  - Body parser with strict payload size limits (50kb max).
  - Rate limiting middleware on public mutation endpoints.
- [ ] Domain modules:
  - `health`: `GET /api/v1/health` with uptime and version check.
  - `leads`: `POST /api/v1/leads` with schema validation, sanitized storage, and unique tracking IDs.
  - `contact`: `POST /api/v1/contact` for general and technical support inquiries.
  - `auth`: `POST /api/v1/auth/signup`, `POST /api/v1/auth/login`, and `/forgot-password` with bcrypt password hashing and token generation.
- [ ] Centralized error handler returning consistent JSON errors.
- [ ] Automated API test suite using Jest / Node test runner.

---

### Phase 4: Next.js Frontend Foundation & Design System (`apps/web`)
- [ ] Next.js (App Router) project setup in `apps/web`.
- [ ] Custom design system in `styles/` using CSS variables:
  - Architectural color palette: Slate darks (`#0F172A`, `#1E293B`), Warm whites (`#F8FAFC`, `#FFFFFF`), Precision accents (Emerald `#10B981`, Amber `#F59E0B`, Electric Indigo `#4F46E5`).
  - Typography scale: Inter / SF Pro font family with balanced line-heights and letter-spacing.
  - Spacing, container widths (`1280px` max), elevation shadows, and border-radius tokens.
- [ ] Reusable UI component library (`components/ui`):
  - `Button` (primary, secondary, outline, ghost, loading state).
  - `Input`, `Textarea`, `Select`, `Label`, `FieldError`.
  - `Badge`, `Card`, `Container`, `SectionHeading`.
  - `Accordion` (accessible keyboard navigation, ARIA states).
  - `Dialog / Modal`.
- [ ] Global layout elements (`components/layout`):
  - Sticky accessible Header with DesktopNav and MobileNav drawer.
  - Comprehensive Footer with navigation links, contact info, and legal links.

---

### Phase 5: Core Marketing Pages Implementation
- [ ] **Homepage (`/`)**:
  - Hero section with clear value proposition and product imagery.
  - Interactive switch visual preview (1-gang, 2-gang, 3-gang toggles).
  - Key benefits (Tactile feedback, safety-first engineering, multi-gang modularity).
  - Feature highlights grid with links to feature deep-dives.
  - 3-step "How It Works" overview.
  - Use case snapshots.
  - Product specifications summary table.
  - FAQ preview.
  - High-conversion lead capture banner.
- [ ] **Product Page (`/product`)**:
  - Detailed dimension drawings, material breakdown, and modular faceplate gallery.
  - Technical variant comparison matrix.
  - Electrical prerequisites and neutral wire notice.
- [ ] **Features Directory (`/features`) & Dynamic Feature Pages (`/features/[slug]`)**:
  - `/features/tactile-precision`
  - `/features/electrical-safety`
  - `/features/modular-design`
  - `/features/smart-ecosystem`
- [ ] **How It Works Page (`/how-it-works`)**:
  - Pre-installation electrical audit guide.
  - Certified electrician installation protocol.
  - Daily operation and local fail-safe features.
- [ ] **Use Cases Directory (`/use-cases`) & Slug Pages (`/use-cases/[slug]`)**:
  - `/use-cases/residential-homes`
  - `/use-cases/architectural-renovations`
  - `/use-cases/commercial-studios`
- [ ] **About Page (`/about`)**:
  - Engineering philosophy, safety standards, and team mission.
- [ ] **FAQ Page (`/faq`)**:
  - Categorized FAQ with real-time category filtering and accessible accordions.
- [ ] **Legal Pages**:
  - `/privacy-policy`, `/terms-and-conditions`, `/cookies`.

---

### Phase 6: Lead Generation & Interactive Forms Flow
- [ ] **Request Demo / Consultation Page (`/request-demo`)**:
  - High-intent form with real-time client-side Zod validation.
  - Form state management: Idle, Submitting, Success receipt, Error alert.
  - Duplicate submission prevention.
  - Full API integration with `POST /api/v1/leads`.
- [ ] **Contact Page (`/contact`)**:
  - Department routing form connected to `POST /api/v1/contact`.
  - Direct contact information, business hours, and electrical emergency notice.

---

### Phase 7: Account & Authentication Flow (`/signup`, `/login`, `/forgot-password`)
- [ ] **Installer & Partner Signup (`/signup`)**:
  - Role selection (Certified Installer, Architect, Homeowner).
  - Password strength validation and terms agreement.
  - Integration with `POST /api/v1/auth/signup`.
- [ ] **Login (`/login`)**:
  - Secure credential authentication against `POST /api/v1/auth/login`.
- [ ] **Password Recovery (`/forgot-password`)**:
  - Self-service reset form connected to `POST /api/v1/auth/forgot-password`.

---

### Phase 8: SEO, Accessibility & Performance Optimization
- [ ] Dynamic XML sitemap generator (`app/sitemap.ts`).
- [ ] Optimized `robots.ts` protecting account and API routes.
- [ ] Open Graph & Twitter Card social sharing meta images.
- [ ] Semantic HTML and WCAG 2.1 AA keyboard accessibility audit.
- [ ] Custom 404 (`not-found.tsx`), `error.tsx`, and `loading.tsx` pages.

---

### Phase 9: Testing, Verification & Quality Assurance
- [ ] Automated API unit and integration tests.
- [ ] TypeScript strict type check verification (`tsc --noEmit`).
- [ ] Next.js production build verification (`npm run build`).
- [ ] Express server production execution check.
- [ ] Comprehensive link, navigation, and form submission verification.

---

### Phase 10: Final Deployment Documentation & Deliverables
- [ ] Detailed deployment guides for Vercel (Frontend) and Node/Docker (Backend).
- [ ] Database migration schema (`database/schema.sql`).
- [ ] `.env.example` templates for both applications.
- [ ] Comprehensive root `README.md`.
