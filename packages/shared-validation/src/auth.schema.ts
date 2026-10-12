import { z } from 'zod';
import { phoneRegex } from './lead.schema';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password must not exceed 72 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const signupSchema = z.object({
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
  password: passwordSchema,
  role: z.enum(['HOMEOWNER', 'INSTALLER', 'ARCHITECT', 'ADMIN'], {
    errorMap: () => ({ message: 'Please select a valid account role' }),
  }),
  companyName: z.string().max(120).optional(),
  licenseNumber: z.string().max(60).optional(),
  phone: z.string().regex(phoneRegex, 'Please enter a valid phone number').optional().or(z.literal('')),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the Terms of Service and Privacy Policy' }),
  }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
