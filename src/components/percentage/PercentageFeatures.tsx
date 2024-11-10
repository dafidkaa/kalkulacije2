import React from 'react';
import { Percent, TrendingUp, Calculator, BarChart } from 'lucide-react';

const features = [
  {
    icon: Calculator,
    title: 'Višestruki Izračuni',
    description: 'Izračunajte osnovni postotak, povećanja, smanjenja i omjere između brojeva.'
  },
  {
    icon: TrendingUp,
    title: 'Trenutni Rezultati',
    description: 'Dobijte rezultate u realnom vremenu dok unosite brojeve.'
  },
  {
    icon: BarChart,
    title: 'Jasni Prikazi',
    description: 'Pregledni i razumljivi prikazi rezultata s objašnjenjima.'
  },
  {
    icon: Percent,
    title: 'Precizni Izračuni',
    description: 'Točni izračuni za sve vrste postotnih kalkulacija.'
  }
];

export function PercentageFeatures() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Zašto Koristiti Naš Kalkulator Postotaka?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <feature.icon className="w-10 h-10 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}