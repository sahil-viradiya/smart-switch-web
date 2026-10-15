import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Notice } from '@/components/ui/Notice';
import { CompanyFacts } from '@/components/ui/CompanyFacts';
import { ContactForm } from '@/components/forms/ContactForm';
import { breadcrumbsJsonLd, pageMeta } from '@/lib/seo';
import { LogoMark } from '@/components/art/Logo';
import { ADDRESS_LINES, APP_CONFIG, CTA, PAGES, ROUTES, SITE_URL, legalName, mailHref, mapsHref, telHref } from '@/config';

export const metadata = pageMeta('CONTACT');

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd([{ name: PAGES.HOME.name, path: ROUTES.HOME }, { name: PAGES.CONTACT.name, path: ROUTES.CONTACT }], SITE_URL)) }} />
      <PageHero eyebrow="Contact" title={['Contact us']} lead="Sales, technical questions, installation or press. Pick a department and we will send your message to the right person." crumbs={[{ label: PAGES.CONTACT.name }]} />
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
              <h3>Email</h3>
              <a href={mailHref()}>{APP_CONFIG.SALES_EMAIL}</a>
              <p className="small">Sales, technical questions, electricians and press.</p>
            </div>
            <div className="info-card">
              <h3>Phone &amp; WhatsApp</h3>
              <a href={telHref()}>{APP_CONFIG.PHONE}</a>
              <a href={CTA.WHATSAPP.href} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            </div>
            {ADDRESS_LINES.length > 0 && (
              <div className="info-card">
                <LogoMark className="addr__logo" />
                <h3>Our address</h3>
                <address style={{ fontStyle: 'normal' }}>
                  <p><strong>{legalName()}</strong></p>
                  {ADDRESS_LINES.map((l) => <p key={l}>{l}</p>)}
                </address>
                <a href={mapsHref()} target="_blank" rel="noopener noreferrer">Get directions</a>
              </div>
            )}
            <div className="info-card">
              <h3>Who you are writing to</h3>
              <CompanyFacts />
            </div>
            <div className="info-card">
              <h3>What to expect</h3>
              <p className="small">A person reads every message and replies by email or phone. If you can, mention your wiring and wall boxes.</p>
            </div>
            <Notice title="Electrical emergency?">If you smell burning or suspect an electrical fault, switch off the main breaker and call a local emergency electrician or the emergency services.</Notice>
          </Reveal>
        </div>
      </section>
    </>
  );
}
