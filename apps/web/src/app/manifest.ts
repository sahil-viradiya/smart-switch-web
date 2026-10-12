import { MetadataRoute } from 'next';
import { APP_CONFIG } from '@smart-switch/shared-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_CONFIG.BRAND_NAME,
    short_name: 'SmartSwitch',
    description: APP_CONFIG.DEFAULT_META_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#090D16',
    theme_color: '#10B981',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
