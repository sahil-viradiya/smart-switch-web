import { z } from 'zod';

export const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?[\d\s.-]{5,15}$/;

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
    .string()
    .regex(phoneRegex, 'Please enter a valid telephone number')
    .optional()
    .or(z.literal('')),
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
  gangCountInterest: z
    .array(z.enum(['1_GANG', '2_GANG', '3_GANG', 'DIMMER']))
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
