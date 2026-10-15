import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SpecTable } from '@/components/ui/SpecTable';
import { CtaSection } from '@/components/ui/CtaBand';
import { ProductImage, ProductStage } from '@/components/art/ProductImage';
import { ArrowRight } from '@/components/art/Icons';
import { FEATURES, getFeature } from '@/content/features';
import { CtaLink } from '@/components/ui/CtaLink';
import { ROUTES, CTA, PAGES, SITE_URL } from '@/config';
import { breadcrumbsJsonLd, openGraph, twitterCard } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const f = getFeature(params.slug);
  if (!f) return {};
  return {
    title: f.seo.title,
    description: f.seo.description,
    alternates: { canonical: ROUTES.FEATURES_SLUG(f.slug) },
    openGraph: openGraph(f.seo.title, f.seo.description, ROUTES.FEATURES_SLUG(f.slug)),
    twitter: twitterCard(f.seo.title, f.seo.description),
  };
}

export default function FeaturePage({ params }: { params: { slug: string } }) {
  const f = getFeature(params.slug);
  if (!f) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd([{ name: PAGES.HOME.name, path: ROUTES.HOME }, { name: PAGES.FEATURES.name, path: ROUTES.FEATURES }, { name: f.title, path: ROUTES.FEATURES_SLUG(f.slug) }], SITE_URL)) }} />
      <PageHero
        eyebrow={f.eyebrow}
        title={f.headline}
        lead={f.overview}
        crumbs={[{ label: PAGES.FEATURES.name, href: PAGES.FEATURES.path }, { label: f.title }]}
        actions={<CtaLink cta={CTA.VIEW_PRODUCT} arrow />}
        art={
          <ProductStage className="stage--wide">
            <ProductImage series={f.art.series} productId={f.art.id} sizes="(max-width: 1050px) 90vw, 560px" priority />
          </ProductStage>
        }
      />

      <section className="sec sec--paper" aria-labelledby="details-title">
        <div className="container split split--wide-left" style={{ alignItems: 'start' }}>
          <Reveal>
            <span className="eyebrow">Details</span>
            <h2 id="details-title" className="h-section" style={{ margin: '16px 0 32px' }}>{f.title}</h2>
            <div className="detail-list">
              {f.details.map((d, i) => (
                <div key={d.heading}>
                  <span className="cell__num">0{i + 1}</span>
                  <div>
                    <h3>{d.heading}</h3>
                    <p>{d.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="form-card" style={{ boxShadow: 'none' }}>
              <h2 className="h-sub">Key facts</h2>
              <div style={{ marginTop: 12 }}><SpecTable rows={f.facts} caption={`${f.title} facts`} /></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--dark sec--tight" aria-label="Related feature">
        <div className="container">
          <Reveal>
            <Link href={ROUTES.FEATURES_SLUG(f.related.slug)} className="cta-band" style={{ display: 'flex' }}>
              <div>
                <span className="eyebrow">Next</span>
                <h2 style={{ marginTop: 16 }}>{f.related.title}</h2>
              </div>
              <span className="btn btn--ghost">Continue <ArrowRight className="btn__arrow" /></span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaSection title="Questions about the engineering?" text="Ask us and we will explain any part of the design." primary={CTA.CONTACT_US} secondary={CTA.BOOK_DEMO} />
    </>
  );
}
