import { CtaLink } from '@/components/ui/CtaLink';
import { WhatsAppIcon } from '@/components/art/Icons';
import { CTA } from '@/config';

/** Sticky mobile action bar: Book a Demo + WhatsApp (real number). */
export function MobileDock() {
  return (
    <nav className="dock" aria-label="Quick actions">
      <CtaLink cta={CTA.BOOK_DEMO} variant="gold" />
      <a className="btn btn--ghost" href={CTA.WHATSAPP.href} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} className="wa-icon" /> {CTA.WHATSAPP.label}</a>
    </nav>
  );
}
