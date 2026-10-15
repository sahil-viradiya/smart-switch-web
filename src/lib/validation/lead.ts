import { z } from 'zod';

/** Standard Indian 10-digit mobile number regex (starts with 6, 7, 8, or 9, optional +91 or 0 prefix). */
export const phoneRegex = /^(?:(?:\+91|91|0)[\s-]?)?[6-9]\d{9}$/;

export function isValidIndianPhone(value: string): boolean {
  if (!value || typeof value !== 'string') return true;
  const cleaned = value.trim().replace(/[\s\-()]/g, '');
  if (!cleaned) return true;
  return /^(?:(?:\+91|91|0))?[6-9]\d{9}$/.test(cleaned);
}

export const leadSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(120, 'Email address must not exceed 120 characters')
    .trim()
    .toLowerCase(),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .min(1, 'Phone number is required')
    .max(16, 'Phone number must not exceed 16 characters')
    .refine(isValidIndianPhone, 'Please enter a valid 10-digit Indian mobile number'),
  inquiryType: z.enum(
    [
      'HOMEOWNER_CONSULTATION',
      'ARCHITECT_COMMERCIAL',
      'INSTALLER_PARTNERSHIP',
      'GENERAL_PURCHASE',
    ],
    {
      errorMap: () => ({ message: 'Please select a valid inquiry category' }),
    }
  ),
  propertyType: z
    .enum([
      'RESIDENTIAL_SINGLE_FAMILY',
      'RESIDENTIAL_APARTMENT',
      'COMMERCIAL_OFFICE',
      'HOSPITALITY_HOTEL',
      'RENOVATION_PROJECT',
      'OTHER',
    ])
    .optional(),
  estimatedUnits: z
    .number()
    .int()
    .min(1, 'Units must be at least 1')
    .max(10000, 'Units must not exceed 10,000')
    .optional(),
  message: z
    .string()
    .min(10, 'Please provide at least 10 characters describing your project or inquiry')
    .max(2000, 'Message must not exceed 2,000 characters')
    .trim(),
  marketingConsent: z.boolean().optional(),
  source: z.string().max(100).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
