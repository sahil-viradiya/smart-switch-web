import { APP_CONFIG } from './site';

/** Browser storage keys. Defined here so the code and the Cookie Policy cannot drift apart. */
export const STORAGE_KEYS = { introSeen: 'ss-intro-seen' } as const;

/**
 * LEGAL facts used by the Privacy Policy, Terms and Cookie Policy (and the footer).
 *
 * Anything the owner has not confirmed is left EMPTY. The pages then show "To be confirmed" instead of
 * guessing. Fill these in before launch; `npm run check:legal` lists what is still missing
 * (`npm run check:legal -- --strict` fails, for use before a release).
 *
 * This is the data behind the policies. The wording itself is draft text and must be reviewed by a
 * qualified lawyer (see docs/legal-compliance.md).
 */
export const LEGAL = {
  /** Shown as "Last updated". Change it whenever the policy text or these facts change. */
  updated: '13 October 2026',

  /** REQUIRED. Registered legal name of the business that runs this website (the data fiduciary). */
  entityName: 'Euxora Digital',
  /** REQUIRED. Registered office address, one line per item. */
  registeredAddress: [] as readonly string[],
  /** REQUIRED. Named Grievance Officer (IT SPDI Rules 2011, rule 5(9); DPDP Act 2023). */
  grievanceOfficer: {
    name: '',
    designation: '',
    email: APP_CONFIG.SUPPORT_EMAIL,
    phone: APP_CONFIG.PHONE,
  },
  /** RECOMMENDED. GST registration number (15 characters). Shown on the site when set; a visible tax number is a strong trust signal for buyers. */
  gstin: '',
  /** OPTIONAL. Company or LLP registration number (CIN / LLPIN), if the business has one. Shown when set. */
  registrationNo: '',
  /** REQUIRED. City whose courts hear disputes, e.g. "Ahmedabad". Governing law is India. */
  courtsCity: '',

  /** How long enquiry details are kept after the last contact. Confirm, then actually delete on schedule. */
  retentionMonths: 24,
  /** Days we take to answer a privacy request or complaint (the SPDI Rules allow one month). */
  responseDays: 30,
  /** The website is for adults. Under the DPDP Act, under-18 data needs verifiable parental consent. */
  minAge: 18,

  /** Browser storage this site uses. The Cookie Policy lists exactly these, so keep them in step. */
  storage: [
    { key: STORAGE_KEYS.introSeen, kind: 'sessionStorage', purpose: 'Remembers that you have seen the short intro animation, so it does not replay on every page.', lasts: 'Until you close the tab' },
  ] as const,

  /** Names we mention for compatibility. They belong to their owners; we are not affiliated with them. */
  thirdPartyMarks: [
    'Alexa and Amazon are trademarks of Amazon.com, Inc. or its affiliates',
    'Google, Google Home and Android are trademarks of Google LLC',
    'Apple and iOS are trademarks of Apple Inc. (iOS is used under licence)',
    'Wi-Fi is a trademark of the Wi-Fi Alliance',
    'Zigbee is a trademark of the Connectivity Standards Alliance',
    'WhatsApp is a trademark of WhatsApp LLC / Meta Platforms, Inc.',
  ] as readonly string[],
} as const;

/** Name to show for the business: the registered entity once confirmed, otherwise the brand. */
export const legalName = () => LEGAL.entityName || APP_CONFIG.BRAND_NAME;

/** Identity details a buyer can check. Only the ones that are filled in are returned (nothing is ever shown as a placeholder). */
export const companyFacts = (): { label: string; value: string }[] => {
  const f: { label: string; value: string }[] = [{ label: 'Sold by', value: legalName() }];
  if (LEGAL.registrationNo) f.push({ label: 'Registration no.', value: LEGAL.registrationNo });
  if (LEGAL.gstin) f.push({ label: 'GSTIN', value: LEGAL.gstin });
  if (LEGAL.registeredAddress.length) f.push({ label: 'Registered office', value: LEGAL.registeredAddress.join(', ') });
  return f;
};

/** Required legal facts that are still empty. Used by `npm run check:legal`. */
export const missingLegalFacts = (): string[] => {
  const miss: string[] = [];
  if (!LEGAL.entityName) miss.push('entityName (registered legal name)');
  if (LEGAL.registeredAddress.length === 0) miss.push('registeredAddress');
  if (!LEGAL.grievanceOfficer.name) miss.push('grievanceOfficer.name');
  if (!LEGAL.grievanceOfficer.designation) miss.push('grievanceOfficer.designation');
  if (!LEGAL.courtsCity) miss.push('courtsCity (jurisdiction)');
  return miss;
};
