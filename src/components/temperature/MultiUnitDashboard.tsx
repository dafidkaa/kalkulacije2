import React, { useState, useEffect } from 'react';
import { GradientCard } from '../GradientCard';
import { 
  TemperatureUnit, 
  getAllConversions, 
  temperatureUnits,
  temperatureReferencePoints
} from '../../utils/temperatureConverter';

export function MultiUnitDashboard() {
  const [inputValue, setInputValue] = useState<number>(25);
  const [inputUnit, setInputUnit] = useState<TemperatureUnit>('celsius');
  const [conversions, setConversions] = useState<Array<{value: number; unit: TemperatureUnit; formatted: string}>>([]);
  
  // Update conversions when input changes
  useEffect(() => {
    if (inputValue !== undefined) {
      const allConversions = getAllConversions(inputValue, inputUnit);
      setConversions(allConversions);
    }
  }, [inputValue, inputUnit]);

  // Find closest reference points
  const getClosestReferencePoints = () => {
    // Convert input to Celsius for comparison
    const inputInCelsius = conversions.find(c => c.unit === 'celsius')?.value || 0;
    
    // Sort reference points by proximity to input temperature
    return [...temperatureReferencePoints]
      .sort((a, b) => Math.abs(a.celsius - inputInCelsius) - Math.abs(b.celsius - inputInCelsius))
      .slice(0, 3);
  };

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

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GradientCard>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Svi Pretvarači Temperature</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Vrijednost
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

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Temperaturna ljestvica:</h3>
              <div className="relative h-8 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-lg overflow-hidden">
                {conversions.map(conversion => {
                  // Convert to Celsius for positioning
                  const celsiusValue = conversions.find(c => c.unit === 'celsius')?.value || 0;
                  // Position based on temperature range from -50°C to 150°C
                  const position = ((celsiusValue + 50) / 200) * 100;
                  const clampedPosition = Math.max(0, Math.min(100, position));
                  
                  if (conversion.unit === inputUnit) {
                    return (
                      <div 
                        key={conversion.unit}
                        className="absolute top-0 w-2 h-8 bg-white border border-gray-800"
                        style={{ left: `${clampedPosition}%`, transform: 'translateX(-50%)' }}
                        title={`${conversion.formatted}`}
                      />
                    );
                  }
                  return null;
                })}
                <div className="absolute bottom-0 left-0 text-xs text-white font-bold ml-1">-50°C</div>
                <div className="absolute bottom-0 left-1/4 text-xs text-white font-bold">0°C</div>
                <div className="absolute bottom-0 left-1/2 text-xs text-white font-bold" style={{ transform: 'translateX(-50%)' }}>50°C</div>
                <div className="absolute bottom-0 left-3/4 text-xs text-white font-bold">100°C</div>
                <div className="absolute bottom-0 right-0 text-xs text-white font-bold mr-1">150°C</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Najbliže referentne točke:</h3>
              <div className="space-y-2">
                {getClosestReferencePoints().map((point, index) => {
                  const diff = conversions.find(c => c.unit === 'celsius')?.value - point.celsius;
                  return (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">{point.name}:</span>
                      <span className="text-gray-700">{point.celsius}°C</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${diff > 0 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                        {diff > 0 ? `+${diff.toFixed(1)}°C` : `${diff.toFixed(1)}°C`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </GradientCard>

        <GradientCard>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Sve Pretvorbe</h2>
            <button
              onClick={() => {
                setInputValue(25);
                setInputUnit('celsius');
              }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Resetiraj
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {conversions.map(conversion => {
                const celsiusValue = conversions.find(c => c.unit === 'celsius')?.value || 0;
                const colorClass = getTemperatureColor(celsiusValue);
                
                return (
                  <div 
                    key={conversion.unit}
                    className={`p-4 rounded-lg ${conversion.unit === inputUnit ? 'border-2 border-blue-500' : ''}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-700 font-medium">{temperatureUnits[conversion.unit].name}:</span>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-lg font-medium ${colorClass}`}>
                          {conversion.formatted}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg mt-4">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Zanimljivosti:</h3>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Apsolutna nula (-273.15°C) je najniža teoretski moguća temperatura</li>
                <li>Prosječna tjelesna temperatura čovjeka je oko 37°C (98.6°F)</li>
                <li>Voda se smrzava na 0°C (32°F) i vrije na 100°C (212°F) pri standardnom tlaku</li>
                <li>Kelvin je jedina temperaturna ljestvica koja nema negativne vrijednosti</li>
              </ul>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
