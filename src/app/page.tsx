import Link from 'next/link';
import { ArrowUpRight, ICONS } from '@/components/art/Icons';
import { OrbitDiagram } from '@/components/art/OrbitDiagram';
import { ProductImage, ProductStage } from '@/components/art/ProductImage';
import { SceneArt } from '@/components/art/SceneArt';
import { FeatureWheel } from '@/components/home/FeatureWheel';
import { HeroVisual } from '@/components/home/HeroVisual';
import { HotspotRoom } from '@/components/home/HotspotRoom';
import { RoomTabs } from '@/components/home/RoomTabs';
import { ZoomReveal } from '@/components/home/ZoomReveal';
import { TrustSection } from '@/components/home/TrustSection';
import { organizationJsonLd } from '@/lib/seo';
import { MediaGallery } from '@/components/media/MediaGallery';
import { ProductFilm } from '@/components/media/ProductFilm';
import { Zoomable } from '@/components/media/Zoomable';
import { Counter } from '@/components/motion/Counter';
import { Gauge } from '@/components/motion/Gauge';
import { Marquee } from '@/components/motion/Marquee';
import { Parallax } from '@/components/motion/Parallax';
import { SectionNav } from '@/components/motion/SectionNav';
import { Tilt } from '@/components/motion/Tilt';
import { ButtonLink, TextLink } from '@/components/ui/ButtonLink';
import { CtaLink } from '@/components/ui/CtaLink';
import { CtaSection } from '@/components/ui/CtaBand';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { CTA, IMAGE_NOTE, PAGES, ROUTES, SITE_URL, SPEC, VIDEOS, catalogueHref } from '@/config';
import { MODULES, REPRESENTATIVE, SERIES, productsInModule } from '@/content/catalog';
import { FAQ_ITEMS } from '@/content/faq';
import { FEATURES } from '@/content/features';
import { CONTROL_OPTIONS, FILM_COPY, GALLERY, GAUGE, HOTSPOTS, MARQUEE_WORDS, PERSONAS, STATS } from '@/content/home';
import { KEY_FEATURES } from '@/content/product';
import { ROOM_TABS } from '@/content/rooms';
import { USE_CASES } from '@/content/use-cases';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('HOME');

const SECTIONS = [
  { id: 'hero', label: 'Top' },
  { id: 'reveal', label: 'The range' },
  { id: 'collection', label: 'Sizes' },
  { id: 'features', label: 'Features' },
  { id: 'film', label: 'Film' },
  { id: 'about', label: 'About' },
  { id: 'numbers', label: 'Numbers' },
  { id: 'explore', label: 'Look closer' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'standards', label: 'Control' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'audience', label: 'Who it is for' },
  { id: 'trust', label: 'Buying' },
  { id: 'faq', label: 'FAQ' },
];

const PRINCIPLES = [
  { title: 'Fewer plates on the wall', text: 'One panel can hold the lights, a fan control and sockets, so a room needs fewer separate plates.' },
  { title: 'Control it your way', text: 'Use the touch panel, the app on your phone, a voice assistant or a handheld remote.' },
  { title: 'Choose the version', text: 'Pick Wi-Fi or Zigbee for every panel, and glass or acrylic for most of them.' },
];

const WHY = [
  { title: 'Easy to use', text: 'Touch an icon and the light or fan responds. The icons light up so you can see what is on.' },
  { title: 'Many sizes', text: 'Six panel sizes, from 2M to 12M, with switches, sockets, fan control and more.' },
  { title: 'Two versions', text: 'Every configuration comes as a Wi-Fi version and a Zigbee version.' },
  { title: 'Backed by a warranty', text: `The panels come with a ${SPEC.warrantyTerm} warranty.` },
];

export default function HomePage() {
  const homeFaq = FAQ_ITEMS.slice(0, 5);
  const rangeItems = GALLERY.filter((g) => g.kind === 'product').slice(0, 4);

  return (
    <>
      <SectionNav sections={SECTIONS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(SITE_URL)) }} />

      {/* 1. Hero */}
      <section id="hero" className="sec sec--dark hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow eyebrow--mark">Smart touch switches</span>
            <h1 id="hero-title" className="h-display hero__title">
              <span className="hero__line"><span>Control your home</span></span>
              <span className="hero__line"><span className="ghost">with a touch.</span></span>
            </h1>
            <p className="hero__lead">
              Touch panels in glass or acrylic for your lights, fans, curtains and sockets. Use the panel on the wall, the app on your phone, or your voice.
            </p>
            <div className="hero__actions">
              <CtaLink cta={CTA.EXPLORE_SWITCH} arrow />
              <CtaLink cta={CTA.BOOK_DEMO} variant="ghost" />
            </div>
            <ul className="hero__tags" aria-label="What it controls">
              <li>Lights</li><li>Fans</li><li>Curtains</li><li>Sockets</li>
            </ul>
            <span className="hero__cue" aria-hidden="true">Scroll for more</span>
          </div>
          <HeroVisual />
        </div>
      </section>

      <Marquee words={MARQUEE_WORDS} />

      {/* 2. Pinned zoom reveal */}
      <ZoomReveal items={rangeItems}>
        <span className="eyebrow eyebrow--mark">The range</span>
        <h2 className="h-section">Two series, six sizes</h2>
        <p className="lead">Color and Edge have the same sizes and functions, from a compact 2M panel to a large 12M panel.</p>
        <CtaLink cta={CTA.EXPLORE_CONFIGS} arrow />
      </ZoomReveal>

      {/* 3. Sizes */}
      <section id="collection" className="sec sec--paper" aria-labelledby="collection-title">
        <div className="container">
          <Reveal className="sec-head">
            <div>
              <span className="eyebrow">Sizes</span>
              <h2 id="collection-title" className="h-section">Choose a size</h2>
              <p className="lead">Select a size to see every configuration in it.</p>
            </div>
            <TextLink href={CTA.BROWSE_CATALOGUE.href}>{CTA.BROWSE_CATALOGUE.label}</TextLink>
          </Reveal>
          <ul className="grid grid--3">
            {MODULES.map((m, i) => (
              <Reveal as="li" key={m.id} delay={(i % 3) * 0.08}>
                <Link href={catalogueHref({ module: m.id })} className="card" style={{ display: 'block', height: '100%' }}>
                  <ProductStage className="stage--card">
                    <ProductImage series={i % 2 ? 'edge' : 'color'} productId={REPRESENTATIVE[m.id]} sizes="(max-width: 640px) 45vw, 300px" />
                  </ProductStage>
                  <div className="card__body">
                    <span className="card__eyebrow">{Math.max(...SERIES.map((s) => productsInModule(m.id, s.id).length))} configurations</span>
                    <span className="card__title">{m.id} panel <ArrowUpRight /></span>
                    <p className="card__text">{m.blurb}</p>
                    <span className="card__foot">Glass or acrylic</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Pinned feature wheel */}
      <FeatureWheel features={KEY_FEATURES} />

      {/* Product film */}
      <section id="film" className="sec sec--dark film" aria-label="Product film">
        <div className="container">
          <SectionHead eyebrow={FILM_COPY.eyebrow} title={FILM_COPY.title} lead={FILM_COPY.lead} />
          <Reveal variant="scale"><ProductFilm video={VIDEOS.film} /></Reveal>
          <p className="small film__note">{FILM_COPY.note}</p>
        </div>
      </section>


      {/* 5. About with parallax and tilt */}
      <section id="about" className="sec sec--white" aria-labelledby="about-title">
        <div className="container split">
          <Reveal variant="clip">
            <Parallax speed={0.07}>
              <Tilt>
                <Zoomable item={{ kind: 'product', series: 'edge', productId: '6m-6-switch', caption: 'Edge, 6M with 6 switches', alt: 'Edge series 6M panel with six touch points' }}>
                  <div className="showcase">
                    <ProductStage className="stage--tall">
                      <span className="watermark" aria-hidden="true">SMART SWITCH</span>
                      <ProductImage series="edge" productId="6m-6-switch" sizes="(max-width: 1050px) 80vw, 520px" />
                    </ProductStage>
                  </div>
                </Zoomable>
              </Tilt>
            </Parallax>
          </Reveal>
          <Reveal className="stack stack--lg" delay={0.1}>
            <span className="eyebrow">About</span>
            <h2 id="about-title" className="h-section">One panel for the whole wall</h2>
            <p className="lead">Smart Switch panels replace a row of separate switches, a fan regulator and sockets with a single glass or acrylic touch panel.</p>
            <p className="lead">You can use the panel, the app or your voice. A licensed electrician installs it, and the panels come with a {SPEC.warrantyTerm} warranty.</p>
            <div className="row">
              <TextLink href={ROUTES.ABOUT}>About us</TextLink>
              <TextLink href={ROUTES.FEATURES}>How it works</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. Numbers */}
      <section id="numbers" className="sec sec--paper" aria-labelledby="numbers-title">
        <div className="container">
          <SectionHead eyebrow="Facts" title={['The range in numbers']} lead="The range at a glance." />
          <div className="stats">
            <Reveal>
              <div className="stat-grid">
                {STATS.map((s) => (
                  <div className="stat" key={s.label}>
                    <span className="stat__value"><Counter to={s.value} /></span>
                    <span className="stat__label">{s.label}</span>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="scale"><Gauge {...GAUGE} /></Reveal>
          </div>
        </div>
      </section>

      {/* 7. Interactive room */}
      <section id="explore" className="sec sec--dark" aria-labelledby="explore-title">
        <div className="container">
          <SectionHead eyebrow="Look closer" title={['Click a point on the room']} lead="Each marker explains one part of the panel." />
          <Reveal><HotspotRoom hotspots={HOTSPOTS} /></Reveal>
        </div>
      </section>

      {/* 8. Principles */}
      <section id="philosophy" className="sec sec--soft" aria-labelledby="phil-title">
        <div className="container">
          <SectionHead eyebrow="What we focus on" title={['Less clutter, more control']} />
          <Reveal>
            <div className="cells cells--3">
              {PRINCIPLES.map((p, i) => (
                <div className="cell" key={p.title}>
                  <span className="cell__num">0{i + 1}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. Room by room */}
      <section id="rooms" className="sec sec--paper" aria-labelledby="rooms-title">
        <div className="container">
          <SectionHead eyebrow="Rooms" title={['Planning room by room']} action={<TextLink href={ROUTES.USE_CASES}>All use cases</TextLink>} />
          <Reveal><RoomTabs rooms={ROOM_TABS} /></Reveal>
        </div>
      </section>

      {/* 10. Control options and orbit */}
      <section id="standards" className="sec sec--white" aria-labelledby="eco-title">
        <div className="container">
          <div className="split" style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}>
            <Reveal className="stack stack--lg">
              <span className="eyebrow">Control</span>
              <h2 id="eco-title" className="h-section">Many ways to control it</h2>
              <p className="lead">Touch the panel, use the app, speak to a voice assistant or use a remote. Each configuration comes as a Wi-Fi version and a Zigbee version.</p>
              <div><TextLink href={ROUTES.FEATURES_SLUG('app-and-voice')}>App, voice and remote</TextLink></div>
            </Reveal>
            <Reveal variant="scale" delay={0.1}><OrbitDiagram /></Reveal>
          </div>
          <Reveal>
            <div className="standards">
              {CONTROL_OPTIONS.map((s) => (
                <div className="standard" key={s.name}>
                  <h3>{s.name}</h3>
                  <p>{s.role}</p>
                  <span className="badge">{s.status}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 11. Gallery */}
      <section id="gallery" className="sec sec--dark" aria-labelledby="gallery-title">
        <div className="container">
          <SectionHead eyebrow="Gallery" title={['Panels and rooms']} lead="Select an image to enlarge it. The arrow keys move between images." />
          <Reveal><MediaGallery items={GALLERY} /></Reveal>
          <p className="small" style={{ marginTop: 18 }}>{IMAGE_NOTE} Colours and finishes vary. Ask us for the current options.</p>
        </div>
      </section>

      {/* 12. Audience */}
      <section id="audience" className="sec sec--paper" aria-labelledby="aud-title">
        <div className="container">
          <SectionHead eyebrow="Who it is for" title={['Homeowners, architects and electricians']} />
          <ul className="grid grid--3">
            {PERSONAS.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.08}>
                <div className="persona">
                  <span className="card__eyebrow">{p.eyebrow}</span>
                  <h3 className="h-sub">{p.title}</h3>
                  <p className="card__text" style={{ fontSize: '0.9375rem' }}>{p.text}</p>
                  <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                  <ButtonLink href={p.cta.href} variant="dark" size="sm" arrow>{p.cta.label}</ButtonLink>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 13. Why and technology links */}
      <section className="sec sec--dark" aria-labelledby="why-title">
        <div className="container split split--wide-left" style={{ alignItems: 'start' }}>
          <Reveal className="stack stack--lg">
            <span className="eyebrow">Why Smart Switch</span>
            <h2 id="why-title" className="h-section">Four reasons</h2>
            <p className="lead">The short version of what you get.</p>
            <div className="row">
              {FEATURES.map((f) => {
                const Icon = ICONS[f.icon];
                return <Link key={f.slug} href={ROUTES.FEATURES_SLUG(f.slug)} className="chip"><Icon size={16} /> {f.title}</Link>;
              })}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="cells cells--2">
              {WHY.map((w, i) => (
                <div className="cell" key={w.title}>
                  <span className="cell__num">0{i + 1}</span>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 14. Use cases */}
      <section className="sec sec--paper sec--tight" aria-label="Use cases">
        <div className="container">
          <ul className="grid grid--3">
            {USE_CASES.map((u, i) => (
              <Reveal as="li" key={u.slug} delay={i * 0.08}>
                <Link href={ROUTES.USE_CASES_SLUG(u.slug)} className="card" style={{ display: 'block', height: '100%' }}>
                  <div className="card__media"><SceneArt scene={u.scene} sizes="(max-width: 640px) 90vw, 400px" /></div>
                  <div className="card__body">
                    <span className="card__eyebrow">{u.category}</span>
                    <span className="card__title">{u.title} <ArrowUpRight /></span>
                    <p className="card__text">{u.summary}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 15. FAQ */}
      <TrustSection />

      <section id="faq" className="sec sec--white" aria-labelledby="faq-title">
        <div className="container--narrow">
          <SectionHead eyebrow="FAQ" title={['Common questions']} action={<TextLink href={PAGES.FAQ.path}>All questions</TextLink>} />
          <Reveal><FaqAccordion items={homeFaq} filterable={false} /></Reveal>
        </div>
      </section>

      <CtaSection title="Want Smart Switch in your home?" text="Tell us which rooms you are planning and we will suggest a series, sizes and functions." />
    </>
  );
}
