import Link from 'next/link';
import { Fill } from '@/components/ui/Fill';
import { LegalPage } from '@/components/ui/LegalPage';
import { pageMeta } from '@/lib/seo';
import { APP_CONFIG, LEGAL, PAGES, ROUTES, legalName, mailHref } from '@/config';

export const metadata = pageMeta('TERMS');

export default function TermsPage() {
  return (
    <LegalPage title={PAGES.TERMS.name} intro="The terms that apply when you use this website and send us an enquiry.">
      <h2 id="about">1. About these terms</h2>
      <p>This website is run by <strong><Fill value={LEGAL.entityName} /></strong> (&quot;we&quot;). By using it you agree to these terms. If you do not agree, please do not use the website. You must be at least {LEGAL.minAge} years old, or use the website with a parent or guardian.</p>

      <h2 id="information">2. Information on this site</h2>
      <p>The website presents {APP_CONFIG.BRAND_NAME} product information for general guidance. We take care to keep it accurate, but sizes, versions, functions, colours, finishes and availability can change, and images are illustrative. Items marked &quot;to be confirmed&quot; have not been published yet and may change. Nothing here is a certification claim.</p>
      <p>Compatibility with apps, voice assistants and other products depends on those services, which can change without notice. Check with us before you rely on a specific combination.</p>

      <h2 id="offer">3. No offer to sell, prices and warranty</h2>
      <p>{APP_CONFIG.BRAND_NAME} products are sold by {legalName()}. Product information on this site is not an offer to sell, and you cannot buy through this website. A sale happens only when we confirm a quotation or order in writing. Any price we show or quote is a list price in Indian rupees, excludes taxes unless stated, and may change before an order is confirmed. The warranty period and its conditions are confirmed in writing when you order. A summary on this site does not replace them.</p>

      <h2 id="installation">4. Professional installation and safety</h2>
      <p>{APP_CONFIG.BRAND_NAME} connects to mains voltage. It must be installed by a certified, licensed electrician in line with the electrical safety laws, standards and codes that apply where it is fitted. Never open a wall box while the circuit is live, and do not install it yourself. The wall checker and any suggestion from us are planning aids, and the final decision on wiring and ratings rests with your electrician.</p>

      <h2 id="use">5. Using the website and forms</h2>
      <ul>
        <li>Give accurate details and only your own information, or information you are allowed to share.</li>
        <li>Do not send anything unlawful, abusive, misleading or harmful, and do not send spam or bulk messages.</li>
        <li>Do not try to break, overload or gain unauthorised access to the website or its data, or use automated tools to harvest content or submit forms.</li>
      </ul>
      <p>We may refuse or delete an enquiry that breaks these rules. How we handle the details you send is explained in the <Link href={ROUTES.PRIVACY}>Privacy Policy</Link> and the <Link href={ROUTES.COOKIES}>Cookie Policy</Link>.</p>

      <h2 id="ip">6. Our content and other people&apos;s marks</h2>
      <p>The text, design, images, product renders and logos on this website belong to us or our licensors and are protected by copyright and trademark law. You may view the site and print pages for your own, non-commercial use. You may not copy, adapt or republish the content without our written permission.</p>
      <p>We name other companies and standards only to describe compatibility. They belong to their owners, and we are not affiliated with, endorsed by or sponsored by them:</p>
      <ul>
        {LEGAL.thirdPartyMarks.map((m) => (<li key={m}>{m}.</li>))}
      </ul>

      <h2 id="links">7. Links to other services</h2>
      <p>The website links to other services, such as WhatsApp and Google Maps. We do not control them and are not responsible for their content or terms.</p>

      <h2 id="liability">8. Our responsibility</h2>
      <p>The website and its information are provided &quot;as is&quot;. We do not promise that it will always be available or free of errors. To the extent the law allows, {LEGAL.entityName || APP_CONFIG.BRAND_NAME} is not liable for loss that comes from relying on information marked to be confirmed, from using the information on this site in place of written advice from us, or from an installation that was not carried out by a licensed electrician.</p>
      <p>Nothing in these terms limits any right you have under the Consumer Protection Act, 2019 or any other law that cannot be limited, or our liability for fraud, or for death or personal injury caused by our negligence.</p>

      <h2 id="changes">9. Changes</h2>
      <p>We may update the website and these terms. The date at the top shows the latest version, and using the website after a change means you accept it.</p>

      <h2 id="law">10. Governing law and disputes</h2>
      <p>These terms are governed by the laws of India. The courts at <strong><Fill value={LEGAL.courtsCity} /></strong> have jurisdiction over any dispute about them, subject to any right you have by law to bring a claim elsewhere. If a part of these terms cannot be enforced, the rest still applies.</p>

      <h2 id="contact">11. Contact</h2>
      <p>Questions about these terms: <a href={mailHref(APP_CONFIG.SUPPORT_EMAIL)}>{APP_CONFIG.SUPPORT_EMAIL}</a>, {APP_CONFIG.PHONE}. For a privacy complaint, see the Grievance Officer section of the <Link href={`${ROUTES.PRIVACY}#grievance`}>Privacy Policy</Link>.</p>
    </LegalPage>
  );
}
