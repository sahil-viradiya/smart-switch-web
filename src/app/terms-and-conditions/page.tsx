import { LegalPage } from '@/components/ui/LegalPage';
import { pageMeta } from '@/lib/seo';
import { APP_CONFIG, PAGES } from '@/config';

export const metadata = pageMeta('TERMS');

export default function TermsPage() {
  return (
    <LegalPage title={PAGES.TERMS.name} updated="October 2026" intro="The terms that apply to your use of this website.">
      <h2>1. Information on this site</h2>
      <p>This website presents Smart Switch product information for general guidance. Specifications marked provisional are subject to engineering lab testing and may change before release. Nothing here is a certification claim.</p>
      <h2>2. Professional installation</h2>
      <p>Smart Switch connects to mains voltage. It must be installed by a certified, licensed electrician in accordance with local electrical codes. Do not attempt installation yourself.</p>
      <h2>3. No offer to sell</h2>
      <p>Product information on this site is not an offer to sell. Purchase terms, pricing and warranty will be confirmed in writing at the time of order.</p>
      <h2>4. Liability</h2>
      <p>To the extent permitted by law, {APP_CONFIG.LEGAL_COMPANY_NAME} is not liable for loss arising from reliance on provisional information or from installation not performed by a licensed electrician.</p>
    </LegalPage>
  );
}
