import { LegalPage } from '@/components/ui/LegalPage';
import { PAGES } from '@/config';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta('COOKIES');

export default function CookiesPage() {
  return (
    <LegalPage title={PAGES.COOKIES.name} updated="October 2026" intro="What this website stores in your browser.">
      <h2>1. Cookies</h2>
      <p>This website does not set advertising or analytics cookies.</p>
      <h2>2. Browser storage</h2>
      <p>To avoid replaying the short intro animation on every page, the site remembers for the duration of your browser session that you have seen it. This uses session storage, is not shared with anyone and is cleared when you close the tab.</p>
      <h2>3. Changes</h2>
      <p>If we add analytics or other tools in future, we will update this policy and ask for consent where required.</p>
    </LegalPage>
  );
}
