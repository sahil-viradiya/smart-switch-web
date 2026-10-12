import type { ZodError } from 'zod';

/** Collapse a ZodError into { field: first message }. */
export function fieldErrors(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !out[key]) out[key] = issue.message;
  }
  return out;
}

/**
 * The site has no backend. Submissions are handed to the visitor's email client
 * via mailto: -  nothing is stored or sent by this site, and the UI says so.
 */
export function buildMailto(to: string, subject: string, fields: [string, string | undefined][]): string {
  const body = fields
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
