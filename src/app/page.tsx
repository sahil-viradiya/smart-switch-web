import Link from 'next/link';
import { ArrowUpRight, ICONS } from '@/components/art/Icons';
import { OrbitDiagram } from '@/components/art/OrbitDiagram';
import { SceneArt } from '@/components/art/SceneArt';
import { SwitchArt, SwitchStage } from '@/components/art/SwitchArt';
import { FeatureWheel } from '@/components/home/FeatureWheel';
import { HeroVisual } from '@/components/home/HeroVisual';
import { HotspotRoom } from '@/components/home/HotspotRoom';
import { RoomTabs } from '@/components/home/RoomTabs';
import { ZoomReveal } from '@/components/home/ZoomReveal';
import { MediaGallery } from '@/components/media/MediaGallery';
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
import { ProvisionalBadge } from '@/components/ui/ProvisionalBadge';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { CTA, PAGES, ROUTES } from '@/config';
import { FAQ_ITEMS } from '@/content/faq';
import { FEATURES } from '@/content/features';
import { GALLERY, GAUGE, HOTSPOTS, MARQUEE_WORDS, PERSONAS, STANDARDS, STATS } from '@/content/home';
import { FINISHES, KEY_FEATURES, VARIANTS } from '@/content/product';
import { ROOM_TABS } from '@/content/rooms';
import { USE_CASES } from '@/content/use-cases';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('HOME');

const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'reveal', label: 'Collection reveal' },
  { id: 'collection', label: 'Configurations' },
  { id: 'features', label: 'Key features' },
  { id: 'about', label: 'Who we are' },
  { id: 'numbers', label: 'By the numbers' },
  { id: 'explore', label: 'Explore the room' },
  { id: 'rooms', label: 'Room by room' },
  { id: 'standards', label: 'Connectivity' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'audience', label: 'Who it is for' },
  { id: 'faq', label: 'Questions' },
];

const PRINCIPLES = [
  { title: 'Quietly intelligent', text: 'Technology responds naturally while staying discreet in everyday living.' },
  { title: 'Designed as one', text: 'One plate language across gangs, dimmer and finishes so every room feels related.' },
  { title: 'Made to belong', text: 'Clean forms and considered finishes that complement contemporary interiors.' },
];

const WHY = [
  { title: 'Tactile by design', text: 'Real mechanical paddles instead of a glass slab — easy to find in the dark.' },
  { title: 'Local-first control', text: 'Designed so everyday switching never depends on Wi-Fi or the cloud.' },
  { title: 'Safety first', text: 'Protection-led design and licensed-electrician installation, always.' },
  { title: 'Open by intent', text: 'Built toward Matter readiness so you are not locked to one platform.' },
];

export default function HomePage() {
  const homeFaq = FAQ_ITEMS.slice(0, 5);

  return (
    <>
      <SectionNav sections={SECTIONS} />

      {/* 1 · Hero */}
      <section id="hero" className="sec sec--dark hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow eyebrow--mark">Intelligent walls. Effortless living.</span>
            <h1 id="hero-title" className="h-display hero__title">
              <span className="hero__line"><span>Every switch.</span></span>
              <span className="hero__line"><span className="ghost">Quietly smarter.</span></span>
            </h1>
            <p className="hero__lead">
              An architectural wall switch engineered for tactile precision, safe wiring and open connectivity — designed to disappear into the way you live.
            </p>
            <div className="hero__actions">
              <CtaLink cta={CTA.EXPLORE_SWITCH} arrow />
              <CtaLink cta={CTA.BOOK_DEMO} variant="ghost" />
            </div>
            <ul className="hero__tags" aria-label="What it controls">
              <li>Lighting</li><li>Comfort</li><li>Safety</li><li>Control</li>
            </ul>
            <span className="hero__cue" aria-hidden="true">Scroll to discover</span>
          </div>
          <HeroVisual />
        </div>
      </section>

      <Marquee words={MARQUEE_WORDS} />

      {/* 2 · Pinned zoom reveal */}
      <ZoomReveal items={GALLERY.filter((g) => g.kind === 'switch').slice(0, 4)}>
        <span className="eyebrow eyebrow--mark">The collection</span>
        <h2 className="h-section">One switch. <span className="dim-line">Every room.</span></h2>
        <p className="lead">Four configurations and three finishes share one plate language, so a hallway, a studio and a bedroom read as a single design.</p>
        <CtaLink cta={CTA.EXPLORE_CONFIGS} arrow />
      </ZoomReveal>

      {/* 3 · Collection */}
      <section id="collection" className="sec sec--paper" aria-labelledby="collection-title">
        <div className="container">
          <Reveal className="sec-head">
            <div>
              <span className="eyebrow">Explore the collection</span>
              <h2 id="collection-title" className="h-section">Choose your plate.</h2>
              <p className="lead">Click any plate to open the configurator and see it in every finish.</p>
            </div>
            <TextLink href={CTA.VIEW_PRODUCT.href}>{CTA.VIEW_PRODUCT.label}</TextLink>
          </Reveal>
          <ul className="grid grid--4">
            {VARIANTS.map((v, i) => (
              <Reveal as="li" key={v.id} delay={i * 0.08}>
                <Link href={CTA.EXPLORE_CONFIGS.href} className="card" style={{ display: 'block', height: '100%' }}>
                  <SwitchStage className="stage--card">
                    <SwitchArt gangs={v.gangs} dimmer={v.dimmer} finish={FINISHES[i === 2 ? 2 : i === 3 ? 1 : 0]!} />
                  </SwitchStage>
                  <div className="card__body">
                    <span className="card__eyebrow">0{i + 1} · Smart Switch</span>
                    <span className="card__title">{v.name} <ArrowUpRight /></span>
                    <p className="card__text">{v.tagline}</p>
                    <span className="card__foot">{v.chip}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 · Pinned feature wheel */}
      <FeatureWheel features={KEY_FEATURES} />

      {/* 5 · About with parallax + tilt */}
      <section id="about" className="sec sec--white" aria-labelledby="about-title">
        <div className="container split">
          <Reveal variant="clip">
            <Parallax speed={0.07}>
              <Tilt>
                <Zoomable item={{ kind: 'switch', variant: '2_GANG', finish: 'MATTE_CHARCOAL', caption: '2-Gang · Matte Charcoal', alt: 'Two-gang Smart Switch in Matte Charcoal' }}>
                  <div className="showcase">
                    <SwitchStage className="stage--tall">
                      <span className="watermark" aria-hidden="true">SMART SWITCH</span>
                      <SwitchArt gangs={2} finish={FINISHES[0]!} label="Two-gang Smart Switch in Matte Charcoal" />
                    </SwitchStage>
                  </div>
                </Zoomable>
              </Tilt>
            </Parallax>
          </Reveal>
          <Reveal className="stack stack--lg" delay={0.1}>
            <span className="eyebrow">Who we are</span>
            <h2 id="about-title" className="h-section">Designed to make smart living feel simple.</h2>
            <p className="lead">Smart Switch is built on a simple belief: the wall switch should stay physical, precise and calm, with intelligence working quietly behind it.</p>
            <p className="lead">From a single paddle to a three-gang console, every plate shares one design language and one careful approach to electrical safety.</p>
            <div className="row">
              <TextLink href={ROUTES.ABOUT}>Our approach</TextLink>
              <TextLink href={ROUTES.FEATURES}>The technology</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6 · By the numbers */}
      <section id="numbers" className="sec sec--paper" aria-labelledby="numbers-title">
        <div className="container">
          <SectionHead eyebrow="By the numbers" title={['The design,', 'in figures.']} lead="Facts taken straight from the product definition. Anything not yet confirmed is marked provisional." />
          <div className="stats">
            <Reveal>
              <div className="stat-grid">
                {STATS.map((s) => (
                  <div className="stat" key={s.label}>
                    <span className="stat__value"><Counter to={s.value} /></span>
                    <span className="stat__label">{s.label} {'provisional' in s && s.provisional && <ProvisionalBadge />}</span>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="scale"><Gauge {...GAUGE} /></Reveal>
          </div>
        </div>
      </section>

      {/* 7 · Interactive room */}
      <section id="explore" className="sec sec--dark" aria-labelledby="explore-title">
        <div className="container">
          <SectionHead eyebrow="Explore the room" title={['Tap a point.', 'See the detail.']} lead="Every hotspot is a design decision. Select one to learn more." />
          <Reveal><HotspotRoom hotspots={HOTSPOTS} /></Reveal>
        </div>
      </section>

      {/* 8 · Philosophy */}
      <section id="philosophy" className="sec sec--soft" aria-labelledby="phil-title">
        <div className="container">
          <SectionHead eyebrow="Our philosophy" title={['The best technology should enhance the space', '— not dominate it.']} />
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

      {/* 9 · Room by room */}
      <section id="rooms" className="sec sec--paper" aria-labelledby="rooms-title">
        <div className="container">
          <SectionHead eyebrow="Room by room" title={['Wherever you live,', 'the wall stays calm.']} action={<TextLink href={ROUTES.USE_CASES}>All use cases</TextLink>} />
          <Reveal><RoomTabs rooms={ROOM_TABS} /></Reveal>
        </div>
      </section>

      {/* 10 · Connectivity roadmap + orbit */}
      <section id="standards" className="sec sec--white" aria-labelledby="eco-title">
        <div className="container">
          <div className="split" style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}>
            <Reveal className="stack stack--lg">
              <span className="eyebrow">Smart Switch system</span>
              <h2 id="eco-title" className="h-section">Open by intent. <span className="dim-line">Local by design.</span></h2>
              <p className="lead">Paddles, dimming, local fail-safe and open connectivity are designed as one system. Every standard below is a roadmap item — none is certified or badged yet.</p>
              <div><TextLink href={ROUTES.FEATURES}>Explore the technology</TextLink></div>
            </Reveal>
            <Reveal variant="scale" delay={0.1}><OrbitDiagram /></Reveal>
          </div>
          <Reveal>
            <div className="standards">
              {STANDARDS.map((s) => (
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

      {/* 11 · Gallery */}
      <section id="gallery" className="sec sec--dark" aria-labelledby="gallery-title">
        <div className="container">
          <SectionHead eyebrow="Gallery" title={['See it in every', 'finish and room.']} lead="Select any image to enlarge it. Use the arrow keys to move through the set." />
          <Reveal><MediaGallery items={GALLERY} /></Reveal>
          <p className="small" style={{ marginTop: 18 }}>Illustrative renders. Final finishes and dimensions are confirmed per regional SKU.</p>
        </div>
      </section>

      {/* 12 · Audience */}
      <section id="audience" className="sec sec--paper" aria-labelledby="aud-title">
        <div className="container">
          <SectionHead eyebrow="Who it is for" title={['One switch.', 'Three ways in.']} />
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

      {/* 13 · Why + technology links */}
      <section className="sec sec--dark" aria-labelledby="why-title">
        <div className="container split split--wide-left" style={{ alignItems: 'start' }}>
          <Reveal className="stack stack--lg">
            <span className="eyebrow">Why Smart Switch</span>
            <h2 id="why-title" className="h-section">Smart living. <span className="dim-line">Better every day.</span></h2>
            <p className="lead">Automation should make a home feel calmer, not more complicated. Every decision starts from the wall.</p>
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

      {/* 14 · Use cases quick links */}
      <section className="sec sec--paper sec--tight" aria-label="Use cases">
        <div className="container">
          <ul className="grid grid--3">
            {USE_CASES.map((u, i) => (
              <Reveal as="li" key={u.slug} delay={i * 0.08}>
                <Link href={ROUTES.USE_CASES_SLUG(u.slug)} className="card" style={{ display: 'block', height: '100%' }}>
                  <div className="card__media"><SceneArt scene={u.scene} /></div>
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

      {/* 15 · FAQ */}
      <section id="faq" className="sec sec--white" aria-labelledby="faq-title">
        <div className="container--narrow">
          <SectionHead eyebrow="Questions" title={['Good to know', 'before you plan.']} action={<TextLink href={PAGES.FAQ.path}>All questions</TextLink>} />
          <Reveal><FaqAccordion items={homeFaq} filterable={false} /></Reveal>
        </div>
      </section>

      <CtaSection title="Tell us how you live. We'll design how your wall responds." text="Book a personalised demo and we'll plan the right configuration for your space." />
    </>
  );
}
