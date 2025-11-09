export interface ProductBenefits {
  [key: string]: any;
}

export interface ProductRequirements {
  minAge?: number;
  maxAge?: number;
  minIncome?: number;
  documentation?: string[];
}

export interface ProductFees {
  annualFee?: number;
  maintenanceFee?: number;
  interestRate?: number;
  atmWithdrawal?: number;
  transactionFee?: number;
  openingCommission?: number;
  processingFee?: number;
  monthlyPremium?: number;
  annualPremium?: number;
  maxCoverage?: number;
  minimumAmount?: number;
  earlyWithdrawalPenalty?: number;
}

export class Product {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  benefits: string[];
  requirements: ProductRequirements;
  fees: ProductFees;
  active: boolean;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
