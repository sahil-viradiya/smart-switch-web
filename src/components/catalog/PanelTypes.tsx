import Link from 'next/link';
import { ArrowUpRight } from '@/components/art/Icons';
import { ProductImage, ProductStage } from '@/components/art/ProductImage';
import { Reveal } from '@/components/ui/Reveal';
import { catalogueHref } from '@/config';
import { CATALOG, MODULES, PRODUCT_KINDS } from '@/content/catalog';

/** How many different layouts of a kind there are (Color and Edge together) and which sizes, glass or acrylic and versions they come in. All figures are counted from the catalogue data, so they cannot drift from it. */
function facts(kind: (typeof PRODUCT_KINDS)[number]['id']) {
  const list = CATALOG.filter((p) => p.kinds.includes(kind));
  const offers = list.flatMap((p) => [p.series.color, p.series.edge].flatMap((o) => (o ? [o] : [])));
  const sizes = MODULES.filter((m) => list.some((p) => p.module === m.id)).map((m) => m.id);
  const glass = offers.some((o) => o.materials.includes('glass'));
  const wifiOnly = offers.every((o) => !o.connectivity.includes('zigbee'));
  return {
    count: list.length,
    sizes: sizes.length > 2 ? `${sizes[0]} to ${sizes[sizes.length - 1]}` : sizes.join(' and '),
    material: glass ? 'Glass or acrylic' : 'Acrylic only',
    version: wifiOnly ? 'Wi-Fi only' : 'Wi-Fi or Zigbee',
  };
}

/** One card per kind of panel (switches, sockets, fan, scene, curtain, dimmer, USB, doorbell). Used on the product page. */
export function PanelTypes() {
  return (
    <ul className="grid grid--4">
      {PRODUCT_KINDS.map((k, i) => {
        const f = facts(k.id);
        return (
          <Reveal as="li" key={k.id} delay={(i % 4) * 0.06}>
            <Link href={catalogueHref({ kind: k.id })} className="card" style={{ display: 'block', height: '100%' }}>
              <ProductStage className="stage--card" glow={false}>
                <ProductImage series="color" productId={k.art} sizes="(max-width: 640px) 45vw, 280px" />
              </ProductStage>
              <div className="card__body">
                <span className="card__eyebrow">{f.count} {f.count === 1 ? 'layout' : 'layouts'}</span>
                <span className="card__title">{k.label} <ArrowUpRight /></span>
                <p className="card__text">{k.blurb}</p>
                <span className="card__foot">{f.sizes}, {f.material.toLowerCase()}, {f.version.toLowerCase()}</span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
