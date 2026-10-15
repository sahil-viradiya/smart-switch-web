import Link from 'next/link';
import { LegalPage } from '@/components/ui/LegalPage';
import { LEGAL, PAGES, ROUTES } from '@/config';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('COOKIES');

export default function CookiesPage() {
  return (
    <LegalPage title={PAGES.COOKIES.name} intro="What this website stores in your browser, and what it does not.">
      <h2 id="cookies">1. Cookies and advertising trackers</h2>
      <p>This website uses the Meta Pixel (operated by Meta Platforms, Inc.) to measure advertising effectiveness, attribute enquiry conversions, and deliver relevant advertisements on Facebook and Instagram. The Meta Pixel may store first-party cookies (such as _fbp) or collect pseudonymised browser and event data when you visit pages or complete an enquiry.</p>
      <p>You can manage your advertising preferences directly within your Meta/Facebook account settings or via your browser&apos;s privacy and tracking prevention controls.</p>

      <h2 id="storage">2. Browser storage</h2>
      <p>The website uses the following storage in your browser. It is not personal information and it is never sent to us or to anyone else.</p>
      <ul>
        {LEGAL.storage.map((s) => (
          <li key={s.key}><strong>{s.key}</strong> ({s.kind}): {s.purpose} Lasts: {s.lasts.toLowerCase()}.</li>
        ))}
      </ul>
      <p>This storage is needed for the site to behave the way you expect, so it does not ask for consent. You can clear it at any time in your browser settings, and the site works without it.</p>

      <h2 id="logs">3. Server logs</h2>
      <p>Like any website, the server that delivers it may record technical details of each visit, such as your IP address, browser type and the page requested, for security and fault-finding. See the <Link href={ROUTES.PRIVACY}>Privacy Policy</Link> for how we handle personal information.</p>

      <h2 id="links">4. Links to other services</h2>
      <p>If you choose the WhatsApp button or the Get directions link, you leave this website and that service&apos;s own cookie and privacy terms apply (WhatsApp, or Google Maps). Nothing from them loads on this site until you do.</p>

      <h2 id="changes">5. Changes</h2>
      <p>If we add analytics or other tools in future, we will update this policy first and ask for your consent before they run, where the law requires it.</p>
    </LegalPage>
  );
}
