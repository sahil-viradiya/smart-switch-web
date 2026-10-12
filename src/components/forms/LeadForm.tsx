'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { leadSchema } from '@/lib/validation';
import { InquiryError, currentSource, submitInquiry } from '@/lib/inquiry-client';
import { buildMailto, fieldErrors } from '@/lib/forms';
import { APP_CONFIG } from '@/config';
import type { InquiryType, PropertyType } from '@/types';
import { Field } from './Field';
import { FormSuccess, SubmitError } from './FormSuccess';

const INQUIRY_OPTIONS: { value: InquiryType; label: string }[] = [
  { value: 'HOMEOWNER_CONSULTATION', label: 'Homeowner consultation' },
  { value: 'ARCHITECT_COMMERCIAL', label: 'Architect or commercial project' },
  { value: 'INSTALLER_PARTNERSHIP', label: 'Electrician or installer' },
  { value: 'GENERAL_PURCHASE', label: 'General enquiry' },
];

const PROPERTY_OPTIONS: { value: PropertyType; label: string }[] = [
  { value: 'RESIDENTIAL_SINGLE_FAMILY', label: 'House' },
  { value: 'RESIDENTIAL_APARTMENT', label: 'Apartment' },
  { value: 'COMMERCIAL_OFFICE', label: 'Office or studio' },
  { value: 'HOSPITALITY_HOTEL', label: 'Hospitality' },
  { value: 'RENOVATION_PROJECT', label: 'Renovation' },
  { value: 'OTHER', label: 'Other' },
];

const INTENTS: Record<string, InquiryType> = {
  architect: 'ARCHITECT_COMMERCIAL',
  installer: 'INSTALLER_PARTNERSHIP',
  homeowner: 'HOMEOWNER_CONSULTATION',
};

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  propertyType: PropertyType;
  message: string;
  marketingConsent: boolean;
}

const INITIAL: FormState = {
  fullName: '', email: '', phone: '', inquiryType: 'HOMEOWNER_CONSULTATION',
  propertyType: 'RESIDENTIAL_SINGLE_FAMILY', message: '', marketingConsent: false,
};

export function LeadForm() {
  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [apiError, setApiError] = useState('');
  const [trap, setTrap] = useState('');
  const touchedInquiry = useRef(false);

  // Flow: /request-demo?intent=architect pre-selects the inquiry type.
  useEffect(() => {
    const intent = new URLSearchParams(window.location.search).get('intent');
    const mapped = intent ? INTENTS[intent] : undefined;
    if (mapped && !touchedInquiry.current) setData((d) => ({ ...d, inquiryType: mapped }));
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    // Refresh an existing error while typing so layout settles before the next click.
    if (errors[key]) validateField(key, value);
  };

  const validateField = (name: keyof FormState, value: unknown = data[name], onlyAdd = false) => {
    const shape = leadSchema.shape as Record<string, { safeParse: (v: unknown) => { success: boolean; error?: { issues: { message: string }[] } } }>;
    const res = shape[name]?.safeParse(value);
    setErrors((prev) => {
      const next = { ...prev };
      if (res && !res.success) next[name] = res.error?.issues[0]?.message ?? 'Invalid value';
      else if (!onlyAdd) delete next[name];
      return next;
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const result = leadSchema.safeParse(data);
    if (!result.success) {
      setErrors(fieldErrors(result.error));
      return;
    }
    setErrors({});
    setApiError('');
    setSending(true);
    try {
      const { id } = await submitInquiry({ ...result.data, type: 'demo', source: currentSource(), website: trap });
      setReference(id);
    } catch (err) {
      if (err instanceof InquiryError && err.fieldErrors) setErrors(err.fieldErrors);
      setApiError(err instanceof Error ? err.message : 'Something went wrong while sending your request.');
    } finally {
      setSending(false);
    }
  };

  const fallbackMailto = () => buildMailto(APP_CONFIG.SALES_EMAIL, `Consultation request from ${data.fullName || 'website'}`, [['Name', data.fullName], ['Email', data.email], ['Phone', data.phone], ['Message', data.message]]);

  if (reference) {
    return <FormSuccess title="Request received" reference={reference} onReset={() => { setReference(null); setData(INITIAL); }} />;
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {errorCount > 0 && <div className="form__alert" role="alert">Please fix the {errorCount} highlighted {errorCount === 1 ? 'field' : 'fields'} and try again.</div>}

      <div className="form__row">
        <Field id="lead-name" label="Full name" error={errors.fullName}>
          {(a) => <input {...a} className="input" autoComplete="name" value={data.fullName} onChange={(e) => set('fullName', e.target.value)} onBlur={() => validateField('fullName', undefined, true)} />}
        </Field>
        <Field id="lead-email" label="Email" error={errors.email}>
          {(a) => <input {...a} className="input" type="email" autoComplete="email" value={data.email} onChange={(e) => set('email', e.target.value)} onBlur={() => validateField('email', undefined, true)} />}
        </Field>
      </div>

      <div className="form__row">
        <Field id="lead-phone" label="Phone" optional error={errors.phone}>
          {(a) => <input {...a} className="input" type="tel" autoComplete="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} onBlur={() => validateField('phone', undefined, true)} />}
        </Field>
        <Field id="lead-property" label="Property type" error={errors.propertyType}>
          {(a) => (
            <select {...a} className="input" value={data.propertyType} onChange={(e) => set('propertyType', e.target.value as PropertyType)}>
              {PROPERTY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          )}
        </Field>
      </div>

      <Field id="lead-inquiry" label="I am a" error={errors.inquiryType}>
        {(a) => (
          <select {...a} className="input" value={data.inquiryType} onChange={(e) => { touchedInquiry.current = true; set('inquiryType', e.target.value as InquiryType); }}>
            {INQUIRY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        )}
      </Field>

      <Field id="lead-message" label="Tell us about your project" error={errors.message}>
        {(a) => <textarea {...a} className="input" rows={5} value={data.message} onChange={(e) => set('message', e.target.value)} onBlur={() => validateField('message', undefined, true)} placeholder="Rooms, number of circuits, timeline" />}
      </Field>

      <label className="check">
        <input type="checkbox" checked={data.marketingConsent} onChange={(e) => set('marketingConsent', e.target.checked)} />
        <span>I would like occasional product updates by email.</span>
      </label>

      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} />

      {apiError && <SubmitError message={apiError} mailto={fallbackMailto()} />}
      <button type="submit" className="btn btn--gold btn--block" disabled={sending}>{sending ? 'Sending...' : 'Send request'}</button>
      <p className="form__fine">Your details are saved to our enquiry sheet so our team can reply. See our Privacy Policy.</p>
    </form>
  );
}
