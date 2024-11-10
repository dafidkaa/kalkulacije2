export type TimeUnit = 'hour' | 'day' | 'week' | 'month' | 'year';
export type CalculationType = 'gross' | 'net';

export interface TaxInput {
  amount: number;
  timeUnit: TimeUnit;
  calculationType: CalculationType;
  employmentType: 'employee' | 'freelancer' | 'business';
  residence: string;
  dependents: number;
  hasDisability: boolean;
  additionalIncome: number;
}

export interface TaxBreakdown {
  gross: number;
  pensionPillar1: number;
  pensionPillar2: number;
  healthInsurance: number;
  taxableIncome: number;
  incomeTax: number;
  net: number;
}

export interface TimeBreakdown {
  hourly: number;
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
}