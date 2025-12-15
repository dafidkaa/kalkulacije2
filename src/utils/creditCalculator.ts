
export interface CreditCalculationResult {
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
    principal: number;
    months: number;
}

export const calculateCredit = (
    principal: number,
    annualRate: number,
    years: number
): CreditCalculationResult => {
    // Validate inputs
    if (principal <= 0 || years <= 0) {
        return {
            monthlyPayment: 0,
            totalInterest: 0,
            totalPayment: 0,
            principal: principal,
            months: 0
        };
    }

    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12;

    let monthlyPayment = 0;
    let totalPayment = 0;
    let totalInterest = 0;

    if (annualRate === 0) {
        // Simple division if no interest
        monthlyPayment = principal / months;
        totalPayment = principal;
        totalInterest = 0;
    } else {
        // Amortization formula: A = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
        monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        totalPayment = monthlyPayment * months;
        totalInterest = totalPayment - principal;
    }

    return {
        monthlyPayment,
        totalInterest,
        totalPayment,
        principal,
        months
    };
};
