import React from 'react';
import { Calculator, Scale, Zap, Layout } from 'lucide-react';

const features = [
  {
    icon: Scale,
    title: 'Precizni Izračuni',
    description: 'Točan izračun BMI indeksa prema standardima Svjetske zdravstvene organizacije.'
  },
  {
    icon: Zap,
    title: 'Trenutni Rezultati',
    description: 'Dobijte rezultate odmah, uz detaljnu analizu i personalizirane preporuke.'
  },
  {
    icon: Calculator,
    title: 'Dodatne Informacije',
    description: 'Saznajte svoj dnevni unos kalorija i raspon idealne težine.'
  },
  {
    icon: Layout,
    title: 'Jednostavno Korištenje',
    description: 'Intuitivno sučelje prilagođeno svim korisnicima, bez obzira na tehničko znanje.'
  }
];

export function Features() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Zašto Koristiti Naš BMI Kalkulator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <feature.icon className="w-10 h-10 text-[#f17273] mb-4" />
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