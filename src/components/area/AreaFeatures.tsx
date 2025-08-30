import React from 'react';
import {
  Square,
  Circle,
  Triangle,
  Hexagon,
  Ruler,
  Calculator,
  Maximize2,
  Layers,
  MoveHorizontal,
  Globe,
  Home,
  MapPin,
  Building
} from 'lucide-react';

type TabType = 'shapes' | 'converter' | 'land' | 'room' | 'roof';

interface AreaFeaturesProps {
  onFeatureClick?: (tabId: TabType) => void;
}

export function AreaFeatures({ onFeatureClick }: AreaFeaturesProps) {
  const features = [
    {
      icon: <Square className="w-6 h-6 text-teal-500" />,
      title: 'Kvadrat i Pravokutnik',
      description: 'Izračunajte površinu kvadrata i pravokutnika jednostavnim unosom dimenzija.',
      tabId: 'shapes' as TabType
    },
    {
      icon: <Circle className="w-6 h-6 text-teal-500" />,
      title: 'Krug i Elipsa',
      description: 'Precizno izračunajte površinu kruga i elipse koristeći polumjer ili poluosi.',
      tabId: 'shapes' as TabType
    },
    {
      icon: <Triangle className="w-6 h-6 text-teal-500" />,
      title: 'Trokut i Trapez',
      description: 'Izračunajte površinu trokuta i trapeza pomoću osnovice i visine.',
      tabId: 'shapes' as TabType
    },
    {
      icon: <Hexagon className="w-6 h-6 text-teal-500" />,
      title: 'Pravilni Poligoni',
      description: 'Izračunajte površinu pravilnih poligona s bilo kojim brojem stranica.',
      tabId: 'shapes' as TabType
    },
    {
      icon: <MoveHorizontal className="w-6 h-6 text-teal-500" />,
      title: 'Pretvaranje Jedinica',
      description: 'Pretvorite između metričkih, imperijalnih i drugih jedinica površine.',
      tabId: 'converter' as TabType
    },
    {
      icon: <Globe className="w-6 h-6 text-teal-500" />,
      title: 'Međunarodne Jedinice',
      description: 'Podrška za jedinice iz različitih dijelova svijeta poput akera, hektara, raija i više.',
      tabId: 'converter' as TabType
    },
    {
      icon: <MapPin className="w-6 h-6 text-teal-500" />,
      title: 'Zemljište i Parcele',
      description: 'Izračunajte površinu zemljišta i parcela pomoću koordinata točaka.',
      tabId: 'land' as TabType
    },
    {
      icon: <Home className="w-6 h-6 text-teal-500" />,
      title: 'Prostorije i Stanovi',
      description: 'Izračunajte površinu prostorija, podova i zidova za stambene prostore.',
      tabId: 'room' as TabType
    },
    {
      icon: <Building className="w-6 h-6 text-teal-500" />,
      title: 'Krovovi i Materijali',
      description: 'Izračunajte površinu krova i procijenite potrebne materijale za različite tipove krovova.',
      tabId: 'roof' as TabType
    },
    {
      icon: <Calculator className="w-6 h-6 text-teal-500" />,
      title: 'Precizni Izračuni',
      description: 'Dobijte precizne rezultate s detaljnim objašnjenjima i formulama.'
    },
    {
      icon: <Maximize2 className="w-6 h-6 text-teal-500" />,
      title: 'Vizualni Prikaz',
      description: 'Vizualni prikaz oblika za lakše razumijevanje izračuna.'
    },
    {
      icon: <Layers className="w-6 h-6 text-teal-500" />,
      title: 'Jednostavno Sučelje',
      description: 'Intuitivno sučelje s karticama za brze i jednostavne izračune.'
    }
  ];

  const handleFeatureClick = (tabId?: TabType) => {
    if (tabId && onFeatureClick) {
      onFeatureClick(tabId);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Značajke Kalkulatora Površine
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-200 ${
                feature.tabId
                  ? 'cursor-pointer hover:shadow-md hover:scale-105 hover:bg-teal-50'
                  : ''
              }`}
              onClick={() => handleFeatureClick(feature.tabId)}
              role={feature.tabId ? 'button' : undefined}
              tabIndex={feature.tabId ? 0 : undefined}
              onKeyDown={(e) => {
                if (feature.tabId && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleFeatureClick(feature.tabId);
                }
              }}
              aria-label={feature.tabId ? `Idite na ${feature.title} kalkulator` : undefined}
            >
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
              {feature.tabId && (
                <div className="mt-3 text-sm text-teal-600 font-medium">
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
