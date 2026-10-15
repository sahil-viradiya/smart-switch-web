import { z } from 'zod';
import { isValidIndianPhone, phoneRegex } from './lead';

export const contactSchema = z.object({
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
  department: z.enum(
    [
      'SALES_CONSULTATION',
      'TECHNICAL_SUPPORT',
      'CERTIFIED_INSTALLER',
      'PRESS_MEDIA',
      'GENERAL_INQUIRY',
    ],
    {
      errorMap: () => ({ message: 'Please select a valid department' }),
    }
  ),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(150, 'Subject must not exceed 150 characters')
    .trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(3000, 'Message must not exceed 3,000 characters')
    .trim(),
});

export type ContactInput = z.infer<typeof contactSchema>;
