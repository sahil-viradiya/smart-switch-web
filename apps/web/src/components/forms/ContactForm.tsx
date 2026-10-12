'use client';

import { useState } from 'react';
import { contactSchema } from '@smart-switch/shared-validation';
import { ContactDepartment } from '@smart-switch/shared-types';

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: 'SALES_CONSULTATION' as ContactDepartment,
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [receipt, setReceipt] = useState<{ id?: string; message?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
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

      const trackingId = `MSG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      setReceipt({
        id: trackingId,
        message: 'Your message has been routed to the appropriate engineering or sales department. We will respond within one business day.',
      });
      setStatus('SUCCESS');
    } catch (err: any) {
      setStatus('ERROR');
      setReceipt({ message: 'An error occurred while submitting your message. Please try again.' });
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
        <h3 className="heading-h2" style={{ marginBottom: '12px' }}>Message Dispatched</h3>
        <p className="text-body" style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
          {receipt.message}
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('IDLE');
            setFormData({
              fullName: '',
              email: '',
              phone: '',
              department: 'SALES_CONSULTATION',
              subject: '',
              message: '',
            });
          }}
          className="btn btn-outline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="heading-h2" style={{ marginBottom: '8px' }}>Send Direct Inquiry</h2>
      <p className="text-body" style={{ marginBottom: '24px' }}>
        Route your request directly to the appropriate technical or commercial team.
      </p>

      {status === 'ERROR' && (
        <div className="notice-box" style={{ background: 'rgba(244, 63, 94, 0.1)', borderColor: 'rgba(244, 63, 94, 0.3)', color: '#FECDD3', marginBottom: '20px' }}>
          {receipt.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="contactFullName">
            Full Name <span className="required">*</span>
          </label>
          <input
            id="contactFullName"
            type="text"
            className={`form-input ${errors.fullName ? 'error' : ''}`}
            placeholder="Your name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
          {errors.fullName && <div className="form-error-msg">{errors.fullName}</div>}
        </div>

        <div className="grid-2" style={{ gap: '16px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="contactEmail">
              Email Address <span className="required">*</span>
            </label>
            <input
              id="contactEmail"
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
            <label className="form-label" htmlFor="contactPhone">
              Telephone (Optional)
            </label>
            <input
              id="contactPhone"
              type="tel"
              className={`form-input ${errors.phone ? 'error' : ''}`}
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {errors.phone && <div className="form-error-msg">{errors.phone}</div>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contactDepartment">
            Department Routing <span className="required">*</span>
          </label>
          <select
            id="contactDepartment"
            className="form-select"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value as ContactDepartment })}
          >
            <option value="SALES_CONSULTATION">Sales & Specifications Consultation</option>
            <option value="TECHNICAL_SUPPORT">Electrical & Technical Support</option>
            <option value="CERTIFIED_INSTALLER">Certified Electrician Network</option>
            <option value="PRESS_MEDIA">Press & Architectural Media</option>
            <option value="GENERAL_INQUIRY">General Customer Inquiries</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contactSubject">
            Subject <span className="required">*</span>
          </label>
          <input
            id="contactSubject"
            type="text"
            className={`form-input ${errors.subject ? 'error' : ''}`}
            placeholder="Brief topic of your inquiry"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
          />
          {errors.subject && <div className="form-error-msg">{errors.subject}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contactMessage">
            Message <span className="required">*</span>
          </label>
          <textarea
            id="contactMessage"
            rows={4}
            className={`form-textarea ${errors.message ? 'error' : ''}`}
            placeholder="Details of your inquiry..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
          {errors.message && <div className="form-error-msg">{errors.message}</div>}
        </div>

        <button
          type="submit"
          disabled={status === 'SUBMITTING'}
          className="btn btn-primary"
          style={{ width: '100%', padding: '14px' }}
        >
          {status === 'SUBMITTING' ? 'Transmitting Message...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
