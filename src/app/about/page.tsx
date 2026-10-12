import { PageHero } from '@/components/ui/PageHero';
import { Counter } from '@/components/motion/Counter';
import { STATS } from '@/content/home';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { CtaSection } from '@/components/ui/CtaBand';
import { ProductImage, ProductStage } from '@/components/art/ProductImage';
import { pageMeta } from '@/lib/seo';
import { CTA, PAGES, SPEC } from '@/config';

export const metadata = pageMeta('ABOUT');

const VALUES = [
  { title: 'Easy to use', text: 'A touch panel should be obvious. Each function has its own icon, and the same panel works from the app, by voice or with a remote.' },
  { title: 'Safety before looks', text: 'Installation is always by a licensed electrician, and we do not claim a certification until we hold the certificate.' },
  { title: 'Say what we know', text: 'We list what we can confirm and mark the rest as to be confirmed, so architects and electricians know what to rely on.' },
  { title: 'Built to last', text: `The panels come with a ${SPEC.warrantyTerm} warranty, in glass or acrylic with a slim border.` },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={['Why we built Smart Switch']}
        lead="We think a smart home should be simple to plan, simple to install and simple to use."
        crumbs={[{ label: PAGES.ABOUT.name }]}
        art={<ProductStage className="stage--wide"><ProductImage series="edge" productId="4m-4-switch" sizes="(max-width: 1050px) 90vw, 560px" priority /></ProductStage>}
      />

      <section className="sec sec--white" aria-labelledby="story-title">
        <div className="container split">
          <Reveal className="stack stack--lg">
            <span className="eyebrow">Our story</span>
            <h2 id="story-title" className="h-section">A panel you can control any way</h2>
          </Reveal>
          <Reveal className="stack" delay={0.1}>
            <p className="lead">Smart Switch is a range of touch switches for homes, renovations and studios. A single glass or acrylic panel can hold the lights, a fan control, curtain control and sockets.</p>
            <p className="lead">You can use the panel, the app on your phone, a voice assistant or a remote, and you can choose between a Wi-Fi version and a Zigbee version.</p>
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
                  <span className="stat__label">{s.label}</span>
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
