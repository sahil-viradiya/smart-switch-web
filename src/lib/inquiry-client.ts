import type { InquiryPayload } from '@/lib/validation';
import { STORAGE_KEYS } from '@/config/legal';

export class InquiryError extends Error {
  constructor(message: string, public status: number, public fieldErrors?: Record<string, string>) {
    super(message);
  }
}

/** Sends an inquiry to /api/inquiries (stored in the Excel sheet). Throws InquiryError on failure. */
export async function submitInquiry(payload: InquiryPayload): Promise<{ id: string }> {
  let res: Response;
  try {
    res = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  } catch {
    throw new InquiryError('We could not reach the server. Please check your connection.', 0);
  }
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; id?: string; error?: string; fieldErrors?: Record<string, string> };
  if (!res.ok || !data.ok || !data.id) throw new InquiryError(data.error ?? 'Something went wrong while sending your request.', res.status, data.fieldErrors);
  return { id: data.id };
}

/** Where the visitor submitted from, for the "Source page" column. */
export const currentSource = () => {
  if (typeof window === 'undefined') return '';
  const current = `${window.location.pathname}${window.location.search}`;
  if (window.location.search) {
    return current.slice(0, 200);
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.attribution);
    if (raw) {
      const attr = JSON.parse(raw);
      const parts: string[] = [];
      if (attr.utm_campaign) parts.push(`camp=${attr.utm_campaign}`);
      if (attr.utm_source) parts.push(`src=${attr.utm_source}`);
      if (attr.fbclid) parts.push(`fbclid=${String(attr.fbclid).slice(0, 16)}`);
      if (parts.length > 0) {
        return `${window.location.pathname} (${parts.join(',')})`.slice(0, 200);
      }
    }
  } catch {
    // Ignore storage parse issues
  }
  return current.slice(0, 200);
};
