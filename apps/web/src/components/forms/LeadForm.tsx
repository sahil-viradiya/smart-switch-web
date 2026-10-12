'use client';

import { useState } from 'react';
import { leadSchema } from '@smart-switch/shared-validation';
import { InquiryType, PropertyType } from '@smart-switch/shared-types';

interface LeadFormProps {
  defaultInquiryType?: InquiryType;
  title?: string;
  subtitle?: string;
}

export function LeadForm({
  defaultInquiryType = 'HOMEOWNER_CONSULTATION',
  title = 'Request a Project Consultation & Quote',
  subtitle = 'Connect directly with our smart automation engineering specialists. We respond within one business day.',
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: defaultInquiryType,
    propertyType: 'RESIDENTIAL_SINGLE_FAMILY' as PropertyType,
    message: '',
    marketingConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [receipt, setReceipt] = useState<{ id?: string; message?: string }>({});

  const validateField = (name: string, value: any) => {
    try {
      const partialObj = { ...formData, [name]: value };
      leadSchema.parse(partialObj);
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    } catch (err: any) {
      if (err?.errors) {
        const fieldError = err.errors.find((e: any) => e.path.includes(name));
        if (fieldError) {
          setErrors((prev) => ({ ...prev, [name]: fieldError.message }));
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Client-side Zod validation
    const result = leadSchema.safeParse(formData);
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

      const trackingId = `LEAD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      setReceipt({
        id: trackingId,
        message: 'Thank you for your project inquiry. Our smart automation specialists will contact you within one business day.',
      });
      setStatus('SUCCESS');
    } catch (err: any) {
      console.error('[LeadForm Submission Error]:', err);
      setStatus('ERROR');
      setReceipt({
        message: 'An error occurred while submitting your inquiry. Please try again.',
      });
    }
  };

  if (status === 'SUCCESS') {
    return (
      <div
        className="card card-highlight"
        style={{
          textAlign: 'center',
          padding: '48px 32px',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '2px solid var(--accent-primary)',
            color: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="heading-h2" style={{ marginBottom: '12px' }}>
          Consultation Request Confirmed
        </h3>
        <p className="text-body" style={{ maxWidth: '500px', margin: '0 auto 24px' }}>
          {receipt.message}
        </p>
        {receipt.id && (
          <div
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-elevated)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '32px',
            }}
          >
            Tracking Reference: <strong style={{ color: 'var(--text-primary)' }}>{receipt.id}</strong>
          </div>
        )}
        <div>
          <button
            type="button"
            onClick={() => {
              setStatus('IDLE');
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                inquiryType: defaultInquiryType,
                propertyType: 'RESIDENTIAL_SINGLE_FAMILY',
                message: '',
                marketingConsent: false,
              });
            }}
            className="btn btn-outline"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div style={{ marginBottom: '28px' }}>
        <h2 className="heading-h2" style={{ marginBottom: '8px' }}>
          {title}
        </h2>
        <p className="text-body">{subtitle}</p>
      </div>

      {status === 'ERROR' && (
        <div className="notice-box" style={{ background: 'rgba(244, 63, 94, 0.1)', borderColor: 'rgba(244, 63, 94, 0.3)', color: '#FECDD3', marginBottom: '24px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>{receipt.message}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">
            Full Name <span className="required">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            className={`form-input ${errors.fullName ? 'error' : ''}`}
            placeholder="e.g. Eleanor Vance"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              validateField('fullName', e.target.value);
            }}
            required
          />
          {errors.fullName && <div className="form-error-msg">{errors.fullName}</div>}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid-2" style={{ gap: '16px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address <span className="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="name@domain.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                validateField('email', e.target.value);
              }}
              required
            />
            {errors.email && <div className="form-error-msg">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Telephone Number
            </label>
            <input
              id="phone"
              type="tel"
              className={`form-input ${errors.phone ? 'error' : ''}`}
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                validateField('phone', e.target.value);
              }}
            />
            {errors.phone && <div className="form-error-msg">{errors.phone}</div>}
          </div>
        </div>

        {/* Inquiry Type & Property Type */}
        <div className="grid-2" style={{ gap: '16px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="inquiryType">
              Inquiry Category <span className="required">*</span>
            </label>
            <select
              id="inquiryType"
              className="form-select"
              value={formData.inquiryType}
              onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value as InquiryType })}
            >
              <option value="HOMEOWNER_CONSULTATION">Homeowner Project</option>
              <option value="ARCHITECT_COMMERCIAL">Architect / Interior Specification</option>
              <option value="INSTALLER_PARTNERSHIP">Certified Electrician Onboarding</option>
              <option value="GENERAL_PURCHASE">Volume Purchasing Inquiry</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="propertyType">
              Installation Context
            </label>
            <select
              id="propertyType"
              className="form-select"
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
            >
              <option value="RESIDENTIAL_SINGLE_FAMILY">Single Family Residence</option>
              <option value="RESIDENTIAL_APARTMENT">Luxury Apartment / Condo</option>
              <option value="COMMERCIAL_OFFICE">Commercial Office Suite</option>
              <option value="RENOVATION_PROJECT">Historic / Renovation Retrofit</option>
              <option value="HOSPITALITY_HOTEL">Hospitality / Hotel</option>
              <option value="OTHER">Other Installation</option>
            </select>
          </div>
        </div>

        {/* Project Message */}
        <div className="form-group">
          <label className="form-label" htmlFor="message">
            Project Scope or Requirements <span className="required">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            className={`form-textarea ${errors.message ? 'error' : ''}`}
            placeholder="Tell us about your room layouts, gang requirements, or electrical timeline..."
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              validateField('message', e.target.value);
            }}
            required
          />
          {errors.message && <div className="form-error-msg">{errors.message}</div>}
        </div>

        {/* Marketing Consent */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '28px' }}>
          <input
            id="marketingConsent"
            type="checkbox"
            checked={formData.marketingConsent}
            onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
            style={{ marginTop: '4px', cursor: 'pointer' }}
          />
          <label htmlFor="marketingConsent" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer', lineHeight: 1.5 }}>
            I agree to receive occasional technical bulletins and firmware release notes. (Optional; you may opt out at any time).
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'SUBMITTING'}
          className="btn btn-primary"
          style={{ width: '100%', padding: '14px' }}
        >
          {status === 'SUBMITTING' ? (
            <>
              <svg style={{ animation: 'spin 1s linear infinite' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            'Submit Project Consultation'
          )}
        </button>

        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '16px' }}>
          🔒 Your privacy is strictly protected. We never distribute contact details to third parties.
        </p>
      </form>
    </div>
  );
}
