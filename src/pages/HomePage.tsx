import React from 'react';
import { Link } from 'react-router-dom';
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

const calculators = [
  {
    id: 'salary',
    path: '/kalkulator-place',
    title: 'Kalkulator Plaće',
    description: 'Izračunajte neto plaću iz bruto iznosa ili obrnuto, uz sve poreze i doprinose.',
    icon: Calculator,
    color: 'text-blue-500'
  },
  {
    id: 'unit-converter',
    path: '/pretvaranje-jedinica',
    title: 'Pretvarač Jedinica',
    description: 'Pretvorite mjerne jedinice za duljinu, masu, volumen i više.',
    icon: Scale,
    color: 'text-green-500'
  },
  {
    id: 'bmi',
    path: '/kalkulator-bmi',
    title: 'BMI Kalkulator',
    description: 'Izračunajte indeks tjelesne mase i saznajte idealnu težinu.',
    icon: Heart,
    color: 'text-[#f17273]'
  },
  {
    id: 'percentage',
    path: '/kalkulator-postotaka',
    title: 'Kalkulator Postotaka',
    description: 'Izračunajte postotke, povećanja, smanjenja i omjere.',
    icon: Percent,
    color: 'text-orange-500'
  },
  {
    id: 'time',
    path: '/kalkulator-vremena',
    title: 'Kalkulator Vremena',
    description: 'Zbrajajte i oduzimajte vrijeme, računajte razlike između vremenskih zona.',
    icon: Clock,
    color: 'text-indigo-500'
  },
  {
    id: 'area',
    path: '/kalkulator-povrsine',
    title: 'Kalkulator Površine',
    description: 'Izračunajte površinu različitih geometrijskih oblika.',
    icon: Ruler,
    color: 'text-teal-500',
    comingSoon: true
  },
  {
    id: 'temperature',
    path: '/pretvaranje-temperature',
    title: 'Pretvarač Temperature',
    description: 'Pretvorite temperature između Celzija, Fahrenheita i Kelvina.',
    icon: Thermometer,
    color: 'text-pink-500',
    comingSoon: true
  },
  {
    id: 'date',
    path: '/kalkulator-datuma',
    title: 'Kalkulator Datuma',
    description: 'Izračunajte razliku između datuma ili dodajte/oduzmite dane.',
    icon: Calendar,
    color: 'text-purple-500',
    comingSoon: true
  }
];

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Online Kalkulatori
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jednostavni i precizni kalkulatori za svakodnevne potrebe.
            Pretvarajte jedinice, računajte vrijeme, površinu i više.
          </p>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {calculators.map((calc) => (
              <div
                key={calc.id}
                className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl
                          ${calc.comingSoon ? 'opacity-75' : 'hover:-translate-y-1'}`}
              >
                {calc.comingSoon ? (
                  <div className="bg-white p-6">
                    <div className="flex items-start justify-between">
                      <calc.icon className={`w-10 h-10 ${calc.color} mb-4`} />
                      <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full">
                        Uskoro
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {calc.title}
                    </h2>
                    <p className="text-sm text-gray-600">{calc.description}</p>
                  </div>
                ) : (
                  <Link
                    to={calc.path}
                    className="block bg-white p-6 h-full transition-colors hover:bg-gray-50"
                  >
                    <calc.icon className={`w-10 h-10 ${calc.color} mb-4`} />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {calc.title}
                    </h2>
                    <p className="text-sm text-gray-600">{calc.description}</p>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Zašto Koristiti Naše Kalkulatore?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Preciznost</h3>
              <p className="text-gray-600">
                Točni izračuni za sve vrste konverzija i kalkulacija
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <Clock className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ušteda Vremena</h3>
              <p className="text-gray-600">
                Brzi i jednostavni izračuni bez kompliciranih formula
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center">
                <Scale className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Svestranost</h3>
              <p className="text-gray-600">
                Raznovrsni kalkulatori za sve vaše potrebe
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}