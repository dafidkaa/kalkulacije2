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
    month: 1 / HOURS_PER_MONTH, // Convert monthly to hourly
    toMonthly: (amount: number) => amount * HOURS_PER_MONTH, // Convert hourly to monthly
  },
  day: {
    month: 1 / (DAYS_PER_WEEK * WEEKS_PER_MONTH), // Convert monthly to daily
    toMonthly: (amount: number) => amount * DAYS_PER_WEEK * WEEKS_PER_MONTH, // Convert daily to monthly
  },
  week: {
    month: 1 / WEEKS_PER_MONTH, // Convert monthly to weekly
    toMonthly: (amount: number) => amount * WEEKS_PER_MONTH, // Convert weekly to monthly
  },
  month: {
    month: 1, // Monthly stays the same
    toMonthly: (amount: number) => amount, // Monthly stays the same
  },
  year: {
    month: MONTHS_PER_YEAR, // Convert monthly to yearly
    toMonthly: (amount: number) => amount / MONTHS_PER_YEAR, // Convert yearly to monthly
  },
};

export function calculateTax(input: TaxInput): TaxBreakdown {
  // Convert input amount to monthly
  const monthlyAmount = TIME_MULTIPLIERS[input.timeUnit].toMonthly(input.amount);

  // If input is net, estimate gross, otherwise use the monthly amount
  const monthlyGross = input.calculationType === 'gross'
    ? monthlyAmount
    : estimateGross(monthlyAmount, input);

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
  // For example, if input is yearly, we need to multiply monthly values by 12
  let multiplier;
  if (input.timeUnit === 'hour') {
    multiplier = 1 / HOURS_PER_MONTH; // Convert monthly to hourly
  } else if (input.timeUnit === 'day') {
    multiplier = 1 / (DAYS_PER_WEEK * WEEKS_PER_MONTH); // Convert monthly to daily
  } else if (input.timeUnit === 'week') {
    multiplier = 1 / WEEKS_PER_MONTH; // Convert monthly to weekly
  } else if (input.timeUnit === 'year') {
    multiplier = MONTHS_PER_YEAR; // Convert monthly to yearly
  } else {
    multiplier = 1; // Monthly stays the same
  }

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
    daily: roundToTwoDecimals((monthlyAmount / HOURS_PER_MONTH) * HOURS_PER_DAY), // Daily is 8 hours
    weekly: roundToTwoDecimals((monthlyAmount / HOURS_PER_MONTH) * HOURS_PER_DAY * DAYS_PER_WEEK), // Weekly is 5 days
    monthly: roundToTwoDecimals(monthlyAmount),
    yearly: roundToTwoDecimals(monthlyAmount * MONTHS_PER_YEAR),
  };
}

function estimateGross(targetMonthlyNet: number, input?: Partial<TaxInput>): number {
  let monthlyGross = targetMonthlyNet * 1.5; // Initial estimate
  const tolerance = 0.001; // Increased precision
  const maxIterations = 100; // Increased max iterations
  let iterations = 0;

  while (iterations < maxIterations) {
    const result = calculateTax({
      amount: monthlyGross,
      timeUnit: 'month',
      calculationType: 'gross',
      employmentType: input?.employmentType || 'employee',
      residence: input?.residence || 'Zagreb',
      dependents: input?.dependents || 0,
      hasDisability: input?.hasDisability || false,
      additionalIncome: input?.additionalIncome || 0,
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
  return Math.floor(num * 100) / 100; // Use floor instead of round to avoid rounding up
}