import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { SpecTable } from '@/components/ui/SpecTable';
import { Notice } from '@/components/ui/Notice';
import { CtaSection } from '@/components/ui/CtaBand';
import { Configurator } from '@/components/product/Configurator';
import { MediaGallery } from '@/components/media/MediaGallery';
import { Zoomable } from '@/components/media/Zoomable';
import { Tilt } from '@/components/motion/Tilt';
import { SectionNav } from '@/components/motion/SectionNav';
import { GALLERY } from '@/content/home';
import { SwitchArt, SwitchStage } from '@/components/art/SwitchArt';
import { ICONS, Check } from '@/components/art/Icons';
import { ProvisionalBadge } from '@/components/ui/ProvisionalBadge';
import { COMPARE_ROWS, ELECTRICAL_CHECKLIST, FINISHES, INCLUDED, KEY_FEATURES, SPEC_ROWS, VARIANTS } from '@/content/product';
import { pageMeta } from '@/lib/seo';
import { CtaLink } from '@/components/ui/CtaLink';
import { ROUTES, CTA, PAGES } from '@/config';

export const metadata = pageMeta('PRODUCT');

const SECTIONS = [
  { id: 'top', label: 'Overview' },
  { id: 'features', label: 'Key features' },
  { id: 'configure', label: 'Configure' },
  { id: 'compare', label: 'Compare' },
  { id: 'specs', label: 'Specifications' },
  { id: 'included', label: 'In the box' },
  { id: 'gallery', label: 'Gallery' },
];

export default function ProductPage() {
  return (
    <>
      <SectionNav sections={SECTIONS} />
      <PageHero
        eyebrow="Smart Switch"
        title={['Smart Switch.', 'Designed to disappear.']}
        lead="A mechanical, tactile wall switch with a quiet smart layer — flush, modular and available in three architectural finishes."
        crumbs={[{ label: PAGES.PRODUCT.name }]}
        actions={<><CtaLink cta={CTA.EXPLORE_CONFIGS} arrow /><CtaLink cta={CTA.ASK_PRODUCT} variant="ghost" /></>}
        art={
          <Tilt>
            <Zoomable item={{ kind: 'switch', variant: '3_GANG', finish: 'MATTE_CHARCOAL', caption: '3-Gang · Matte Charcoal', alt: 'Three-gang Smart Switch in Matte Charcoal' }}>
              <SwitchStage className="stage--wide">
                <SwitchArt gangs={3} finish={FINISHES[0]!} label="Three-gang Smart Switch in Matte Charcoal" />
                <div className="stage__caption glass-chip"><small>Smart Switch</small><strong>3-gang · Matte Charcoal</strong></div>
              </SwitchStage>
            </Zoomable>
          </Tilt>
        }
      />

      <div className="works-with">
        <div className="container works-with__inner">
          <span className="works-with__label">Connectivity roadmap</span>
          <ul>
            <li>Wi-Fi 2.4 GHz <ProvisionalBadge /></li>
            <li>Bluetooth LE pairing <ProvisionalBadge /></li>
            <li>Matter readiness <ProvisionalBadge /></li>
          </ul>
        </div>
      </div>

      <section id="features" className="sec sec--paper" aria-labelledby="features-title">
        <div className="container">
          <SectionHead eyebrow="Key features" title={['Smart control.', 'Beautifully simple.']} />
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

      <section className="sec sec--paper divider-top" id="configure" aria-label="Configure your Smart Switch" style={{ paddingTop: 'clamp(56px, 8vw, 96px)' }}>
        <div className="container"><Reveal><Configurator /></Reveal></div>
      </section>

      <section id="compare" className="sec sec--white" aria-labelledby="compare-title">
        <div className="container">
          <SectionHead eyebrow="Compare" title={['Four configurations.', 'One language.']} lead="Pick by the number of circuits and whether you want dimming. Provisional values are marked." />
          <Reveal>
            <div className="table-scroll">
              <table className="compare">
                <caption className="sr-only">Comparison of Smart Switch configurations</caption>
                <thead>
                  <tr><th scope="col"><span className="sr-only">Feature</span></th>{VARIANTS.map((v) => <th scope="col" key={v.id}>{v.name}</th>)}</tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}{r.provisional && <> <ProvisionalBadge /></>}</th>
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
            <h2 id="specs-title" className="h-section">Transparent by default.</h2>
            <p className="lead">Confirmed design facts are listed plainly. Anything still undergoing engineering lab testing or certification is marked provisional.</p>
            <Notice title="No certification claimed yet">Safety and regulatory certification is in testing. We will show certification marks only after accredited lab certificates are verified.</Notice>
          </Reveal>
          <Reveal delay={0.1}><SpecTable rows={SPEC_ROWS} caption="Smart Switch specifications" /></Reveal>
        </div>
      </section>

      <section className="sec sec--paper" aria-labelledby="checklist-title">
        <div className="container split">
          <Reveal className="stack stack--lg">
            <span className="eyebrow">Before you order</span>
            <h2 id="checklist-title" className="h-section">Check your wall first.</h2>
            <p className="lead">A short checklist to run with your electrician. Installation by a licensed electrician is always required.</p>
            <div><CtaLink cta={CTA.HOW_INSTALL} variant="outline-dark" arrow /></div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="stack" style={{ gap: 0, borderTop: '1px solid var(--line-light)' }}>
              {ELECTRICAL_CHECKLIST.map((item) => (
                <li key={item} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '20px 0', borderBottom: '1px solid var(--line-light)' }}>
                  <span className="cell__icon" style={{ width: 32, height: 32, borderRadius: 10, margin: 0 }}><Check size={16} /></span>
                  <span style={{ color: 'var(--ink)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="included" className="sec sec--white" aria-labelledby="included-title">
        <div className="container">
          <SectionHead eyebrow="In the box" title={['What is included.', 'Planned contents.']} lead="Planned package contents, provisional until the retail package is finalised." />
          <Reveal>
            <div className="cells cells--5">
              {INCLUDED.map((it, i) => {
                const Icon = ICONS[it.icon];
                return (
                  <div className="cell" key={it.title}>
                    <span className="cell__num">0{i + 1}</span>
                    <span className="cell__icon"><Icon /></span>
                    <h3>{it.title}</h3>
                    <p>{it.text}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="gallery" className="sec sec--dark" aria-labelledby="gallery-title">
        <div className="container">
          <SectionHead eyebrow="Gallery" title={['Every configuration,', 'every finish.']} lead="Select any image to enlarge it." />
          <Reveal><MediaGallery items={GALLERY.filter((g) => g.kind === 'switch')} /></Reveal>
        </div>
      </section>

      <CtaSection title="See how Smart Switch fits your home." text="Share your project and we will recommend a configuration and finish." />
    </>
  );
}
