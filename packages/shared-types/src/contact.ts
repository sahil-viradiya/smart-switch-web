export type ContactDepartment =
  | 'SALES_CONSULTATION'
  | 'TECHNICAL_SUPPORT'
  | 'CERTIFIED_INSTALLER'
  | 'PRESS_MEDIA'
  | 'GENERAL_INQUIRY';

export interface CreateContactDto {
  fullName: string;
  email: string;
  phone?: string;
  department: ContactDepartment;
  subject: string;
  message: string;
}

export interface ContactMessage extends CreateContactDto {
  id: string;
  isRead: boolean;
  createdAt: string;
}
