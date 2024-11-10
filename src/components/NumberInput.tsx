import React from 'react';
import { EuroIcon } from 'lucide-react';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberInput({
  value,
  onChange,
  label,
  min = 0,
  max = 1000000,
  step = 100
}: NumberInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-base font-medium text-gray-700">
        {label}
      </label>
      <div className="relative rounded-lg shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <EuroIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="block w-full rounded-lg border-gray-300 pl-10 pr-4 
                     focus:border-blue-500 focus:ring-blue-500
                     h-11 shadow-sm text-base text-gray-700"
        />
      </div>
    </div>
  );
}