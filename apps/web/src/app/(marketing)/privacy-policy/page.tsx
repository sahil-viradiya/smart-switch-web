import { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES, APP_CONFIG } from '@smart-switch/shared-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Detailed disclosure of personal data collection, processing purposes, and customer rights under GDPR and CCPA.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>Privacy Policy</span>
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '16px' }}>
            Privacy Policy
          </h1>
          <p className="text-muted">
            Last Updated: October 2026 • Effective for {APP_CONFIG.LEGAL_COMPANY_NAME}
          </p>
        </div>

        <div className="card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '28px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          <div>
            <h2 className="heading-h3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>
              1. Information We Collect
            </h2>
            <p>
              When you submit a project consultation inquiry, contact form, or partner portal registration, we collect contact information including your full name, work email address, phone number, company/firm name, and project scope details.
            </p>
          </div>

          <div>
            <h2 className="heading-h3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>
              2. How We Use Collected Information
            </h2>
            <p>
              We use your submitted details exclusively to:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li>Provide tailored project quotes, gang schedules, and architectural specifications.</li>
              <li>Connect you with certified electrical contractors in your geographical jurisdiction upon request.</li>
              <li>Authenticate your trade partner account credentials.</li>
              <li>Send occasional technical product bulletins and firmware updates if marketing consent was opted into.</li>
            </ul>
          </div>

          <div>
            <h2 className="heading-h3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>
              3. Data Sharing & Third-Party Protections
            </h2>
            <p>
              We do not sell, rent, or monetize your personal information to advertising brokers. We share project consultation details only with designated certified installers or logistics couriers strictly when necessary to deliver sample kits or coordinate installation services.
            </p>
          </div>

          <div>
            <h2 className="heading-h3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>
              4. Data Retention & Your Rights
            </h2>
            <p>
              You maintain the right to access, rectify, or request the permanent deletion of your customer records at any time. To exercise your privacy rights, contact our data protection team directly at <a href={`mailto:${APP_CONFIG.SUPPORT_EMAIL}`} style={{ color: 'var(--accent-primary)' }}>{APP_CONFIG.SUPPORT_EMAIL}</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
