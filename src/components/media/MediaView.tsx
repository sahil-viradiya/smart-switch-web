import { SceneArt } from '@/components/art/SceneArt';
import { SwitchArt, SwitchStage } from '@/components/art/SwitchArt';
import { FINISHES, VARIANTS } from '@/content/product';
import type { MediaItem } from '@/types';

/** Renders a MediaItem. Uses real images from `config/images.ts` when registered, SVG placeholders otherwise. */
export function MediaView({ item, thumb = false }: { item: MediaItem; thumb?: boolean }) {
  if (item.kind === 'scene') return <SceneArt scene={item.scene} />;
  const v = VARIANTS.find((x) => x.id === item.variant) ?? VARIANTS[0]!;
  const f = FINISHES.find((x) => x.id === item.finish) ?? FINISHES[0]!;
  return (
    <SwitchStage className={thumb ? 'stage--fill' : 'stage--wide'}>
      <SwitchArt gangs={v.gangs} dimmer={v.dimmer} finish={f} label={item.alt} />
    </SwitchStage>
  );
}
