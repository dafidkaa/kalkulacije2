import {
  Ruler,
  Scale,
  Droplets,
  Square,
  Thermometer,
  Timer,
  Gauge,
  HardDrive,
  Zap,
  Wind,
  Fuel,
} from 'lucide-react';

export interface UnitType {
  id: string;
  name: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface Category {
  id: string;
  name: string;
  icon: any;
  units: UnitType[];
}

// Length units
const lengthUnits: UnitType[] = [
  {
    id: 'mm',
    name: 'Milimetri',
    toBase: (v) => v / 1000,
    fromBase: (v) => v * 1000,
  },
  {
    id: 'cm',
    name: 'Centimetri',
    toBase: (v) => v / 100,
    fromBase: (v) => v * 100,
  },
  {
    id: 'm',
    name: 'Metri',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  {
    id: 'km',
    name: 'Kilometri',
    toBase: (v) => v * 1000,
    fromBase: (v) => v / 1000,
  },
  {
    id: 'in',
    name: 'Inči',
    toBase: (v) => v * 0.0254,
    fromBase: (v) => v / 0.0254,
  },
  {
    id: 'ft',
    name: 'Stope',
    toBase: (v) => v * 0.3048,
    fromBase: (v) => v / 0.3048,
  },
  {
    id: 'yd',
    name: 'Jardi',
    toBase: (v) => v * 0.9144,
    fromBase: (v) => v / 0.9144,
  },
  {
    id: 'mi',
    name: 'Milje',
    toBase: (v) => v * 1609.344,
    fromBase: (v) => v / 1609.344,
  },
];

// Mass units
const massUnits: UnitType[] = [
  {
    id: 'mg',
    name: 'Miligrami',
    toBase: (v) => v / 1000000,
    fromBase: (v) => v * 1000000,
  },
  {
    id: 'g',
    name: 'Grami',
    toBase: (v) => v / 1000,
    fromBase: (v) => v * 1000,
  },
  {
    id: 'kg',
    name: 'Kilogrami',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  {
    id: 't',
    name: 'Tone',
    toBase: (v) => v * 1000,
    fromBase: (v) => v / 1000,
  },
  {
    id: 'oz',
    name: 'Unce',
    toBase: (v) => v * 0.0283495,
    fromBase: (v) => v / 0.0283495,
  },
  {
    id: 'lb',
    name: 'Funte',
    toBase: (v) => v * 0.453592,
    fromBase: (v) => v / 0.453592,
  },
];

// Volume units
const volumeUnits: UnitType[] = [
  {
    id: 'ml',
    name: 'Mililitri',
    toBase: (v) => v / 1000,
    fromBase: (v) => v * 1000,
  },
  {
    id: 'l',
    name: 'Litri',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  {
    id: 'm3',
    name: 'Kubni metri',
    toBase: (v) => v * 1000,
    fromBase: (v) => v / 1000,
  },
  {
    id: 'gal_us',
    name: 'Galoni (US)',
    toBase: (v) => v * 3.78541,
    fromBase: (v) => v / 3.78541,
  },
  {
    id: 'gal_uk',
    name: 'Galoni (UK)',
    toBase: (v) => v * 4.54609,
    fromBase: (v) => v / 4.54609,
  },
];

// Area units
const areaUnits: UnitType[] = [
  {
    id: 'm2',
    name: 'Kvadratni metri',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  {
    id: 'km2',
    name: 'Kvadratni kilometri',
    toBase: (v) => v * 1000000,
    fromBase: (v) => v / 1000000,
  },
  {
    id: 'ha',
    name: 'Hektari',
    toBase: (v) => v * 10000,
    fromBase: (v) => v / 10000,
  },
  {
    id: 'ac',
    name: 'Rali',
    toBase: (v) => v * 4046.86,
    fromBase: (v) => v / 4046.86,
  },
];

// Temperature units with special conversion formulas
const temperatureUnits: UnitType[] = [
  {
    id: 'c',
    name: 'Celzijus',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  {
    id: 'f',
    name: 'Fahrenheit',
    toBase: (v) => (v - 32) * 5/9,
    fromBase: (v) => v * 9/5 + 32,
  },
  {
    id: 'k',
    name: 'Kelvin',
    toBase: (v) => v - 273.15,
    fromBase: (v) => v + 273.15,
  },
];

export const categories: Category[] = [
  {
    id: 'length',
    name: 'Duljina',
    icon: Ruler,
    units: lengthUnits,
  },
  {
    id: 'mass',
    name: 'Masa',
    icon: Scale,
    units: massUnits,
  },
  {
    id: 'volume',
    name: 'Volumen',
    icon: Droplets,
    units: volumeUnits,
  },
  {
    id: 'area',
    name: 'Površina',
    icon: Square,
    units: areaUnits,
  },
  {
    id: 'temperature',
    name: 'Temperatura',
    icon: Thermometer,
    units: temperatureUnits,
  },
];

export function convert(value: number, from: UnitType, to: UnitType): number {
  if (from.id === to.id) return value;
  
  // Special case for temperature
  if (from.id === 'c' && to.id === 'f') {
    return (value * 9/5) + 32;
  }
  if (from.id === 'f' && to.id === 'c') {
    return (value - 32) * 5/9;
  }
  if (from.id === 'c' && to.id === 'k') {
    return value + 273.15;
  }
  if (from.id === 'k' && to.id === 'c') {
    return value - 273.15;
  }
  if (from.id === 'f' && to.id === 'k') {
    return (value - 32) * 5/9 + 273.15;
  }
  if (from.id === 'k' && to.id === 'f') {
    return (value - 273.15) * 9/5 + 32;
  }
  
  // For all other units, convert through base unit
  const baseValue = from.toBase(value);
  return to.fromBase(baseValue);
}