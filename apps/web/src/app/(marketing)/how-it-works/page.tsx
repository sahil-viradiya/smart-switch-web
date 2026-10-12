import { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES, VERIFIED_SPECS } from '@smart-switch/shared-config';

export const metadata: Metadata = {
  title: 'How It Works & Certified Installation Protocol',
  description:
    'Comprehensive 3-phase workflow for Smart Switch installation: pre-wire audit, certified electrician installation, and everyday tactile operation.',
};

export default function HowItWorksPage() {
  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        {/* Breadcrumb & Hero */}
        <div style={{ maxWidth: '820px', marginBottom: '56px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>How It Works</span>
          </div>
          <div className="badge badge-amber" style={{ marginBottom: '16px' }}>
            Certified Electrical Guidelines
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '20px' }}>
            From Wall Blueprint to Tactile Actuation
          </h1>
          <p className="text-lead">
            Every Smart Switch installation follows a transparent, safety-first protocol. We clearly delineate pre-installation planning, licensed electrician wiring, and daily homeowner operation.
          </p>
        </div>

        {/* Phase 1: Planning */}
        <div className="card" style={{ marginBottom: '40px', padding: '40px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              1
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Phase One</span>
              <h2 className="heading-h3" style={{ margin: 0 }}>Pre-Installation Planning & Electrical Audit</h2>
            </div>
          </div>
          <p className="text-body" style={{ lineHeight: 1.7, marginBottom: '24px' }}>
            Before scheduling installation, evaluate your existing electrical boxes and gang count requirements:
          </p>
          <div className="grid-3" style={{ gap: '20px' }}>
            <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>1. Confirm Neutral Wire</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Standard Smart Switch models require an active neutral wire (usually white or blue depending on regional wiring codes) inside the wall box.
              </p>
            </div>
            <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>2. Verify Box Depth</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Ensure your junction box has a minimum depth of 35mm. Multi-gang installations with splices benefit from 47mm depth.
              </p>
            </div>
            <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>3. Select Gang Variant</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Choose 1-gang (single light circuit), 2-gang (two channels), or 3-gang (three circuits) based on switch location.
              </p>
            </div>
          </div>
        </div>

        {/* Phase 2: Electrician Installation (Safety Highlight) */}
        <div className="card" style={{ marginBottom: '40px', padding: '40px', borderColor: 'rgba(245, 158, 11, 0.35)' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              2
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-amber)', letterSpacing: '0.05em' }}>Phase Two (Certified Electrician Task)</span>
              <h2 className="heading-h3" style={{ margin: 0 }}>Certified Electrician Installation Protocol</h2>
            </div>
          </div>

          <div className="notice-box" style={{ marginBottom: '24px' }}>
            <span>⚠️</span>
            <div>
              <strong>Safety Warning:</strong> Installation involves mains alternating current ({VERIFIED_SPECS.VOLTAGE_RANGE}). Only certified, licensed electrical contractors may perform wiring work. Never open energized wall junction boxes.
            </div>
          </div>

          {/* Terminal Block Diagram */}
          <div style={{ background: '#0B111E', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', padding: '28px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Terminal Block Wiring Guide
            </h3>
            <div className="grid-4" style={{ gap: '16px', textAlign: 'center' }}>
              <div style={{ padding: '16px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ color: '#EF4444', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>L (Live In)</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mains 110-240V Supply Conductor</div>
              </div>
              <div style={{ padding: '16px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ color: '#3B82F6', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>N (Neutral)</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mains Return Conductor</div>
              </div>
              <div style={{ padding: '16px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ color: '#10B981', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>PE (Earth)</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Protective Earth / Ground</div>
              </div>
              <div style={{ padding: '16px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ color: '#F59E0B', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>L1, L2, L3</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Switched Output Load Circuits</div>
              </div>
            </div>
          </div>

          <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            <li><strong>De-energize Circuit:</strong> Switch off the dedicated circuit breaker at the main distribution board. Confirm zero voltage using an accredited dual-pole multimeter.</li>
            <li><strong>Secure Conductors:</strong> Strip 8mm insulation and insert solid/stranded copper leads into the screw-clamp terminals. Torque to 0.5 Nm.</li>
            <li><strong>Mount Sub-Frame:</strong> Fasten the steel sub-frame to the back-box using standard M3.5 screws. Level using the precision alignment notches.</li>
            <li><strong>Attach Architectural Faceplate:</strong> Snap the screwless trim plate into position until the magnetic detents lock firmly.</li>
          </ol>
        </div>

        {/* Phase 3: Daily Operation */}
        <div className="card" style={{ marginBottom: '64px', padding: '40px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              3
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Phase Three</span>
              <h2 className="heading-h3" style={{ margin: 0 }}>Everyday Operation & Local Reliability</h2>
            </div>
          </div>
          <p className="text-body" style={{ lineHeight: 1.7, marginBottom: '20px' }}>
            Once the breaker is restored, Smart Switch delivers immediate physical operation. The mechanical rocker switches toggle lighting circuits instantly with audible relay confirmation.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '16px', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#A7F3D0', fontSize: '0.9rem' }}>
            <span>✓</span>
            <div>
              <strong>100% Offline Capability:</strong> Because physical actuation is wired to local relays on the circuit board, your lighting controls continue functioning perfectly even if your home network experiences an outage.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="card card-highlight" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <h2 className="heading-h2" style={{ marginBottom: '16px' }}>
            Connect With a Certified Installer
          </h2>
          <p className="text-lead" style={{ maxWidth: '640px', margin: '0 auto 28px' }}>
            Need professional assistance or an electrical quote? Our certified contractor network provides licensed installation services nationwide.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={ROUTES.REQUEST_DEMO} className="btn btn-primary">
              Request Installation Consultation
            </Link>
            <Link href={ROUTES.FAQ} className="btn btn-secondary">
              Browse Wiring FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
