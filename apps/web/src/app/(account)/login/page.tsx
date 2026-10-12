import { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES } from '@smart-switch/shared-config';
import { LoginForm } from '../../../components/forms/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In to Partner Portal',
  description: 'Sign in to access your certified installer project documentation and specification history.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', justifyContent: 'center', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>Partner Portal</span>
          </div>
          <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
            Account Authentication
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '12px' }}>
            Sign In to Partner Portal
          </h1>
          <p className="text-lead">
            Access project spec sheets, licensed contractor resources, and saved gang layouts.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
