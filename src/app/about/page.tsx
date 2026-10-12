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
  { title: 'Keep the paddle', text: 'People already know how to use a mechanical paddle. We built the smart features around it, not instead of it.' },
  { title: 'Safety before looks', text: 'Safety decisions come before design decisions. We do not claim a rating or certification until we have earned it.' },
  { title: 'Say what is ready', text: 'Anything still being tested is marked provisional, so architects and electricians know what to rely on.' },
  { title: 'Built to last', text: 'We would rather make repairable hardware than a glass panel that gets thrown away.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={['Why we built Smart Switch']}
        lead="We think a smart home should not replace reliable physical switches with slow screens or disposable gadgets."
        crumbs={[{ label: PAGES.ABOUT.name }]}
        art={<SwitchStage className="stage--wide"><SwitchArt gangs={2} finish={FINISHES[0]!} /></SwitchStage>}
      />

      <section className="sec sec--white" aria-labelledby="story-title">
        <div className="container split">
          <Reveal className="stack stack--lg">
            <span className="eyebrow">Our story</span>
            <h2 id="story-title" className="h-section">A switch you can feel</h2>
          </Reveal>
          <Reveal className="stack" delay={0.1}>
            <p className="lead">Smart Switch is a wall switch for homes, renovations and studios. It has a mechanical paddle with a smart module behind it.</p>
            <p className="lead">The aim is a switch that looks plain on the wall, feels solid when you press it and does not get in your way.</p>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--soft" aria-labelledby="values-title">
        <div className="container">
          <SectionHead eyebrow="Values" title={['What we care about']} />
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
          <SectionHead eyebrow="At a glance" title={['Four facts']} />
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

      <CtaSection title="Questions about the project?" text="Tell us what you are working on and we will reply with technical guidance." primary={CTA.BOOK_DEMO} secondary={CTA.CONTACT_US} />
    </>
  );
}
