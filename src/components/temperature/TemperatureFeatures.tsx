import React from 'react';

// Using SVG directly to avoid icon issues
const FeatureIcons = {
  basicConverter: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
    </svg>
  ),
  multiUnit: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  ),
  referencePoints: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  ),
  cooking: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 5h8" />
      <path d="M8 10h8" />
      <path d="M8 15h8" />
      <path d="M8 20h8" />
      <path d="M12 5v15" />
    </svg>
  ),
  weather: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ),
  scientific: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v8.5a2.5 2.5 0 0 1-5 0V2" />
      <path d="M7 2v8.5a2.5 2.5 0 0 0 5 0V2" />
      <path d="M8.5 2h-2" />
      <path d="M14 22l5-5" />
      <path d="M8.5 22H7a5 5 0 0 1-5-5V4" />
      <path d="M7 22h7" />
      <path d="M17 22h1a5 5 0 0 0 5-5V4" />
    </svg>
  ),
  formulas: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
      <path d="M14 2v6h6" />
      <path d="m9 18 3-3-3-3" />
      <path d="m5 12-3 3 3 3" />
    </svg>
  ),
  history: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  )
};

export function TemperatureFeatures() {
  const features = [
    {
      icon: FeatureIcons.basicConverter,
      title: 'Osnovni Pretvarač',
      description: 'Jednostavno pretvorite temperature između Celzija, Fahrenheita, Kelvina i drugih jedinica s detaljnim formulama i objašnjenjima.'
    },
    {
      icon: FeatureIcons.multiUnit,
      title: 'Svi Pretvarači Odjednom',
      description: 'Prikaz svih pretvorbi temperature odjednom, s vizualnom temperaturnom ljestvicom i usporedbom s referentnim točkama.'
    },
    {
      icon: FeatureIcons.referencePoints,
      title: 'Referentne Točke',
      description: 'Usporedite temperature s uobičajenim referentnim točkama poput ledišta vode, tjelesne temperature, sobne temperature i više.'
    },
    {
      icon: FeatureIcons.cooking,
      title: 'Pretvarač za Kuhanje',
      description: 'Specijalizirani pretvarač za temperature pećnice s preporukama za različita jela i objašnjenjima temperaturnih raspona.'
    },
    {
      icon: FeatureIcons.weather,
      title: 'Pretvarač za Vrijeme',
      description: 'Pretvorite vremenske temperature s preporukama za odjeću i vizualnim prikazom temperaturnog raspona.'
    },
    {
      icon: FeatureIcons.scientific,
      title: 'Znanstveni Pretvarač',
      description: 'Precizne pretvorbe temperature za znanstvene potrebe, s podrškom za znanstvenu notaciju i fizikalne karakteristike.'
    },
    {
      icon: FeatureIcons.formulas,
      title: 'Detaljne Formule',
      description: 'Prikaz formula za pretvorbu između različitih temperaturnih jedinica s korak-po-korak objašnjenjima.'
    },
    {
      icon: FeatureIcons.history,
      title: 'Povijest Temperaturnih Ljestvica',
      description: 'Saznajte o povijesti i razvoju različitih temperaturnih ljestvica, uključujući Celzijevu, Fahrenheitovu i Kelvinovu.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Značajke Pretvarača Temperature
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Naš sveobuhvatni pretvarač temperature nudi brojne značajke za precizno pretvaranje i razumijevanje temperatura u različitim kontekstima.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-4">
                {feature.icon}
              </div>
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
