export interface DiscountResult {
    discountAmount: number;
    finalPrice: number;
    savings: number;
}

export const calculateDiscount = (
    originalPrice: number,
    discountPercent: number,
    additionalDiscountPercent: number = 0
): DiscountResult => {
    if (originalPrice <= 0) {
        return { discountAmount: 0, finalPrice: 0, savings: 0 };
    }

    // Calculate first discount
    const firstDiscountAmount = (originalPrice * discountPercent) / 100;
    const priceAfterFirstDiscount = originalPrice - firstDiscountAmount;

    // Calculate additional discount on the reduced price
    const additionalDiscountAmount = (priceAfterFirstDiscount * additionalDiscountPercent) / 100;

    const totalSavings = firstDiscountAmount + additionalDiscountAmount;
    const finalPrice = originalPrice - totalSavings;

    return {
        discountAmount: Number(firstDiscountAmount.toFixed(2)),
        finalPrice: Number(finalPrice.toFixed(2)),
        savings: Number(totalSavings.toFixed(2))
    };
};
