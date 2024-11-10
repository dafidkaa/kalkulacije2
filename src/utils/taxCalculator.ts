import { TaxInput, TaxBreakdown, TimeBreakdown, TimeUnit } from '../types/calculator';

const PERSONAL_ALLOWANCE = 600; // Monthly personal allowance in EUR
const TAX_BRACKET_THRESHOLD = 5000; // Monthly threshold in EUR
const LOWER_TAX_RATE = 0.20;
const HIGHER_TAX_RATE = 0.30;

// Standard working hours
const HOURS_PER_DAY = 8;
const DAYS_PER_WEEK = 5;
const WEEKS_PER_MONTH = 4.345; // Average weeks in a month
const MONTHS_PER_YEAR = 12;

// Hours per different time periods
const HOURS_PER_MONTH = HOURS_PER_DAY * DAYS_PER_WEEK * WEEKS_PER_MONTH; // ~173.8 hours per month
const HOURS_PER_YEAR = HOURS_PER_MONTH * MONTHS_PER_YEAR; // ~2,085.6 hours per year

// Conversion factors for different time units to monthly values
const TIME_MULTIPLIERS = {
  hour: {
    month: HOURS_PER_MONTH,
    toMonthly: (amount: number) => amount * HOURS_PER_MONTH,
  },
  day: {
    month: DAYS_PER_WEEK * WEEKS_PER_MONTH,
    toMonthly: (amount: number) => amount * DAYS_PER_WEEK * WEEKS_PER_MONTH,
  },
  week: {
    month: WEEKS_PER_MONTH,
    toMonthly: (amount: number) => amount * WEEKS_PER_MONTH,
  },
  month: {
    month: 1,
    toMonthly: (amount: number) => amount,
  },
  year: {
    month: 1 / MONTHS_PER_YEAR,
    toMonthly: (amount: number) => amount / MONTHS_PER_YEAR,
  },
};

export function calculateTax(input: TaxInput): TaxBreakdown {
  // Convert input amount to monthly
  const monthlyAmount = TIME_MULTIPLIERS[input.timeUnit].toMonthly(input.amount);
  
  // If input is net, estimate gross, otherwise use the monthly amount
  const monthlyGross = input.calculationType === 'gross' 
    ? monthlyAmount 
    : estimateGross(monthlyAmount);

  // Calculate monthly contributions
  const pensionPillar1 = monthlyGross * 0.15; // 15% first pillar
  const pensionPillar2 = monthlyGross * 0.05; // 5% second pillar
  const healthInsurance = monthlyGross * 0.165; // 16.5% health insurance

  // Calculate monthly taxable income
  const totalDeductions = PERSONAL_ALLOWANCE + (input.dependents * 200);
  const monthlyTaxableIncome = monthlyGross - pensionPillar1 - pensionPillar2 - totalDeductions;

  // Calculate monthly income tax
  let monthlyIncomeTax = 0;
  if (monthlyTaxableIncome > 0) {
    if (monthlyTaxableIncome <= TAX_BRACKET_THRESHOLD) {
      monthlyIncomeTax = monthlyTaxableIncome * LOWER_TAX_RATE;
    } else {
      monthlyIncomeTax = (TAX_BRACKET_THRESHOLD * LOWER_TAX_RATE) +
        ((monthlyTaxableIncome - TAX_BRACKET_THRESHOLD) * HIGHER_TAX_RATE);
    }
  }

  // Calculate monthly net
  const monthlyNet = monthlyGross - pensionPillar1 - pensionPillar2 - healthInsurance - monthlyIncomeTax;

  // Convert all values back to the original time unit
  const multiplier = TIME_MULTIPLIERS[input.timeUnit].month;
  
  return {
    gross: roundToTwoDecimals(monthlyGross * multiplier),
    pensionPillar1: roundToTwoDecimals(pensionPillar1 * multiplier),
    pensionPillar2: roundToTwoDecimals(pensionPillar2 * multiplier),
    healthInsurance: roundToTwoDecimals(healthInsurance * multiplier),
    taxableIncome: roundToTwoDecimals(monthlyTaxableIncome * multiplier),
    incomeTax: roundToTwoDecimals(monthlyIncomeTax * multiplier),
    net: roundToTwoDecimals(monthlyNet * multiplier),
  };
}

export function calculateTimeBreakdown(amount: number, fromUnit: TimeUnit, isGross: boolean): TimeBreakdown {
  // First convert to monthly amount
  const monthlyAmount = TIME_MULTIPLIERS[fromUnit].toMonthly(amount);

  // Then calculate all other periods
  return {
    hourly: roundToTwoDecimals(monthlyAmount / HOURS_PER_MONTH),
    daily: roundToTwoDecimals(monthlyAmount / (DAYS_PER_WEEK * WEEKS_PER_MONTH)),
    weekly: roundToTwoDecimals(monthlyAmount / WEEKS_PER_MONTH),
    monthly: roundToTwoDecimals(monthlyAmount),
    yearly: roundToTwoDecimals(monthlyAmount * MONTHS_PER_YEAR),
  };
}

function estimateGross(targetMonthlyNet: number): number {
  let monthlyGross = targetMonthlyNet * 1.5; // Initial estimate
  const tolerance = 0.001; // Increased precision
  const maxIterations = 100; // Increased max iterations
  let iterations = 0;

  while (iterations < maxIterations) {
    const result = calculateTax({
      amount: monthlyGross,
      timeUnit: 'month',
      calculationType: 'gross',
      employmentType: 'employee',
      residence: 'Zagreb',
      dependents: 0,
      hasDisability: false,
      additionalIncome: 0,
    });

    const currentNet = result.net;
    const diff = currentNet - targetMonthlyNet;

    if (Math.abs(diff) < tolerance) {
      break;
    }

    // Improved adjustment algorithm with smaller step size
    monthlyGross = monthlyGross - (diff * 0.5);
    iterations++;
  }

  return roundToTwoDecimals(monthlyGross);
}

function roundToTwoDecimals(num: number): number {
  return Math.round(num * 100) / 100;
}