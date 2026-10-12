import { ProductImage, ProductStage } from '@/components/art/ProductImage';
import { SceneArt } from '@/components/art/SceneArt';
import type { MediaItem } from '@/types';

/** Renders a MediaItem: a room photograph or a product on a stage. */
export function MediaView({ item, thumb = false }: { item: MediaItem; thumb?: boolean }) {
  if (item.kind === 'scene') return <SceneArt scene={item.scene} sizes="(max-width: 640px) 90vw, 900px" />;
  return (
    <ProductStage className={thumb ? 'stage--fill' : 'stage--wide'}>
      <ProductImage series={item.series} productId={item.productId} label={item.alt} sizes="(max-width: 640px) 70vw, 600px" />
    </ProductStage>
  );
}
