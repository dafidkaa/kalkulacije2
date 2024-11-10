import React from 'react';
import { Clock, Calculator, ArrowRightLeft, Layout } from 'lucide-react';

const features = [
  {
    icon: Calculator,
    title: 'Zbrajanje i oduzimanje',
    description: 'Jednostavno zbrajajte ili oduzimajte sate, minute i sekunde s više vremenskih unosa.'
  },
  {
    icon: Clock,
    title: 'Vremenski intervali',
    description: 'Izračunajte točno vrijeme između dva datuma, uz detaljan prikaz u svim vremenskim jedinicama.'
  },
  {
    icon: ArrowRightLeft,
    title: 'Pretvaranje vremena',
    description: 'Brzo pretvarajte između sekundi, minuta, sati, dana i drugih vremenskih jedinica.'
  },
  {
    icon: Layout,
    title: 'Detaljna razrada',
    description: 'Pregledajte rezultate s detaljnom razradom u različitim vremenskim jedinicama.'
  }
];

export function TimeFeatures() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Zašto koristiti naš kalkulator vremena?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <feature.icon className="w-10 h-10 text-indigo-600 mb-4" />
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