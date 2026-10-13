import Link from 'next/link';
import { Fill } from '@/components/ui/Fill';
import { LegalPage } from '@/components/ui/LegalPage';
import { pageMeta } from '@/lib/seo';
import { APP_CONFIG, LEGAL, PAGES, ROUTES, legalName, mailHref, telHref } from '@/config';

export const metadata = pageMeta('PRIVACY');

export default function PrivacyPage() {
  const go = LEGAL.grievanceOfficer;
  return (
    <LegalPage title={PAGES.PRIVACY.name} intro="What personal information this website collects, why, who sees it, how long we keep it and how you can control it.">
      <p>This policy applies to {APP_CONFIG.BRAND_NAME} and this website. It is written to meet the Information Technology Act, 2000 and the rules made under it, including the Reasonable Security Practices and Procedures and Sensitive Personal Data or Information Rules, 2011, and the Digital Personal Data Protection Act, 2023 and its Rules.</p>

      <h2 id="who">1. Who we are</h2>
      <p>The website is run by <strong><Fill value={LEGAL.entityName} /></strong>, which decides why and how your personal information is used (the &quot;data fiduciary&quot;, or &quot;we&quot;).</p>
      <p>Registered address: <Fill value={LEGAL.registeredAddress.join(', ')} />. Email: <a href={mailHref(APP_CONFIG.SUPPORT_EMAIL)}>{APP_CONFIG.SUPPORT_EMAIL}</a>. Phone: <a href={telHref()}>{APP_CONFIG.PHONE}</a>.</p>

      <h2 id="collect">2. What we collect</h2>
      <p>We collect only what you type into a form on this website:</p>
      <ul>
        <li><strong>Book a demo form:</strong> your name, email, phone number (optional), the type of property, the kind of enquiry, your message, and whether you want product updates.</li>
        <li><strong>Contact form:</strong> your name, email, phone number (optional), the department, a subject and your message.</li>
        <li><strong>Product updates box:</strong> your email address.</li>
      </ul>
      <p>When you submit a form we also record the date and time, a reference number and the page you sent it from. If you open an enquiry from a catalogue panel, the panel you chose is added to your message.</p>
      <p>Your message is free text. Please do not include sensitive information such as passwords, bank or card details, government ID numbers or health information. We do not ask for any of these.</p>
      <p>We do not use advertising or analytics trackers, and the website sets no cookies (see the <Link href={ROUTES.COOKIES}>Cookie Policy</Link>). To limit form abuse, your IP address is held briefly in the server&apos;s memory to count requests and is not saved with your enquiry. Our hosting provider may keep standard server logs, which can include IP addresses and browser details, for security and fault-finding.</p>

      <h2 id="why">3. Why we use it</h2>
      <ul>
        <li>To reply to your enquiry or request, and to prepare guidance about the products. You give us the details for this purpose, and we use them for nothing else.</li>
        <li>To send occasional product updates by email, <strong>only if</strong> you tick the box on the demo form or subscribe in the updates box. This is based on your consent.</li>
        <li>To keep the website and enquiry sheet secure and to prevent spam and abuse.</li>
        <li>To meet legal obligations, and to establish, exercise or defend legal claims.</li>
      </ul>
      <p>We use your phone number to answer your enquiry. We will not send you promotional calls, SMS or WhatsApp messages unless you have agreed to that, and we respect the National Customer Preference Register (Do Not Disturb) rules.</p>

      <h2 id="share">4. Who sees it</h2>
      <ul>
        <li><strong>Our team</strong>, who handle enquiries. Access to the enquiry sheet is limited to those who need it.</li>
        <li><strong>Service providers</strong> that host the website or store the enquiry sheet and backups on our behalf (for example a cloud hosting provider or Google Workspace if the sheet is kept in Google Sheets). They may use your information only to provide that service to us.</li>
        <li><strong>A licensed installer</strong>, only when you ask us to introduce you.</li>
        <li><strong>Authorities and courts</strong>, if the law requires it.</li>
        <li><strong>A buyer</strong> of the business, if it is sold, who must keep to this policy.</li>
      </ul>
      <p>We do not sell your personal information or share it for advertising.</p>
      <p>If you choose the WhatsApp button, WhatsApp opens on your device and what you send is handled under WhatsApp&apos;s own terms and privacy policy. We receive nothing until you send a message.</p>

      <h2 id="where">5. Where it is stored</h2>
      <p>Enquiries are saved in a spreadsheet and a backup file on our server or, if enabled, in Google Sheets. These services may store data on servers outside India. We transfer personal information outside India only as the law allows, and we keep the same protections in place.</p>

      <h2 id="keep">6. How long we keep it</h2>
      <ul>
        <li><strong>Enquiries:</strong> up to {LEGAL.retentionMonths} months after our last contact with you, then deleted. We keep them longer only if the law requires it or a dispute is open.</li>
        <li><strong>Product updates:</strong> until you unsubscribe or ask us to delete your email.</li>
        <li><strong>Backups:</strong> deleted along with the matching enquiry in the main sheet.</li>
      </ul>

      <h2 id="security">7. How we protect it</h2>
      <p>We use reasonable security practices: the website is served over an encrypted connection, form input is checked on both your device and our server, requests are rate-limited to stop abuse, and access to the enquiry sheet is restricted. No system is completely secure. If a personal data breach affects you, we will tell you and the authorities as the law requires.</p>

      <h2 id="rights">8. Your rights</h2>
      <p>You can, at any time:</p>
      <ul>
        <li>ask for a summary of the personal information we hold about you and how we use it;</li>
        <li>ask us to correct, complete or update it;</li>
        <li>ask us to delete it, unless we must keep it by law;</li>
        <li><strong>withdraw your consent</strong> for product updates or any other use that depends on consent. Withdrawing is as easy as giving consent: write to us and we will stop. Your reply to an enquiry may then no longer be possible;</li>
        <li>nominate another person to exercise these rights for you if you die or cannot act; and</li>
        <li>make a complaint (see section 9).</li>
      </ul>
      <p>To use a right, email <a href={mailHref(APP_CONFIG.SUPPORT_EMAIL, 'Privacy request')}>{APP_CONFIG.SUPPORT_EMAIL}</a> from the address you gave us, or call {APP_CONFIG.PHONE}. We may ask a question to confirm it is you. We answer within {LEGAL.responseDays} days.</p>

      <h2 id="grievance">9. Grievance Officer and complaints</h2>
      <p>If you have a concern about your personal information, contact our Grievance Officer first:</p>
      <ul>
        <li>Name: <Fill value={go.name} /></li>
        <li>Designation: <Fill value={go.designation} /></li>
        <li>Email: <a href={mailHref(go.email, 'Privacy grievance')}>{go.email}</a></li>
        <li>Phone: <a href={telHref()}>{go.phone}</a></li>
        <li>Address: <Fill value={LEGAL.registeredAddress.join(', ')} /></li>
      </ul>
      <p>We acknowledge your complaint and resolve it within {LEGAL.responseDays} days of receiving it. If you are not satisfied, you may complain to the Data Protection Board of India once that route is available to you.</p>

      <h2 id="children">10. Children</h2>
      <p>This website is for people aged {LEGAL.minAge} or over. We do not knowingly collect personal information about anyone under {LEGAL.minAge} without the verifiable consent of a parent or guardian. If you think a child has sent us their details, write to us and we will delete them.</p>

      <h2 id="links">11. Other websites</h2>
      <p>Links to other sites, such as WhatsApp, are not covered by this policy. Read the policy of any site you visit.</p>

      <h2 id="changes">12. Changes to this policy</h2>
      <p>If we change how we handle personal information we will update this page and the date above. If a change affects how we use details you have already given us, we will ask for your consent again where the law requires it.</p>

      <p className="small">{legalName()} operates this website from India, for visitors in India. If you write to us from another country, your information is handled as described here.</p>
    </LegalPage>
  );
}
