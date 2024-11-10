import React from 'react';
import { EuroIcon } from 'lucide-react';
import { CalculationType, TimeUnit } from '../types/calculator';

interface SalaryInputProps {
  amount: number;
  timeUnit: TimeUnit;
  calculationType: CalculationType;
  onAmountChange: (amount: number) => void;
  onTimeUnitChange: (unit: TimeUnit) => void;
  onCalculationTypeChange: (type: CalculationType) => void;
}

export function SalaryInput({
  amount,
  timeUnit,
  calculationType,
  onAmountChange,
  onTimeUnitChange,
  onCalculationTypeChange,
}: SalaryInputProps) {
  const timeUnits: { value: TimeUnit; label: string }[] = [
    { value: 'hour', label: 'Po satu' },
    { value: 'day', label: 'Po danu' },
    { value: 'week', label: 'Tjedno' },
    { value: 'month', label: 'Mjesečno' },
    { value: 'year', label: 'Godišnje' },
  ];

  const calculationTypes: { value: CalculationType; label: string }[] = [
    { value: 'gross', label: 'Bruto' },
    { value: 'net', label: 'Neto' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {calculationTypes.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onCalculationTypeChange(value)}
            className={`
              py-3 px-4 rounded-lg text-sm font-medium
              transition-all duration-200
              ${calculationType === value
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
            `}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <EuroIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          min={0}
          step={100}
          className="block w-full rounded-lg border-gray-300 pl-10 pr-4 
                   focus:border-blue-500 focus:ring-blue-500
                   h-11 shadow-sm text-base text-gray-700"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {timeUnits.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onTimeUnitChange(value)}
            className={`
              py-2 px-3 rounded-lg text-sm font-medium
              transition-all duration-200
              ${timeUnit === value
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}