import React, { useState, useEffect } from 'react';
import { GradientCard } from '../GradientCard';
import {
  ShapeType,
  UnitType,
  SHAPES,
  calculateArea,
  formatArea
} from '../../utils/areaCalculator';
import { ShapeIcon } from './ShapeIcon';

const unitOptions: { value: UnitType; label: string }[] = [
  { value: 'mm', label: 'Milimetri (mm²)' },
  { value: 'cm', label: 'Centimetri (cm²)' },
  { value: 'dm', label: 'Decimetri (dm²)' },
  { value: 'm', label: 'Metri (m²)' },
  { value: 'km', label: 'Kilometri (km²)' },
  { value: 'in', label: 'Inči (in²)' },
  { value: 'ft', label: 'Stope (ft²)' }
];

export function AreaForm() {
  const [selectedShape, setSelectedShape] = useState<ShapeType>('square');
  const [dimensions, setDimensions] = useState<Record<string, number>>({});
  const [unit, setUnit] = useState<UnitType>('m');
  const [result, setResult] = useState<{ area: number; formula: string; explanation: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize dimensions when shape changes
  useEffect(() => {
    const initialDimensions: Record<string, number> = {};
    SHAPES[selectedShape].inputs.forEach(input => {
      initialDimensions[input.name] = dimensions[input.name] || 0;
    });
    setDimensions(initialDimensions);
    setResult(null);
    setError(null);
  }, [selectedShape]);

  const handleDimensionChange = (name: string, value: string) => {
    const numValue = parseFloat(value);
    setDimensions(prev => ({
      ...prev,
      [name]: isNaN(numValue) ? 0 : numValue
    }));
    setResult(null);
  };

  const handleCalculate = () => {
    try {
      // Validate inputs
      const shape = SHAPES[selectedShape];
      const hasZeroDimension = shape.inputs.some(input =>
        dimensions[input.name] === 0 || dimensions[input.name] === undefined
      );

      if (hasZeroDimension) {
        setError('Molimo unesite vrijednosti veće od nule za sve dimenzije.');
        return;
      }

      // Special validation for polygon
      if (selectedShape === 'polygon' && dimensions.sides < 3) {
        setError('Poligon mora imati najmanje 3 stranice.');
        return;
      }

      // Calculate area
      const calculationResult = calculateArea({
        shapeType: selectedShape,
        dimensions,
        unit
      });

      setResult(calculationResult);
      setError(null);
    } catch (err) {
      setError('Došlo je do pogreške prilikom izračuna. Provjerite unesene vrijednosti.');
      setResult(null);
    }
  };

  const handleReset = () => {
    const initialDimensions: Record<string, number> = {};
    SHAPES[selectedShape].inputs.forEach(input => {
      initialDimensions[input.name] = 0;
    });
    setDimensions(initialDimensions);
    setResult(null);
    setError(null);
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GradientCard>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Odaberite Oblik</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {(Object.keys(SHAPES) as ShapeType[]).map((shapeType) => (
              <button
                key={shapeType}
                onClick={() => setSelectedShape(shapeType)}
                className={`
                  p-3 rounded-lg flex flex-col items-center justify-center
                  transition-all duration-200 h-24
                  ${selectedShape === shapeType
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
                `}
              >
                <ShapeIcon shape={shapeType} className="w-10 h-10 mb-2" />
                <span className="text-xs font-medium">{SHAPES[shapeType].name}</span>
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">
                {SHAPES[selectedShape].name}
              </h3>

              <div className="space-y-4">
                {SHAPES[selectedShape].inputs.map((input) => (
                  <div key={input.name} className="space-y-2">
                    <label className="block text-base font-medium text-gray-700">
                      {input.label} ({input.symbol})
                    </label>
                    <input
                      type="number"
                      value={dimensions[input.name] || ''}
                      onChange={(e) => handleDimensionChange(input.name, e.target.value)}
                      min="0"
                      step="any"
                      className={inputClasses}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Mjerna jedinica
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as UnitType)}
                  className={inputClasses}
                >
                  {unitOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleCalculate}
                className="flex-1 py-3 px-4 bg-teal-600 text-white rounded-lg
                         hover:bg-teal-700 transition-colors duration-200"
              >
                Izračunaj
              </button>
              <button
                onClick={handleReset}
                className="py-3 px-4 bg-gray-200 text-gray-700 rounded-lg
                         hover:bg-gray-300 transition-colors duration-200"
              >
                Resetiraj
              </button>
            </div>
          </div>
        </GradientCard>

        <GradientCard>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Rezultat</h2>
          </div>

          {error ? (
            <div className="p-4 bg-red-50 rounded-lg text-red-700 mb-4">
              {error}
            </div>
          ) : null}

          {result ? (
            <div className="space-y-6">
              <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
                <ShapeIcon shape={selectedShape} className="w-16 h-16 text-teal-600" />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Formula:</h3>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <span className="text-lg font-medium text-teal-700">{result.formula}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Objašnjenje:</h3>
                  <p className="text-gray-600">{result.explanation}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Površina:</h3>
                  <p className="text-3xl font-bold text-teal-600">
                    {formatArea(result.area, unit)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                Unesite dimenzije i kliknite "Izračunaj" za izračun površine.
              </p>

              <div className="p-4 bg-teal-50 rounded-lg">
                <h3 className="text-lg font-medium text-teal-800 mb-2">Formula za {SHAPES[selectedShape].name}:</h3>
                <p className="text-teal-700 font-medium">{SHAPES[selectedShape].formula}</p>
              </div>

              <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
                <ShapeIcon shape={selectedShape} className="w-16 h-16 text-gray-400" />
              </div>
            </div>
          )}
        </GradientCard>
      </div>
    </div>
  );
}
