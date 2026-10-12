import Link from 'next/link';
import { RoomTabs } from '@/components/home/RoomTabs';
import { ROOM_TABS } from '@/content/rooms';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { CtaSection } from '@/components/ui/CtaBand';
import { SceneArt } from '@/components/art/SceneArt';
import { ArrowUpRight } from '@/components/art/Icons';
import { USE_CASES } from '@/content/use-cases';
import { pageMeta } from '@/lib/seo';
import { ROUTES, PAGES } from '@/config';

export const metadata = pageMeta('USE_CASES');

export default function UseCasesPage() {
  return (
    <>
      <PageHero eyebrow="Use cases" title={['Where it fits']} lead="Smart Switch suits family homes, renovations and studios. Here is how it works in each." crumbs={[{ label: PAGES.USE_CASES.name }]} />
      <section className="sec sec--paper" aria-labelledby="uc-title">
        <div className="container">
          <SectionHead eyebrow="Applications" title={['Three kinds of project']} />
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
      <section className="sec sec--white" aria-labelledby="rooms-title">
        <div className="container">
          <SectionHead eyebrow="Rooms" title={['Room by room']} lead="Pick a room for a suggested plate, finish and some practical tips." />
          <Reveal><RoomTabs rooms={ROOM_TABS} /></Reveal>
        </div>
      </section>
      <CtaSection title="Planning a project?" text="Tell us about your space and we will suggest a configuration." />
    </>
  );
}
