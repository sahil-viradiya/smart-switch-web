import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { CompanyFacts } from '@/components/ui/CompanyFacts';
import { APP_CONFIG, CTA, telHref, mailHref } from '@/config';
import { ASSURANCES, HOW_TO_BUY } from '@/content/trust';

/** "Buy with confidence": how buying works, what a visitor can check, and who to call. All values come from config. */
export function TrustSection() {
  return (
    <section id="trust" className="sec sec--dark" aria-labelledby="trust-title">
      <div className="container">
        <SectionHead eyebrow="Buy with confidence" title={['How buying works,', 'and what you can check.']} lead="There is no online checkout. You talk to a person, and the quotation, order and warranty terms are confirmed in writing." />
        <Reveal>
          <ol className="cells cells--5" aria-label="How buying works">
            {HOW_TO_BUY.map((s, i) => (
              <li className="cell" key={s.title}>
                <span className="cell__num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="cells cells--3 trust__checks">
            {ASSURANCES.map((a) => (
              <div className="cell" key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <Link className="text-link" href={a.link.href}>{a.link.label}</Link>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="trust__who">
            <CompanyFacts />
            <p className="trust__reach">
              <a href={telHref()}>{APP_CONFIG.PHONE}</a>
              <a href={CTA.WHATSAPP.href} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href={mailHref()}>{APP_CONFIG.SALES_EMAIL}</a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
