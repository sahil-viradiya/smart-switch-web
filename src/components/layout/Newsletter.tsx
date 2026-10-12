'use client';

import { useId, useState, type FormEvent } from 'react';
import { z } from 'zod';
import { ArrowRight } from '@/components/art/Icons';
import { InquiryError, currentSource, submitInquiry } from '@/lib/inquiry-client';

const emailSchema = z.string().trim().toLowerCase().email('Please enter a valid email address').max(120);

/** Updates sign-up. Saved to the same inquiry sheet (Type = Subscriber). */
export function Newsletter() {
  const id = useId();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [trap, setTrap] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const r = emailSchema.safeParse(email);
    if (!r.success) { setError(r.error.issues[0]?.message ?? 'Invalid email'); return; }
    setError('');
    setSending(true);
    try {
      await submitInquiry({ type: 'subscribe', email: r.data, source: currentSource(), website: trap });
      setDone(true);
    } catch (err) {
      setError(err instanceof InquiryError && err.fieldErrors?.email ? err.fieldErrors.email : 'Could not subscribe right now. Please try again shortly.');
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="newsletter" role="status">
        <h2>You are on the list</h2>
        <p className="small">Thank you. We will send occasional product updates to {email}.</p>
      </div>
    );
  }
  return (
    <form className="newsletter" onSubmit={submit} noValidate>
      <h2>Product updates</h2>
      <p className="small">An occasional email about new panels and sizes.</p>
      <div className="newsletter__row">
        <label htmlFor={`${id}-e`} className="sr-only">Email address</label>
        <input id={`${id}-e`} type="email" autoComplete="email" placeholder="Your email" value={email} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }} />
        <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} />
        <button type="submit" aria-label="Subscribe" disabled={sending}><ArrowRight size={18} /></button>
      </div>
      {error && <p className="newsletter__err" id={`${id}-err`}>{error}</p>}
    </form>
  );
}
