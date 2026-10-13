/**
 * IMAGES - registry of room photographs.
 *
 * Product renders do not live here: they follow a path convention
 * (/images/catalog/<series>/<product-id>.webp) and are listed in
 * `content/catalog/images.data.ts`.
 *
 * To replace a room photo, drop a file in `public/images/scenes/` and update its entry.
 * The product film lives in `VIDEOS` below (file in `public/videos/`, poster in `public/images/`).
 * The photos are composites: a plain wall photograph with a real product render placed on it.
 */
import type { SceneName } from '@/types';

export interface ImageAsset {
  /** Path under /public, e.g. '/images/scenes/living.webp'. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** A pulsing marker on the product in the photo (% of the image) and its label. */
  marker?: { x: number; y: number; label: string };
}

export interface VideoAsset {
  /** MP4 (H.264) under /public. */
  src: string;
  /** Still shown before playback, with reduced motion, and while loading. */
  poster: string;
  width: number;
  height: number;
  /** What the film shows, for screen readers. */
  label: string;
}

/** Videos. The film has a music bed and no speech, so there is no caption track to maintain. It starts muted; the page has a Sound button. */
export const VIDEOS: { film: VideoAsset } = {
  film: {
    src: '/videos/film.mp4',
    poster: '/images/film-poster.jpg',
    width: 1280,
    height: 720,
    label: 'A short film of Color and Edge touch panels, on the wall in four rooms and close up, with a music bed that is off until you turn it on',
  },
};

/** Encoding quality for every photo and render the site serves (Next.js defaults to 75, which softens thin icon lines). */
export const IMAGE_QUALITY = 90;

/** Shown wherever room photos appear, so nobody mistakes them for photos of a finished installation. */
export const IMAGE_NOTE = 'Room images are illustrations: real panel images placed on a sample wall.';

/** Photos of the add-ons, keyed by the accessory id in `content/catalog/accessories.ts` (cropped from the product price lists). */
export const ACCESSORY_IMAGES: Record<string, ImageAsset> = {
  'ir-blaster': { src: '/images/accessories/ir-blaster.webp', alt: 'A round black IR blaster', width: 858, height: 500 },
  'zigbee-gateway': { src: '/images/accessories/zigbee-gateways.webp', alt: 'Two Zigbee gateways: a round Ethernet one and a square USB one', width: 858, height: 500 },
  'remote-r1-r2': { src: '/images/accessories/remote.webp', alt: 'A handheld remote with scene, line and all on or all off buttons', width: 858, height: 500 },
};

export const IMAGES: {
  scenes: Record<SceneName, ImageAsset>;
  /** The brand emblem (transparent PNG). Used by the logo, the app manifest and the structured data. Browser-tab icons are `src/app/icon.png` and `apple-icon.png`. */
  logo: ImageAsset;
  /** 1200x630 social-share image. */
  social: ImageAsset;
} = {
  scenes: {
    living: { src: '/images/scenes/living.webp', alt: 'Living room with an 8 module Color series touch panel on the wall', width: 878, height: 1098, marker: { x: 86, y: 40, label: '8M, Color series' } },
    bedroom: { src: '/images/scenes/bedroom.webp', alt: 'Bedroom wall with a 4 module Edge series touch panel', width: 898, height: 1123, marker: { x: 55, y: 43, label: '4M, Edge series' } },
    studio: { src: '/images/scenes/studio.webp', alt: 'Studio wall with a 6 module Edge series touch panel', width: 898, height: 1123, marker: { x: 63, y: 40, label: '6M, Edge series' } },
    hall: { src: '/images/scenes/hall.webp', alt: 'Hallway wall with a 2 module Edge series touch panel', width: 897, height: 1122, marker: { x: 55, y: 45, label: '2M, Edge series' } },
  },
  logo: { src: '/images/logo.png', alt: '', width: 512, height: 512 },
  social: { src: '/images/social.jpg', alt: 'An 8 module Color series touch panel', width: 1200, height: 630 },
};
