export interface FuelCalculationResult {
    totalCost: number;
    fuelCompumptionTotal: number;
    costPerPerson: number;
}

export const calculateFuelCost = (
    distance: number,
    consumption: number,
    price: number,
    passengers: number = 1
): FuelCalculationResult => {
    if (distance <= 0 || consumption <= 0 || price <= 0) {
        return {
            totalCost: 0,
            fuelCompumptionTotal: 0,
            costPerPerson: 0
        };
    }

    const fuelNeeded = (distance * consumption) / 100;
    const totalCost = fuelNeeded * price;
    const costPerPerson = passengers > 0 ? totalCost / passengers : totalCost;

    return {
        totalCost: Number(totalCost.toFixed(2)),
        fuelCompumptionTotal: Number(fuelNeeded.toFixed(2)),
        costPerPerson: Number(costPerPerson.toFixed(2))
    };
};
