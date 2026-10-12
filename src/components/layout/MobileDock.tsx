import { CtaLink } from '@/components/ui/CtaLink';
import { CTA } from '@/config';

/** Sticky mobile action bar. Only real destinations — no placeholder links. */
export function MobileDock() {
  return (
    <nav className="dock" aria-label="Quick actions">
      <CtaLink cta={CTA.BOOK_DEMO} variant="gold" />
      <CtaLink cta={CTA.CONTACT_SHORT} variant="ghost" />
    </nav>
  );
}
