import React from 'react';
import {
  Calculator,
  Beaker,
  MousePointer,
  Mic,
  Keyboard,
  Type,
  History,
  Zap
} from 'lucide-react';

type CalculatorMode = 'regular' | 'scientific';
type InputMode = 'buttons' | 'text';

interface CalculatorFeaturesProps {
  onFeatureClick?: (mode: CalculatorMode, input: InputMode) => void;
}

export function CalculatorFeatures({ onFeatureClick }: CalculatorFeaturesProps) {
  const features = [
    {
      icon: <Calculator className="w-6 h-6 text-blue-500" />,
      title: 'Osnovni Kalkulator - Gumbovi',
      description: 'Klasični kalkulator s gumbovima za osnovne matematičke operacije. Podržava tipkovnicu za brži unos.',
      mode: 'regular' as CalculatorMode,
      input: 'buttons' as InputMode
    },
    {
      icon: <Beaker className="w-6 h-6 text-purple-500" />,
      title: 'Znanstveni Kalkulator - Gumbovi',
      description: 'Napredni kalkulator s trigonometrijskim funkcijama, logaritmima i drugim znanstvenim operacijama.',
      mode: 'scientific' as CalculatorMode,
      input: 'buttons' as InputMode
    },
    {
      icon: <Type className="w-6 h-6 text-green-500" />,
      title: 'Osnovni Kalkulator - Tekstualni',
      description: 'Unosite matematičke izraze prirodnim jezikom. Podržava glasovni unos i AI pomoć za složene izraze.',
      mode: 'regular' as CalculatorMode,
      input: 'text' as InputMode
    },
    {
      icon: <Mic className="w-6 h-6 text-red-500" />,
      title: 'Znanstveni Kalkulator - AI Podrška',
      description: 'Napredni kalkulator s glasovnim unosom i AI inteligencijom za rješavanje složenih matematičkih problema.',
      mode: 'scientific' as CalculatorMode,
      input: 'text' as InputMode
    },
    {
      icon: <Keyboard className="w-6 h-6 text-indigo-500" />,
      title: 'Podrška za Tipkovnicu',
      description: 'Svi kalkulatori podržavaju tipkovnicu za brži unos. Koristite brojeve, operatore i prečace.'
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: 'AI Inteligencija',
      description: 'Kada lokalni parser ne može riješiti izraz, AI automatski preuzima i daje točan rezultat.'
    },
    {
      icon: <History className="w-6 h-6 text-gray-500" />,
      title: 'Povijest Izračuna',
      description: 'Automatsko spremanje povijesti izračuna s mogućnošću ponovnog korištenja prethodnih rezultata.'
    },
    {
      icon: <MousePointer className="w-6 h-6 text-orange-500" />,
      title: 'Profesionalno Sučelje',
      description: 'Moderno flat design sučelje s profesionalnim gumbovima i responzivnim layoutom za sve uređaje.'
    }
  ];

  const handleFeatureClick = (mode?: CalculatorMode, input?: InputMode) => {
    if (mode && input && onFeatureClick) {
      onFeatureClick(mode, input);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Značajke Kalkulatora
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-200 ${
                feature.mode && feature.input 
                  ? 'cursor-pointer hover:shadow-md hover:scale-105 hover:bg-blue-50' 
                  : ''
              }`}
              onClick={() => handleFeatureClick(feature.mode, feature.input)}
              role={feature.mode && feature.input ? 'button' : undefined}
              tabIndex={feature.mode && feature.input ? 0 : undefined}
              onKeyDown={(e) => {
                if (feature.mode && feature.input && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleFeatureClick(feature.mode, feature.input);
                }
              }}
              aria-label={feature.mode && feature.input ? `Idite na ${feature.title}` : undefined}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
              {feature.mode && feature.input && (
                <div className="mt-3 text-sm text-blue-600 font-medium">
                  Kliknite za korištenje →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Sve što trebate za matematičke izračune
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-gray-700">Načina korištenja</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">20+</div>
              <div className="text-gray-700">Matematičkih funkcija</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">2</div>
              <div className="text-gray-700">Jezika podržana</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
