import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { LeadForm } from '@/components/forms/LeadForm';
import { Check } from '@/components/art/Icons';
import { pageMeta } from '@/lib/seo';
import { APP_CONFIG, PAGES } from '@/config';

export const metadata = pageMeta('REQUEST_DEMO');

const NEXT = [
  'Tell us about your space and what you want to control.',
  'Your email app opens with the details ready to send.',
  'We reply with configuration and finish guidance.',
];

export default function RequestDemoPage() {
  return (
    <>
      <PageHero eyebrow="Book a Demo" title={['Tell us how you live.', "We'll shape the wall."]} lead="Share a few details and we will recommend the right Smart Switch configuration for your space." crumbs={[{ label: PAGES.REQUEST_DEMO.name }]} />
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
              <h3>Prefer email?</h3>
              <a href={`mailto:${APP_CONFIG.SALES_EMAIL}`}>{APP_CONFIG.SALES_EMAIL}</a>
              <p className="small">Installation is always carried out by a licensed electrician.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
