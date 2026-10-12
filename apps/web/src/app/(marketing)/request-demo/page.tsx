import { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES } from '@smart-switch/shared-config';
import { LeadForm } from '../../../components/forms/LeadForm';

export const metadata: Metadata = {
  title: 'Request a Consultation & Product Demo',
  description:
    'Connect directly with our smart automation engineering specialists for project consultation, dimensional take-offs, and trade sample kits.',
};

export default function RequestDemoPage() {
  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', justifyContent: 'center', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>Request Consultation</span>
          </div>
          <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
            Engineering Project Consultation
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '16px' }}>
            Specify Smart Switch for Your Next Project
          </h1>
          <p className="text-lead">
            Whether you are designing a private residence, planning an architectural renovation, or onboarding as a certified electrical contractor, our engineering specialists are ready to assist.
          </p>
        </div>

        {/* Lead Form Container */}
        <div style={{ maxWidth: '680px', margin: '0 auto 64px' }}>
          <LeadForm
            title="Project Consultation Details"
            subtitle="Complete the form below to receive a response and tailored specification guidance within one business day."
          />
        </div>

        {/* What Happens Next 3-Column Guide */}
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h2 className="heading-h2" style={{ textAlign: 'center', marginBottom: '36px' }}>
            What to Expect Following Your Request
          </h2>
          <div className="grid-3">
            <div className="card">
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>
                1
              </div>
              <h3 className="heading-h3" style={{ marginBottom: '8px' }}>Specification Review</h3>
              <p className="text-body" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                An electrical applications engineer evaluates your gang layout, wiring prerequisites, and back-box depths.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>
                2
              </div>
              <h3 className="heading-h3" style={{ marginBottom: '8px' }}>Sample Kit & Take-Off</h3>
              <p className="text-body" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                Architectural firms and certified contractors receive physical finish swatch samples and itemized circuit quotes.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>
                3
              </div>
              <h3 className="heading-h3" style={{ marginBottom: '8px' }}>Contractor Coordination</h3>
              <p className="text-body" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                We provide your designated electrical contractor with terminal diagrams and step-by-step commissioning guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
