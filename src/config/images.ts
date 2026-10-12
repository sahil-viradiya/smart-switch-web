/**
 * IMAGES — the single registry for real photography / renders.
 *
 * Every visual currently falls back to a drawn SVG placeholder (see
 * `components/art`). To use a real image: drop the file in `public/images/`
 * and fill in the matching entry below. No component edits are needed.
 *
 *   living: { src: '/images/scene-living.jpg', alt: 'Living room with a Smart Switch', width: 1600, height: 2000 },
 */
import type { FinishColor, GangVariant, SceneName } from '@/types';

export interface ImageAsset {
  /** Path under /public, e.g. '/images/hero.jpg'. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const IMAGES: {
  scenes: Record<SceneName, ImageAsset | null>;
  products: Partial<Record<GangVariant, Partial<Record<FinishColor, ImageAsset>>>>;
  /** 1200x630 social-share image. */
  social: ImageAsset | null;
} = {
  scenes: { living: null, bedroom: null, studio: null, hall: null },
  products: {},
  social: null,
};
