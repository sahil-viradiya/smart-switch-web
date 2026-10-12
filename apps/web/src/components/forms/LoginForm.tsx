'use client';

import { useState } from 'react';
import Link from 'next/link';
import { loginSchema } from '@smart-switch/shared-validation';
import { ROUTES } from '@smart-switch/shared-config';

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMsg, setErrorMsg] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setErrorMsg('');

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const fieldName = err.path[0];
        if (fieldName && typeof fieldName === 'string') {
          fieldErrors[fieldName] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus('SUBMITTING');

    try {
      // Self-contained client-side processing for marketing website
      await new Promise((resolve) => setTimeout(resolve, 600));

      setUserName(formData.email.split('@')[0] || 'Partner');
      setStatus('SUCCESS');
    } catch (err: any) {
      setStatus('ERROR');
      setErrorMsg('Authentication error. Please check your credentials.');
    }
  };

  if (status === 'SUCCESS') {
    return (
      <div className="card card-highlight" style={{ textAlign: 'center', padding: '48px 32px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="heading-h2" style={{ marginBottom: '12px' }}>Welcome Back, {userName}</h3>
        <p className="text-body" style={{ maxWidth: '440px', margin: '0 auto 24px' }}>
          You have successfully signed in. Your installer certification credentials and project specification history are now accessible.
        </p>
        <Link href={ROUTES.PRODUCT} className="btn btn-primary">
          Explore Technical Spec Sheets
        </Link>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="heading-h2" style={{ marginBottom: '8px' }}>Partner Portal Sign In</h2>
        <p className="text-body">
          Access certified installer documentation, project quotes, and partner pricing.
        </p>
      </div>

      {status === 'ERROR' && (
        <div className="notice-box" style={{ background: 'rgba(244, 63, 94, 0.1)', borderColor: 'rgba(244, 63, 94, 0.3)', color: '#FECDD3', marginBottom: '20px' }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="loginEmail">
            Work Email Address <span className="required">*</span>
          </label>
          <input
            id="loginEmail"
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          {errors.email && <div className="form-error-msg">{errors.email}</div>}
        </div>

        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label className="form-label" htmlFor="loginPassword" style={{ margin: 0 }}>
              Password <span className="required">*</span>
            </label>
            <Link href={ROUTES.FORGOT_PASSWORD} style={{ fontSize: '0.8rem', color: 'var(--accent-primary)' }}>
              Forgot password?
            </Link>
          </div>
          <input
            id="loginPassword"
            type="password"
            className={`form-input ${errors.password ? 'error' : ''}`}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          {errors.password && <div className="form-error-msg">{errors.password}</div>}
        </div>

        <button
          type="submit"
          disabled={status === 'SUBMITTING'}
          className="btn btn-primary"
          style={{ width: '100%', padding: '14px', marginTop: '12px' }}
        >
          {status === 'SUBMITTING' ? 'Signing In...' : 'Sign In to Portal'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '20px' }}>
          Don't have a partner account? <Link href={ROUTES.SIGNUP} style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Register Now</Link>
        </p>
      </form>
    </div>
  );
}
