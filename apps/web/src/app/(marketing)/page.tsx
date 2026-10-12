import Link from 'next/link';
import { ROUTES, VERIFIED_SPECS } from '@smart-switch/shared-config';
import { InteractiveSwitchPreview } from '../../components/product/InteractiveSwitchPreview';
import { FaqAccordion } from '../../components/ui/FaqAccordion';
import { LeadForm } from '../../components/forms/LeadForm';

export default function HomePage() {
  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="section" style={{ paddingTop: '100px', paddingBottom: '70px', position: 'relative' }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', marginBottom: '56px' }}>
            <div className="badge badge-emerald" style={{ marginBottom: '20px' }}>
              Architectural Electrical Controls
            </div>
            <h1 className="heading-display" style={{ marginBottom: '24px' }}>
              Precision Control for the <span className="gradient-text">Modern Wall</span>
            </h1>
            <p className="text-lead" style={{ maxWidth: '680px', margin: '0 auto 36px' }}>
              A refined architectural smart switch combining tactile mechanical actuation, micro-LED feedback, and certified electrical safety. Built for luxury residences and curated spaces.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={ROUTES.REQUEST_DEMO} className="btn btn-primary btn-lg">
                Request Consultation & Quote
              </Link>
              <Link href={ROUTES.PRODUCT} className="btn btn-secondary btn-lg">
                Explore Specifications
              </Link>
            </div>
          </div>

          {/* Interactive Hardware Simulator */}
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <InteractiveSwitchPreview />
          </div>
        </div>
      </section>

      {/* 2. VERIFIED VALUE PROPOSITIONS */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
            <h2 className="heading-h2" style={{ marginBottom: '12px' }}>
              Engineered With Purpose, Built Without Hyperbole
            </h2>
            <p className="text-body">
              Every detail is calibrated for tactile reliability, electrical compliance, and timeless aesthetic restraint.
            </p>
          </div>

          <div className="grid-3">
            {/* Benefit 1 */}
            <div className="card">
              <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="heading-h3" style={{ marginBottom: '10px' }}>Tactile Actuation</h3>
              <p className="text-body" style={{ fontSize: '0.925rem', lineHeight: 1.6 }}>
                Crisp mechanical switch throw paired with a dampened micro-relay. Delivers satisfying acoustic feedback without cheap plastic clatter.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="card">
              <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="heading-h3" style={{ marginBottom: '10px' }}>Local Fail-Safe Relay</h3>
              <p className="text-body" style={{ fontSize: '0.925rem', lineHeight: 1.6 }}>
                Operates physically and immediately at the wall plate even if home Wi-Fi or router networks are down. Never leaves you in the dark.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="card">
              <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18M15 3v18" />
                </svg>
              </div>
              <h3 className="heading-h3" style={{ marginBottom: '10px' }}>Standard Box Modularity</h3>
              <p className="text-body" style={{ fontSize: '0.925rem', lineHeight: 1.6 }}>
                Engineered to fit standard 1-gang, 2-gang, and 3-gang electrical back-boxes (min 35mm depth). Seamless alignment on existing wall structures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT OVERVIEW & FORM FACTOR */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '56px' }}>
            <div>
              <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
                Material Integrity
              </div>
              <h2 className="heading-h2" style={{ marginBottom: '20px' }}>
                Architectural Finishes Crafted for Longevity
              </h2>
              <p className="text-body" style={{ lineHeight: 1.7, marginBottom: '24px' }}>
                Each switch plate is manufactured using flame-retardant UL94 V-0 polycarbonate cores with precision-milled aluminum trim options. The subtle micro-LED indicators provide state visibility without disturbing bedrooms or ambient mood lighting.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>✓</div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Fingerprint-Resistant Matte Texture:</strong> Ultra-fine surface finish prevents unsightly smudge marks from daily use.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>✓</div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>100,000 Actuation Endurance:</strong> Industrial-grade mechanical micro-switches tested for over two decades of typical residential switching.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>✓</div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Standard Screwless Snap Faceplates:</strong> Clean aesthetic with concealed mounting screws for architect-grade installations.
                  </div>
                </div>
              </div>

              <Link href={ROUTES.PRODUCT} className="btn btn-primary">
                View Full Variant Dimensions
              </Link>
            </div>

            {/* Visual Hardware Diagram Card */}
            <div className="card" style={{ padding: '36px', background: 'var(--bg-elevated)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', letterSpacing: '0.05em' }}>
                Hardware Anatomy Blueprint
              </div>
              <div style={{ border: '1px dashed var(--border-medium)', borderRadius: 'var(--radius-md)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0B111E' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Surface Plate</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Anodized Metal / V-0 Polycarbonate</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Relay Mechanism</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>10A Micro-Acoustic Contact</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Surge Protection</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Integrated Over-Voltage Clamping</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Wiring Terminals</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Screw-Clamp (Live, Neutral, Earth, Load)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Electrical Voltage</span>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{VERIFIED_SPECS.VOLTAGE_RANGE}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS / CERTIFIED PROCESS */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 56px' }}>
            <div className="badge badge-amber" style={{ marginBottom: '16px' }}>
              Safety-First Workflow
            </div>
            <h2 className="heading-h2" style={{ marginBottom: '12px' }}>
              Three Steps from Specification to Operation
            </h2>
            <p className="text-body">
              Clear delineation between project planning, certified electrical installation, and everyday automation.
            </p>
          </div>

          <div className="grid-3">
            <div className="card">
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '12px' }}>
                01
              </div>
              <h3 className="heading-h3" style={{ marginBottom: '10px' }}>
                Layout & Wiring Audit
              </h3>
              <p className="text-body" style={{ fontSize: '0.925rem', lineHeight: 1.6 }}>
                Verify wall-box gang dimensions and confirm the presence of neutral wires in your electrical back-boxes. Select the appropriate 1-gang, 2-gang, or 3-gang configurations.
              </p>
            </div>

            <div className="card" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-amber)', marginBottom: '12px' }}>
                02
              </div>
              <h3 className="heading-h3" style={{ marginBottom: '10px' }}>
                Certified Installation
              </h3>
              <p className="text-body" style={{ fontSize: '0.925rem', lineHeight: 1.6 }}>
                A licensed electrical contractor de-energizes the main circuit breaker, wires Live, Neutral, and Load leads into the labeled terminal blocks, and secures the flush mounting plate.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '12px' }}>
                03
              </div>
              <h3 className="heading-h3" style={{ marginBottom: '10px' }}>
                Instant Tactile Control
              </h3>
              <p className="text-body" style={{ fontSize: '0.925rem', lineHeight: 1.6 }}>
                Restore breaker power. The switch operates immediately through its tactile physical rockers, while LED status indicators confirm power integrity and connectivity.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href={ROUTES.HOW_IT_WORKS} className="btn btn-outline">
              Review Detailed Electrician Installation Protocol →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED SPECIFICATIONS TABLE */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <h2 className="heading-h2" style={{ marginBottom: '12px' }}>
              Confirmed Electrical & Mechanical Specifications
            </h2>
            <p className="text-body">
              Transparent parameters adhering strictly to verified hardware criteria.
            </p>
          </div>

          <div
            style={{
              maxWidth: '840px',
              margin: '0 auto',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.925rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-medium)' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-primary)' }}>Specification Item</th>
                  <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-primary)' }}>Verified Technical Value</th>
                  <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-primary)' }}>Verification Note</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 24px', color: 'var(--text-secondary)' }}>Rated Operating Voltage</td>
                  <td style={{ padding: '14px 24px', color: 'var(--text-primary)', fontWeight: 600 }}>{VERIFIED_SPECS.VOLTAGE_RANGE}</td>
                  <td style={{ padding: '14px 24px', color: 'var(--text-muted)' }}>Confirmed hardware rating</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 24px', color: 'var(--text-secondary)' }}>Maximum Load (per gang)</td>
                  <td style={{ padding: '14px 24px', color: 'var(--text-primary)', fontWeight: 600 }}>{VERIFIED_SPECS.MAX_CURRENT_PER_GANG}</td>
                  <td style={{ padding: '14px 24px', color: 'var(--text-muted)' }}>Tested with LED drivers and incandescent loads</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 24px', color: 'var(--text-secondary)' }}>Neutral Wire Requirement</td>
                  <td style={{ padding: '14px 24px', color: 'var(--accent-amber)', fontWeight: 600 }}>Required for Standard Models</td>
                  <td style={{ padding: '14px 24px', color: 'var(--text-muted)' }}>Wall box inspection necessary prior to installation</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 24px', color: 'var(--text-secondary)' }}>Housing Fire Rating</td>
                  <td style={{ padding: '14px 24px', color: 'var(--text-primary)', fontWeight: 600 }}>{VERIFIED_SPECS.CASING_FIRE_RATING}</td>
                  <td style={{ padding: '14px 24px', color: 'var(--text-muted)' }}>Flame self-extinguishing specification</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 24px', color: 'var(--text-secondary)' }}>Ambient Operating Temp</td>
                  <td style={{ padding: '14px 24px', color: 'var(--text-primary)', fontWeight: 600 }}>{VERIFIED_SPECS.OPERATING_TEMPERATURE}</td>
                  <td style={{ padding: '14px 24px', color: 'var(--text-muted)' }}>Indoor environments only</td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 24px', color: 'var(--text-secondary)' }}>Manufacturer Warranty</td>
                  <td style={{ padding: '14px 24px', color: 'var(--accent-primary)', fontWeight: 600 }}>{VERIFIED_SPECS.WARRANTY_MONTHS} Months Comprehensive</td>
                  <td style={{ padding: '14px 24px', color: 'var(--text-muted)' }}>Subject to certified electrical installation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. REAL-WORLD USE CASES */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
            <h2 className="heading-h2" style={{ marginBottom: '12px' }}>
              Tailored for Distinct Spaces
            </h2>
            <p className="text-body">
              How Smart Switch elevates residences, heritage retrofits, and boutique commercial studios.
            </p>
          </div>

          <div className="grid-3">
            <div className="card">
              <h3 className="heading-h3" style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>
                Luxury Residences
              </h3>
              <p className="text-body" style={{ fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Multi-gang hallway switches and bedside master toggles that complement curated interior architecture.
              </p>
              <Link href={ROUTES.USE_CASES_SLUG('residential-homes')} style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                Read Residential Case Study →
              </Link>
            </div>

            <div className="card">
              <h3 className="heading-h3" style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>
                Historic Restorations
              </h3>
              <p className="text-body" style={{ fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Non-destructive retrofit wall mounting preserving original plasterwork and lath walls.
              </p>
              <Link href={ROUTES.USE_CASES_SLUG('architectural-renovations')} style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                Read Renovation Case Study →
              </Link>
            </div>

            <div className="card">
              <h3 className="heading-h3" style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>
                Commercial Studios
              </h3>
              <p className="text-body" style={{ fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '20px' }}>
                High-end design studios and executive suites demanding rigorous daily durability and minimal visual noise.
              </p>
              <Link href={ROUTES.USE_CASES_SLUG('commercial-studios')} style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                Read Commercial Case Study →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <h2 className="heading-h2" style={{ marginBottom: '12px' }}>
              Common Questions & Technical Clarifications
            </h2>
            <p className="text-body">
              Verified answers to compatibility, neutral wire wiring, and installer certifications.
            </p>
          </div>

          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* 8. HIGH-CONVERSION LEAD CAPTURE SECTION */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}
