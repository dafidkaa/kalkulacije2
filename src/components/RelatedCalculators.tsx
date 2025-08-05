import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calculator, 
  Scale, 
  Heart, 
  Clock, 
  Percent, 
  Ruler, 
  Thermometer, 
  Calendar 
} from 'lucide-react';

interface CalculatorItem {
  id: string;
  path: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const allCalculators: CalculatorItem[] = [
  {
    id: 'salary',
    path: '/kalkulator-place',
    title: 'Kalkulator Plaće',
    description: 'Izračunajte neto plaću iz bruto iznosa ili obrnuto',
    icon: Calculator,
    color: 'text-blue-500'
  },
  {
    id: 'unit-converter',
    path: '/pretvaranje-jedinica',
    title: 'Pretvarač Jedinica',
    description: 'Pretvorite mjerne jedinice za duljinu, masu, volumen',
    icon: Scale,
    color: 'text-green-500'
  },
  {
    id: 'bmi',
    path: '/kalkulator-bmi',
    title: 'BMI Kalkulator',
    description: 'Izračunajte indeks tjelesne mase i idealnu težinu',
    icon: Heart,
    color: 'text-red-500'
  },
  {
    id: 'percentage',
    path: '/kalkulator-postotaka',
    title: 'Kalkulator Postotaka',
    description: 'Izračunajte postotke, povećanja i smanjenja',
    icon: Percent,
    color: 'text-purple-500'
  },
  {
    id: 'time',
    path: '/kalkulator-vremena',
    title: 'Kalkulator Vremena',
    description: 'Zbrajajte i oduzimajte vrijeme, računajte intervale',
    icon: Clock,
    color: 'text-orange-500'
  },
  {
    id: 'area',
    path: '/kalkulator-povrsine',
    title: 'Kalkulator Površine',
    description: 'Izračunajte površinu geometrijskih oblika',
    icon: Ruler,
    color: 'text-indigo-500'
  },
  {
    id: 'temperature',
    path: '/pretvarac-temperature',
    title: 'Pretvarač Temperature',
    description: 'Pretvorite temperature između različitih skala',
    icon: Thermometer,
    color: 'text-yellow-500'
  },
  {
    id: 'date',
    path: '/kalkulator-datuma',
    title: 'Kalkulator Datuma',
    description: 'Računajte razlike između datuma i dodajte dane',
    icon: Calendar,
    color: 'text-teal-500'
  }
];

// Define related calculators for each page
const relatedCalculatorsMap: Record<string, string[]> = {
  '/kalkulator-place': ['percentage', 'time', 'date'],
  '/pretvaranje-jedinica': ['area', 'temperature', 'bmi'],
  '/kalkulator-bmi': ['percentage', 'unit-converter', 'area'],
  '/kalkulator-postotaka': ['salary', 'bmi', 'area'],
  '/kalkulator-vremena': ['salary', 'date', 'percentage'],
  '/kalkulator-povrsine': ['unit-converter', 'percentage', 'bmi'],
  '/pretvarac-temperature': ['unit-converter', 'bmi', 'area'],
  '/kalkulator-datuma': ['time', 'salary', 'percentage']
};

export function RelatedCalculators() {
  const location = useLocation();
  
  const relatedIds = relatedCalculatorsMap[location.pathname];
  if (!relatedIds) return null;
  
  const relatedCalculators = relatedIds
    .map(id => allCalculators.find(calc => calc.id === id))
    .filter(Boolean) as CalculatorItem[];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Povezani Kalkulatori
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {relatedCalculators.map((calculator) => {
            const IconComponent = calculator.icon;
            return (
              <Link
                key={calculator.id}
                to={calculator.path}
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors ${calculator.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-3 group-hover:text-blue-600 transition-colors">
                    {calculator.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {calculator.description}
                </p>
                <div className="mt-4 text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                  Koristi kalkulator →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
