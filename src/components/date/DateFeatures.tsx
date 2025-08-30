import React from 'react';

type TabType = 'difference' | 'addSubtract' | 'workingDays' | 'age' | 'countdown';

interface DateFeaturesProps {
  onFeatureClick?: (tabId: TabType) => void;
}

// Using SVG directly to avoid icon issues
const FeatureIcons = {
  difference: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 14v1" />
      <path d="M9 19v2" />
      <path d="M9 3v2" />
      <path d="M9 9v1" />
      <path d="M15 14v1" />
      <path d="M15 19v2" />
      <path d="M15 3v2" />
      <path d="M15 9v1" />
    </svg>
  ),
  addSubtract: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M15 3v18" />
      <path d="M9 15l3-3 3 3" />
      <path d="M10 9h4" />
    </svg>
  ),
  workingDays: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 3v3" />
      <path d="M16 3v3" />
      <path d="M3 9h18" />
      <path d="M9 14h6" />
      <path d="M9 18h6" />
    </svg>
  ),
  age: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  countdown: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  format: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
      <path d="M14 2v6h6" />
      <path d="m9 18 3-3-3-3" />
      <path d="m5 12-3 3 3 3" />
    </svg>
  ),
  holidays: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="m8 14 2 2 4-4" />
    </svg>
  ),
  zodiac: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
};

export function DateFeatures({ onFeatureClick }: DateFeaturesProps) {
  const features = [
    {
      icon: FeatureIcons.difference,
      title: 'Razlika Između Datuma',
      description: 'Izračunajte točnu razliku između dva datuma u godinama, mjesecima, tjednima i danima.',
      tabId: 'difference' as TabType
    },
    {
      icon: FeatureIcons.addSubtract,
      title: 'Dodavanje i Oduzimanje',
      description: 'Dodajte ili oduzmite dane, tjedne, mjesece ili godine od određenog datuma.',
      tabId: 'addSubtract' as TabType
    },
    {
      icon: FeatureIcons.workingDays,
      title: 'Kalkulator Radnih Dana',
      description: 'Izračunajte radne dane između dva datuma, isključujući vikende i praznike.',
      tabId: 'workingDays' as TabType
    },
    {
      icon: FeatureIcons.age,
      title: 'Kalkulator Starosti',
      description: 'Izračunajte točnu starost u godinama, mjesecima i danima, s dodatnim informacijama o zodijaku.',
      tabId: 'age' as TabType
    },
    {
      icon: FeatureIcons.countdown,
      title: 'Odbrojavanje do Događaja',
      description: 'Stvorite odbrojavanje do važnih datuma i događaja, s mogućnošću praćenja više događaja.',
      tabId: 'countdown' as TabType
    },
    {
      icon: FeatureIcons.format,
      title: 'Različiti Formati Datuma',
      description: 'Prikaz datuma u različitim formatima, uključujući hrvatski i međunarodni format.'
    },
    {
      icon: FeatureIcons.holidays,
      title: 'Hrvatski Praznici',
      description: 'Uključuje sve hrvatske praznike za precizne izračune radnih dana i planiranje događaja.'
    },
    {
      icon: FeatureIcons.zodiac,
      title: 'Horoskopski Znakovi',
      description: 'Saznajte horoskopski znak i kineski zodijak na temelju datuma rođenja.'
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
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Značajke Kalkulatora Datuma
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Naš sveobuhvatni kalkulator datuma nudi brojne značajke za precizno izračunavanje i upravljanje datumima u različitim kontekstima.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-sm transition-all duration-300 ${
                feature.tabId
                  ? 'cursor-pointer hover:shadow-md hover:scale-105 hover:bg-purple-50'
                  : 'hover:shadow-md'
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
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
              {feature.tabId && (
                <div className="mt-3 text-sm text-purple-600 font-medium">
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
