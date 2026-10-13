import Image from 'next/image';
import { IMAGE_QUALITY } from '@/config/images';
import { getProduct, productAlt } from '@/content/catalog';
import type { SeriesId } from '@/types';

interface Props {
  series: SeriesId;
  productId: string;
  className?: string;
  /** Override the generated alt text. */
  label?: string;
  sizes?: string;
  priority?: boolean;
}

/** A product render (transparent cut-out). Falls back to the other series if this one does not offer the product. */
export function ProductImage({ series, productId, className = 'product-img', label, sizes = '(max-width: 640px) 70vw, 360px', priority }: Props) {
  const p = getProduct(productId);
  if (!p) return null;
  const s: SeriesId = p.series[series] ? series : series === 'color' ? 'edge' : 'color';
  const offer = p.series[s];
  if (!offer) return null;
  return <Image className={className} src={offer.image} alt={label ?? productAlt(p, s)} width={offer.size[0]} height={offer.size[1]} sizes={sizes} quality={IMAGE_QUALITY} priority={priority} />;
}

/** Dark stage with warm light, framing a product render. */
export function ProductStage({ className = '', children, glow = true }: { className?: string; children: React.ReactNode; glow?: boolean }) {
  return (
    <div className={`stage stage--wall ${className}`}>
      {glow && <span className="stage__glow" aria-hidden="true" />}
      {children}
    </div>
  );
}
