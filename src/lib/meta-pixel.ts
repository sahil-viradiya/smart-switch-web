import { APP_CONFIG } from '@/config';
import { STORAGE_KEYS } from '@/config/legal';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export const META_PIXEL_ID = APP_CONFIG.META_PIXEL_ID;

/** Safe wrapper around window.fbq for standard events */
export function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (params) {
      window.fbq('track', event, params);
    } else {
      window.fbq('track', event);
    }
  }
}

/** Safe wrapper around window.fbq for custom events */
export function fbqCustomTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (params) {
      window.fbq('trackCustom', event, params);
    } else {
      window.fbq('trackCustom', event);
    }
  }
}

/** Track standard PageView event */
export function trackPageView() {
  fbqTrack('PageView');
}

/** Track standard Lead conversion event when an enquiry or consultation request is sent */
export function trackLead(params?: {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  inquiry_id?: string;
}) {
  fbqTrack('Lead', {
    content_name: params?.content_name ?? 'Enquiry',
    content_category: params?.content_category,
    value: params?.value ?? 0,
    currency: params?.currency ?? 'INR',
    inquiry_id: params?.inquiry_id,
  });
}

/** Track Contact event (WhatsApp, phone or email click) */
export function trackContact(method: 'whatsapp' | 'phone' | 'email', label?: string) {
  fbqTrack('Contact', {
    method,
    content_name: label ?? `${method} contact click`,
  });
}

/** Captures incoming Meta Ad parameters (fbclid, UTMs) into sessionStorage */
export function captureAttribution() {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get('fbclid');
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');
    const utmContent = params.get('utm_content');
    const utmTerm = params.get('utm_term');

    if (fbclid || utmSource || utmCampaign) {
      const data = {
        fbclid: fbclid || undefined,
        utm_source: utmSource || undefined,
        utm_medium: utmMedium || undefined,
        utm_campaign: utmCampaign || undefined,
        utm_content: utmContent || undefined,
        utm_term: utmTerm || undefined,
        landing_path: window.location.pathname,
        captured_at: new Date().toISOString(),
      };
      sessionStorage.setItem(STORAGE_KEYS.attribution, JSON.stringify(data));
    }
  } catch {
    // sessionStorage might be disabled or unavailable
  }
}

/** Marks a lead reference as tracked in sessionStorage to prevent duplicate fires */
export function markLeadTracked(reference: string): boolean {
  if (typeof window === 'undefined' || !reference) return false;
  try {
    const key = `${STORAGE_KEYS.leadTracked}-${reference}`;
    if (sessionStorage.getItem(key)) {
      return false; // already tracked
    }
    sessionStorage.setItem(key, '1');
    return true;
  } catch {
    return true;
  }
}
