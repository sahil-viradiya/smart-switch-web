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
import { MetaPixel } from '@/components/analytics/MetaPixel';
import { APP_CONFIG, SEARCH_VERIFICATION, SITE_URL, legalName } from '@/config';
import { openGraph } from '@/lib/seo';
import { ThemeStyle } from '@/theme/ThemeStyle';
import { colors } from '@/theme';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: APP_CONFIG.DEFAULT_META_TITLE, template: `%s | ${legalName()}` },
  description: APP_CONFIG.DEFAULT_META_DESCRIPTION,
  applicationName: APP_CONFIG.BRAND_NAME,
  category: 'Home automation',
  openGraph: openGraph(APP_CONFIG.DEFAULT_META_TITLE, APP_CONFIG.DEFAULT_META_DESCRIPTION, '/'),
  twitter: { card: 'summary_large_image' },
  // Let Google show large image previews and full snippets in results.
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  // Ownership tags for Google Search Console and Bing Webmaster Tools (plain meta tags, no script).
  verification: {
    google: SEARCH_VERIFICATION.google,
    other: SEARCH_VERIFICATION.bing ? { 'msvalidate.01': SEARCH_VERIFICATION.bing } : undefined,
  },
};

export const viewport: Viewport = { themeColor: colors.black, colorScheme: 'dark' };

// Enables scroll-reveal hidden states only when JS runs (no-JS visitors still see everything).
const JS_FLAG = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <ThemeStyle />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
        <MetaPixel />
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
