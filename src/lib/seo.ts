import type { Metadata } from 'next';
import { PAGES, type PageKey } from '@/config';

/** Page metadata from the registry in `config/pages.ts`. */
export function pageMeta(key: PageKey): Metadata {
  const p = PAGES[key];
  return {
    title: key === 'HOME' ? { absolute: p.title } : p.title,
    description: p.description,
    alternates: { canonical: p.path },
  };
}
