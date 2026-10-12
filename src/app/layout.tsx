import type { Metadata, Viewport } from 'next';
import '@/theme/fonts';
import '@/styles/base.css';
import '@/styles/components.css';
import '@/styles/sections.css';
import '@/styles/scroll.css';
import '@/styles/catalog.css';
import '@/styles/animations.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileDock } from '@/components/layout/MobileDock';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { IntroSplash } from '@/components/layout/IntroSplash';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { APP_CONFIG } from '@/config';
import { openGraph } from '@/lib/seo';
import { ThemeStyle } from '@/theme/ThemeStyle';
import { colors } from '@/theme';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: APP_CONFIG.DEFAULT_META_TITLE, template: `%s | ${APP_CONFIG.BRAND_NAME}` },
  description: APP_CONFIG.DEFAULT_META_DESCRIPTION,
  openGraph: { ...openGraph(APP_CONFIG.DEFAULT_META_TITLE, APP_CONFIG.DEFAULT_META_DESCRIPTION, '/'), siteName: APP_CONFIG.BRAND_NAME },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: colors.black, colorScheme: 'dark' };

// Enables scroll-reveal hidden states only when JS runs (no-JS visitors still see everything).
const JS_FLAG = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ThemeStyle />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <IntroSplash />
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileDock />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
