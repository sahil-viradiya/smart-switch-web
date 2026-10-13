/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // exceljs is server-only; keep it out of the bundler.
  experimental: { serverComponentsExternalPackages: ['exceljs'] },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Browsers ignore this over plain HTTP, so it only applies once the site is served over HTTPS.
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
