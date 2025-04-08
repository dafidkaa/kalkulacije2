import React, { useState, useEffect } from 'react';
import { GradientCard } from '../GradientCard';
import { 
  TemperatureUnit, 
  convertTemperature, 
  formatTemperature, 
  temperatureUnits,
  temperatureReferencePoints
} from '../../utils/temperatureConverter';

export function ReferencePoints() {
  const [inputValue, setInputValue] = useState<number>(25);
  const [inputUnit, setInputUnit] = useState<TemperatureUnit>('celsius');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredPoints, setFilteredPoints] = useState(temperatureReferencePoints);
  
  // Filter reference points when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPoints(temperatureReferencePoints);
    } else {
      setFilteredPoints(temperatureReferencePoints.filter(point => point.category === selectedCategory));
    }
  }, [selectedCategory]);

  const getTemperatureColor = (celsius: number): string => {
    if (celsius < -50) return 'bg-indigo-100 text-indigo-800'; // Extremely cold
    if (celsius < -20) return 'bg-blue-100 text-blue-800';     // Very cold
    if (celsius < 0) return 'bg-cyan-100 text-cyan-800';       // Cold
    if (celsius < 15) return 'bg-teal-100 text-teal-800';      // Cool
    if (celsius < 25) return 'bg-green-100 text-green-800';    // Moderate
    if (celsius < 35) return 'bg-yellow-100 text-yellow-800';  // Warm
    if (celsius < 50) return 'bg-orange-100 text-orange-800';  // Hot
    return 'bg-red-100 text-red-800';                          // Very hot
  };

  const getComparisonText = (referenceCelsius: number): string => {
    const inputInCelsius = convertTemperature(inputValue, inputUnit, 'celsius');
    const diff = inputInCelsius - referenceCelsius;
    
    if (Math.abs(diff) < 0.1) return 'Jednako';
    
    const absValue = Math.abs(diff).toFixed(1);
    
    if (diff > 0) {
      return `${absValue}°C toplije`;
    } else {
      return `${absValue}°C hladnije`;
    }
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GradientCard>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Referentne Točke Temperature</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Vaša temperatura
                  </label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                    step="any"
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Jedinica
                  </label>
                  <select
                    value={inputUnit}
                    onChange={(e) => setInputUnit(e.target.value as TemperatureUnit)}
                    className={inputClasses}
                  >
                    {Object.entries(temperatureUnits).map(([unit, info]) => (
                      <option key={unit} value={unit}>
                        {info.symbol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-base font-medium text-gray-700">
                Kategorija
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`py-2 px-3 rounded-lg text-sm font-medium ${
                    selectedCategory === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sve
                </button>
                <button
                  onClick={() => setSelectedCategory('everyday')}
                  className={`py-2 px-3 rounded-lg text-sm font-medium ${
                    selectedCategory === 'everyday' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Svakodnevno
                </button>
                <button
                  onClick={() => setSelectedCategory('weather')}
                  className={`py-2 px-3 rounded-lg text-sm font-medium ${
                    selectedCategory === 'weather' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Vrijeme
                </button>
                <button
                  onClick={() => setSelectedCategory('scientific')}
                  className={`py-2 px-3 rounded-lg text-sm font-medium ${
                    selectedCategory === 'scientific' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Znanost
                </button>
                <button
                  onClick={() => setSelectedCategory('cooking')}
                  className={`py-2 px-3 rounded-lg text-sm font-medium ${
                    selectedCategory === 'cooking' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Kuhanje
                </button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Vaša temperatura:</h3>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {formatTemperature(inputValue, inputUnit)}
                </p>
                <p className="text-gray-600 mt-1">
                  {formatTemperature(convertTemperature(inputValue, inputUnit, 'celsius'), 'celsius')} | 
                  {formatTemperature(convertTemperature(inputValue, inputUnit, 'fahrenheit'), 'fahrenheit')} | 
                  {formatTemperature(convertTemperature(inputValue, inputUnit, 'kelvin'), 'kelvin')}
                </p>
              </div>
            </div>
          </div>
        </GradientCard>

        <GradientCard>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Usporedba</h2>
            <button
              onClick={() => {
                setInputValue(25);
                setInputUnit('celsius');
                setSelectedCategory('all');
              }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Resetiraj
            </button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {filteredPoints.map((point, index) => {
              const inputInCelsius = convertTemperature(inputValue, inputUnit, 'celsius');
              const diff = inputInCelsius - point.celsius;
              const colorClass = getTemperatureColor(point.celsius);
              
              return (
                <div 
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{point.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{point.description}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-lg font-medium ${colorClass}`}>
                        {point.celsius}°C
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-gray-600">
                        {formatTemperature(point.celsius, 'celsius')} | 
                        {formatTemperature(convertTemperature(point.celsius, 'celsius', 'fahrenheit'), 'fahrenheit')} | 
                        {formatTemperature(convertTemperature(point.celsius, 'celsius', 'kelvin'), 'kelvin')}
                      </span>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs ${diff > 0 ? 'bg-red-100 text-red-800' : diff < 0 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {getComparisonText(point.celsius)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
