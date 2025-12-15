export interface ChargingResult {
    energyAdded: number; // kWh
    costTotal: number;   // EUR
    costPer100km?: number; // Estimated
}

/**
 * Calculates the cost of charging an EV based on battery capacity,
 * charge percentage delta, and electricity tariffs.
 */
export const calculateChargingCost = (
    batteryCapacity: number, // kWh
    startPercent: number,    // 0-100
    targetPercent: number,   // 0-100
    tariffType: 'dual' | 'single',
    priceHigh: number,       // EUR/kWh
    priceLow: number,        // EUR/kWh
    nightSharePercent: number = 0 // 0-100, how much of the charging happens during cheap tariff
): ChargingResult => {

    if (startPercent >= targetPercent) {
        return { energyAdded: 0, costTotal: 0 };
    }

    // 1. Calculate Energy Needed
    // Formula: Capacity * (Target% - Start%) / 100
    const percentageAdded = targetPercent - startPercent;
    const energyAdded = batteryCapacity * (percentageAdded / 100);

    // 2. Calculate Cost
    let costTotal = 0;

    if (tariffType === 'single') {
        // Simple calculation: Energy * Price
        costTotal = energyAdded * priceHigh;
    } else {
        // Dual Tariff calculation
        // Split energy based on nightSharePercent
        const nightEnergy = energyAdded * (nightSharePercent / 100);
        const dayEnergy = energyAdded - nightEnergy;

        costTotal = (dayEnergy * priceHigh) + (nightEnergy * priceLow);
    }

    return {
        energyAdded: parseFloat(energyAdded.toFixed(2)),
        costTotal: parseFloat(costTotal.toFixed(2))
    };
};

export const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' }).format(val);
};

export const formatEnergy = (val: number) => {
    return `${val.toFixed(1)} kWh`;
};
