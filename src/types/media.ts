import type { SeriesId } from './catalog';

export type SceneName = 'living' | 'bedroom' | 'studio' | 'hall';

/** A serialisable description of a visual, so server pages can hand it to client components (lightbox, galleries). */
export type MediaItem =
  | { kind: 'scene'; scene: SceneName; caption: string; alt: string }
  | { kind: 'product'; series: SeriesId; productId: string; caption: string; alt: string };
