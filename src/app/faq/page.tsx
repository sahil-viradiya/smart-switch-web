import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { CtaSection } from '@/components/ui/CtaBand';
import { FAQ_ITEMS } from '@/content/faq';
import { faqJsonLd, pageMeta } from '@/lib/seo';
import { CTA, PAGES } from '@/config';

export const metadata = pageMeta('FAQ');

export default function FaqPage() {
  const jsonLd = faqJsonLd(FAQ_ITEMS);
  return (
    <>
      <PageHero eyebrow="FAQ" title={['Frequently asked questions']} lead="Wiring, installation, connectivity, warranty and availability. Anything we have not confirmed is marked to be confirmed." crumbs={[{ label: PAGES.FAQ.name }]} />
      <section className="sec sec--paper" aria-label="Frequently asked questions">
        <div className="container--narrow"><Reveal><FaqAccordion /></Reveal></div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </section>
      <CtaSection title="Still have a question?" text="Send us a message and we will help." primary={CTA.CONTACT_US} secondary={CTA.BOOK_DEMO} />
    </>
  );
}
