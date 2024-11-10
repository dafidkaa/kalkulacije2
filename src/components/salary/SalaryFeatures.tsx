import React from 'react';
import { Calculator, Clock, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Calculator,
    title: 'Izračun Neto Plaće',
    description: 'Precizno izračunajte svoju neto plaću iz bruto iznosa uz sve važeće porezne stope i doprinose.'
  },
  {
    icon: Clock,
    title: 'Brzo i Jednostavno',
    description: 'Bez kompliciranih formula - jednostavno unesite iznos i dobijte trenutni izračun svoje plaće.'
  },
  {
    icon: Shield,
    title: 'Sigurnost Podataka',
    description: 'Vaši podaci ostaju privatni. Svi izračuni se vrše lokalno u vašem pregledniku.'
  },
  {
    icon: Sparkles,
    title: 'Ažurni Podaci',
    description: 'Uvijek ažurni izračuni prema najnovijim hrvatskim poreznim stopama i propisima.'
  }
];

export function SalaryFeatures() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Zašto Koristiti Naš Kalkulator Plaće?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
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