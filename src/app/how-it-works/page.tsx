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
    who: 'You and your designer',
    title: 'Plan the wall',
    text: 'Decide which rooms and circuits you want to control, then pick a configuration and finish.',
    points: ['Choose 1, 2 or 3-gang plates, or the dimmer.', 'Pick a finish for each room.', 'Note any multi-way circuits for your electrician.'],
  },
  {
    who: 'Licensed electrician',
    title: 'Check and install',
    text: 'Your electrician checks the wall box and wiring, fits each switch and tests it.',
    points: [
      'Confirm a neutral wire is present in the back-box.',
      `Confirm the box is a standard gang box with ${SPEC.boxDepth} minimum depth (provisional).`,
      `Confirm supply is ${SPEC.voltage} (provisional).`,
      'Isolate the circuit and fit it following your local electrical code.',
    ],
  },
  {
    who: 'Day to day',
    title: 'Use it',
    text: 'Press the paddle like any other switch. The smart features run in the background.',
    points: ['Mechanical paddles with a small status light.', 'Local switching, designed to work without the internet.', 'Ready for open standards later.'],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero eyebrow="How it works" title={['Plan, install, use']} lead="Here is how a Smart Switch installation goes, from choosing plates to using the switch." crumbs={[{ label: PAGES.HOW_IT_WORKS.name }]} />

      <section className="sec sec--paper" aria-labelledby="steps-title">
        <div className="container">
          <SectionHead eyebrow="The process" title={['Three steps']} />
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
          <SectionHead eyebrow="Wall check" title={['Is your wall ready?']} lead="Answer four questions. This is only a planning aid. Your licensed electrician makes the final decision." />
          <Reveal><WallChecker questions={CHECK_QUESTIONS} /></Reveal>
        </div>
      </section>

      <section className="sec sec--dark sec--tight" aria-label="Safety notice">
        <div className="container--narrow">
          <Reveal>
            <Notice title="Safety">
              Smart Switch connects to mains voltage. A certified, licensed electrician must install it. Never open a wall box while the circuit is live.
            </Notice>
          </Reveal>
        </div>
      </section>

      <CtaSection title="Need help planning the install?" text="Send us your project details and we will help you prepare a brief for your electrician." primary={CTA.BOOK_DEMO} secondary={CTA.CONTACT_US} />
    </>
  );
}
