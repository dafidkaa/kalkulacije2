import React, { useState } from 'react';
import { TaxInput } from '../types/calculator';
import { calculateTax, calculateTimeBreakdown } from '../utils/taxCalculator';
import { GradientCard } from './GradientCard';
import { SalaryInput } from './SalaryInput';
import { ResultCard } from './ResultCard';
import { TimeBreakdownCard } from './TimeBreakdownCard';

export function Calculator() {
  const [input, setInput] = useState<TaxInput>({
    amount: 1000,
    timeUnit: 'month',
    calculationType: 'gross',
    employmentType: 'employee',
    residence: 'Zagreb',
    dependents: 0,
    hasDisability: false,
    additionalIncome: 0,
  });

  const taxBreakdown = calculateTax(input);
  const timeBreakdown = calculateTimeBreakdown(
    input.calculationType === 'gross' ? taxBreakdown.gross : taxBreakdown.net,
    input.timeUnit,
    input.calculationType === 'gross'
  );

  const handleInputChange = (changes: Partial<TaxInput>) => {
    setInput((prev) => ({ ...prev, ...changes }));
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-8">
        <GradientCard>
          <SalaryInput
            amount={input.amount}
            timeUnit={input.timeUnit}
            calculationType={input.calculationType}
            onAmountChange={(amount) => handleInputChange({ amount })}
            onTimeUnitChange={(timeUnit) => handleInputChange({ timeUnit })}
            onCalculationTypeChange={(calculationType) => 
              handleInputChange({ calculationType })}
          />
        </GradientCard>

        <GradientCard>
          <div className="space-y-3">
            <label className="block text-base font-medium text-gray-700">
              Broj uzdržavanih članova
            </label>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  className={`
                    px-5 py-2.5 rounded-lg text-base font-medium
                    ${input.dependents === num
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}
                    transition-colors duration-200
                  `}
                  onClick={() => handleInputChange({ dependents: num })}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </GradientCard>
      </div>

      <div className="space-y-8">
        <ResultCard breakdown={taxBreakdown} />
        <TimeBreakdownCard 
          breakdown={timeBreakdown} 
          isGross={input.calculationType === 'gross'} 
        />
      </div>
    </div>
  );
}