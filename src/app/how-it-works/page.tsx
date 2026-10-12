import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { Notice } from '@/components/ui/Notice';
import { ProgressRail } from '@/components/motion/ProgressRail';
import { WallChecker } from '@/components/tools/WallChecker';
import { CHECK_QUESTIONS } from '@/content/tools';
import { CtaSection } from '@/components/ui/CtaBand';
import { pageMeta } from '@/lib/seo';
import { CTA, PAGES } from '@/config';

export const metadata = pageMeta('HOW_IT_WORKS');

const STEPS = [
  {
    who: 'You and your designer',
    title: 'Plan the wall',
    text: 'Decide which rooms and functions you want, then pick a series, a size and a version.',
    points: ['Choose Color or Edge.', 'Pick a size for each wall box, from 2M to 12M.', 'Choose Wi-Fi or Zigbee, and glass or acrylic where both are offered.'],
  },
  {
    who: 'Licensed electrician',
    title: 'Check and install',
    text: 'Your electrician checks the wiring and wall boxes, fits each panel and tests it.',
    points: [
      'Check the wiring in each wall box before you order.',
      'Match the 6A or 16A versions to the load on each circuit.',
      'Set up the gateway first if you chose the Zigbee version.',
      'Isolate the circuit and fit the panel following your local electrical code.',
    ],
  },
  {
    who: 'Day to day',
    title: 'Use it',
    text: 'Touch the panel, or use the app, your voice or a remote.',
    points: ['Touch the icon or touch point on the panel.', 'Use the Android or iOS app from anywhere.', 'Ask a voice assistant such as Alexa or Google Home.'],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero eyebrow="How it works" title={['Plan, install, use']} lead="Here is how a Smart Switch installation goes, from choosing panels to using them." crumbs={[{ label: PAGES.HOW_IT_WORKS.name }]} />

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
