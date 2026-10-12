# Smart Switch — Product Requirements & Assumptions Document

## 1. Executive Summary & Purpose

The **Smart Switch** project encompasses a complete, modern, production-grade marketing website for an architectural and smart-home electrical switch product. 

The website's primary objectives are:
1. Clearly communicate the product's architectural aesthetic, tactile build quality, and automation benefits.
2. Provide verified technical and electrical specifications, clearly separating verified facts from unverified assumptions.
3. Establish homeowner, architect, and professional installer trust through transparency, rigorous safety guidelines, and honest technical limitations.
4. Capture high-intent, qualified sales and installation inquiries through interactive consultation forms.

---

## 2. Product Definition & Technical Fact Baseline

### 2.1 Confirmed Technical Facts
- **Product Category**: Next-generation wall-mounted architectural electrical switch designed for residential and light-commercial electrical installations.
- **Physical Controls**: Precision mechanical tactile switches with micro-illumination LED status indicators.
- **Installation Standard**: Designed to fit standard gang wall-boxes (standard 1-gang, 2-gang, and 3-gang modular form factors).
- **Electrical Safety Principle**: Requires professional installation by a certified, licensed electrician. Electrical safety is prioritized above all convenience claims.

### 2.2 Unverified Assumptions & Verification Checklist
In accordance with strict professional standards, the following technical specifics are explicitly labeled as **assumptions requiring manufacturer verification**. The website and marketing copy will not fabricate these specifications until verified:

| Specification Domain | Current Baseline Assumption | Verification Status | Marketing / Copy Rule |
| :--- | :--- | :--- | :--- |
| **Wireless Protocol** | Hybrid Architecture (Wi-Fi 2.4GHz + Bluetooth LE for pairing, Matter/Thread readiness) | **Pending Hardware Confirmation** | State as "Engineered for open connectivity; exact protocols confirmed per regional hardware revision." |
| **Neutral Wire Requirement** | Requires Neutral wire (standard for modern smart switches; no-neutral variant under evaluation) | **Pending Regional SKU Spec** | Explicitly state: "Neutral wire required for standard installation. Check your wall box wiring before ordering." |
| **Voltage & Load Ratings** | 110V–240V AC, 50/60Hz, 10A max resistive load per gang | **Pending Engineering Lab Test** | Display as provisional ratings subject to national electrical code listings. |
| **Safety Certifications** | UL 60730 / CE / RoHS / FCC compliance pathway | **In Testing / Provisional** | Do not display active certification badges until accredited lab certificates are verified. |
| **Ecosystem Compatibility** | Apple HomeKit, Google Home, Amazon Alexa via Matter | **Readiness Claim Only** | Clarify "Matter readiness designed for cross-platform integration." Do not promise uncertified native badges. |
| **Energy Monitoring** | Hardware power-metering IC included in premium variant | **Variant Dependent** | Highlight on technical variant sheet only; do not guarantee on base model. |

---

## 3. Functional Requirements

### 3.1 Public Marketing Website
1. **Homepage (`/`)**:
   - Hero section communicating core value proposition without hyperbole.
   - Interactive 3D/high-fidelity product visual showcase (form factor, tactile finish, gang layouts).
   - Core customer benefits grounded in verified electrical convenience.
   - Verified feature matrix with transparent specification toggles.
   - 3-step "How It Works" workflow (Planning -> Professional Installation -> Enjoyment).
   - Use cases covering modern residences, architectural renovations, and boutique commercial environments.
   - Real-world FAQ addressing wiring, compatibility, warranty, and professional installation.
   - High-conversion lead capture component.
2. **Product Page (`/product`)**:
   - Comprehensive dimensions, materials (matte polycarbonate, brushed anodized aluminum trim), and modular faceplate options.
   - Interactive variant selector (1-Gang, 2-Gang, 3-Gang, Dimmer variant).
   - Electrical requirements checklist with downloadable specification sheet placeholder.
3. **Features Overview (`/features`) & Dynamic Feature Deep-Dives (`/features/[slug]`)**:
   - Slug `/features/tactile-precision`: Mechanical switch feel, silent relay actuation.
   - Slug `/features/electrical-safety`: Overcurrent, surge protection, flame-retardant V-0 casing.
   - Slug `/features/modular-design`: Multi-gang compatibility, standardized snap faceplates.
   - Slug `/features/smart-ecosystem`: Open protocol vision, local fail-safe operation (switch operates physically even without internet).
4. **How It Works (`/how-it-works`)**:
   - Step-by-step guidance differentiating homeowner tasks from certified electrician responsibilities.
   - Warning callouts reinforcing national electrical safety codes.
5. **Use Cases (`/use-cases`) & Slug Pages (`/use-cases/[slug]`)**:
   - `/use-cases/residential-homes`: Living rooms, bedrooms, multi-way switching corridors.
   - `/use-cases/architectural-renovations`: Preserving wall aesthetics with minimal plate design.
   - `/use-cases/commercial-studios`: Light management in offices and executive suites.
6. **Inquiry & Consultation Capture (`/request-demo` & `/contact`)**:
   - Form fields: Full Name, Work/Personal Email, Phone Number, Inquiry Type (Homeowner Consultation, Commercial / Architect Project, Certified Installer Partnership), Property Type, Message.
   - Real-time client-side Zod validation.
   - Accessible error messaging, duplicate prevention, and submission loading states.
7. **FAQ (`/faq`)**:
   - Structured Q&A grouped by Installation, Electrical Compatibility, Network Connectivity, and Orders.
8. **Legal & Compliance Pages**:
   - `/privacy-policy`: Explicit GDPR/CCPA-aligned data handling notice.
   - `/terms-and-conditions`: Product warranties, professional installation liabilities.
   - `/cookies`: Cookie usage disclosure.

---

## 4. Non-Functional Requirements

### 4.1 Performance & Core Web Vitals
- Largest Contentful Paint (LCP) < 1.8s.
- Cumulative Layout Shift (CLS) < 0.05.
- First Input Delay (FID) / Interaction to Next Paint (INP) < 100ms.
- Server-rendered HTML for instant First Contentful Paint.
- Self-hosted or optimized web fonts with swap display.

### 4.2 Accessibility (a11y)
- Full compliance with WCAG 2.1 Level AA standards.
- Minimum 4.5:1 color contrast ratio for normal text, 3:1 for large text.
- Full keyboard navigability (Tab, Enter, Escape for dialogs and mobile menus).
- Semantic HTML tags (`<main>`, `<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- ARIA live regions for form validation alerts.

### 4.3 Security & Privacy
- Security headers via `next.config.js`.
- Strict Content Security Policy (CSP) headers.
- Zero sensitive credentials or API keys exposed to browser bundles.

### 4.4 Search Engine Optimization (SEO)
- Unique, semantic title tags (< 60 chars) and meta descriptions (< 155 chars).
- Canonical URL declarations matching absolute production domains.
- Open Graph and Twitter Card metadata for rich previews.
- Dynamic XML sitemap (`/sitemap.xml`) and `robots.txt`.
- Structured data (`schema.org/Product` and `schema.org/Organization`) containing verified product parameters only.


### 4.5 Motion & Animation
- Pro-grade scroll, reveal and product-interaction animation is a planned phase (see implementation plan).
- Must respect `prefers-reduced-motion` and not hurt LCP/CLS targets.
