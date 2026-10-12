import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { CtaSection } from '@/components/ui/CtaBand';
import { OrbitDiagram } from '@/components/art/OrbitDiagram';
import { ExplodedView } from '@/components/product/ExplodedView';
import { LAYERS } from '@/content/layers';
import { ICONS, ArrowUpRight } from '@/components/art/Icons';
import { FEATURES } from '@/content/features';
import { pageMeta } from '@/lib/seo';
import { CtaLink } from '@/components/ui/CtaLink';
import { ROUTES, CTA, PAGES } from '@/config';

export const metadata = pageMeta('FEATURES');

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title={['How it is built']}
        lead="Four things decide how a Smart Switch panel works: how it feels to touch, how you control it, how it connects and which size fits your wall."
        crumbs={[{ label: PAGES.FEATURES.name }]}
        actions={<CtaLink cta={CTA.VIEW_PRODUCT} arrow />}
      />

      <ExplodedView layers={LAYERS} />

      <section className="sec sec--paper" aria-labelledby="pillars-title">
        <div className="container">
          <SectionHead eyebrow="Four areas" title={['The four areas of design']} />
          <ul className="grid grid--2">
            {FEATURES.map((f, i) => {
              const Icon = ICONS[f.icon];
              return (
                <Reveal as="li" key={f.slug} delay={(i % 2) * 0.08}>
                  <Link href={ROUTES.FEATURES_SLUG(f.slug)} className="card" style={{ display: 'block', height: '100%' }}>
                    <div className="card__body" style={{ padding: 'clamp(24px, 3vw, 36px)', gap: 14 }}>
                      <span className="cell__icon" style={{ margin: 0 }}><Icon /></span>
                      <span className="card__eyebrow">{f.eyebrow}</span>
                      <span className="card__title" style={{ fontSize: '1.35rem', fontWeight: 500 }}>{f.title} <ArrowUpRight /></span>
                      <p className="card__text" style={{ fontSize: '0.9375rem' }}>{f.summary}</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="sec sec--white" aria-labelledby="system-title">
        <div className="container split">
          <Reveal className="stack stack--lg">
            <span className="eyebrow">System</span>
            <h2 id="system-title" className="h-section">How the parts connect</h2>
            <p className="lead">The four areas depend on each other. Together they decide how a panel looks, how it is controlled and how it connects.</p>
            <div><CtaLink cta={CTA.READ_FAQ} variant="outline-dark" arrow /></div>
          </Reveal>
          <Reveal variant="scale" delay={0.1}><OrbitDiagram /></Reveal>
        </div>
      </section>

      <CtaSection title="Want more technical detail?" text="Tell us about your project and we will go through the details with you." />
    </>
  );
}
