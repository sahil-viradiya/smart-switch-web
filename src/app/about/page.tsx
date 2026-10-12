import { PageHero } from '@/components/ui/PageHero';
import { Counter } from '@/components/motion/Counter';
import { ProvisionalBadge } from '@/components/ui/ProvisionalBadge';
import { STATS } from '@/content/home';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { CtaSection } from '@/components/ui/CtaBand';
import { SwitchArt, SwitchStage } from '@/components/art/SwitchArt';
import { FINISHES } from '@/content/product';
import { pageMeta } from '@/lib/seo';
import { CTA, PAGES } from '@/config';

export const metadata = pageMeta('ABOUT');

const VALUES = [
  { title: 'Physical first', text: 'A switch should be felt. We keep a real mechanical paddle at the centre and let intelligence stay in the background.' },
  { title: 'Safety before style', text: 'Electrical safety comes before every aesthetic decision, and we never claim a rating or certification we have not earned.' },
  { title: 'Honest about what is ready', text: 'We label anything provisional as provisional, so architects and electricians can plan with confidence.' },
  { title: 'Made to last', text: 'Serviceable, repair-minded hardware instead of disposable glass panels.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Smart Switch"
        title={['Smart technology.', 'Human experience.']}
        lead="We believe smart homes should not replace dependable physical switches with laggy screens or disposable widgets."
        crumbs={[{ label: PAGES.ABOUT.name }]}
        art={<SwitchStage className="stage--wide"><SwitchArt gangs={2} finish={FINISHES[0]!} /></SwitchStage>}
      />

      <section className="sec sec--white" aria-labelledby="story-title">
        <div className="container split">
          <Reveal className="stack stack--lg">
            <span className="eyebrow">Who we are</span>
            <h2 id="story-title" className="h-section">Designed to make smart living feel simple.</h2>
          </Reveal>
          <Reveal className="stack" delay={0.1}>
            <p className="lead">Smart Switch is an architectural wall switch for homes, renovations and studios. It pairs a tactile mechanical paddle with a quiet smart layer.</p>
            <p className="lead">The result is a switch that looks calm on the wall, feels precise in the hand and stays out of the way.</p>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--soft" aria-labelledby="values-title">
        <div className="container">
          <SectionHead eyebrow="Our philosophy" title={['The best technology should enhance the space', '— not dominate it.']} />
          <Reveal>
            <div className="cells cells--2">
              {VALUES.map((v, i) => (
                <div className="cell" key={v.title}>
                  <span className="cell__num">0{i + 1}</span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--paper" aria-labelledby="facts-title">
        <div className="container">
          <SectionHead eyebrow="At a glance" title={['The product,', 'in four facts.']} />
          <Reveal>
            <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              {STATS.map((s) => (
                <div className="stat" key={s.label}>
                  <span className="stat__value"><Counter to={s.value} /></span>
                  <span className="stat__label">{s.label} {'provisional' in s && s.provisional && <ProvisionalBadge />}</span>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection title="A smarter home should feel like a better home." text="Tell us about your project and we will follow up with technical guidance." primary={CTA.BOOK_DEMO} secondary={CTA.CONTACT_US} />
    </>
  );
}
