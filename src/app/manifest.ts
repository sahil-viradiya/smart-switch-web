import type { MetadataRoute } from 'next';
import { APP_CONFIG, IMAGES, legalName } from '@/config';
import { colors } from '@/theme';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: legalName(),
    short_name: legalName(),
    description: APP_CONFIG.DEFAULT_META_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: colors.black,
    theme_color: colors.black,
    icons: [{ src: IMAGES.logo.src, sizes: '512x512', type: 'image/png', purpose: 'any' }],
  };
}
