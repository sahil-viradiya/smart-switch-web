export type InquiryType =
  | 'HOMEOWNER_CONSULTATION'
  | 'ARCHITECT_COMMERCIAL'
  | 'INSTALLER_PARTNERSHIP'
  | 'GENERAL_PURCHASE';

export type PropertyType =
  | 'RESIDENTIAL_SINGLE_FAMILY'
  | 'RESIDENTIAL_APARTMENT'
  | 'COMMERCIAL_OFFICE'
  | 'HOSPITALITY_HOTEL'
  | 'RENOVATION_PROJECT'
  | 'OTHER';

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'CLOSED';

export interface CreateLeadDto {
  fullName: string;
  email: string;
  phone?: string;
  inquiryType: InquiryType;
  propertyType?: PropertyType;
  gangCountInterest?: ('1_GANG' | '2_GANG' | '3_GANG' | 'DIMMER')[];
  estimatedUnits?: number;
  message: string;
  marketingConsent?: boolean;
  source?: string;
}

export interface Lead extends CreateLeadDto {
  id: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}
