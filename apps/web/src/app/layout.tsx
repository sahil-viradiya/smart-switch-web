import type { Metadata } from 'next';
import '../styles/globals.css';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { APP_CONFIG } from '@smart-switch/shared-config';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: APP_CONFIG.DEFAULT_META_TITLE,
    template: `%s | ${APP_CONFIG.BRAND_NAME}`,
  },
  description: APP_CONFIG.DEFAULT_META_DESCRIPTION,
  keywords: [
    'smart switch',
    'architectural electrical controls',
    'tactile smart switch',
    'multi-gang switch plate',
    'home automation electrical switch',
    'certified electrical installation',
    'luxury wall switch',
  ],
  authors: [{ name: APP_CONFIG.LEGAL_COMPANY_NAME }],
  creator: APP_CONFIG.BRAND_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: APP_CONFIG.DEFAULT_META_TITLE,
    description: APP_CONFIG.DEFAULT_META_DESCRIPTION,
    siteName: APP_CONFIG.BRAND_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.DEFAULT_META_TITLE,
    description: APP_CONFIG.DEFAULT_META_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310B981'><rect x='5' y='3' width='14' height='18' rx='3'/></svg>" />
      </head>
      <body>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
