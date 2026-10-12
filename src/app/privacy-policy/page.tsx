import Link from 'next/link';
import { LegalPage } from '@/components/ui/LegalPage';
import { pageMeta } from '@/lib/seo';
import { APP_CONFIG, ROUTES, PAGES } from '@/config';

export const metadata = pageMeta('PRIVACY');

export default function PrivacyPage() {
  return (
    <LegalPage title={PAGES.PRIVACY.name} updated="October 2026" intro="A plain-language summary of how we handle your information.">
      <h2>1. What this website collects</h2>
      <p>This website does not run its own database or user accounts. When you use a form, your details are placed into an email message on your own device. Nothing is sent or stored by the site until you send that email yourself.</p>
      <h2>2. Information you email us</h2>
      <p>If you email us, we receive the details you include, such as your name, email address, phone number and project description. We use them only to reply to your enquiry and to provide guidance about Smart Switch.</p>
      <h2>3. Sharing</h2>
      <p>We do not sell your personal information. We may share project details with a licensed installer only when you ask us to.</p>
      <h2>4. Your rights</h2>
      <p>You can ask us to access, correct or delete the information we hold about you at any time by writing to <a href={`mailto:${APP_CONFIG.SUPPORT_EMAIL}`}>{APP_CONFIG.SUPPORT_EMAIL}</a>.</p>
      <h2>5. Cookies</h2>
      <p>See our <Link href={ROUTES.COOKIES}>Cookie Policy</Link>.</p>
    </LegalPage>
  );
}
