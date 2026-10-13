import Image from 'next/image';
import { IMAGES, IMAGE_QUALITY } from '@/config/images';
import type { SceneName } from '@/types';

export type { SceneName };

/** A room photograph with a real product on the wall (see config/images.ts). */
export function SceneArt({ scene, className = 'scene-photo', sizes = '(max-width: 640px) 90vw, 520px', priority }: { scene: SceneName; className?: string; sizes?: string; priority?: boolean }) {
  const photo = IMAGES.scenes[scene];
  return <Image className={className} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={sizes} quality={IMAGE_QUALITY} priority={priority} />;
}
