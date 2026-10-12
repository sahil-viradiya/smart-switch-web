import type { Metadata } from 'next';
import { IMAGES, PAGES, type PageKey } from '@/config';

const social = { url: IMAGES.social.src, width: IMAGES.social.width, height: IMAGES.social.height, alt: IMAGES.social.alt };

/** Open Graph block shared by every page (title and description differ per page). */
export function openGraph(title: string, description: string, path: string): NonNullable<Metadata['openGraph']> {
  return { type: 'website', title, description, url: path, images: [social] };
}

/** Page metadata from the registry in `config/pages.ts`. */
export function pageMeta(key: PageKey): Metadata {
  const p = PAGES[key];
  return {
    title: key === 'HOME' ? { absolute: p.title } : p.title,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: openGraph(p.title, p.description, p.path),
  };
}
