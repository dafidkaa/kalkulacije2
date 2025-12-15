
export interface VatResult {
    baseAmount: number;
    vatAmount: number;
    totalAmount: number;
    rate: number;
}

export type VatCalculationMode = 'add_vat' | 'remove_vat';

export const calculateVat = (
    amount: number,
    rate: number,
    mode: VatCalculationMode
): VatResult => {
    if (amount < 0 || rate < 0) {
        return {
            baseAmount: 0,
            vatAmount: 0,
            totalAmount: 0,
            rate
        };
    }

    let baseAmount = 0;
    let vatAmount = 0;
    let totalAmount = 0;

    if (mode === 'add_vat') {
        // Input is Net, calculate Gross
        baseAmount = amount;
        vatAmount = amount * (rate / 100);
        totalAmount = baseAmount + vatAmount;
    } else {
        // Input is Gross, calculate Net
        // Formula: Net = Gross / (1 + rate/100)
        totalAmount = amount;
        baseAmount = amount / (1 + rate / 100);
        vatAmount = totalAmount - baseAmount;
    }

    return {
        baseAmount: Number(baseAmount.toFixed(2)),
        vatAmount: Number(vatAmount.toFixed(2)),
        totalAmount: Number(totalAmount.toFixed(2)),
        rate
    };
};
