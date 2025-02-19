import { OrganizationType, TransferType } from "../Transfer";

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CreateCustomerDto {
  name: string;
  organizationType?: OrganizationType;
}

export interface CreateTransferRequestDto {
  payoutAccountId: string;
  recipientsInfo: RecipientInfo[];
}

export interface RecipientInfo {
  name: string;
  tokenAmount: number;
  email: string;
  recipientType: OrganizationType;
  recipientTransferType: TransferType;
  dateOfBirth: string;
  walletDetails: {
    walletAddress: string;
    blockchain: string;
  };
}
