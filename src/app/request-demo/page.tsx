import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { LeadForm } from '@/components/forms/LeadForm';
import { Check } from '@/components/art/Icons';
import { breadcrumbsJsonLd, pageMeta } from '@/lib/seo';
import { APP_CONFIG, CTA, PAGES, ROUTES, SITE_URL, mailHref, telHref } from '@/config';

export const metadata = pageMeta('REQUEST_DEMO');

const NEXT = [
  'Tell us about your space and what you want to control.',
  'Your request is saved and you get a reference number.',
  'We reply with suggested series, sizes and functions.',
];

export default function RequestDemoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd([{ name: PAGES.HOME.name, path: ROUTES.HOME }, { name: PAGES.REQUEST_DEMO.name, path: ROUTES.REQUEST_DEMO }], SITE_URL)) }} />
      <PageHero eyebrow="Book a Demo" title={['Book a demo']} lead="Send a few details and we will suggest panels for your space." crumbs={[{ label: PAGES.REQUEST_DEMO.name }]} />
      <section className="sec sec--paper" aria-label="Consultation request">
        <div className="container contact-grid">
          <Reveal>
            <div className="form-card">
              <h2>Request a consultation</h2>
              <p>Takes about two minutes.</p>
              <LeadForm />
            </div>
          </Reveal>
          <Reveal className="contact-aside" delay={0.1}>
            <div className="info-card">
              <h3>What happens next</h3>
              <ul className="stack" style={{ gap: 14, marginTop: 6 }}>
                {NEXT.map((n) => (
                  <li key={n} style={{ display: 'flex', gap: 12, fontSize: '0.9rem', color: 'var(--ink-muted)' }}>
                    <span style={{ color: 'var(--gold-deep)', flex: 'none' }}><Check size={18} /></span>{n}
                  </li>
                ))}
              </ul>
            </div>
            <div className="info-card">
              <h3>Prefer to talk?</h3>
              <a href={mailHref()}>{APP_CONFIG.SALES_EMAIL}</a>
              <a href={telHref()}>{APP_CONFIG.PHONE}</a>
              <a href={CTA.WHATSAPP.href} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              <p className="small">Installation is always carried out by a licensed electrician.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
