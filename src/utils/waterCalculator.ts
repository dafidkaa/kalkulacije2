
export interface WaterResult {
    liters: number;
    glasses: number; // assuming 200ml glass
}

export const calculateWaterIntake = (
    weight: number, // kg
    activityMinutes: number
): WaterResult => {
    if (weight <= 0) {
        return { liters: 0, glasses: 0 };
    }

    // Base: 35ml per kg
    let ml = weight * 35;

    // Activity: Add ~350ml for every 30 minutes of exercise
    if (activityMinutes > 0) {
        ml += (activityMinutes / 30) * 350;
    }

    const liters = Number((ml / 1000).toFixed(2));
    const glasses = Math.round(ml / 250); // 250ml standard glass

    return {
        liters,
        glasses
    };
};
