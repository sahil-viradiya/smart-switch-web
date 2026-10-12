import type { MetadataRoute } from 'next';
import { PAGE_LIST, ROUTES } from '@/config';
import { FEATURES } from '@/content/features';
import { USE_CASES } from '@/content/use-cases';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const entries = [
    ...PAGE_LIST.map(([, p]) => ({ path: p.path, priority: p.priority })),
    ...FEATURES.map((f) => ({ path: ROUTES.FEATURES_SLUG(f.slug), priority: 0.6 })),
    ...USE_CASES.map((u) => ({ path: ROUTES.USE_CASES_SLUG(u.slug), priority: 0.6 })),
  ];
  return entries.map(({ path, priority }) => ({
    url: `${base}${path === '/' ? '' : path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority,
  }));
}
