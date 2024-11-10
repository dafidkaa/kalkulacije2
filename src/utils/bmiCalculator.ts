export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

interface BMIInput {
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  activityLevel: ActivityLevel;
  waist?: string;
  hip?: string;
}

export interface BMIResult {
  bmi: number;
  category: string;
  categoryColor: string;
  idealWeightRange: {
    min: number;
    max: number;
  };
  dailyCalories: number;
  recommendation: string;
}

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export function calculateBMI(input: BMIInput): BMIResult {
  // Convert height to meters
  const heightInMeters = input.height / 100;
  
  // Calculate BMI
  const bmi = input.weight / (heightInMeters * heightInMeters);

  // Determine category and color
  let category: string;
  let categoryColor: string;
  let recommendation: string;

  if (bmi < 18.5) {
    category = 'Pothranjenost';
    categoryColor = 'text-blue-600';
    recommendation = 'Preporučuje se povećanje unosa kalorija i konzultacija s liječnikom.';
  } else if (bmi < 25) {
    category = 'Normalna težina';
    categoryColor = 'text-green-600';
    recommendation = 'Održavajte trenutnu težinu kroz uravnoteženu prehranu i redovitu aktivnost.';
  } else if (bmi < 30) {
    category = 'Prekomjerna težina';
    categoryColor = 'text-orange-600';
    recommendation = 'Razmotrite smanjenje unosa kalorija i povećanje fizičke aktivnosti.';
  } else {
    category = 'Pretilost';
    categoryColor = 'text-red-600';
    recommendation = 'Preporučuje se konzultacija s liječnikom i izrada plana za smanjenje težine.';
  }

  // Calculate ideal weight range (BMI 18.5 - 24.9)
  const idealWeightRange = {
    min: 18.5 * heightInMeters * heightInMeters,
    max: 24.9 * heightInMeters * heightInMeters,
  };

  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr;
  if (input.gender === 'male') {
    bmr = (10 * input.weight) + (6.25 * input.height) - (5 * input.age) + 5;
  } else {
    bmr = (10 * input.weight) + (6.25 * input.height) - (5 * input.age) - 161;
  }

  // Calculate daily calories based on activity level
  const dailyCalories = bmr * activityMultipliers[input.activityLevel];

  return {
    bmi,
    category,
    categoryColor,
    idealWeightRange,
    dailyCalories,
    recommendation,
  };
}