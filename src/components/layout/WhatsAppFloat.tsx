import { WhatsAppIcon } from '@/components/art/Icons';
import { CTA } from '@/config';

/** Floating chat button (desktop). On phones the sticky dock carries the WhatsApp action instead. */
export function WhatsAppFloat() {
  return (
    <a className="wa-float" href={CTA.WHATSAPP.href} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp (opens in a new tab)">
      <WhatsAppIcon size={24} className="wa-icon" />
      <span className="wa-float__label">Chat on WhatsApp</span>
    </a>
  );
}
