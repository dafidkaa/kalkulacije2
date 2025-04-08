import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { WebsiteSchema, OrganizationSchema } from '../components/SchemaMarkup';
import { Preload } from '../components/Preload';
import { LazyLoad } from '../components/LazyLoad';
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
    color: 'text-teal-500'
  },
  {
    id: 'temperature',
    path: '/pretvarac-temperature',
    title: 'Pretvarač Temperature',
    description: 'Pretvorite temperature između Celzija, Fahrenheita i Kelvina.',
    icon: Thermometer,
    color: 'text-pink-500'
  },
  {
    id: 'date',
    path: '/kalkulator-datuma',
    title: 'Kalkulator Datuma',
    description: 'Izračunajte razliku između datuma ili dodajte/oduzmite dane.',
    icon: Calendar,
    color: 'text-purple-500'
  }
];

export function HomePage() {
  // Preload important pages
  const preloadModules = [
    () => import('./SalaryCalculator').then(module => ({ default: module.SalaryCalculator })),
    () => import('./AreaCalculator').then(module => ({ default: module.AreaCalculator })),
    () => import('./TemperatureConverter').then(module => ({ default: module.TemperatureConverter })),
    () => import('./DateCalculator').then(module => ({ default: module.DateCalculator }))
  ];

  return (
    <div className="min-h-screen">
      <Preload modules={preloadModules} />
      <Helmet>
        <title>Online Kalkulatori | Besplatni Kalkulatori za Svakodnevne Potrebe</title>
        <meta
          name="description"
          content="Besplatni online kalkulatori za svakodnevne potrebe. Izračunajte plaću, BMI, postotke, vrijeme, površinu, pretvorite temperaturu, datume i mjerne jedinice brzo i jednostavno."
        />
        <meta
          name="keywords"
          content="online kalkulatori, besplatni kalkulatori, kalkulator plaće, BMI kalkulator, kalkulator postotaka, kalkulator vremena, kalkulator površine, pretvarač temperature, kalkulator datuma, pretvarač jedinica, izračun neto plaće, izračun bruto plaće, pretvaranje mjernih jedinica, izračun površine, pretvaranje temperature, izračun datuma"
        />
        <link rel="canonical" href="https://kalkulacije.com/" />
      </Helmet>

      <WebsiteSchema
        name="Kalkulacije.com - Online Kalkulatori"
        url="https://kalkulacije.com"
        description="Besplatni online kalkulatori za svakodnevne potrebe. Izračunajte plaću, BMI, postotke, vrijeme, površinu, pretvorite temperaturu, datume i mjerne jedinice."
      />

      <OrganizationSchema
        name="Kalkulacije.com"
        url="https://kalkulacije.com"
        description="Besplatni online kalkulatori i pretvarači za svakodnevne potrebe."
      />
      {/* Hero Section */}
      <section className="pt-16 pb-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Besplatni Online Kalkulatori
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jednostavni i precizni kalkulatori za svakodnevne potrebe.
            Izračunajte plaću, BMI, postotke, vrijeme, površinu, pretvorite temperaturu, datume i mjerne jedinice brzo i jednostavno.
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
                Točni izračuni za sve vrste konverzija i kalkulacija. Naši kalkulatori daju precizne rezultate za izračun plaće, BMI, postotaka i drugih vrijednosti.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <Clock className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ušteda Vremena</h3>
              <p className="text-gray-600">
                Brzi i jednostavni izračuni bez kompliciranih formula. Pretvorite temperature, datume i mjerne jedinice u samo nekoliko sekundi.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center">
                <Scale className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Svestranost</h3>
              <p className="text-gray-600">
                Raznovrsni kalkulatori za sve vaše potrebe - od financijskih izračuna plaće do pretvaranja površine, temperature i datuma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Calculators Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Najpopularniji Kalkulatori
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Otkrijte naše najpopularnije besplatne online kalkulatore za svakodnevnu upotrebu
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <LazyLoad height="200px">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Kalkulator Plaće</h3>
                <p className="text-gray-600 mb-4">
                  Precizno izračunajte neto plaću iz bruto iznosa ili obrnuto. Uključuje sve poreze, prireze i doprinose prema hrvatskim zakonima.
                </p>
                <Link to="/kalkulator-place" className="text-blue-600 hover:text-blue-800 font-medium">
                  Izračunaj plaću &rarr;
                </Link>
              </div>
            </LazyLoad>

            <LazyLoad height="200px">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Kalkulator Površine</h3>
                <p className="text-gray-600 mb-4">
                  Izračunajte površinu različitih geometrijskih oblika, zemljišta, prostorija i krovova. Uključuje pretvarač jedinica površine.
                </p>
                <Link to="/kalkulator-povrsine" className="text-teal-600 hover:text-teal-800 font-medium">
                  Izračunaj površinu &rarr;
                </Link>
              </div>
            </LazyLoad>

            <LazyLoad height="200px">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Pretvarač Temperature</h3>
                <p className="text-gray-600 mb-4">
                  Pretvorite temperature između Celzija, Fahrenheita, Kelvina i drugih jedinica. Uključuje referentne točke i praktične alate.
                </p>
                <Link to="/pretvarac-temperature" className="text-pink-600 hover:text-pink-800 font-medium">
                  Pretvori temperaturu &rarr;
                </Link>
              </div>
            </LazyLoad>

            <LazyLoad height="200px">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Kalkulator Datuma</h3>
                <p className="text-gray-600 mb-4">
                  Izračunajte razliku između datuma, dodajte ili oduzmite dane, izračunajte radne dane i stvorite odbrojavanja do važnih događaja.
                </p>
                <Link to="/kalkulator-datuma" className="text-purple-600 hover:text-purple-800 font-medium">
                  Izračunaj datume &rarr;
                </Link>
              </div>
            </LazyLoad>
          </div>
        </div>
      </section>
    </div>
  );
}