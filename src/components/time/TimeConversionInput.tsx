import React, { useState } from 'react';

interface TimeConversionInputProps {
  onCalculate: (amount: number, from: string, to: string) => void;
}

const timeUnits = [
  { value: 'seconds', label: 'Sekunde' },
  { value: 'minutes', label: 'Minute' },
  { value: 'hours', label: 'Sati' },
  { value: 'days', label: 'Dani' },
  { value: 'weeks', label: 'Tjedni' },
  { value: 'months', label: 'Mjeseci' },
  { value: 'years', label: 'Godine' },
];

export function TimeConversionInput({ onCalculate }: TimeConversionInputProps) {
  const [amount, setAmount] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState('hours');
  const [toUnit, setToUnit] = useState('minutes');

  const handleSubmit = () => {
    onCalculate(amount, fromUnit, toUnit);
  };

  const inputClasses = `
    w-full rounded-lg border-gray-300 shadow-sm px-4 py-3
    focus:border-indigo-500 focus:ring-indigo-500
    text-base
  `;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-base font-medium text-gray-700">
          Količina
        </label>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          className={inputClasses}
          placeholder="Unesite broj"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700">
            Iz
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className={inputClasses}
          >
            {timeUnits.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700">
            U
          </label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className={inputClasses}
          >
            {timeUnits.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full px-6 py-3 text-sm font-medium text-white 
                 bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        Izračunaj
      </button>
    </div>
  );
}