import React, { useState } from 'react';
import { GradientCard } from '../GradientCard';
import { 
  convertTemperature, 
  formatTemperature 
} from '../../utils/temperatureConverter';

type PracticalMode = 'cooking' | 'weather' | 'scientific';

export function PracticalConverter() {
  const [mode, setMode] = useState<PracticalMode>('cooking');
  
  // Cooking mode state
  const [ovenTemp, setOvenTemp] = useState<number>(180);
  const [ovenUnit, setOvenUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  
  // Weather mode state
  const [weatherTemp, setWeatherTemp] = useState<number>(25);
  const [weatherUnit, setWeatherUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  
  // Scientific mode state
  const [scientificTemp, setScientificTemp] = useState<number>(25);
  const [scientificUnit, setScientificUnit] = useState<'celsius' | 'kelvin' | 'fahrenheit'>('celsius');
  const [precision, setPrecision] = useState<number>(2);

  const getOvenDescription = (tempCelsius: number): string => {
    if (tempCelsius < 120) return 'Vrlo niska temperatura - pogodno za sušenje hrane, sporo pečenje';
    if (tempCelsius < 150) return 'Niska temperatura - pogodno za dugotrajno pečenje mesa';
    if (tempCelsius < 180) return 'Srednje niska temperatura - pogodno za pečenje kolača i peciva';
    if (tempCelsius < 200) return 'Srednja temperatura - pogodno za pečenje kruha i većine jela';
    if (tempCelsius < 220) return 'Srednje visoka temperatura - pogodno za pečenje pizze';
    if (tempCelsius < 250) return 'Visoka temperatura - pogodno za zapecanje i gratiniranje';
    return 'Vrlo visoka temperatura - pogodno za brzo pečenje i pečenje na visokoj temperaturi';
  };

  const getWeatherClothing = (tempCelsius: number): string => {
    if (tempCelsius < -10) return 'Ekstremno hladno - potrebna zimska jakna, rukavice, šal, kapa, topla obuća';
    if (tempCelsius < 0) return 'Vrlo hladno - potrebna zimska jakna, rukavice, šal, kapa';
    if (tempCelsius < 10) return 'Hladno - potrebna jakna ili kaput, topla odjeća';
    if (tempCelsius < 15) return 'Svježe - potrebna lagana jakna ili džemper';
    if (tempCelsius < 20) return 'Umjereno - potreban džemper ili lagana jakna';
    if (tempCelsius < 25) return 'Ugodno - lagana odjeća, možda lagani džemper navečer';
    if (tempCelsius < 30) return 'Toplo - lagana ljetna odjeća';
    return 'Vrlo toplo - minimalna ljetna odjeća, zaštita od sunca';
  };

  const getScientificNotation = (value: number): string => {
    return value.toExponential(precision);
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GradientCard>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Praktični Pretvarači Temperature</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setMode('cooking')}
                  className={`py-3 px-4 rounded-lg text-sm font-medium ${
                    mode === 'cooking' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Kuhanje
                </button>
                <button
                  onClick={() => setMode('weather')}
                  className={`py-3 px-4 rounded-lg text-sm font-medium ${
                    mode === 'weather' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Vrijeme
                </button>
                <button
                  onClick={() => setMode('scientific')}
                  className={`py-3 px-4 rounded-lg text-sm font-medium ${
                    mode === 'scientific' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Znanost
                </button>
              </div>
            </div>

            {/* Cooking Mode */}
            {mode === 'cooking' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Pretvarač Temperature Pećnice</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-2">
                    <label className="block text-base font-medium text-gray-700">
                      Temperatura pećnice
                    </label>
                    <input
                      type="number"
                      value={ovenTemp}
                      onChange={(e) => setOvenTemp(parseFloat(e.target.value) || 0)}
                      step="5"
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-medium text-gray-700">
                      Jedinica
                    </label>
                    <select
                      value={ovenUnit}
                      onChange={(e) => setOvenUnit(e.target.value as 'celsius' | 'fahrenheit')}
                      className={inputClasses}
                    >
                      <option value="celsius">°C</option>
                      <option value="fahrenheit">°F</option>
                    </select>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Uobičajene temperature pećnice:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-yellow-700">Vrlo nisko: 120°C / 250°F</div>
                    <div className="text-yellow-700">Nisko: 150°C / 300°F</div>
                    <div className="text-yellow-700">Srednje nisko: 170°C / 325-350°F</div>
                    <div className="text-yellow-700">Srednje: 180-190°C / 350-375°F</div>
                    <div className="text-yellow-700">Srednje visoko: 200-220°C / 400-425°F</div>
                    <div className="text-yellow-700">Visoko: 230-250°C / 450-475°F</div>
                  </div>
                </div>
              </div>
            )}

            {/* Weather Mode */}
            {mode === 'weather' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Pretvarač Vremenske Temperature</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-2">
                    <label className="block text-base font-medium text-gray-700">
                      Temperatura
                    </label>
                    <input
                      type="number"
                      value={weatherTemp}
                      onChange={(e) => setWeatherTemp(parseFloat(e.target.value) || 0)}
                      step="1"
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-medium text-gray-700">
                      Jedinica
                    </label>
                    <select
                      value={weatherUnit}
                      onChange={(e) => setWeatherUnit(e.target.value as 'celsius' | 'fahrenheit')}
                      className={inputClasses}
                    >
                      <option value="celsius">°C</option>
                      <option value="fahrenheit">°F</option>
                    </select>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Temperaturni raspon:</h4>
                  <div className="relative h-8 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-lg overflow-hidden">
                    {/* Temperature markers */}
                    <div className="absolute bottom-0 left-0 text-xs text-white font-bold ml-1">-20°C</div>
                    <div className="absolute bottom-0 left-1/4 text-xs text-white font-bold">0°C</div>
                    <div className="absolute bottom-0 left-1/2 text-xs text-white font-bold" style={{ transform: 'translateX(-50%)' }}>20°C</div>
                    <div className="absolute bottom-0 left-3/4 text-xs text-white font-bold">30°C</div>
                    <div className="absolute bottom-0 right-0 text-xs text-white font-bold mr-1">40°C</div>
                    
                    {/* Current temperature marker */}
                    {(() => {
                      const tempInCelsius = weatherUnit === 'celsius' 
                        ? weatherTemp 
                        : convertTemperature(weatherTemp, 'fahrenheit', 'celsius');
                      // Position based on temperature range from -20°C to 40°C
                      const position = ((tempInCelsius + 20) / 60) * 100;
                      const clampedPosition = Math.max(0, Math.min(100, position));
                      
                      return (
                        <div 
                          className="absolute top-0 w-2 h-8 bg-white border border-gray-800"
                          style={{ left: `${clampedPosition}%`, transform: 'translateX(-50%)' }}
                        />
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* Scientific Mode */}
            {mode === 'scientific' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Znanstveni Pretvarač Temperature</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-2">
                    <label className="block text-base font-medium text-gray-700">
                      Temperatura
                    </label>
                    <input
                      type="number"
                      value={scientificTemp}
                      onChange={(e) => setScientificTemp(parseFloat(e.target.value) || 0)}
                      step="any"
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-medium text-gray-700">
                      Jedinica
                    </label>
                    <select
                      value={scientificUnit}
                      onChange={(e) => setScientificUnit(e.target.value as 'celsius' | 'fahrenheit' | 'kelvin')}
                      className={inputClasses}
                    >
                      <option value="celsius">°C</option>
                      <option value="fahrenheit">°F</option>
                      <option value="kelvin">K</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Preciznost (broj decimala)
                  </label>
                  <input
                    type="number"
                    value={precision}
                    onChange={(e) => setPrecision(parseInt(e.target.value) || 2)}
                    min="0"
                    max="10"
                    step="1"
                    className={inputClasses}
                  />
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Znanstvene referentne točke:</h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="text-purple-700">Apsolutna nula: -273.15°C / 0K</div>
                    <div className="text-purple-700">Trojna točka vode: 0.01°C / 273.16K</div>
                    <div className="text-purple-700">Vrelište dušika: -195.8°C / 77.35K</div>
                    <div className="text-purple-700">Vrelište kisika: -183°C / 90.15K</div>
                    <div className="text-purple-700">Talište aluminija: 660.3°C / 933.45K</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </GradientCard>

        <GradientCard>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Rezultat</h2>
            <button
              onClick={() => {
                if (mode === 'cooking') {
                  setOvenTemp(180);
                  setOvenUnit('celsius');
                } else if (mode === 'weather') {
                  setWeatherTemp(25);
                  setWeatherUnit('celsius');
                } else {
                  setScientificTemp(25);
                  setScientificUnit('celsius');
                  setPrecision(2);
                }
              }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Resetiraj
            </button>
          </div>

          {/* Cooking Mode Results */}
          {mode === 'cooking' && (
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">
                    {ovenUnit === 'celsius' ? 'Celzij u Fahrenheit' : 'Fahrenheit u Celzij'}
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {ovenUnit === 'celsius' 
                      ? `${ovenTemp}°C = ${Math.round(convertTemperature(ovenTemp, 'celsius', 'fahrenheit'))}°F`
                      : `${ovenTemp}°F = ${Math.round(convertTemperature(ovenTemp, 'fahrenheit', 'celsius'))}°C`
                    }
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="text-lg font-medium text-yellow-800 mb-2">Preporuka za pećnicu:</h3>
                <p className="text-yellow-700">
                  {getOvenDescription(ovenUnit === 'celsius' 
                    ? ovenTemp 
                    : convertTemperature(ovenTemp, 'fahrenheit', 'celsius')
                  )}
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Uobičajena jela na ovoj temperaturi:</h3>
                {(() => {
                  const tempCelsius = ovenUnit === 'celsius' 
                    ? ovenTemp 
                    : convertTemperature(ovenTemp, 'fahrenheit', 'celsius');
                  
                  if (tempCelsius < 150) {
                    return (
                      <ul className="list-disc list-inside space-y-1 text-blue-700">
                        <li>Sušeno voće i povrće</li>
                        <li>Sporo pečeno meso (pulled pork, brisket)</li>
                        <li>Meringue</li>
                      </ul>
                    );
                  } else if (tempCelsius < 180) {
                    return (
                      <ul className="list-disc list-inside space-y-1 text-blue-700">
                        <li>Kolači i torte</li>
                        <li>Keksi</li>
                        <li>Pečena piletina</li>
                      </ul>
                    );
                  } else if (tempCelsius < 200) {
                    return (
                      <ul className="list-disc list-inside space-y-1 text-blue-700">
                        <li>Kruh</li>
                        <li>Pite</li>
                        <li>Lazanje i zapečena tjestenina</li>
                      </ul>
                    );
                  } else if (tempCelsius < 230) {
                    return (
                      <ul className="list-disc list-inside space-y-1 text-blue-700">
                        <li>Pizza</li>
                        <li>Pečeni krumpir</li>
                        <li>Brzo pečeno meso</li>
                      </ul>
                    );
                  } else {
                    return (
                      <ul className="list-disc list-inside space-y-1 text-blue-700">
                        <li>Zapečena korica</li>
                        <li>Brzo pečenje na visokoj temperaturi</li>
                        <li>Neki tipovi kruha s korom</li>
                      </ul>
                    );
                  }
                })()}
              </div>
            </div>
          )}

          {/* Weather Mode Results */}
          {mode === 'weather' && (
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">
                    {weatherUnit === 'celsius' ? 'Celzij u Fahrenheit' : 'Fahrenheit u Celzij'}
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {weatherUnit === 'celsius' 
                      ? `${weatherTemp}°C = ${convertTemperature(weatherTemp, 'celsius', 'fahrenheit').toFixed(1)}°F`
                      : `${weatherTemp}°F = ${convertTemperature(weatherTemp, 'fahrenheit', 'celsius').toFixed(1)}°C`
                    }
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Preporuka za odjeću:</h3>
                <p className="text-blue-700">
                  {getWeatherClothing(weatherUnit === 'celsius' 
                    ? weatherTemp 
                    : convertTemperature(weatherTemp, 'fahrenheit', 'celsius')
                  )}
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-medium text-green-800 mb-2">Osjećaj temperature:</h3>
                {(() => {
                  const tempCelsius = weatherUnit === 'celsius' 
                    ? weatherTemp 
                    : convertTemperature(weatherTemp, 'fahrenheit', 'celsius');
                  
                  if (tempCelsius < -10) {
                    return <p className="text-green-700">Ekstremno hladno - rizik od smrzotina pri duljem boravku vani</p>;
                  } else if (tempCelsius < 0) {
                    return <p className="text-green-700">Vrlo hladno - neugodan osjećaj na koži, potrebna topla odjeća</p>;
                  } else if (tempCelsius < 10) {
                    return <p className="text-green-700">Hladno - potrebna topla odjeća za ugodno osjećanje</p>;
                  } else if (tempCelsius < 15) {
                    return <p className="text-green-700">Svježe - ugodno uz laganu jaknu ili džemper</p>;
                  } else if (tempCelsius < 20) {
                    return <p className="text-green-700">Umjereno - ugodno za većinu ljudi</p>;
                  } else if (tempCelsius < 25) {
                    return <p className="text-green-700">Ugodno toplo - idealno za vanjske aktivnosti</p>;
                  } else if (tempCelsius < 30) {
                    return <p className="text-green-700">Toplo - ugodno u laganoj odjeći</p>;
                  } else if (tempCelsius < 35) {
                    return <p className="text-green-700">Vrlo toplo - može biti neugodno pri fizičkoj aktivnosti</p>;
                  } else {
                    return <p className="text-green-700">Ekstremno toplo - rizik od toplinskog udara, izbjegavajte napor</p>;
                  }
                })()}
              </div>
            </div>
          )}

          {/* Scientific Mode Results */}
          {mode === 'scientific' && (
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-center space-y-2">
                  <div>
                    <p className="text-lg text-gray-600 mb-1">Celzij (°C):</p>
                    <p className="text-xl font-bold text-blue-600">
                      {scientificUnit === 'celsius' 
                        ? scientificTemp.toFixed(precision)
                        : convertTemperature(scientificTemp, scientificUnit, 'celsius').toFixed(precision)
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-600 mb-1">Kelvin (K):</p>
                    <p className="text-xl font-bold text-blue-600">
                      {scientificUnit === 'kelvin' 
                        ? scientificTemp.toFixed(precision)
                        : convertTemperature(scientificTemp, scientificUnit, 'kelvin').toFixed(precision)
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-600 mb-1">Fahrenheit (°F):</p>
                    <p className="text-xl font-bold text-blue-600">
                      {scientificUnit === 'fahrenheit' 
                        ? scientificTemp.toFixed(precision)
                        : convertTemperature(scientificTemp, scientificUnit, 'fahrenheit').toFixed(precision)
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="text-lg font-medium text-purple-800 mb-2">Znanstvena notacija:</h3>
                <div className="space-y-2">
                  <p className="text-purple-700">
                    <span className="font-medium">Celzij: </span>
                    {getScientificNotation(scientificUnit === 'celsius' 
                      ? scientificTemp
                      : convertTemperature(scientificTemp, scientificUnit, 'celsius')
                    )} °C
                  </p>
                  <p className="text-purple-700">
                    <span className="font-medium">Kelvin: </span>
                    {getScientificNotation(scientificUnit === 'kelvin' 
                      ? scientificTemp
                      : convertTemperature(scientificTemp, scientificUnit, 'kelvin')
                    )} K
                  </p>
                  <p className="text-purple-700">
                    <span className="font-medium">Fahrenheit: </span>
                    {getScientificNotation(scientificUnit === 'fahrenheit' 
                      ? scientificTemp
                      : convertTemperature(scientificTemp, scientificUnit, 'fahrenheit')
                    )} °F
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="text-lg font-medium text-indigo-800 mb-2">Fizikalne karakteristike:</h3>
                {(() => {
                  const tempCelsius = scientificUnit === 'celsius' 
                    ? scientificTemp 
                    : convertTemperature(scientificTemp, scientificUnit, 'celsius');
                  const tempKelvin = scientificUnit === 'kelvin'
                    ? scientificTemp
                    : convertTemperature(scientificTemp, scientificUnit, 'kelvin');
                  
                  return (
                    <div className="space-y-2 text-indigo-700">
                      {tempKelvin <= 0 && (
                        <p>Temperatura je ispod apsolutne nule, što je teoretski nemoguće.</p>
                      )}
                      {tempKelvin > 0 && tempKelvin < 273.15 && (
                        <p>Temperatura je iznad apsolutne nule, ali ispod ledišta vode.</p>
                      )}
                      {tempCelsius >= 0 && tempCelsius < 100 && (
                        <p>Voda je u tekućem stanju pri standardnom atmosferskom tlaku.</p>
                      )}
                      {tempCelsius >= 100 && (
                        <p>Voda je u plinovitom stanju (para) pri standardnom atmosferskom tlaku.</p>
                      )}
                      {tempCelsius < 0 && (
                        <p>Voda je u krutom stanju (led) pri standardnom atmosferskom tlaku.</p>
                      )}
                      {tempCelsius > 1538 && (
                        <p>Željezo je u tekućem stanju (talište željeza je 1538°C).</p>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </GradientCard>
      </div>
    </div>
  );
}
