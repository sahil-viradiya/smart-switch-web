import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { CtaSection } from '@/components/ui/CtaBand';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SceneArt } from '@/components/art/SceneArt';
import { ProductImage, ProductStage } from '@/components/art/ProductImage';
import { ArrowRight } from '@/components/art/Icons';
import { USE_CASES, getUseCase } from '@/content/use-cases';
import { CTA, PAGES, ROUTES, demoIntentHref } from '@/config';
import { openGraph } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return USE_CASES.map((u) => ({ slug: u.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const u = getUseCase(params.slug);
  if (!u) return {};
  return { title: u.title, description: u.summary, alternates: { canonical: ROUTES.USE_CASES_SLUG(u.slug) }, openGraph: openGraph(u.title, u.summary, ROUTES.USE_CASES_SLUG(u.slug)) };
}

export default function UseCasePage({ params }: { params: { slug: string } }) {
  const u = getUseCase(params.slug);
  if (!u) notFound();

  return (
    <>
      <PageHero
        eyebrow={u.category}
        title={u.headline}
        lead={u.overview}
        crumbs={[{ label: PAGES.USE_CASES.name, href: PAGES.USE_CASES.path }, { label: u.title }]}
        actions={<ButtonLink href={demoIntentHref(u.slug === 'residential-homes' ? 'homeowner' : 'architect')} arrow>{CTA.PLAN_SPACE.label}</ButtonLink>}
        art={<div className="scene-frame"><SceneArt scene={u.scene} /></div>}
      />

      <section className="sec sec--paper" aria-labelledby="sol-title">
        <div className="container split split--wide-left" style={{ alignItems: 'start' }}>
          <Reveal>
            <span className="eyebrow">What it helps with</span>
            <h2 id="sol-title" className="h-section" style={{ margin: '16px 0 32px' }}>How it works in this space</h2>
            <div className="detail-list">
              {u.solutions.map((s, i) => (
                <div key={s.title}>
                  <span className="cell__num">0{i + 1}</span>
                  <div><h3>{s.title}</h3><p>{s.description}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="stack stack--lg">
              <ProductStage className="stage--wide"><ProductImage series={u.product.series} productId={u.product.id} sizes="(max-width: 1050px) 90vw, 520px" /></ProductStage>
              <div className="info-card">
                <h3>What we would suggest</h3>
                <dl style={{ display: 'grid', gap: 10, marginTop: 6 }}>
                  {u.recommendations.map((r) => (
                    <div key={r.label} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, fontSize: '0.875rem' }}>
                      <dt style={{ color: 'var(--ink-muted)' }}>{r.label}</dt>
                      <dd>{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--dark sec--tight" aria-label="Next use case">
        <div className="container">
          <Reveal>
            <Link href={ROUTES.USE_CASES_SLUG(u.next.slug)} className="cta-band" style={{ display: 'flex' }}>
              <div><span className="eyebrow">Next</span><h2 style={{ marginTop: 16 }}>{u.next.title}</h2></div>
              <span className="btn btn--ghost">Continue <ArrowRight className="btn__arrow" /></span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaSection title="Planning this kind of project?" text="Describe the space and we will suggest which panels would suit it." />
    </>
  );
}
