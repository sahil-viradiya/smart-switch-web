import 'server-only';
import type { InquiryPayload } from '@/lib/validation';

/** Column order of the Excel sheet / Google Sheet. Changing a title here changes the sheet header. */
export const COLUMNS = [
  'Received (UTC)', 'Received (local)', 'Reference', 'Type', 'Name', 'Email', 'Phone',
  'Enquiry type', 'Property type', 'Department', 'Subject', 'Message', 'Product updates OK', 'Source page',
] as const;
export type Column = (typeof COLUMNS)[number];
export type InquiryRow = Record<Column, string>;

const TYPE_LABEL = { demo: 'Demo request', contact: 'Contact message', subscribe: 'Subscriber' } as const;
const TIMEZONE = process.env.INQUIRY_TIMEZONE ?? 'Asia/Kolkata';
const CELL_LIMIT = 32000; // Excel's hard cell limit is 32,767 characters

/** A leading +/- is fine when the value is just a phone number or a number, e.g. "+44 20 7946 0000". */
const PHONE_OR_NUMBER = /^[+-]?[\d\s().-]+$/;

/**
 * Neutralise spreadsheet formula injection. Cells starting with = @ (or control characters)
 * are prefixed with an apostrophe; so are values starting with + or - unless they are plainly
 * a phone number or a number.
 */
export function safeCell(value: unknown): string {
  const s = String(value ?? '').replace(/\r\n/g, '\n').slice(0, CELL_LIMIT);
  if (/^[=@\t\r]/.test(s)) return `'${s}`;
  if (/^[+-]/.test(s) && !PHONE_OR_NUMBER.test(s)) return `'${s}`;
  return s;
}

const label = (map: Record<string, string>, key?: string) => (key ? (map[key] ?? key) : '');

export function toRow(p: InquiryPayload, id: string, at: Date): InquiryRow {
  const local = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: TIMEZONE }).format(at);
  const base: InquiryRow = {
    'Received (UTC)': at.toISOString(), 'Received (local)': `${local} (${TIMEZONE})`, Reference: id, Type: TYPE_LABEL[p.type],
    Name: '', Email: p.email, Phone: '', 'Enquiry type': '', 'Property type': '', Department: '', Subject: '', Message: '', 'Product updates OK': '', 'Source page': p.source ?? '',
  };
  if (p.type === 'demo') {
    Object.assign(base, {
      Name: p.fullName, Phone: p.phone ?? '',
      'Enquiry type': label({ HOMEOWNER_CONSULTATION: 'Homeowner consultation', ARCHITECT_COMMERCIAL: 'Architect / commercial', INSTALLER_PARTNERSHIP: 'Electrician / installer', GENERAL_PURCHASE: 'General enquiry' }, p.inquiryType),
      'Property type': label({ RESIDENTIAL_SINGLE_FAMILY: 'House', RESIDENTIAL_APARTMENT: 'Apartment', COMMERCIAL_OFFICE: 'Office / studio', HOSPITALITY_HOTEL: 'Hospitality', RENOVATION_PROJECT: 'Renovation', OTHER: 'Other' }, p.propertyType),
      Message: p.message, 'Product updates OK': p.marketingConsent ? 'Yes' : 'No',
    });
  } else if (p.type === 'contact') {
    Object.assign(base, {
      Name: p.fullName, Phone: p.phone ?? '',
      Department: label({ SALES_CONSULTATION: 'Sales & consultation', TECHNICAL_SUPPORT: 'Technical support', CERTIFIED_INSTALLER: 'Electricians & installers', PRESS_MEDIA: 'Press & media', GENERAL_INQUIRY: 'General enquiry' }, p.department),
      Subject: p.subject, Message: p.message,
    });
  } else {
    base['Product updates OK'] = 'Yes';
  }
  for (const c of COLUMNS) base[c] = safeCell(base[c]);
  return base;
}
