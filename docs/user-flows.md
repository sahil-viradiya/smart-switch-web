# Smart Switch — User Flows & Conversion Journeys

## 1. Primary Persona Profiles

1. **The Modern Homeowner (Alex)**:
   - *Goal*: Seeking premium, reliable electrical switches that look sophisticated on the wall, operate silently, and work physically even if Wi-Fi drops.
   - *Concerns*: Wiring compatibility, neutral wire requirements, ease of certified installation.
2. **The Architect / Interior Designer (Sophia)**:
   - *Goal*: Specifying minimal, high-end switch plates that complement luxury interiors across residential or boutique commercial projects.
   - *Concerns*: Finish options (matte black, brushed aluminum, minimal white), multi-gang flush mounting, technical spec sheets.
3. **The Certified Electrician / Trade Partner (Marcus)**:
   - *Goal*: Recommending reliable, safe hardware that complies with electrical code, doesn't cause nuisance callbacks, and offers partner pricing.
   - *Concerns*: Terminal wiring space, voltage/wattage ratings, certified safety standards, dealer onboarding.

---

## 2. Journey 1: Homeowner Consultation & Quote Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as Homeowner (Alex)
    participant Web as Next.js Frontend
    participant API as Express API
    participant DB as Lead Repository

    User->>Web: Visits Homepage (/)
    Web->>User: Displays Hero, Tactile Product Preview & Verified Benefits
    User->>Web: Clicks "Explore Product" or "How It Works"
    Web->>User: Navigates to /how-it-works (Highlights 3-step installation)
    User->>Web: Clicks CTA "Request Consultation" (/request-demo)
    Web->>User: Renders Accessible Lead Capture Form
    User->>Web: Enters Name, Email, Phone, Property Type, and Notes
    Web->>Web: Runs Client-Side Zod Validation (Real-time feedback)
    User->>Web: Submits Form
    Web->>API: POST /api/v1/leads (Payload + Client Attribution)
    API->>API: Runs Rate Limiting & Strict Server-side Zod Schema
    API->>DB: Stores New Lead Record (Status: NEW)
    DB-->>API: Returns Generated Lead ID & Timestamp
    API-->>Web: Returns HTTP 201 Created ({ success: true, leadId: ... })
    Web->>User: Displays Instant Confirmation Screen & Follow-up Timeline
```

---

## 3. Journey 2: Architect Spec Sheet & Sample Kit Request

```mermaid
sequenceDiagram
    autonumber
    actor Arch as Architect (Sophia)
    participant Web as Next.js Frontend
    participant API as Express API
    participant DB as Lead Repository

    Arch->>Web: Arrives at /use-cases/architectural-renovations
    Web->>Arch: Shows Flush Multi-Gang Aesthetics & Minimal Finish Options
    Arch->>Web: Navigates to /product for Technical Dimensions
    Web->>Arch: Displays 1-Gang, 2-Gang, 3-Gang Dimensional Blueprints
    Arch->>Web: Clicks "Request Architect Spec Kit" (/request-demo?intent=architect)
    Web->>Arch: Form pre-populates Inquiry Type = "Commercial / Architect Project"
    Arch->>Web: Submits Firm Name, Project Scale, and Sample Request
    Web->>API: POST /api/v1/leads
    API->>DB: Saves Lead tagged with "ARCHITECT_SAMPLE_KIT"
    API-->>Web: HTTP 201 Success
    Web->>Arch: Shows Confirmation with Instant Spec Sheet PDF Download Link
```

---

## 4. Journey 3: Certified Electrician / Trade Partner Onboarding

```mermaid
sequenceDiagram
    autonumber
    actor Elec as Electrician (Marcus)
    participant Web as Next.js Frontend
    participant API as Express API
    participant DB as User Repository

    Elec->>Web: Visits /how-it-works, scrolls to "Certified Trade Network"
    Elec->>Web: Clicks "Join Installer Network" (/signup)
    Web->>Elec: Renders Trade Partner Registration Form
    Elec->>Web: Enters Full Name, Electrical License Number, Email, Password
    Web->>Web: Validates Password Complexity & License Format
    Elec->>Web: Submits Form
    Web->>API: POST /api/v1/auth/signup (Role: INSTALLER)
    API->>API: Checks for Existing Duplicate Account
    API->>API: Hashes Password with bcrypt (12 rounds)
    API->>DB: Creates Partner Account Record (Status: PENDING_VERIFICATION)
    API-->>Web: HTTP 201 Created ({ success: true, token: ..., user: ... })
    Web->>Elec: Redirects to Registration Success Screen with Portal Guidance
```

---

## 5. Journey 4: General Customer Support / FAQ Discovery

```mermaid
sequenceDiagram
    autonumber
    actor Visitor as Prospective Buyer
    participant Web as Next.js Frontend
    participant API as Express API

    Visitor->>Web: Navigates to /faq
    Web->>Visitor: Shows Categorized Q&A (Wiring, Connectivity, Warranty)
    Visitor->>Web: Uses FAQ Category Filters or Search Input
    Web->>Visitor: Expands Accordion (Accessible ARIA expanded state)
    Visitor->>Web: Still has technical inquiry -> clicks "Contact Support"
    Web->>Visitor: Navigates to /contact
    Visitor->>Web: Fills Contact Form with Department = "Technical Support"
    Web->>API: POST /api/v1/contact
    API-->>Web: HTTP 200 OK
    Web->>Visitor: Displays Submission Receipt & Direct Support Contact Info
```
