import { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES } from '@smart-switch/shared-config';
import { SignupForm } from '../../../components/forms/SignupForm';

export const metadata: Metadata = {
  title: 'Partner & Installer Portal Registration',
  description:
    'Register as a certified electrical contractor or architectural partner for Smart Switch technical documentation, sample kits, and project pricing.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', justifyContent: 'center', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>Partner Registration</span>
          </div>
          <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
            Trade & Pro Portal
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '12px' }}>
            Join the Smart Switch Partner Network
          </h1>
          <p className="text-lead">
            Certified contractors and architectural firms receive dedicated single-line drawings, sample hardware kits, and trade tier pricing.
          </p>
        </div>

        <SignupForm />
      </div>
    </div>
  );
}
