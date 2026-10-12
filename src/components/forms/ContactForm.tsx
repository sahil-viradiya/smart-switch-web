'use client';

import { useState, type FormEvent } from 'react';
import { contactSchema } from '@/lib/validation';
import { buildMailto, fieldErrors } from '@/lib/forms';
import { APP_CONFIG } from '@/config';
import type { ContactDepartment } from '@/types';
import { Field } from './Field';
import { FormSuccess } from './FormSuccess';

const DEPARTMENTS: { value: ContactDepartment; label: string; email: string }[] = [
  { value: 'SALES_CONSULTATION', label: 'Sales & consultation', email: APP_CONFIG.SALES_EMAIL },
  { value: 'TECHNICAL_SUPPORT', label: 'Technical support', email: APP_CONFIG.SUPPORT_EMAIL },
  { value: 'CERTIFIED_INSTALLER', label: 'Electricians & installers', email: APP_CONFIG.SALES_EMAIL },
  { value: 'PRESS_MEDIA', label: 'Press & media', email: APP_CONFIG.SALES_EMAIL },
  { value: 'GENERAL_INQUIRY', label: 'General enquiry', email: APP_CONFIG.SUPPORT_EMAIL },
];

interface State { fullName: string; email: string; phone: string; department: ContactDepartment; subject: string; message: string }
const INITIAL: State = { fullName: '', email: '', phone: '', department: 'SALES_CONSULTATION', subject: '', message: '' };

export function ContactForm() {
  const [data, setData] = useState<State>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<{ url: string; email: string } | null>(null);

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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(data);
    if (!result.success) { setErrors(fieldErrors(result.error)); return; }
    setErrors({});
    const d = result.data;
    const dept = DEPARTMENTS.find((x) => x.value === d.department)!;
    const url = buildMailto(dept.email, `${d.subject} — ${dept.label}`, [
      ['Name', d.fullName], ['Email', d.email], ['Phone', d.phone], ['Department', dept.label], ['Message', d.message],
    ]);
    setSent({ url, email: dept.email });
    window.location.href = url;
  };

  if (sent) return <FormSuccess title="Your message is ready" mailto={sent.url} email={sent.email} onReset={() => { setSent(null); setData(INITIAL); }} />;

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
      <button type="submit" className="btn btn--gold btn--block">Prepare my message</button>
      <p className="form__fine">This opens your email app with your message ready to send. This website does not store your information.</p>
    </form>
  );
}
