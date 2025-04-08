export type ShapeType = 'square' | 'rectangle' | 'triangle' | 'circle' | 'trapezoid' | 'parallelogram' | 'polygon' | 'ellipse';

export type UnitType = 'mm' | 'cm' | 'dm' | 'm' | 'km' | 'in' | 'ft';

export interface AreaInput {
  shapeType: ShapeType;
  dimensions: Record<string, number>;
  unit: UnitType;
}

export interface AreaResult {
  area: number;
  formula: string;
  explanation: string;
}

export interface ShapeInfo {
  name: string;
  icon: string;
  inputs: Array<{
    name: string;
    label: string;
    symbol: string;
  }>;
  formula: string;
  calculate: (dimensions: Record<string, number>) => number;
  getExplanation: (dimensions: Record<string, number>, result: number) => string;
}

// Unit conversion factors to square meters
const UNIT_CONVERSION = {
  'mm': 0.000001,
  'cm': 0.0001,
  'dm': 0.01,
  'm': 1,
  'km': 1000000,
  'in': 0.00064516,
  'ft': 0.092903
};

// Unit display names
export const UNIT_NAMES = {
  'mm': 'mm²',
  'cm': 'cm²',
  'dm': 'dm²',
  'm': 'm²',
  'km': 'km²',
  'in': 'in²',
  'ft': 'ft²'
};

// Shape definitions with formulas and calculation functions
export const SHAPES: Record<ShapeType, ShapeInfo> = {
  'square': {
    name: 'Kvadrat',
    icon: 'square',
    inputs: [
      { name: 'side', label: 'Stranica', symbol: 'a' }
    ],
    formula: 'A = a²',
    calculate: (dimensions) => {
      const side = dimensions.side || 0;
      return side * side;
    },
    getExplanation: (dimensions, result) => {
      const side = dimensions.side || 0;
      return `Površina kvadrata sa stranicom a = ${side} iznosi A = a² = ${side}² = ${result}`;
    }
  },
  'rectangle': {
    name: 'Pravokutnik',
    icon: 'rectangle',
    inputs: [
      { name: 'length', label: 'Duljina', symbol: 'a' },
      { name: 'width', label: 'Širina', symbol: 'b' }
    ],
    formula: 'A = a × b',
    calculate: (dimensions) => {
      const length = dimensions.length || 0;
      const width = dimensions.width || 0;
      return length * width;
    },
    getExplanation: (dimensions, result) => {
      const length = dimensions.length || 0;
      const width = dimensions.width || 0;
      return `Površina pravokutnika s duljinom a = ${length} i širinom b = ${width} iznosi A = a × b = ${length} × ${width} = ${result}`;
    }
  },
  'triangle': {
    name: 'Trokut',
    icon: 'triangle',
    inputs: [
      { name: 'base', label: 'Osnovica', symbol: 'b' },
      { name: 'height', label: 'Visina', symbol: 'h' }
    ],
    formula: 'A = (b × h) / 2',
    calculate: (dimensions) => {
      const base = dimensions.base || 0;
      const height = dimensions.height || 0;
      return (base * height) / 2;
    },
    getExplanation: (dimensions, result) => {
      const base = dimensions.base || 0;
      const height = dimensions.height || 0;
      return `Površina trokuta s osnovicom b = ${base} i visinom h = ${height} iznosi A = (b × h) / 2 = (${base} × ${height}) / 2 = ${result}`;
    }
  },
  'circle': {
    name: 'Krug',
    icon: 'circle',
    inputs: [
      { name: 'radius', label: 'Polumjer', symbol: 'r' }
    ],
    formula: 'A = π × r²',
    calculate: (dimensions) => {
      const radius = dimensions.radius || 0;
      return Math.PI * radius * radius;
    },
    getExplanation: (dimensions, result) => {
      const radius = dimensions.radius || 0;
      return `Površina kruga s polumjerom r = ${radius} iznosi A = π × r² = π × ${radius}² = ${result.toFixed(4)}`;
    }
  },
  'trapezoid': {
    name: 'Trapez',
    icon: 'trapezoid',
    inputs: [
      { name: 'base1', label: 'Osnovica 1', symbol: 'a' },
      { name: 'base2', label: 'Osnovica 2', symbol: 'c' },
      { name: 'height', label: 'Visina', symbol: 'h' }
    ],
    formula: 'A = ((a + c) × h) / 2',
    calculate: (dimensions) => {
      const base1 = dimensions.base1 || 0;
      const base2 = dimensions.base2 || 0;
      const height = dimensions.height || 0;
      return ((base1 + base2) * height) / 2;
    },
    getExplanation: (dimensions, result) => {
      const base1 = dimensions.base1 || 0;
      const base2 = dimensions.base2 || 0;
      const height = dimensions.height || 0;
      return `Površina trapeza s osnovicama a = ${base1}, c = ${base2} i visinom h = ${height} iznosi A = ((a + c) × h) / 2 = ((${base1} + ${base2}) × ${height}) / 2 = ${result}`;
    }
  },
  'parallelogram': {
    name: 'Paralelogram',
    icon: 'parallelogram',
    inputs: [
      { name: 'base', label: 'Osnovica', symbol: 'b' },
      { name: 'height', label: 'Visina', symbol: 'h' }
    ],
    formula: 'A = b × h',
    calculate: (dimensions) => {
      const base = dimensions.base || 0;
      const height = dimensions.height || 0;
      return base * height;
    },
    getExplanation: (dimensions, result) => {
      const base = dimensions.base || 0;
      const height = dimensions.height || 0;
      return `Površina paralelograma s osnovicom b = ${base} i visinom h = ${height} iznosi A = b × h = ${base} × ${height} = ${result}`;
    }
  },
  'polygon': {
    name: 'Pravilni Poligon',
    icon: 'polygon',
    inputs: [
      { name: 'sides', label: 'Broj stranica', symbol: 'n' },
      { name: 'sideLength', label: 'Duljina stranice', symbol: 's' }
    ],
    formula: 'A = (n × s² × cot(π/n)) / 4',
    calculate: (dimensions) => {
      const sides = dimensions.sides || 0;
      const sideLength = dimensions.sideLength || 0;
      // Formula for regular polygon: A = (n × s² × cot(π/n)) / 4
      return (sides * Math.pow(sideLength, 2) * (1 / Math.tan(Math.PI / sides))) / 4;
    },
    getExplanation: (dimensions, result) => {
      const sides = dimensions.sides || 0;
      const sideLength = dimensions.sideLength || 0;
      return `Površina pravilnog poligona s ${sides} stranica duljine s = ${sideLength} iznosi A = (n × s² × cot(π/n)) / 4 = ${result.toFixed(4)}`;
    }
  },
  'ellipse': {
    name: 'Elipsa',
    icon: 'ellipse',
    inputs: [
      { name: 'semiMajor', label: 'Poluos a', symbol: 'a' },
      { name: 'semiMinor', label: 'Poluos b', symbol: 'b' }
    ],
    formula: 'A = π × a × b',
    calculate: (dimensions) => {
      const semiMajor = dimensions.semiMajor || 0;
      const semiMinor = dimensions.semiMinor || 0;
      return Math.PI * semiMajor * semiMinor;
    },
    getExplanation: (dimensions, result) => {
      const semiMajor = dimensions.semiMajor || 0;
      const semiMinor = dimensions.semiMinor || 0;
      return `Površina elipse s poluosima a = ${semiMajor} i b = ${semiMinor} iznosi A = π × a × b = π × ${semiMajor} × ${semiMinor} = ${result.toFixed(4)}`;
    }
  }
};

// Main calculation function
export function calculateArea(input: AreaInput): AreaResult {
  const { shapeType, dimensions, unit } = input;
  const shape = SHAPES[shapeType];

  if (!shape) {
    throw new Error(`Nepoznati oblik: ${shapeType}`);
  }

  // Calculate area in the input unit
  const area = shape.calculate(dimensions);

  // Get the formula and explanation
  const formula = shape.formula;
  const explanation = shape.getExplanation(dimensions, area);

  return {
    area,
    formula,
    explanation
  };
}

// Format area with appropriate unit
export function formatArea(area: number, unit: UnitType): string {
  const unitSymbol = UNIT_NAMES[unit];
  return `${area.toLocaleString('hr-HR', { maximumFractionDigits: 4 })} ${unitSymbol}`;
}
