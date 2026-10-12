'use client';

import { useId, useState, type FormEvent } from 'react';
import { z } from 'zod';
import { APP_CONFIG } from '@/config';
import { buildMailto } from '@/lib/forms';
import { ArrowRight } from '@/components/art/Icons';

const emailSchema = z.string().trim().toLowerCase().email('Please enter a valid email address').max(120);

/** Updates sign-up. No backend: hands a ready-to-send email to the visitor's mail app. */
export function Newsletter() {
  const id = useId();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = emailSchema.safeParse(email);
    if (!r.success) { setError(r.error.issues[0]?.message ?? 'Invalid email'); return; }
    setError('');
    const url = buildMailto(APP_CONFIG.SALES_EMAIL, 'Please keep me updated', [['Email', r.data], ['Request', 'Send me product updates']]);
    setDone(url);
    window.location.href = url;
  };

  if (done) {
    return (
      <div className="newsletter" role="status">
        <h2>Almost there.</h2>
        <p className="small">Your email app should now be open with your request ready to send. Nothing is sent or stored by this website until you press send. <a href={done}>Open it again</a>.</p>
      </div>
    );
  }
  return (
    <form className="newsletter" onSubmit={submit} noValidate>
      <h2>Get news and updates</h2>
      <p className="small">Occasional product updates as hardware validation progresses.</p>
      <div className="newsletter__row">
        <label htmlFor={`${id}-e`} className="sr-only">Email address</label>
        <input id={`${id}-e`} type="email" autoComplete="email" placeholder="Your email" value={email} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }} />
        <button type="submit" aria-label="Subscribe by email"><ArrowRight size={18} /></button>
      </div>
      {error && <p className="newsletter__err" id={`${id}-err`}>{error}</p>}
    </form>
  );
}
