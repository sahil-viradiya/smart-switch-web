# Smart Switch — Complete Page & URL Inventory

## 1. Route Rules & URL Policy

1. **Lowercase Hyphenated Slugs**: All URLs use lowercased, semantic, hyphen-separated tokens (e.g., `/how-it-works`, `/use-cases/architectural-renovations`).
2. **Stable Canonical URLs**: Every page exports a canonical meta tag matching the production domain without trailing slashes.
3. **No Dead Links / Placeholders**: Zero placeholder links or `href="#"`. Every link routes to a fully implemented page or valid in-page anchor ID.
4. **Clean Fallbacks**: Non-existent paths return a semantic HTTP 404 response with navigation guidance.
5. **Private Route Indexing**: Account pages (`/signup`, `/login`, `/forgot-password`) contain `robots: { index: false, follow: false }`.

---

## 2. Public Marketing Route Inventory

| Route | Page Title | Primary Purpose | Primary Call to Action | API / Form Dependency | Indexable |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Smart Switch — Architectural Smart Electrical Controls | Homepage: value proposition, visual showcase, verified features, how it works, social proof, and inquiry capture. | "Request Consultation" / "Explore Product" | `POST /api/v1/leads` | Yes |
| `/product` | Product Overview & Specifications — Smart Switch | Deep dive into hardware form factor, materials, gang configurations, and verified electrical ratings. | "Request Spec Sheet & Quote" | None (Links to `/request-demo`) | Yes |
| `/features` | Engineered Capabilities & Features — Smart Switch | Complete directory of verified mechanical, electrical, and automation features. | "Explore Feature Details" | None | Yes |
| `/features/tactile-precision` | Tactile Precision & Actuation — Smart Switch | Feature deep-dive on mechanical switch action, micro-relay click, and durable faceplate materials. | "Request Product Sample" | Links to `/request-demo` | Yes |
| `/features/electrical-safety` | Electrical Safety & Protection — Smart Switch | Details on flame-retardant V-0 housing, surge suppression, and over-current prevention. | "Review Safety Guidelines" | Links to `/how-it-works` | Yes |
| `/features/modular-design` | Modular Multi-Gang Architecture — Smart Switch | Explains interchangeable 1-gang, 2-gang, and 3-gang snap-fit faceplate configurations. | "Configure Your Layout" | Links to `/product` | Yes |
| `/features/smart-ecosystem` | Open Smart Ecosystem & Connectivity — Smart Switch | Transparent breakdown of connectivity architecture and local fail-safe operation. | "Check Compatibility" | Links to `/faq` | Yes |
| `/how-it-works` | How It Works & Certified Installation — Smart Switch | Comprehensive 3-phase guide: Planning & Wiring Check, Certified Installation, and Daily Operation. | "Find a Certified Installer" | Links to `/contact` | Yes |
| `/use-cases` | Real-World Applications — Smart Switch | Overview of residential, architectural renovation, and commercial office use cases. | "Explore Case Studies" | None | Yes |
| `/use-cases/residential-homes` | Modern Residential Living — Smart Switch | Solutions for living rooms, bedrooms, and multi-way switching in luxury residences. | "Plan Residential Setup" | Links to `/request-demo` | Yes |
| `/use-cases/architectural-renovations` | Architectural & Historic Restorations — Smart Switch | Non-destructive retrofit installation preserving wall aesthetics. | "Consult Project Team" | Links to `/request-demo` | Yes |
| `/use-cases/commercial-studios` | Commercial Studios & Executive Offices — Smart Switch | High-durability electrical controls for creative studios and boutique commercial spaces. | "Inquire for Commercial" | Links to `/request-demo` | Yes |
| `/request-demo` | Request a Consultation & Product Demo — Smart Switch | High-intent lead generation form for homeowners, architects, and property developers. | "Submit Consultation Request" | `POST /api/v1/leads` | Yes |
| `/contact` | Contact Our Engineering & Sales Team — Smart Switch | Inquiries form with department routing (Sales, Technical Support, Partner Inquiries). | "Send Message" | `POST /api/v1/contact` | Yes |
| `/faq` | Frequently Asked Questions & Compatibility — Smart Switch | Searchable and categorized FAQ covering wiring, neutral wire, protocols, warranty, and orders. | "Have More Questions? Contact Us" | Links to `/contact` | Yes |
| `/about` | About Smart Switch — Engineering & Design Philosophy | Company mission, engineering standards, manufacturing ethics, and environmental stewardship. | "Partner With Us" | Links to `/contact` | Yes |
| `/privacy-policy` | Privacy Policy — Smart Switch | Transparent notice on lead data processing, cookie policies, and customer rights. | None | None | Yes |
| `/terms-and-conditions` | Terms & Conditions — Smart Switch | Terms of purchase, installation liabilities, and warranty documentation. | None | None | Yes |
| `/cookies` | Cookie Policy — Smart Switch | Detailed disclosure of essential and preference cookies. | None | None | Yes |

---

## 3. Account & Portal Route Inventory

| Route | Page Title | Primary Purpose | Primary Call to Action | API / Form Dependency | Indexable |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/signup` | Partner & Installer Portal Registration — Smart Switch | Onboarding for certified electricians, trade partners, and registered architects. | "Create Account" | `POST /api/v1/auth/signup` | No |
| `/login` | Sign In — Smart Switch Portal | Authenticate registered partners and clients. | "Sign In" | `POST /api/v1/auth/login` | No |
| `/forgot-password` | Password Recovery — Smart Switch Portal | Self-service password reset request for registered users. | "Send Reset Instructions" | `POST /api/v1/auth/forgot-password` | No |

---

## 4. System & Meta Route Inventory

| Route | Format / Handler | Purpose |
| :--- | :--- | :--- |
| `/not-found` (404) | Custom Server Component | Helpful error page with search links and return to homepage button. |
| `/sitemap.xml` | Dynamic XML (`app/sitemap.ts`) | Auto-generated indexing feed for all public marketing URLs with freshness dates. |
| `/robots.txt` | Text (`app/robots.ts`) | Directs search engine crawlers, protects `/signup`, `/login`, and `/api/*`. |
| `/manifest.webmanifest` | JSON (`app/manifest.ts`) | PWA manifest for desktop and mobile home screen bookmarking. |
