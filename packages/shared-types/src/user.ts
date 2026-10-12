export type UserRole =
  | 'HOMEOWNER'
  | 'INSTALLER'
  | 'ARCHITECT'
  | 'ADMIN';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  companyName?: string;
  licenseNumber?: string;
  phone?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SignupDto {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  companyName?: string;
  licenseNumber?: string;
  phone?: string;
  acceptTerms: boolean;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthSession {
  user: Omit<User, 'passwordHash'>;
  token: string;
  expiresAt: string;
}
