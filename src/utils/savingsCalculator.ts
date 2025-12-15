
export interface SavingsResult {
    totalSaved: number;
    totalPrincipal: number;
    totalInterest: number;
}

export const calculateSavings = (
    initialDeposit: number,
    monthlyContribution: number,
    annualRate: number,
    years: number
): SavingsResult => {
    if (initialDeposit < 0 || monthlyContribution < 0 || years <= 0) {
        return { totalSaved: 0, totalPrincipal: 0, totalInterest: 0 };
    }

    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12;

    let totalSaved = initialDeposit;
    let totalPrincipal = initialDeposit;

    for (let i = 0; i < months; i++) {
        totalSaved += monthlyContribution;
        totalPrincipal += monthlyContribution;

        // Apply interest at the end of the month
        if (monthlyRate > 0) {
            totalSaved += totalSaved * monthlyRate;
        }
    }

    const totalInterest = totalSaved - totalPrincipal;

    return {
        totalSaved: Number(totalSaved.toFixed(2)),
        totalPrincipal: Number(totalPrincipal.toFixed(2)),
        totalInterest: Number(totalInterest.toFixed(2))
    };
};
