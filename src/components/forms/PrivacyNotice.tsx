import Link from 'next/link';
import { APP_CONFIG, LEGAL, ROUTES } from '@/config';

/**
 * Notice shown where personal information is collected: what it is used for, how long it is kept,
 * how to withdraw, and a link to the Privacy Policy. One wording for every form, so it stays consistent.
 */
export function PrivacyNotice({ use = 'reply to you', keep = `for up to ${LEGAL.retentionMonths} months`, className = 'form__fine' }: { use?: string; keep?: string; className?: string }) {
  return (
    <p className={className}>
      We use your details only to {use}, and keep them {keep}. You can ask us to delete them or withdraw consent at any time by writing to {APP_CONFIG.SUPPORT_EMAIL}. See our <Link href={ROUTES.PRIVACY}>Privacy Policy</Link>.
    </p>
  );
}
