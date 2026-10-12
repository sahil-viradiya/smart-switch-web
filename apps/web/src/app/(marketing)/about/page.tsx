import { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES } from '@smart-switch/shared-config';

export const metadata: Metadata = {
  title: 'About Smart Switch — Engineering & Design Philosophy',
  description:
    'Learn about our architectural design philosophy, commitment to certified electrical safety, and dedication to tactile hardware excellence.',
};

export default function AboutPage() {
  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '56px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>About</span>
          </div>
          <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
            Design Philosophy
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '20px' }}>
            Restoring Physical Craft to the Electrical Wall
          </h1>
          <p className="text-lead">
            We believe that modern smart home automation shouldn’t replace reliable physical switches with laggy touchscreens, disposable plastic widgets, or mandatory cloud subscriptions.
          </p>
        </div>

        {/* Core Principles */}
        <div style={{ marginBottom: '80px' }}>
          <h2 className="heading-h2" style={{ marginBottom: '32px' }}>
            Our Engineering Principles
          </h2>

          <div className="grid-3">
            <div className="card">
              <div style={{ fontSize: '1.5rem', marginBottom: '16px' }}>🖐️</div>
              <h3 className="heading-h3" style={{ marginBottom: '10px' }}>Tactile Satisfaction</h3>
              <p className="text-body" style={{ fontSize: '0.925rem', lineHeight: 1.6 }}>
                Every interaction with a switch on your wall should feel deliberate, premium, and mechanical. We engineer balanced switch springs and acoustic micro-relays that satisfy every press.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '1.5rem', marginBottom: '16px' }}>🛡️</div>
              <h3 className="heading-h3" style={{ marginBottom: '10px' }}>Safety Above Gimmicks</h3>
              <p className="text-body" style={{ fontSize: '0.925rem', lineHeight: 1.6 }}>
                Electrical switches manage mains line voltage in residential walls. We never sacrifice fire-retardant V-0 casing polymers, proper terminal spacing, or surge suppression for cost cutting.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '1.5rem', marginBottom: '16px' }}>🌐</div>
              <h3 className="heading-h3" style={{ marginBottom: '10px' }}>Local Independence</h3>
              <p className="text-body" style={{ fontSize: '0.925rem', lineHeight: 1.6 }}>
                If your Internet connection goes down, your house should still function. Smart Switch operates locally through direct hardware contacts without requiring cloud round-trips.
              </p>
            </div>
          </div>
        </div>

        {/* Manufacturing & Materials Transparency */}
        <div className="card" style={{ padding: '40px', marginBottom: '80px', background: 'var(--bg-surface)' }}>
          <div className="grid-2" style={{ gap: '40px', alignItems: 'center' }}>
            <div>
              <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
                Hardware Transparency
              </div>
              <h2 className="heading-h2" style={{ marginBottom: '16px' }}>
                Materials & Sustainability
              </h2>
              <p className="text-body" style={{ lineHeight: 1.7, marginBottom: '20px' }}>
                Every component is specified for long operational lifespans exceeding 100,000 mechanical actuations. Our faceplates use recyclable anodized aluminum trims and halogen-free fire-retardant polymers.
              </p>
              <p className="text-body" style={{ lineHeight: 1.7 }}>
                By avoiding complex non-repairable glass touch displays, our switches eliminate rapid obsolescence and reduce electronic waste in luxury developments.
              </p>
            </div>

            <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '28px', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
                Manufacturing Baseline
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Flame-Retardant Casing:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>UL94 V-0 Polycarbonate</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Actuation Rating:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>100,000 Mechanical Cycles</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Terminal Screws:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>Solid Nickel-Plated Brass</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Warranty Coverage:</span>
                  <strong style={{ color: 'var(--accent-primary)' }}>24-Month Manufacturer Warranty</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="card card-highlight" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <h2 className="heading-h2" style={{ marginBottom: '16px' }}>
            Collaborate With Our Engineering Studio
          </h2>
          <p className="text-lead" style={{ maxWidth: '640px', margin: '0 auto 28px' }}>
            Are you an interior architect or certified electrical contractor? Join our verified partner network for sample kits and technical take-off assistance.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={ROUTES.SIGNUP} className="btn btn-primary">
              Join Installer & Partner Network
            </Link>
            <Link href={ROUTES.CONTACT} className="btn btn-secondary">
              Contact Engineering Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
