import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { Category, UnitType, convert } from '../../utils/unitConverter';

interface UnitInputProps {
  category: Category;
  fromUnit: UnitType;
  toUnit: UnitType;
  value: string;
  onFromUnitChange: (unit: UnitType) => void;
  onToUnitChange: (unit: UnitType) => void;
  onValueChange: (value: string) => void;
}

export function UnitInput({
  category,
  fromUnit,
  toUnit,
  value,
  onFromUnitChange,
  onToUnitChange,
  onValueChange,
}: UnitInputProps) {
  const handleSwapUnits = () => {
    const tempUnit = fromUnit;
    onFromUnitChange(toUnit);
    onToUnitChange(tempUnit);
  };

  const result = convert(parseFloat(value) || 0, fromUnit, toUnit);
  
  const formatNumber = (num: number) => {
    const rounded = Number(num.toFixed(4));
    if (Math.floor(rounded) === rounded) {
      return rounded.toLocaleString('hr-HR');
    }
    return rounded.toLocaleString('hr-HR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4
    });
  };

  const inputClasses = `
    col-span-2 block w-full rounded-lg 
    border-2 border-gray-200 
    focus:border-green-500 focus:ring-green-500
    shadow-sm hover:border-gray-300
    text-base py-3 px-4
    transition-colors duration-200
  `;

  const selectClasses = `
    block w-full rounded-lg 
    border-2 border-gray-200
    focus:border-green-500 focus:ring-green-500
    shadow-sm hover:border-gray-300
    text-base py-3 px-4
    transition-colors duration-200
  `;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Iz
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={value}
              onChange={(e) => onValueChange(e.target.value)}
              className={inputClasses}
              placeholder="0"
            />
            <select
              value={fromUnit.id}
              onChange={(e) => {
                const unit = category.units.find(u => u.id === e.target.value);
                if (unit) onFromUnitChange(unit);
              }}
              className={selectClasses}
            >
              {category.units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSwapUnits}
          className="mx-auto block p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowRightLeft className="w-6 h-6 text-gray-500" />
        </button>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            U
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              value={formatNumber(result)}
              readOnly
              className={`${inputClasses} bg-gray-50`}
            />
            <select
              value={toUnit.id}
              onChange={(e) => {
                const unit = category.units.find(u => u.id === e.target.value);
                if (unit) onToUnitChange(unit);
              }}
              className={selectClasses}
            >
              {category.units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}