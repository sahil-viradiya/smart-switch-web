import { z } from 'zod';
import { contactSchema } from './contact';
import { leadSchema } from './lead';

/** Hidden honeypot field. Real visitors never fill it; bots usually do. */
const honeypot = { website: z.string().max(200).optional() };
const source = z.string().max(200).optional();

export const demoPayloadSchema = leadSchema.extend({ type: z.literal('demo'), source, ...honeypot });
export const contactPayloadSchema = contactSchema.extend({ type: z.literal('contact'), source, ...honeypot });
export const subscribePayloadSchema = z.object({
  type: z.literal('subscribe'),
  email: z.string().trim().toLowerCase().email('Please enter a valid email address').max(120),
  source,
  ...honeypot,
});

/** Everything the /api/inquiries endpoint accepts. Shared by the browser forms and the server. */
export const inquirySchema = z.discriminatedUnion('type', [demoPayloadSchema, contactPayloadSchema, subscribePayloadSchema]);

export type InquiryPayload = z.infer<typeof inquirySchema>;
export type InquiryKind = InquiryPayload['type'];
