'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { contactSchema } from '@/lib/validation';
import { InquiryError, currentSource, submitInquiry } from '@/lib/inquiry-client';
import { buildMailto, fieldErrors } from '@/lib/forms';
import { APP_CONFIG, ROUTES } from '@/config';
import { trackLead } from '@/lib/meta-pixel';
import type { ContactDepartment } from '@/types';
import { Field } from './Field';
import { PrivacyNotice } from './PrivacyNotice';
import { FormSuccess, SubmitError } from './FormSuccess';

const DEPARTMENTS: { value: ContactDepartment; label: string }[] = [
  { value: 'SALES_CONSULTATION', label: 'Sales and consultation' },
  { value: 'TECHNICAL_SUPPORT', label: 'Technical support' },
  { value: 'CERTIFIED_INSTALLER', label: 'Electricians and installers' },
  { value: 'PRESS_MEDIA', label: 'Press and media' },
  { value: 'GENERAL_INQUIRY', label: 'General enquiry' },
];

interface State { fullName: string; email: string; phone: string; department: ContactDepartment; subject: string; message: string }
const INITIAL: State = { fullName: '', email: '', phone: '', department: 'SALES_CONSULTATION', subject: '', message: '' };

export function ContactForm() {
  const router = useRouter();
  const [data, setData] = useState<State>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [apiError, setApiError] = useState('');
  const [trap, setTrap] = useState('');

  const set = <K extends keyof State>(k: K, v: State[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    // Refresh an existing error while typing so layout settles before the next click.
    if (errors[k]) validateField(k, v);
  };

  const validateField = (name: keyof State, value: unknown = data[name], onlyAdd = false) => {
    const shape = contactSchema.shape as Record<string, { safeParse: (v: unknown) => { success: boolean; error?: { issues: { message: string }[] } } }>;
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
    const result = contactSchema.safeParse(data);
    if (!result.success) { setErrors(fieldErrors(result.error)); return; }
    setErrors({});
    setApiError('');
    setSending(true);
    try {
      const { id } = await submitInquiry({ ...result.data, type: 'contact', source: currentSource(), website: trap });
      trackLead({
        content_name: `Contact Message: ${result.data.subject || result.data.department}`,
        content_category: result.data.department,
        inquiry_id: id,
      });
      setReference(id);
      router.push(`${ROUTES.THANK_YOU}?ref=${encodeURIComponent(id)}&type=contact`);
    } catch (err) {
      if (err instanceof InquiryError && err.fieldErrors) setErrors(err.fieldErrors);
      setApiError(err instanceof Error ? err.message : 'Something went wrong while sending your message.');
    } finally {
      setSending(false);
    }
  };

  const fallbackMailto = () => buildMailto(APP_CONFIG.SALES_EMAIL, data.subject || 'Website message', [['Name', data.fullName], ['Email', data.email], ['Phone', data.phone], ['Message', data.message]]);

  if (reference) return <FormSuccess title="Message received" reference={reference} onReset={() => { setReference(null); setData(INITIAL); }} />;

  const count = Object.keys(errors).length;

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {count > 0 && <div className="form__alert" role="alert">Please fix the {count} highlighted {count === 1 ? 'field' : 'fields'} and try again.</div>}
      <div className="form__row">
        <Field id="c-name" label="Full name" error={errors.fullName}>
          {(a) => <input {...a} className="input" autoComplete="name" value={data.fullName} onChange={(e) => set('fullName', e.target.value)} onBlur={() => validateField('fullName', undefined, true)} />}
        </Field>
        <Field id="c-email" label="Email" error={errors.email}>
          {(a) => <input {...a} className="input" type="email" autoComplete="email" value={data.email} onChange={(e) => set('email', e.target.value)} onBlur={() => validateField('email', undefined, true)} />}
        </Field>
      </div>
      <div className="form__row">
        <Field id="c-phone" label="Phone" optional error={errors.phone}>
          {(a) => <input {...a} className="input" type="tel" autoComplete="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} onBlur={() => validateField('phone', undefined, true)} />}
        </Field>
        <Field id="c-dept" label="Department" error={errors.department}>
          {(a) => (
            <select {...a} className="input" value={data.department} onChange={(e) => set('department', e.target.value as ContactDepartment)}>
              {DEPARTMENTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          )}
        </Field>
      </div>
      <Field id="c-subject" label="Subject" error={errors.subject}>
        {(a) => <input {...a} className="input" value={data.subject} onChange={(e) => set('subject', e.target.value)} onBlur={() => validateField('subject', undefined, true)} />}
      </Field>
      <Field id="c-message" label="Message" error={errors.message}>
        {(a) => <textarea {...a} className="input" rows={6} value={data.message} onChange={(e) => set('message', e.target.value)} onBlur={() => validateField('message', undefined, true)} />}
      </Field>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} />
      {apiError && <SubmitError message={apiError} mailto={fallbackMailto()} />}
      <button type="submit" className="btn btn--gold btn--block" disabled={sending}>{sending ? 'Sending...' : 'Send message'}</button>
      <PrivacyNotice use="reply to your message" />
    </form>
  );
}
