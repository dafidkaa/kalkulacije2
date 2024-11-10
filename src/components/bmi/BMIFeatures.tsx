import React from 'react';
import { Heart, Activity, Clipboard, Target } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Zdravstvena Procjena',
    description: 'Izračunajte svoj BMI i dobijte uvid u status vaše tjelesne težine.'
  },
  {
    icon: Activity,
    title: 'Personalizirani Rezultati',
    description: 'Prilagođene preporuke na temelju vaših osobnih karakteristika.'
  },
  {
    icon: Clipboard,
    title: 'Detaljne Informacije',
    description: 'Saznajte svoj dnevni unos kalorija i raspon idealne težine.'
  },
  {
    icon: Target,
    title: 'Postavljanje Ciljeva',
    description: 'Dobijte smjernice za postizanje i održavanje zdrave težine.'
  }
];

export function BMIFeatures() {
  return (
    <section className="py-16 bg-white">
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