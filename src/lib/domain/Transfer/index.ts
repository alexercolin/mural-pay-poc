import { RecipientInfo } from "../Customer";

export interface Account {
  id: string;
  balance: string;
  walletAddress: string;
}

export interface TransferRequest {
  id: string;
  status: "IN_REVIEW" | "PENDING" | "EXECUTED";
  recipientsInfo: RecipientInfo[];
  createdAt: string;
  updatedAt: string;
}

export enum OrganizationType {
  Business = "BUSINESS",
  Individual = "INDIVIDUAL",
}

export enum TransferType {
  Fiat = "FIAT",
  Blockchain = "BLOCKCHAIN",
}

export enum BlockchainType {
  Etherum = "ETHERUM",
  Polygon = "POLYGON",
  Base = "BASE",
  Celo = "CELO",
}
