import type { FinishColor, GangVariant } from './product';

export type SceneName = 'living' | 'bedroom' | 'studio' | 'hall';

/** A serialisable description of a visual, so server pages can hand it to client components (lightbox, galleries). */
export type MediaItem =
  | { kind: 'scene'; scene: SceneName; caption: string; alt: string }
  | { kind: 'switch'; variant: GangVariant; finish: FinishColor; caption: string; alt: string };
