import { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES, APP_CONFIG, VERIFIED_SPECS } from '@smart-switch/shared-config';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms of service, electrical installation liability disclaimers, and warranty policies for Smart Switch hardware.',
};

export default function TermsPage() {
  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>Terms & Conditions</span>
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '16px' }}>
            Terms & Conditions
          </h1>
          <p className="text-muted">
            Last Updated: October 2026 • Published by {APP_CONFIG.LEGAL_COMPANY_NAME}
          </p>
        </div>

        <div className="card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '28px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          <div>
            <h2 className="heading-h3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>
              1. Electrical Installation & Safety Disclaimer
            </h2>
            <div className="notice-box" style={{ marginBottom: '16px' }}>
              <div>
                <strong>Mandatory Electrician Installation:</strong> Mains voltage ({VERIFIED_SPECS.VOLTAGE_RANGE}) carries risk of severe personal injury, electric shock, or property damage. {APP_CONFIG.LEGAL_COMPANY_NAME} requires all hardware units to be installed strictly by a certified, licensed electrical contractor in full compliance with National Electrical Code (NEC) or regional equivalents.
              </div>
            </div>
            <p>
              Under no circumstances shall {APP_CONFIG.LEGAL_COMPANY_NAME} be liable for damages, failures, or hazards resulting from unauthorized homeowner installation, improper grounding, or missing neutral connections.
            </p>
          </div>

          <div>
            <h2 className="heading-h3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>
              2. Limited Manufacturer Warranty
            </h2>
            <p>
              Smart Switch hardware units include a <strong>{VERIFIED_SPECS.WARRANTY_MONTHS}-month limited warranty</strong> covering defects in materials and mechanical switch actuation. The warranty is valid provided that the unit has been installed according to manufacturer specifications by an accredited electrician and operated within the rated electrical load limits ({VERIFIED_SPECS.MAX_CURRENT_PER_GANG}).
            </p>
          </div>

          <div>
            <h2 className="heading-h3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>
              3. Specification & Hardware Changes
            </h2>
            <p>
              We continuously optimize our hardware engineering and internal PCB topology. While we make every effort to maintain published specifications accurately, physical revisions may be updated to reflect regional lab listings or components.
            </p>
          </div>

          <div>
            <h2 className="heading-h3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>
              4. Governing Law
            </h2>
            <p>
              These terms are governed by and construed in accordance with applicable state and federal laws without regard to conflict of law principles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
