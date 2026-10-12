'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signupSchema } from '@smart-switch/shared-validation';
import { UserRole } from '@smart-switch/shared-types';
import { ROUTES } from '@smart-switch/shared-config';

export function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'INSTALLER' as UserRole,
    companyName: '',
    licenseNumber: '',
    phone: '',
    acceptTerms: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setErrorMsg('');

    const result = signupSchema.safeParse(formData);
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

      setStatus('SUCCESS');
    } catch (err: any) {
      setStatus('ERROR');
      setErrorMsg('An error occurred during account creation. Please try again.');
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
        <h3 className="heading-h2" style={{ marginBottom: '12px' }}>Account Registered</h3>
        <p className="text-body" style={{ maxWidth: '440px', margin: '0 auto 24px' }}>
          Your trade partner profile has been created. Our partner verification team will review your electrical license or architectural firm details within 24 hours.
        </p>
        <Link href={ROUTES.LOGIN} className="btn btn-primary">
          Proceed to Partner Portal Login
        </Link>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: '560px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="heading-h2" style={{ marginBottom: '8px' }}>Partner & Trade Registration</h2>
        <p className="text-body">
          Join our network of certified electrical contractors, interior designers, and architectural specifiers.
        </p>
      </div>

      {status === 'ERROR' && (
        <div className="notice-box" style={{ background: 'rgba(244, 63, 94, 0.1)', borderColor: 'rgba(244, 63, 94, 0.3)', color: '#FECDD3', marginBottom: '20px' }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="role">
            Account Profile Type <span className="required">*</span>
          </label>
          <select
            id="role"
            className="form-select"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
          >
            <option value="INSTALLER">Certified Electrical Contractor</option>
            <option value="ARCHITECT">Architectural / Interior Design Firm</option>
            <option value="HOMEOWNER">Private Homeowner / Client</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="regFullName">
            Full Name <span className="required">*</span>
          </label>
          <input
            id="regFullName"
            type="text"
            className={`form-input ${errors.fullName ? 'error' : ''}`}
            placeholder="Jane Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
          {errors.fullName && <div className="form-error-msg">{errors.fullName}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="regEmail">
            Work Email Address <span className="required">*</span>
          </label>
          <input
            id="regEmail"
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="jane@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          {errors.email && <div className="form-error-msg">{errors.email}</div>}
        </div>

        <div className="grid-2" style={{ gap: '16px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="companyName">
              Business / Firm Name
            </label>
            <input
              id="companyName"
              type="text"
              className="form-input"
              placeholder="Vance Electric LLC"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="licenseNumber">
              Trade License # (If Installer)
            </label>
            <input
              id="licenseNumber"
              type="text"
              className="form-input"
              placeholder="e.g. EC-19482"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="regPassword">
            Password (Min 8 chars, 1 uppercase, 1 number) <span className="required">*</span>
          </label>
          <input
            id="regPassword"
            type="password"
            className={`form-input ${errors.password ? 'error' : ''}`}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          {errors.password && <div className="form-error-msg">{errors.password}</div>}
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '24px' }}>
          <input
            id="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
            style={{ marginTop: '4px', cursor: 'pointer' }}
          />
          <label htmlFor="acceptTerms" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer', lineHeight: 1.5 }}>
            I agree to the <Link href={ROUTES.TERMS} style={{ color: 'var(--accent-primary)' }}>Terms of Service</Link> and <Link href={ROUTES.PRIVACY} style={{ color: 'var(--accent-primary)' }}>Privacy Policy</Link>.
          </label>
        </div>
        {errors.acceptTerms && <div className="form-error-msg" style={{ marginBottom: '16px' }}>{errors.acceptTerms}</div>}

        <button
          type="submit"
          disabled={status === 'SUBMITTING'}
          className="btn btn-primary"
          style={{ width: '100%', padding: '14px' }}
        >
          {status === 'SUBMITTING' ? 'Registering Account...' : 'Complete Registration'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '20px' }}>
          Already have an account? <Link href={ROUTES.LOGIN} style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Sign In</Link>
        </p>
      </form>
    </div>
  );
}
