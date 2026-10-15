import Link from 'next/link';
import { ICONS, Check } from '@/components/art/Icons';
import { ProductImage, ProductStage } from '@/components/art/ProductImage';
import { AccessoryGrid } from '@/components/catalog/AccessoryGrid';
import { PanelTypes } from '@/components/catalog/PanelTypes';
import { MediaGallery } from '@/components/media/MediaGallery';
import { ProductFilm } from '@/components/media/ProductFilm';
import { Zoomable } from '@/components/media/Zoomable';
import { SectionNav } from '@/components/motion/SectionNav';
import { Tilt } from '@/components/motion/Tilt';
import { Configurator } from '@/components/product/Configurator';
import { CtaSection } from '@/components/ui/CtaBand';
import { CtaLink } from '@/components/ui/CtaLink';
import { Notice } from '@/components/ui/Notice';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { SpecTable } from '@/components/ui/SpecTable';
import { SERIES } from '@/content/catalog';
import { CTA, PAGES, ROUTES, SITE_URL, VIDEOS, catalogueHref } from '@/config';
import { FILM_COPY, GALLERY } from '@/content/home';
import { COMPARE_ROWS, KEY_FEATURES, SPEC_ROWS, WALL_CHECKLIST } from '@/content/product';
import { breadcrumbsJsonLd, pageMeta, productJsonLd } from '@/lib/seo';

export const metadata = pageMeta('PRODUCT');

const SECTIONS = [
  { id: 'top', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'film', label: 'Film' },
  { id: 'series', label: 'Series' },
  { id: 'configure', label: 'Sizes' },
  { id: 'functions', label: 'Functions' },
  { id: 'compare', label: 'Compare' },
  { id: 'specs', label: 'Specifications' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'gallery', label: 'Gallery' },
];

const SERIES_ART: Record<string, string> = { color: '4m-4-switch-1-fan', edge: '4m-4-switch' };

export default function ProductPage() {
  return (
    <>
      <SectionNav sections={SECTIONS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(SITE_URL)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd([{ name: PAGES.HOME.name, path: ROUTES.HOME }, { name: PAGES.PRODUCT.name, path: ROUTES.PRODUCT }], SITE_URL)) }} />
      <PageHero
        eyebrow="Product"
        title={['Touch panels in', 'glass or acrylic']}
        lead="Two series, six sizes and a long list of configurations. Control each panel from the wall, an app, your voice or a remote."
        crumbs={[{ label: PAGES.PRODUCT.name }]}
        actions={<><CtaLink cta={CTA.EXPLORE_CONFIGS} arrow /><CtaLink cta={CTA.BROWSE_CATALOGUE} variant="ghost" /></>}
        art={
          <Tilt>
            <Zoomable item={{ kind: 'product', series: 'color', productId: '6m-6-switch-1-fan', caption: 'Color, 6M with a fan control', alt: 'Color series 6M panel with six switches and a fan control' }}>
              <ProductStage className="stage--wide">
                <ProductImage series="color" productId="6m-6-switch-1-fan" sizes="(max-width: 1050px) 90vw, 560px" priority />
                <div className="stage__caption glass-chip"><small>Color series</small><strong>6M, 6 switches + fan control</strong></div>
              </ProductStage>
            </Zoomable>
          </Tilt>
        }
      />

      <div className="works-with">
        <div className="container works-with__inner">
          <span className="works-with__label">Control</span>
          <ul>
            <li>Touch</li>
            <li>Android and iOS app</li>
            <li>Alexa and Google Home</li>
            <li>IR remote</li>
            <li>Wi-Fi or Zigbee</li>
          </ul>
        </div>
      </div>

      <section id="features" className="sec sec--paper" aria-labelledby="features-title">
        <div className="container">
          <SectionHead eyebrow="Features" title={['Key features']} />
          <Reveal>
            <div className="cells cells--5">
              {KEY_FEATURES.map((f, i) => {
                const Icon = ICONS[f.icon];
                return (
                  <div className="cell" key={f.title}>
                    <span className="cell__num">0{i + 1}</span>
                    <span className="cell__icon"><Icon /></span>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product film */}
      <section id="film" className="sec sec--dark film" aria-label="Product film">
        <div className="container">
          <SectionHead eyebrow={FILM_COPY.eyebrow} title={FILM_COPY.title} lead={FILM_COPY.lead} />
          <Reveal variant="scale"><ProductFilm video={VIDEOS.film} /></Reveal>
          <p className="small film__note">{FILM_COPY.note}</p>
        </div>
      </section>

      <section id="series" className="sec sec--white" aria-labelledby="series-title">
        <div className="container">
          <SectionHead eyebrow="Series" title={['Color and Edge']} lead="The two series have the same sizes and functions. They differ in how the panel looks." />
          <ul className="grid grid--2">
            {SERIES.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 0.08}>
                <article className="card" style={{ height: '100%' }}>
                  <ProductStage className="stage--card">
                    <ProductImage series={s.id} productId={SERIES_ART[s.id]!} sizes="(max-width: 640px) 80vw, 420px" />
                  </ProductStage>
                  <div className="card__body" style={{ gap: 14, padding: 'clamp(20px, 3vw, 32px)' }}>
                    <span className="card__eyebrow">{s.indicator}</span>
                    <h3 className="h-sub">{s.name}</h3>
                    <p className="card__text" style={{ fontSize: '0.9375rem' }}>{s.summary}</p>
                    <ul className="stack" style={{ gap: 6 }}>
                      {s.highlights.map((h) => (<li key={h} className="small" style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Check size={16} /> {h}</li>))}
                    </ul>
                    <Link className="text-link" href={catalogueHref({ series: s.id })}>See all {s.name} configurations</Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="configure" className="sec sec--paper divider-top" aria-label="Choose a series and size" style={{ paddingTop: 'clamp(56px, 8vw, 96px)' }}>
        <div className="container"><Reveal><Configurator /></Reveal></div>
      </section>

      <section id="functions" className="sec sec--dark" aria-labelledby="functions-title">
        <div className="container">
          <SectionHead eyebrow="Functions" title={['Pick by', 'function']} lead="Switches, sockets, fan, scene, curtain and dimmer panels, a USB charger and a doorbell. Choose one to see its configurations. Counts are the different layouts in Color and Edge together." />
          <PanelTypes />
          <p className="small" style={{ marginTop: 18 }}>To control an air conditioner or a TV, pair a Wi-Fi panel with the <Link className="text-link" href="#accessories">IR blaster</Link>.</p>
        </div>
      </section>

      <section id="compare" className="sec sec--white" aria-labelledby="compare-title">
        <div className="container">
          <SectionHead eyebrow="Compare" title={['Color or Edge']} lead="What is different between the two series." />
          <Reveal>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="Comparison of the Color and Edge series">
              <table className="compare">
                <caption className="sr-only">Comparison of the Color and Edge series</caption>
                <thead>
                  <tr><th scope="col"><span className="sr-only">Feature</span></th>{SERIES.map((s) => <th scope="col" key={s.id}>{s.name}</th>)}</tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      {r.values.map((v, i) => <td key={i}>{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="specs" className="sec sec--dark" aria-labelledby="specs-title">
        <div className="container split split--wide-left" style={{ alignItems: 'start' }}>
          <Reveal className="stack stack--lg">
            <span className="eyebrow">Specifications</span>
            <h2 id="specs-title" className="h-section">Specifications</h2>
            <p className="lead">What we can confirm is listed as it is. Items we have not published yet are marked to be confirmed.</p>
            <Notice title="Certifications">We have not published certifications yet. We will list them here once we can show the certificates.</Notice>
          </Reveal>
          <Reveal delay={0.1}><SpecTable rows={SPEC_ROWS} caption="Smart Switch specifications" /></Reveal>
        </div>
      </section>

      <section className="sec sec--paper" aria-labelledby="checklist-title">
        <div className="container split">
          <Reveal className="stack stack--lg">
            <span className="eyebrow">Before you order</span>
            <h2 id="checklist-title" className="h-section">Check these first</h2>
            <p className="lead">Go through this list with your electrician. Installation must always be done by a licensed electrician.</p>
            <div><CtaLink cta={CTA.HOW_INSTALL} variant="outline-dark" arrow /></div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="stack" style={{ gap: 0, borderTop: '1px solid var(--line-light)' }}>
              {WALL_CHECKLIST.map((item) => (
                <li key={item} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '20px 0', borderBottom: '1px solid var(--line-light)' }}>
                  <span className="cell__icon" style={{ width: 32, height: 32, borderRadius: 'var(--radius-md)', margin: 0 }}><Check size={16} /></span>
                  <span style={{ color: 'var(--ink)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="accessories" className="sec sec--white" aria-labelledby="acc-title">
        <div className="container">
          <SectionHead eyebrow="Accessories" title={['Add-ons']} lead="Gateways, an IR blaster and a remote work alongside the panels." />
          <AccessoryGrid />
        </div>
      </section>

      <section id="gallery" className="sec sec--dark" aria-labelledby="gallery-title">
        <div className="container">
          <SectionHead eyebrow="Gallery" title={['All series and sizes']} lead="Select an image to enlarge it." />
          <Reveal><MediaGallery items={GALLERY.filter((g) => g.kind === 'product')} /></Reveal>
          <p className="small" style={{ marginTop: 18 }}><Link className="text-link" href={ROUTES.CATALOGUE}>Browse every configuration</Link></p>
        </div>
      </section>

      <CtaSection title="Ready to plan?" text="Share your floor plan or a list of rooms and we will come back with a suggested layout for each wall." />
    </>
  );
}
