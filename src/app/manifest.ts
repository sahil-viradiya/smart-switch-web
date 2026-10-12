import type { MetadataRoute } from 'next';
import { APP_CONFIG } from '@/config';
import { colors } from '@/theme';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_CONFIG.BRAND_NAME,
    short_name: APP_CONFIG.BRAND_NAME,
    description: APP_CONFIG.DEFAULT_META_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: colors.black,
    theme_color: colors.black,
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
