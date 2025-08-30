import React from 'react';
import { Clock, Calculator, ArrowRightLeft, Layout } from 'lucide-react';

type CalculationType = 'arithmetic' | 'interval' | 'conversion';

interface TimeFeaturesProps {
  onFeatureClick?: (calculationType: CalculationType) => void;
}

const features = [
  {
    icon: Calculator,
    title: 'Zbrajanje i oduzimanje',
    description: 'Jednostavno zbrajajte ili oduzimajte sate, minute i sekunde s više vremenskih unosa.',
    calculationType: 'arithmetic' as CalculationType
  },
  {
    icon: Clock,
    title: 'Vremenski intervali',
    description: 'Izračunajte točno vrijeme između dva datuma, uz detaljan prikaz u svim vremenskim jedinicama.',
    calculationType: 'interval' as CalculationType
  },
  {
    icon: ArrowRightLeft,
    title: 'Pretvaranje vremena',
    description: 'Brzo pretvarajte između sekundi, minuta, sati, dana i drugih vremenskih jedinica.',
    calculationType: 'conversion' as CalculationType
  },
  {
    icon: Layout,
    title: 'Detaljna razrada',
    description: 'Pregledajte rezultate s detaljnom razradom u različitim vremenskim jedinicama.'
  }
];

export function TimeFeatures({ onFeatureClick }: TimeFeaturesProps) {
  const handleFeatureClick = (calculationType?: CalculationType) => {
    if (calculationType && onFeatureClick) {
      onFeatureClick(calculationType);
    }
  };
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Zašto koristiti naš kalkulator vremena?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-lg transition-all duration-200 ${
                feature.calculationType
                  ? 'cursor-pointer hover:shadow-xl hover:scale-105 hover:bg-indigo-50'
                  : ''
              }`}
              onClick={() => handleFeatureClick(feature.calculationType)}
              role={feature.calculationType ? 'button' : undefined}
              tabIndex={feature.calculationType ? 0 : undefined}
              onKeyDown={(e) => {
                if (feature.calculationType && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleFeatureClick(feature.calculationType);
                }
              }}
              aria-label={feature.calculationType ? `Idite na ${feature.title} kalkulator` : undefined}
            >
              <feature.icon className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
              {feature.calculationType && (
                <div className="mt-3 text-sm text-indigo-600 font-medium">
                  Kliknite za korištenje →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}