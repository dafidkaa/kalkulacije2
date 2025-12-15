
export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';

export interface CalorieResult {
    bmr: number;
    tdee: number;
    goals: {
        maintain: number;
        mildWeightLoss: number;
        weightLoss: number;
        extremeWeightLoss: number;
        mildWeightGain: number;
        weightGain: number;
    };
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9,
};

export const calculateCalories = (
    age: number,
    gender: Gender,
    weight: number, // kg
    height: number, // cm
    activity: ActivityLevel
): CalorieResult => {
    if (age <= 0 || weight <= 0 || height <= 0) {
        return {
            bmr: 0,
            tdee: 0,
            goals: {
                maintain: 0,
                mildWeightLoss: 0,
                weightLoss: 0,
                extremeWeightLoss: 0,
                mildWeightGain: 0,
                weightGain: 0,
            }
        };
    }

    // Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);

    if (gender === 'male') {
        bmr += 5;
    } else {
        bmr -= 161;
    }

    const multiplier = ACTIVITY_MULTIPLIERS[activity];
    const tdee = bmr * multiplier;

    return {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        goals: {
            maintain: Math.round(tdee),
            mildWeightLoss: Math.round(tdee - 250),
            weightLoss: Math.round(tdee - 500),
            extremeWeightLoss: Math.round(tdee - 1000),
            mildWeightGain: Math.round(tdee + 250),
            weightGain: Math.round(tdee + 500),
        }
    };
};
