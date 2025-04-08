export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin' | 'rankine' | 'reaumur' | 'delisle' | 'newton' | 'romer';

export interface TemperatureConversion {
  value: number;
  unit: TemperatureUnit;
  formatted: string;
}

export interface TemperatureReferencePoint {
  name: string;
  celsius: number;
  category: 'everyday' | 'scientific' | 'weather' | 'cooking';
  description?: string;
}

// Temperature conversion formulas
export const convertTemperature = (value: number, fromUnit: TemperatureUnit, toUnit: TemperatureUnit): number => {
  // First convert to Celsius as the common unit
  let celsius: number;
  
  switch (fromUnit) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * (5/9);
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    case 'rankine':
      celsius = (value - 491.67) * (5/9);
      break;
    case 'reaumur':
      celsius = value * (5/4);
      break;
    case 'delisle':
      celsius = 100 - value * (2/3);
      break;
    case 'newton':
      celsius = value * (100/33);
      break;
    case 'romer':
      celsius = (value - 7.5) * (40/21);
      break;
    default:
      celsius = value;
  }
  
  // Then convert from Celsius to target unit
  switch (toUnit) {
    case 'celsius':
      return celsius;
    case 'fahrenheit':
      return celsius * (9/5) + 32;
    case 'kelvin':
      return celsius + 273.15;
    case 'rankine':
      return (celsius + 273.15) * (9/5);
    case 'reaumur':
      return celsius * (4/5);
    case 'delisle':
      return (100 - celsius) * (3/2);
    case 'newton':
      return celsius * (33/100);
    case 'romer':
      return celsius * (21/40) + 7.5;
    default:
      return celsius;
  }
};

// Format temperature with unit symbol
export const formatTemperature = (value: number, unit: TemperatureUnit): string => {
  const roundedValue = Math.round(value * 100) / 100;
  
  switch (unit) {
    case 'celsius':
      return `${roundedValue} °C`;
    case 'fahrenheit':
      return `${roundedValue} °F`;
    case 'kelvin':
      return `${roundedValue} K`;
    case 'rankine':
      return `${roundedValue} °R`;
    case 'reaumur':
      return `${roundedValue} °Ré`;
    case 'delisle':
      return `${roundedValue} °De`;
    case 'newton':
      return `${roundedValue} °N`;
    case 'romer':
      return `${roundedValue} °Rø`;
    default:
      return `${roundedValue}`;
  }
};

// Get all conversions for a temperature
export const getAllConversions = (value: number, unit: TemperatureUnit): TemperatureConversion[] => {
  const units: TemperatureUnit[] = ['celsius', 'fahrenheit', 'kelvin', 'rankine', 'reaumur', 'delisle', 'newton', 'romer'];
  
  return units.map(toUnit => {
    const convertedValue = convertTemperature(value, unit, toUnit);
    return {
      value: convertedValue,
      unit: toUnit,
      formatted: formatTemperature(convertedValue, toUnit)
    };
  });
};

// Temperature unit information
export const temperatureUnits: Record<TemperatureUnit, { name: string, symbol: string, description: string }> = {
  celsius: {
    name: 'Celzij',
    symbol: '°C',
    description: 'Najčešće korištena mjerna jedinica za temperaturu u većini zemalja svijeta. 0°C je točka ledišta vode, a 100°C je točka vrelišta vode pri standardnom atmosferskom tlaku.'
  },
  fahrenheit: {
    name: 'Fahrenheit',
    symbol: '°F',
    description: 'Mjerna jedinica koja se primarno koristi u SAD-u. 32°F je točka ledišta vode, a 212°F je točka vrelišta vode pri standardnom atmosferskom tlaku.'
  },
  kelvin: {
    name: 'Kelvin',
    symbol: 'K',
    description: 'SI jedinica za temperaturu. 0K je apsolutna nula, najniža teoretski moguća temperatura. 273.15K odgovara 0°C.'
  },
  rankine: {
    name: 'Rankine',
    symbol: '°R',
    description: 'Apsolutna temperaturna ljestvica koja se koristi u inženjerstvu u SAD-u. 0°R je apsolutna nula, a stupanj Rankine jednak je stupnju Fahrenheita.'
  },
  reaumur: {
    name: 'Réaumur',
    symbol: '°Ré',
    description: 'Povijesna temperaturna ljestvica koja se koristila u Europi. 0°Ré je točka ledišta vode, a 80°Ré je točka vrelišta vode.'
  },
  delisle: {
    name: 'Delisle',
    symbol: '°De',
    description: 'Povijesna temperaturna ljestvica koju je razvio Joseph-Nicolas Delisle 1732. godine. 0°De je točka vrelišta vode, a 150°De je točka ledišta vode.'
  },
  newton: {
    name: 'Newton',
    symbol: '°N',
    description: 'Temperaturna ljestvica koju je predložio Isaac Newton. 0°N je točka ledišta vode, a 33°N je točka vrelišta vode.'
  },
  romer: {
    name: 'Rømer',
    symbol: '°Rø',
    description: 'Jedna od najstarijih temperaturnih ljestvica koju je razvio danski astronom Ole Christensen Rømer 1701. godine. 7.5°Rø je točka ledišta vode, a 60°Rø je točka vrelišta vode.'
  }
};

// Common temperature reference points
export const temperatureReferencePoints: TemperatureReferencePoint[] = [
  // Everyday reference points
  { name: 'Prosječna tjelesna temperatura', celsius: 37, category: 'everyday', description: 'Normalna tjelesna temperatura zdravog čovjeka' },
  { name: 'Sobna temperatura', celsius: 21, category: 'everyday', description: 'Uobičajena temperatura u zatvorenim prostorima' },
  { name: 'Temperatura hladnjaka', celsius: 4, category: 'everyday', description: 'Preporučena temperatura za čuvanje hrane u hladnjaku' },
  { name: 'Temperatura zamrzivača', celsius: -18, category: 'everyday', description: 'Preporučena temperatura za čuvanje hrane u zamrzivaču' },
  
  // Weather reference points
  { name: 'Vrlo vruć dan', celsius: 35, category: 'weather', description: 'Temperatura koja se smatra vrlo vrućom u većini područja' },
  { name: 'Topao ljetni dan', celsius: 28, category: 'weather', description: 'Ugodna ljetna temperatura' },
  { name: 'Ugodan proljetni dan', celsius: 20, category: 'weather', description: 'Ugodna temperatura za vanjske aktivnosti' },
  { name: 'Hladan zimski dan', celsius: 0, category: 'weather', description: 'Temperatura ledišta vode, tipična zimska temperatura' },
  { name: 'Vrlo hladan dan', celsius: -15, category: 'weather', description: 'Temperatura koja se smatra vrlo hladnom u većini područja' },
  
  // Scientific reference points
  { name: 'Apsolutna nula', celsius: -273.15, category: 'scientific', description: 'Najniža teoretski moguća temperatura' },
  { name: 'Ledište vode', celsius: 0, category: 'scientific', description: 'Temperatura pri kojoj voda prelazi iz tekućeg u kruto stanje' },
  { name: 'Vrelište vode', celsius: 100, category: 'scientific', description: 'Temperatura pri kojoj voda prelazi iz tekućeg u plinovito stanje pri standardnom atmosferskom tlaku' },
  { name: 'Talište aluminija', celsius: 660, category: 'scientific', description: 'Temperatura pri kojoj aluminij prelazi iz krutog u tekuće stanje' },
  { name: 'Talište željeza', celsius: 1538, category: 'scientific', description: 'Temperatura pri kojoj željezo prelazi iz krutog u tekuće stanje' },
  
  // Cooking reference points
  { name: 'Pečenje kolača', celsius: 180, category: 'cooking', description: 'Uobičajena temperatura za pečenje kolača' },
  { name: 'Pečenje pizze', celsius: 220, category: 'cooking', description: 'Optimalna temperatura za pečenje pizze' },
  { name: 'Pečenje kruha', celsius: 200, category: 'cooking', description: 'Uobičajena temperatura za pečenje kruha' },
  { name: 'Sporo pečenje mesa', celsius: 150, category: 'cooking', description: 'Temperatura za sporo pečenje mesa' },
  { name: 'Prženje u dubokom ulju', celsius: 180, category: 'cooking', description: 'Optimalna temperatura za prženje hrane u dubokom ulju' }
];

// Conversion formulas as strings for display
export const conversionFormulas = {
  celsiusToFahrenheit: '°F = °C × (9/5) + 32',
  fahrenheitToCelsius: '°C = (°F - 32) × (5/9)',
  celsiusToKelvin: 'K = °C + 273.15',
  kelvinToCelsius: '°C = K - 273.15',
  fahrenheitToKelvin: 'K = (°F - 32) × (5/9) + 273.15',
  kelvinToFahrenheit: '°F = (K - 273.15) × (9/5) + 32',
  celsiusToRankine: '°R = (°C + 273.15) × (9/5)',
  rankineToCelsius: '°C = (°R - 491.67) × (5/9)',
  celsiusToReaumur: '°Ré = °C × (4/5)',
  reaumurToCelsius: '°C = °Ré × (5/4)',
  celsiusToDelisle: '°De = (100 - °C) × (3/2)',
  delisleToCelsius: '°C = 100 - °De × (2/3)',
  celsiusToNewton: '°N = °C × (33/100)',
  newtonToCelsius: '°C = °N × (100/33)',
  celsiusToRomer: '°Rø = °C × (21/40) + 7.5',
  romerToCelsius: '°C = (°Rø - 7.5) × (40/21)'
};
