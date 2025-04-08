import React, { useState, useEffect } from 'react';
import { GradientCard } from '../GradientCard';
import { 
  TemperatureUnit, 
  convertTemperature, 
  formatTemperature, 
  temperatureUnits,
  conversionFormulas
} from '../../utils/temperatureConverter';

export function BasicConverter() {
  const [inputValue, setInputValue] = useState<number>(25);
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('celsius');
  const [toUnit, setToUnit] = useState<TemperatureUnit>('fahrenheit');
  const [result, setResult] = useState<number>(77);
  const [formula, setFormula] = useState<string>(conversionFormulas.celsiusToFahrenheit);
  const [showFormula, setShowFormula] = useState<boolean>(false);

  // Update result when inputs change
  useEffect(() => {
    if (inputValue !== undefined) {
      const convertedValue = convertTemperature(inputValue, fromUnit, toUnit);
      setResult(convertedValue);
      
      // Update formula
      updateFormula(fromUnit, toUnit);
    }
  }, [inputValue, fromUnit, toUnit]);

  const updateFormula = (from: TemperatureUnit, to: TemperatureUnit) => {
    if (from === 'celsius' && to === 'fahrenheit') {
      setFormula(conversionFormulas.celsiusToFahrenheit);
    } else if (from === 'fahrenheit' && to === 'celsius') {
      setFormula(conversionFormulas.fahrenheitToCelsius);
    } else if (from === 'celsius' && to === 'kelvin') {
      setFormula(conversionFormulas.celsiusToKelvin);
    } else if (from === 'kelvin' && to === 'celsius') {
      setFormula(conversionFormulas.kelvinToCelsius);
    } else if (from === 'fahrenheit' && to === 'kelvin') {
      setFormula(conversionFormulas.fahrenheitToKelvin);
    } else if (from === 'kelvin' && to === 'fahrenheit') {
      setFormula(conversionFormulas.kelvinToFahrenheit);
    } else if (from === 'celsius' && to === 'rankine') {
      setFormula(conversionFormulas.celsiusToRankine);
    } else if (from === 'rankine' && to === 'celsius') {
      setFormula(conversionFormulas.rankineToCelsius);
    } else if (from === 'celsius' && to === 'reaumur') {
      setFormula(conversionFormulas.celsiusToReaumur);
    } else if (from === 'reaumur' && to === 'celsius') {
      setFormula(conversionFormulas.reaumurToCelsius);
    } else if (from === 'celsius' && to === 'delisle') {
      setFormula(conversionFormulas.celsiusToDelisle);
    } else if (from === 'delisle' && to === 'celsius') {
      setFormula(conversionFormulas.delisleToCelsius);
    } else if (from === 'celsius' && to === 'newton') {
      setFormula(conversionFormulas.celsiusToNewton);
    } else if (from === 'newton' && to === 'celsius') {
      setFormula(conversionFormulas.newtonToCelsius);
    } else if (from === 'celsius' && to === 'romer') {
      setFormula(conversionFormulas.celsiusToRomer);
    } else if (from === 'romer' && to === 'celsius') {
      setFormula(conversionFormulas.romerToCelsius);
    } else {
      // For other combinations, we'll convert through Celsius
      setFormula(`Pretvorba se vrši kroz Celzij kao međukorak`);
    }
  };

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleReset = () => {
    setInputValue(25);
    setFromUnit('celsius');
    setToUnit('fahrenheit');
    setShowFormula(false);
  };

  // Calculate step-by-step conversion
  const getStepByStepConversion = (): string[] => {
    const steps: string[] = [];
    
    if (fromUnit === toUnit) {
      steps.push(`${inputValue} ${temperatureUnits[fromUnit].symbol} = ${result} ${temperatureUnits[toUnit].symbol}`);
      return steps;
    }
    
    // Direct conversion between common units
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
      steps.push(`${inputValue} °C × (9/5) + 32 = ${inputValue * 9/5} + 32 = ${result} °F`);
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
      steps.push(`(${inputValue} °F - 32) × (5/9) = ${inputValue - 32} × (5/9) = ${result} °C`);
    } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
      steps.push(`${inputValue} °C + 273.15 = ${result} K`);
    } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
      steps.push(`${inputValue} K - 273.15 = ${result} °C`);
    } else {
      // For other combinations, convert through Celsius
      const toCelsius = convertTemperature(inputValue, fromUnit, 'celsius');
      const fromCelsiusToTarget = convertTemperature(toCelsius, 'celsius', toUnit);
      
      steps.push(`Korak 1: Pretvorba iz ${temperatureUnits[fromUnit].name} u Celzij`);
      
      if (fromUnit === 'fahrenheit') {
        steps.push(`(${inputValue} °F - 32) × (5/9) = ${toCelsius} °C`);
      } else if (fromUnit === 'kelvin') {
        steps.push(`${inputValue} K - 273.15 = ${toCelsius} °C`);
      } else if (fromUnit === 'rankine') {
        steps.push(`(${inputValue} °R - 491.67) × (5/9) = ${toCelsius} °C`);
      } else if (fromUnit === 'reaumur') {
        steps.push(`${inputValue} °Ré × (5/4) = ${toCelsius} °C`);
      } else if (fromUnit === 'delisle') {
        steps.push(`100 - ${inputValue} °De × (2/3) = ${toCelsius} °C`);
      } else if (fromUnit === 'newton') {
        steps.push(`${inputValue} °N × (100/33) = ${toCelsius} °C`);
      } else if (fromUnit === 'romer') {
        steps.push(`(${inputValue} °Rø - 7.5) × (40/21) = ${toCelsius} °C`);
      }
      
      steps.push(`Korak 2: Pretvorba iz Celzij u ${temperatureUnits[toUnit].name}`);
      
      if (toUnit === 'fahrenheit') {
        steps.push(`${toCelsius} °C × (9/5) + 32 = ${fromCelsiusToTarget} °F`);
      } else if (toUnit === 'kelvin') {
        steps.push(`${toCelsius} °C + 273.15 = ${fromCelsiusToTarget} K`);
      } else if (toUnit === 'rankine') {
        steps.push(`(${toCelsius} °C + 273.15) × (9/5) = ${fromCelsiusToTarget} °R`);
      } else if (toUnit === 'reaumur') {
        steps.push(`${toCelsius} °C × (4/5) = ${fromCelsiusToTarget} °Ré`);
      } else if (toUnit === 'delisle') {
        steps.push(`(100 - ${toCelsius} °C) × (3/2) = ${fromCelsiusToTarget} °De`);
      } else if (toUnit === 'newton') {
        steps.push(`${toCelsius} °C × (33/100) = ${fromCelsiusToTarget} °N`);
      } else if (toUnit === 'romer') {
        steps.push(`${toCelsius} °C × (21/40) + 7.5 = ${fromCelsiusToTarget} °Rø`);
      }
    }
    
    return steps;
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GradientCard>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Pretvarač Temperature</h2>
          
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
                    onChange={(e) => setFromUnit(e.target.value as TemperatureUnit)}
                    className={inputClasses}
                  >
                    {Object.entries(temperatureUnits).map(([unit, info]) => (
                      <option key={unit} value={unit}>
                        {info.name} ({info.symbol})
                      </option>
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
                    onChange={(e) => setToUnit(e.target.value as TemperatureUnit)}
                    className={inputClasses}
                  >
                    {Object.entries(temperatureUnits).map(([unit, info]) => (
                      <option key={unit} value={unit}>
                        {info.name} ({info.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowFormula(!showFormula)}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg
                         hover:bg-blue-700 transition-colors duration-200"
              >
                {showFormula ? 'Sakrij formulu' : 'Prikaži formulu'}
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

          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-2">
                  {formatTemperature(inputValue, fromUnit)} =
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatTemperature(result, toUnit)}
                </p>
              </div>
            </div>
            
            {showFormula && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Formula:</h3>
                  <p className="text-blue-700 font-medium text-center text-xl">
                    {formula}
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Postupak:</h3>
                  <div className="space-y-2">
                    {getStepByStepConversion().map((step, index) => (
                      <p key={index} className="text-gray-700">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {!showFormula && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-2">O {temperatureUnits[toUnit].name} skali:</h3>
                <p className="text-blue-700">
                  {temperatureUnits[toUnit].description}
                </p>
              </div>
            )}
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Često korištene pretvorbe:</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-700">0°C = 32°F</div>
                <div className="text-gray-700">100°C = 212°F</div>
                <div className="text-gray-700">0°C = 273.15K</div>
                <div className="text-gray-700">-273.15°C = 0K</div>
              </div>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
