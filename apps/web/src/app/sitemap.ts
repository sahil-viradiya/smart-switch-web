import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();

  const publicRoutes = [
    '',
    '/product',
    '/features',
    '/features/tactile-precision',
    '/features/electrical-safety',
    '/features/modular-design',
    '/features/smart-ecosystem',
    '/how-it-works',
    '/use-cases',
    '/use-cases/residential-homes',
    '/use-cases/architectural-renovations',
    '/use-cases/commercial-studios',
    '/request-demo',
    '/contact',
    '/faq',
    '/about',
    '/privacy-policy',
    '/terms-and-conditions',
    '/cookies',
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/product' || route === '/request-demo' ? 0.9 : 0.7,
  }));
}
