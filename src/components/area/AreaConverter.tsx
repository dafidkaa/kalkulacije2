import React, { useState, useEffect } from 'react';
import { GradientCard } from '../GradientCard';

// Define all area units with their conversion factors to square meters
const AREA_UNITS = {
  // Metric units
  'mm²': { factor: 0.000001, group: 'metric', name: 'Kvadratni milimetar' },
  'cm²': { factor: 0.0001, group: 'metric', name: 'Kvadratni centimetar' },
  'dm²': { factor: 0.01, group: 'metric', name: 'Kvadratni decimetar' },
  'm²': { factor: 1, group: 'metric', name: 'Kvadratni metar' },
  'a': { factor: 100, group: 'metric', name: 'Ar' },
  'ha': { factor: 10000, group: 'metric', name: 'Hektar' },
  'km²': { factor: 1000000, group: 'metric', name: 'Kvadratni kilometar' },
  
  // Imperial/US units
  'in²': { factor: 0.00064516, group: 'imperial', name: 'Kvadratni inč' },
  'ft²': { factor: 0.092903, group: 'imperial', name: 'Kvadratna stopa' },
  'yd²': { factor: 0.836127, group: 'imperial', name: 'Kvadratni jard' },
  'ac': { factor: 4046.86, group: 'imperial', name: 'Aker' },
  'mi²': { factor: 2589988.11, group: 'imperial', name: 'Kvadratna milja' },
  
  // Other units
  'rai': { factor: 1600, group: 'other', name: 'Rai (Tajland)' },
  'tsubo': { factor: 3.30579, group: 'other', name: 'Tsubo (Japan)' },
  'ping': { factor: 3.305785, group: 'other', name: 'Ping (Kina/Tajvan)' },
  'bigha': { factor: 1618.7, group: 'other', name: 'Bigha (Indija)' }
};

// Group units for the dropdown
const UNIT_GROUPS = {
  'metric': 'Metrički sustav',
  'imperial': 'Imperijalni/US sustav',
  'other': 'Ostale jedinice'
};

export function AreaConverter() {
  const [inputValue, setInputValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('m²');
  const [toUnit, setToUnit] = useState<string>('ft²');
  const [result, setResult] = useState<number>(0);
  const [showAllResults, setShowAllResults] = useState<boolean>(false);

  // Calculate conversion when inputs change
  useEffect(() => {
    if (inputValue && fromUnit && toUnit) {
      // Convert to square meters first, then to target unit
      const valueInSqMeters = inputValue * AREA_UNITS[fromUnit].factor;
      const convertedValue = valueInSqMeters / AREA_UNITS[toUnit].factor;
      setResult(convertedValue);
    }
  }, [inputValue, fromUnit, toUnit]);

  // Calculate all conversions for the current input
  const calculateAllConversions = () => {
    if (!inputValue || !fromUnit) return {};
    
    const valueInSqMeters = inputValue * AREA_UNITS[fromUnit].factor;
    const allResults: Record<string, number> = {};
    
    Object.keys(AREA_UNITS).forEach(unit => {
      allResults[unit] = valueInSqMeters / AREA_UNITS[unit].factor;
    });
    
    return allResults;
  };

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleShowAllResults = () => {
    setShowAllResults(!showAllResults);
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return '0';
    
    // For very small numbers, use scientific notation
    if (num < 0.000001) return num.toExponential(6);
    
    // For very large numbers, use scientific notation
    if (num > 1000000000) return num.toExponential(6);
    
    // For numbers with many decimal places, limit to 6 significant digits
    if (num < 0.1) return num.toPrecision(6);
    
    // For regular numbers, use locale string with up to 6 decimal places
    return num.toLocaleString('hr-HR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6
    });
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GradientCard>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Pretvarač Jedinica Površine</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Vrijednost
                </label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                  min="0"
                  step="any"
                  className={inputClasses}
                />
              </div>

              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Iz jedinice
                  </label>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className={inputClasses}
                  >
                    {Object.entries(UNIT_GROUPS).map(([groupKey, groupName]) => (
                      <optgroup key={groupKey} label={groupName}>
                        {Object.entries(AREA_UNITS)
                          .filter(([_, unitInfo]) => unitInfo.group === groupKey)
                          .map(([unitKey, unitInfo]) => (
                            <option key={unitKey} value={unitKey}>
                              {unitInfo.name} ({unitKey})
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={handleSwapUnits}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                    title="Zamijeni jedinice"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                </div>

                <div className="col-span-2 space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    U jedinicu
                  </label>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className={inputClasses}
                  >
                    {Object.entries(UNIT_GROUPS).map(([groupKey, groupName]) => (
                      <optgroup key={groupKey} label={groupName}>
                        {Object.entries(AREA_UNITS)
                          .filter(([_, unitInfo]) => unitInfo.group === groupKey)
                          .map(([unitKey, unitInfo]) => (
                            <option key={unitKey} value={unitKey}>
                              {unitInfo.name} ({unitKey})
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleShowAllResults}
                className="flex-1 py-3 px-4 bg-teal-600 text-white rounded-lg
                         hover:bg-teal-700 transition-colors duration-200"
              >
                {showAllResults ? 'Prikaži samo rezultat' : 'Prikaži sve pretvorbe'}
              </button>
            </div>
          </div>
        </GradientCard>

        <GradientCard>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Rezultat</h2>
            <button
              onClick={() => {
                setInputValue(1);
                setFromUnit('m²');
                setToUnit('ft²');
                setShowAllResults(false);
              }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Resetiraj
            </button>
          </div>

          {!showAllResults ? (
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">
                    {formatNumber(inputValue)} {fromUnit} =
                  </p>
                  <p className="text-3xl font-bold text-teal-600">
                    {formatNumber(result)} {toUnit}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-700">Formula:</h3>
                <p className="text-gray-600">
                  1 {fromUnit} = {formatNumber(AREA_UNITS[fromUnit].factor / AREA_UNITS[toUnit].factor)} {toUnit}
                </p>
              </div>
              
              <div className="p-4 bg-teal-50 rounded-lg">
                <h3 className="text-lg font-medium text-teal-800 mb-2">Često korištene pretvorbe:</h3>
                <ul className="space-y-1 text-teal-700">
                  <li>1 m² = 10.764 ft²</li>
                  <li>1 ha = 2.471 ac</li>
                  <li>1 km² = 0.386 mi²</li>
                  <li>1 ac = 4,047 m²</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                {formatNumber(inputValue)} {fromUnit} je jednako:
              </p>
              
              <div className="max-h-96 overflow-y-auto pr-2">
                {Object.entries(UNIT_GROUPS).map(([groupKey, groupName]) => (
                  <div key={groupKey} className="mb-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">{groupName}:</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <table className="w-full">
                        <tbody>
                          {Object.entries(AREA_UNITS)
                            .filter(([_, unitInfo]) => unitInfo.group === groupKey)
                            .map(([unitKey, unitInfo]) => (
                              <tr key={unitKey} className="border-b border-gray-200 last:border-0">
                                <td className="py-2 font-medium">{unitInfo.name}:</td>
                                <td className="py-2 text-right">
                                  {formatNumber(calculateAllConversions()[unitKey])} {unitKey}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </GradientCard>
      </div>
    </div>
  );
}
