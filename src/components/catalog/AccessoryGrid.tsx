import Image from 'next/image';
import { ICONS } from '@/components/art/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { ACCESSORY_IMAGES, CATALOG_CONFIG, IMAGE_QUALITY, formatPrice } from '@/config';
import { ACCESSORIES, CUSTOM_ICON } from '@/content/catalog';

/** Add-ons (gateways, IR blaster, remote) and the custom icon note. Used on the product and catalogue pages. */
export function AccessoryGrid() {
  return (
    <>
      <ul className="grid grid--3">
        {ACCESSORIES.map((a, i) => {
          const Icon = ICONS[a.icon];
          const photo = ACCESSORY_IMAGES[a.id];
          return (
            <Reveal as="li" key={a.id} delay={i * 0.06}>
              <article className="card" style={{ height: '100%' }}>
                {photo ? (
                  <div className="card__media acc__tile">
                    <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 640px) 90vw, 320px" quality={IMAGE_QUALITY} />
                  </div>
                ) : (
                  <div className="card__media acc__tile" aria-hidden="true">
                    <span className="acc__icon"><Icon size={28} /></span>
                  </div>
                )}
                <div className="card__body">
                  <h3 className="card__title">{a.name}</h3>
                  <p className="card__text">{a.text}</p>
                  {CATALOG_CONFIG.showPrices && a.price && <p className="card__text">{formatPrice(a.price)}</p>}
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>
      <p className="small" style={{ marginTop: 18 }}><strong>{CUSTOM_ICON.name}:</strong> {CUSTOM_ICON.text} It is charged {CUSTOM_ICON.priceNote}.</p>
    </>
  );
}
