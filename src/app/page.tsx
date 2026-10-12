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
  { id: 'hero', label: 'Top' },
  { id: 'reveal', label: 'The range' },
  { id: 'collection', label: 'Plates' },
  { id: 'features', label: 'Features' },
  { id: 'about', label: 'About' },
  { id: 'numbers', label: 'Numbers' },
  { id: 'explore', label: 'Look closer' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'standards', label: 'Connectivity' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'audience', label: 'Who it is for' },
  { id: 'faq', label: 'FAQ' },
];

const PRINCIPLES = [
  { title: 'Keep what works', text: 'A mechanical paddle is quick, obvious and easy to find in the dark. The smart features add to it instead of replacing it.' },
  { title: 'One look for every room', text: 'Every plate size and the dimmer share the same faceplate and the same three finishes.' },
  { title: 'Fit the wall', text: 'The plates sit flat with hidden fixings, so the wall looks finished.' },
];

const WHY = [
  { title: 'Easy to use', text: 'Real paddles that you can find without looking.' },
  { title: 'Works locally', text: 'Everyday switching is designed not to depend on Wi-Fi or the cloud.' },
  { title: 'Safety first', text: 'Designed around protection, and always fitted by a licensed electrician.' },
  { title: 'Open standards', text: 'We are aiming for Matter, so you are not tied to one platform.' },
];

export default function HomePage() {
  const homeFaq = FAQ_ITEMS.slice(0, 5);

  return (
    <>
      <SectionNav sections={SECTIONS} />

      {/* 1. Hero */}
      <section id="hero" className="sec sec--dark hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow eyebrow--mark">Smart wall switches</span>
            <h1 id="hero-title" className="h-display hero__title">
              <span className="hero__line"><span>A real switch,</span></span>
              <span className="hero__line"><span className="ghost">made smarter.</span></span>
            </h1>
            <p className="hero__lead">
              Smart Switch has mechanical paddles and a small status light. The smart features sit behind the paddle, so it still works like a normal switch.
            </p>
            <div className="hero__actions">
              <CtaLink cta={CTA.EXPLORE_SWITCH} arrow />
              <CtaLink cta={CTA.BOOK_DEMO} variant="ghost" />
            </div>
            <ul className="hero__tags" aria-label="What it controls">
              <li>Lighting</li><li>Dimming</li><li>Wiring</li><li>Safety</li>
            </ul>
            <span className="hero__cue" aria-hidden="true">Scroll for more</span>
          </div>
          <HeroVisual />
        </div>
      </section>

      <Marquee words={MARQUEE_WORDS} />

      {/* 2. Pinned zoom reveal */}
      <ZoomReveal items={GALLERY.filter((g) => g.kind === 'switch').slice(0, 4)}>
        <span className="eyebrow eyebrow--mark">The range</span>
        <h2 className="h-section">Four plates, three finishes</h2>
        <p className="lead">The 1, 2 and 3-gang plates and the dimmer all use the same faceplate, so rooms with different layouts still match.</p>
        <CtaLink cta={CTA.EXPLORE_CONFIGS} arrow />
      </ZoomReveal>

      {/* 3. Collection */}
      <section id="collection" className="sec sec--paper" aria-labelledby="collection-title">
        <div className="container">
          <Reveal className="sec-head">
            <div>
              <span className="eyebrow">Configurations</span>
              <h2 id="collection-title" className="h-section">Pick a plate</h2>
              <p className="lead">Select a plate to open the configurator and see it in each finish.</p>
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
                    <span className="card__eyebrow">Configuration</span>
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

      {/* 4. Pinned feature wheel */}
      <FeatureWheel features={KEY_FEATURES} />

      {/* 5. About with parallax and tilt */}
      <section id="about" className="sec sec--white" aria-labelledby="about-title">
        <div className="container split">
          <Reveal variant="clip">
            <Parallax speed={0.07}>
              <Tilt>
                <Zoomable item={{ kind: 'switch', variant: '2_GANG', finish: 'MATTE_CHARCOAL', caption: '2-gang in Matte Charcoal', alt: 'Two-gang Smart Switch in Matte Charcoal' }}>
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
            <span className="eyebrow">About</span>
            <h2 id="about-title" className="h-section">Why we kept the paddle</h2>
            <p className="lead">Most smart switches replace the button with a touch panel. We kept a mechanical paddle, because everyone already knows how to use one.</p>
            <p className="lead">The smart features are an extra layer. Electrical safety comes first, and anything we have not tested yet is marked provisional on this site.</p>
            <div className="row">
              <TextLink href={ROUTES.ABOUT}>About us</TextLink>
              <TextLink href={ROUTES.FEATURES}>How it is built</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. Numbers */}
      <section id="numbers" className="sec sec--paper" aria-labelledby="numbers-title">
        <div className="container">
          <SectionHead eyebrow="Facts" title={['The product in numbers']} lead="These come from the product definition. Anything not confirmed yet is marked provisional." />
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

      {/* 7. Interactive room */}
      <section id="explore" className="sec sec--dark" aria-labelledby="explore-title">
        <div className="container">
          <SectionHead eyebrow="Look closer" title={['Click a point on the room']} lead="Each marker explains one part of the design." />
          <Reveal><HotspotRoom hotspots={HOTSPOTS} /></Reveal>
        </div>
      </section>

      {/* 8. Principles */}
      <section id="philosophy" className="sec sec--soft" aria-labelledby="phil-title">
        <div className="container">
          <SectionHead eyebrow="How we design" title={['Technology should fit the room']} />
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

      {/* 10. Connectivity plans and orbit */}
      <section id="standards" className="sec sec--white" aria-labelledby="eco-title">
        <div className="container">
          <div className="split" style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}>
            <Reveal className="stack stack--lg">
              <span className="eyebrow">Connectivity</span>
              <h2 id="eco-title" className="h-section">What it will connect to</h2>
              <p className="lead">These are plans, not certifications. Nothing below is certified yet, and no platform badge is claimed.</p>
              <div><TextLink href={ROUTES.FEATURES}>How it is built</TextLink></div>
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

      {/* 11. Gallery */}
      <section id="gallery" className="sec sec--dark" aria-labelledby="gallery-title">
        <div className="container">
          <SectionHead eyebrow="Gallery" title={['Plates and rooms']} lead="Select an image to enlarge it. The arrow keys move between images." />
          <Reveal><MediaGallery items={GALLERY} /></Reveal>
          <p className="small" style={{ marginTop: 18 }}>These are illustrations. Final finishes and dimensions are confirmed for each regional version.</p>
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
            <p className="lead">The short version of what we are trying to get right.</p>
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

      {/* 15. FAQ */}
      <section id="faq" className="sec sec--white" aria-labelledby="faq-title">
        <div className="container--narrow">
          <SectionHead eyebrow="FAQ" title={['Common questions']} action={<TextLink href={PAGES.FAQ.path}>All questions</TextLink>} />
          <Reveal><FaqAccordion items={homeFaq} filterable={false} /></Reveal>
        </div>
      </section>

      <CtaSection title="Want Smart Switch in your home?" text="Send us a few details and we will suggest a configuration and finish." />
    </>
  );
}
