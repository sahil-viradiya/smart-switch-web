import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { Notice } from '@/components/ui/Notice';
import { ProgressRail } from '@/components/motion/ProgressRail';
import { WallChecker } from '@/components/tools/WallChecker';
import { CHECK_QUESTIONS } from '@/content/tools';
import { CtaSection } from '@/components/ui/CtaBand';
import { pageMeta } from '@/lib/seo';
import { SPEC, CTA, PAGES } from '@/config';

export const metadata = pageMeta('HOW_IT_WORKS');

const STEPS = [
  {
    who: 'You & your designer',
    title: 'Plan the wall',
    text: 'Decide which rooms and circuits you want to control, and choose a configuration and finish.',
    points: ['Choose 1, 2 or 3-gang plates or the dimmer variant.', 'Pick a finish that suits the room.', 'Note any multi-way circuits for your electrician.'],
  },
  {
    who: 'Licensed electrician',
    title: 'Check and install',
    text: 'A licensed electrician audits the wall box and wiring, then installs and tests each switch.',
    points: [
      'Confirm a neutral wire is present in the back-box.',
      `Confirm the box is a standard gang box with ${SPEC.boxDepth} minimum depth (provisional).`,
      `Confirm supply is ${SPEC.voltage} (provisional).`,
      'Isolate the circuit and install in line with local electrical codes.',
    ],
  },
  {
    who: 'Every day',
    title: 'Enjoy the wall',
    text: 'Use the paddle as you would any switch. Smart features sit quietly in the background.',
    points: ['Tactile paddles with a soft status LED.', 'Local switching designed to keep working without the internet.', 'Open connectivity readiness for future platforms.'],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero eyebrow="How it works" title={['Three steps.', 'One calm wall.']} lead="From planning to everyday use, here is how a Smart Switch installation comes together." crumbs={[{ label: PAGES.HOW_IT_WORKS.name }]} />

      <section className="sec sec--paper" aria-labelledby="steps-title">
        <div className="container">
          <SectionHead eyebrow="The process" title={['Plan. Install.', 'Enjoy.']} />
          <ProgressRail>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06}>
                <div className="step">
                  <span className="step__num" aria-hidden="true">0{i + 1}</span>
                  <div className="step__body">
                    <span className="step__who">{s.who}</span>
                    <h3 className="h-sub">{s.title}</h3>
                    <p className="lead" style={{ fontSize: '1rem' }}>{s.text}</p>
                    <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
          </ProgressRail>
        </div>
      </section>

      <section id="checker" className="sec sec--white" aria-labelledby="checker-title">
        <div className="container--narrow">
          <SectionHead eyebrow="Wall readiness" title={['Is your wall', 'ready to plan?']} lead="Answer four quick questions. It is a planning aid only — your licensed electrician makes the final call." />
          <Reveal><WallChecker questions={CHECK_QUESTIONS} /></Reveal>
        </div>
      </section>

      <section className="sec sec--dark sec--tight" aria-label="Safety notice">
        <div className="container--narrow">
          <Reveal>
            <Notice title="Safety warning">
              Smart Switch connects to mains voltage. Installation must be carried out by a certified, licensed electrician. Never open an energised wall box.
            </Notice>
          </Reveal>
        </div>
      </section>

      <CtaSection title="Need help planning your install?" text="Tell us about your project and we will help you prepare a brief for your electrician." primary={CTA.BOOK_DEMO} secondary={CTA.CONTACT_US} />
    </>
  );
}
