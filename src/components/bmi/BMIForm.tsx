import React, { useState, useEffect } from 'react';
import { GradientCard } from '../GradientCard';
import { calculateBMI, BMIResult, ActivityLevel, Gender } from '../../utils/bmiCalculator';

export function BMIForm() {
  const [formData, setFormData] = useState({
    age: 30,
    gender: 'male' as Gender,
    height: 175,
    weight: 75,
    activityLevel: 'moderate' as ActivityLevel,
    waist: '',
    hip: '',
  });

  const [result, setResult] = useState<BMIResult | null>(null);

  // Calculate initial result
  useEffect(() => {
    const initialResult = calculateBMI(formData);
    setResult(initialResult);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate BMI on every change
    const newResult = calculateBMI({
      ...formData,
      [name]: value,
    });
    setResult(newResult);
  };

  const inputClasses = `
    block w-full rounded-lg 
    border-2 border-gray-200 
    focus:border-[#f17273] focus:ring-[#f17273]
    shadow-sm hover:border-gray-300
    text-base py-3 px-4
    transition-colors duration-200
  `;

  const selectClasses = `
    block w-full rounded-lg 
    border-2 border-gray-200
    focus:border-[#f17273] focus:ring-[#f17273]
    shadow-sm hover:border-gray-300
    text-base py-3 px-4
    transition-colors duration-200
  `;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <GradientCard>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Spol
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={selectClasses}
            >
              <option value="male">Muško</option>
              <option value="female">Žensko</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Dob
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min="18"
              max="100"
              className={inputClasses}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Visina (cm)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              min="100"
              max="250"
              className={inputClasses}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Težina (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              min="30"
              max="300"
              className={inputClasses}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Razina Aktivnosti
            </label>
            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleInputChange}
              className={selectClasses}
            >
              <option value="sedentary">Sjedeći način života</option>
              <option value="light">Lagana aktivnost</option>
              <option value="moderate">Umjerena aktivnost</option>
              <option value="active">Aktivni način života</option>
              <option value="very_active">Vrlo aktivni način života</option>
            </select>
          </div>
        </div>
      </GradientCard>

      {result && (
        <GradientCard>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Vaš BMI: {result.bmi.toFixed(1)}
              </h2>
              <p className={`text-lg font-medium ${result.categoryColor}`}>
                {result.category}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Idealna težina
                </h3>
                <p className="text-gray-600">
                  {result.idealWeightRange.min.toFixed(1)} - {result.idealWeightRange.max.toFixed(1)} kg
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Dnevne kalorije
                </h3>
                <p className="text-gray-600">
                  {result.dailyCalories.toFixed(0)} kcal
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Preporuke
                </h3>
                <p className="text-gray-600">
                  {result.recommendation}
                </p>
              </div>
            </div>
          </div>
        </GradientCard>
      )}
    </div>
  );
}