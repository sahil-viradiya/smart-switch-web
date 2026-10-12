import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Notice } from '@/components/ui/Notice';
import { ContactForm } from '@/components/forms/ContactForm';
import { pageMeta } from '@/lib/seo';
import { APP_CONFIG, PAGES } from '@/config';

export const metadata = pageMeta('CONTACT');

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title={['Talk to our team.', 'We read every message.']} lead="Sales, technical support, electricians or press — choose a department and we will route your message." crumbs={[{ label: PAGES.CONTACT.name }]} />
      <section className="sec sec--paper" aria-label="Contact">
        <div className="container contact-grid">
          <Reveal>
            <div className="form-card">
              <h2>Send a message</h2>
              <p>Choose the department that fits best.</p>
              <ContactForm />
            </div>
          </Reveal>
          <Reveal className="contact-aside" delay={0.1}>
            <div className="info-card">
              <h3>Sales</h3>
              <a href={`mailto:${APP_CONFIG.SALES_EMAIL}`}>{APP_CONFIG.SALES_EMAIL}</a>
              <a href={`tel:${APP_CONFIG.PHONE.replace(/[^+\d]/g, '')}`}>{APP_CONFIG.PHONE}</a>
            </div>
            <div className="info-card">
              <h3>Technical support</h3>
              <a href={`mailto:${APP_CONFIG.SUPPORT_EMAIL}`}>{APP_CONFIG.SUPPORT_EMAIL}</a>
            </div>
            <div className="info-card">
              <h3>Studio</h3>
              <address style={{ fontStyle: 'normal' }}>{APP_CONFIG.ADDRESS_LINES.map((l) => <p key={l}>{l}</p>)}</address>
            </div>
            <div className="info-card">
              <h3>What to expect</h3>
              <p className="small">A person reads every message. Sales enquiries are answered by the project team; technical questions by engineering. Tell us about your wiring and wall boxes if you can.</p>
            </div>
            <Notice title="Electrical emergency?">If you smell burning or suspect an electrical hazard, switch off the main breaker and call a local emergency electrician or emergency services.</Notice>
          </Reveal>
        </div>
      </section>
    </>
  );
}
