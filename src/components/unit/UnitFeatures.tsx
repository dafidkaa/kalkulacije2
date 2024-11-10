import React from 'react';
import { Scale, Zap, Layout, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: Scale,
    title: 'Sve Mjerne Jedinice',
    description: 'Pretvarajte između različitih mjernih jedinica za duljinu, masu, volumen i više.'
  },
  {
    icon: Zap,
    title: 'Trenutni Rezultati',
    description: 'Dobijte precizne rezultate u realnom vremenu dok unosite vrijednosti.'
  },
  {
    icon: Layout,
    title: 'Intuitivno Sučelje',
    description: 'Jednostavno i pregledno sučelje za brzo i lako pretvaranje jedinica.'
  },
  {
    icon: RefreshCw,
    title: 'Dvosmjerno Pretvaranje',
    description: 'Lako mijenjajte smjer pretvaranja jednim klikom za brže rezultate.'
  }
];

export function UnitFeatures() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Zašto Koristiti Naš Pretvarač Jedinica?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <feature.icon className="w-10 h-10 text-green-600 mb-4" />
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