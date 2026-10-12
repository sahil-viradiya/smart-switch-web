import { AccessoryGrid } from '@/components/catalog/AccessoryGrid';
import { CatalogBrowser } from '@/components/catalog/CatalogBrowser';
import { ProductImage, ProductStage } from '@/components/art/ProductImage';
import { CtaSection } from '@/components/ui/CtaBand';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { PAGES } from '@/config';
import { CATALOG, MODULES } from '@/content/catalog';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('CATALOGUE');

export default function CataloguePage() {
  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title={['Every panel,', 'every size.']}
        lead={`${CATALOG.length} panel layouts across ${MODULES.length} sizes, in the Color and Edge series. Filter by size, function, panel material and version.`}
        crumbs={[{ label: PAGES.CATALOGUE.name }]}
        art={
          <ProductStage className="stage--wide">
            <ProductImage series="color" productId="8m-6-switch-1-fan" sizes="(max-width: 1050px) 80vw, 560px" priority />
          </ProductStage>
        }
      />

      <section id="browse" className="sec sec--paper" aria-label="Browse the catalogue">
        <div className="container">
          <Reveal><CatalogBrowser /></Reveal>
          <p className="small" style={{ marginTop: 18 }}>Panel images show the front of each configuration. Colours and finishes vary, so ask us for the current options.</p>
        </div>
      </section>

      <section id="accessories" className="sec sec--white" aria-labelledby="acc-title">
        <div className="container">
          <SectionHead eyebrow="Accessories" title={['Add-ons']} lead="Gateways, an IR blaster and a remote work alongside the panels." />
          <AccessoryGrid />
        </div>
      </section>

      <CtaSection title="Not sure which panel you need?" text="Tell us about your rooms and wall boxes and we will suggest sizes and functions." />
    </>
  );
}
