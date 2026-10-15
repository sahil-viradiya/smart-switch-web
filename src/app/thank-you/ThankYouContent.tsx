'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Check, WhatsAppIcon } from '@/components/art/Icons';
import { APP_CONFIG, CTA, ROUTES, whatsappHref } from '@/config';
import { markLeadTracked, trackLead } from '@/lib/meta-pixel';

export function ThankYouContent() {
  const params = useSearchParams();
  const ref = params.get('ref');
  const type = params.get('type');

  useEffect(() => {
    if (ref && markLeadTracked(ref)) {
      trackLead({
        content_name: type === 'contact' ? 'Contact Form Submission' : 'Consultation Request',
        inquiry_id: ref,
      });
    }
  }, [ref, type]);

  const waMessage = ref
    ? `Hello ${APP_CONFIG.BRAND_NAME}, I just submitted an enquiry on your website (reference: ${ref}).`
    : `Hello ${APP_CONFIG.BRAND_NAME}, I would like to know more about the switch.`;

  return (
    <div className="form-card" style={{ maxWidth: '38rem', margin: '0 auto', textAlign: 'center' }}>
      <div className="form-success" role="status">
        <div className="form-success__icon">
          <Check size={32} />
        </div>
        <h2 className="h-sub">Enquiry received</h2>
        <p>
          Thank you for reaching out. We have recorded your request and our team will get in touch with you shortly.
        </p>

        {ref && (
          <p className="form-success__ref">
            Reference <strong>{ref}</strong>
          </p>
        )}

        <p className="small">
          Quote this reference if you contact us. For instant quotes or to speak with an advisor right now, message us on WhatsApp.
        </p>

        <div className="row" style={{ justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <a
            className="btn btn--gold"
            href={whatsappHref(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} /> {CTA.WHATSAPP.label} {APP_CONFIG.PHONE}
          </a>
          <Link className="btn btn--outline-dark" href={ROUTES.CATALOGUE}>
            {CTA.BROWSE_CATALOGUE.label}
          </Link>
        </div>

        <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--line-light)', paddingTop: '1.25rem', width: '100%' }}>
          <Link className="text-link" href={ROUTES.HOME}>
            {CTA.BACK_HOME.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
