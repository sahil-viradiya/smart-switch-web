'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@smart-switch/shared-config';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', justifyContent: 'center', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <Link href={ROUTES.LOGIN} style={{ color: 'var(--text-secondary)' }}>Sign In</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>Password Recovery</span>
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '12px' }}>
            Password Recovery
          </h1>
          <p className="text-lead">
            Enter your registered email address to receive password reset instructions.
          </p>
        </div>

        <div className="card" style={{ maxWidth: '480px', margin: '0 auto', padding: '36px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                ✓
              </div>
              <h3 className="heading-h3" style={{ marginBottom: '12px' }}>Check Your Email</h3>
              <p className="text-body" style={{ marginBottom: '24px' }}>
                If an account exists for <strong>{email}</strong>, a password reset link has been dispatched with valid instructions.
              </p>
              <Link href={ROUTES.LOGIN} className="btn btn-primary">
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="resetEmail">
                  Registered Email Address <span className="required">*</span>
                </label>
                <input
                  id="resetEmail"
                  type="email"
                  className="form-input"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '12px' }}>
                Send Reset Link
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '20px' }}>
                Remember your password? <Link href={ROUTES.LOGIN} style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Sign In</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
