import Link from 'next/link';
import { LegalPage } from '@/components/ui/LegalPage';
import { pageMeta } from '@/lib/seo';
import { APP_CONFIG, PAGES, ROUTES, mailHref } from '@/config';

export const metadata = pageMeta('PRIVACY');

export default function PrivacyPage() {
  return (
    <LegalPage title={PAGES.PRIVACY.name} updated="October 2026" intro="A plain-language summary of how we handle your information.">
      <h2>1. What this website collects</h2>
      <p>When you use the Book a Demo form, the contact form or the newsletter box, the details you type (name, email, phone, project description and similar) are sent to our server and saved to our enquiry sheet together with the date, a reference number and the page you used. We do not use advertising or analytics trackers.</p>
      <h2>2. How we use it</h2>
      <p>We use these details only to reply to your enquiry, to prepare guidance about Smart Switch and, if you opt in or subscribe, to send occasional product updates. Access to the enquiry sheet is limited to the team.</p>
      <h2>3. Sharing</h2>
      <p>We do not sell your personal information. We may share project details with a licensed installer only when you ask us to.</p>
      <h2>4. Your rights</h2>
      <p>You can ask us to access, correct or delete the information we hold about you at any time by writing to <a href={mailHref(APP_CONFIG.SUPPORT_EMAIL)}>{APP_CONFIG.SUPPORT_EMAIL}</a>.</p>
      <h2>5. Cookies</h2>
      <p>See our <Link href={ROUTES.COOKIES}>Cookie Policy</Link>.</p>
    </LegalPage>
  );
}
