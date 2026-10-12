import { Alert, Check, WhatsAppIcon } from '@/components/art/Icons';
import { APP_CONFIG, CTA, mailHref, telHref } from '@/config';

interface SuccessProps {
  title: string;
  /** Reference of the saved inquiry (e.g. DEMO-261013-7K2QX). */
  reference: string;
  message?: string;
  onReset: () => void;
}

/** Shown only after the server confirmed the inquiry was saved. */
export function FormSuccess({ title, reference, message = 'Your request has been recorded. Our team will follow up using the details you provided.', onReset }: SuccessProps) {
  return (
    <div className="form-success" role="status">
      <div className="form-success__icon"><Check size={28} /></div>
      <h2 className="h-sub">{title}</h2>
      <p>{message}</p>
      <p className="form-success__ref">Reference <strong>{reference}</strong></p>
      <p className="small">Quote this reference if you contact us. For a quicker reply, message us on WhatsApp.</p>
      <div className="row" style={{ justifyContent: 'center' }}>
        <a className="btn btn--gold btn--sm" href={CTA.WHATSAPP.href} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={16} /> WhatsApp {APP_CONFIG.PHONE}</a>
        <button type="button" className="btn btn--outline-dark btn--sm" onClick={onReset}>Send another</button>
      </div>
    </div>
  );
}

/** Shown when saving failed. Keeps the visitor's text in the form and offers direct channels. */
export function SubmitError({ message, mailto }: { message: string; mailto: string }) {
  return (
    <div className="form__alert" role="alert">
      <p style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Alert size={18} /> <strong>{message}</strong></p>
      <p className="small" style={{ color: 'inherit', marginTop: 6 }}>Please try again in a moment, or reach us directly:</p>
      <div className="row" style={{ marginTop: 10 }}>
        <a className="btn btn--outline-dark btn--sm" href={CTA.WHATSAPP.href} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a className="btn btn--outline-dark btn--sm" href={mailto}>Email us</a>
        <a className="btn btn--outline-dark btn--sm" href={telHref()}>Call {APP_CONFIG.PHONE}</a>
      </div>
    </div>
  );
}

export { mailHref };
