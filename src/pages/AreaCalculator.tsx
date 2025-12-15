import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema, HowToSchema, FAQSchema, BreadcrumbSchema } from '../components/SchemaMarkup';
import { AreaTabs } from '../components/area/AreaTabs';
import { AreaFeatures } from '../components/area/AreaFeatures';
import { AreaBenefits } from '../components/area/AreaBenefits';
import { AreaDetails } from '../components/area/AreaDetails';
import { AreaFAQ } from '../components/area/AreaFAQ';

type TabType = 'shapes' | 'converter' | 'land' | 'room' | 'roof';

export function AreaCalculator() {
  const [activeTab, setActiveTab] = useState<TabType>('shapes');
  const calculatorRef = useRef<HTMLElement>(null);

  const handleFeatureClick = (tabId: TabType) => {
    setActiveTab(tabId);
    // Smooth scroll to calculator section
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // FAQ data for schema
  const faqData = [
    {
      question: 'Kako izračunati površinu kvadrata?',
      answer: 'Površina kvadrata izračunava se množenjem duljine stranice sa samom sobom (stranica na kvadrat). Formula je: P = a², gdje je a duljina stranice kvadrata.'
    },
    {
      question: 'Kako izračunati površinu pravokutnika?',
      answer: 'Površina pravokutnika izračunava se množenjem duljine i širine. Formula je: P = a × b, gdje je a duljina, a b širina pravokutnika.'
    },
    {
      question: 'Kako izračunati površinu trokuta?',
      answer: 'Površina trokuta izračunava se množenjem duljine osnovice s visinom i dijeljenjem rezultata s 2. Formula je: P = (a × h) / 2, gdje je a duljina osnovice, a h visina trokuta.'
    }
  ];

  // How-to steps for schema
  const howToSteps = [
    {
      name: 'Odaberite vrstu kalkulatora',
      text: 'Odaberite željenu funkciju: geometrijski oblici, pretvarač jedinica, zemljište, prostorije ili krov.'
    },
    {
      name: 'Odaberite oblik ili unesite dimenzije',
      text: 'Ovisno o odabranoj funkciji, odaberite geometrijski oblik ili unesite dimenzije prostora.'
    },
    {
      name: 'Unesite potrebne vrijednosti',
      text: 'Unesite tražene dimenzije (duljina, širina, visina, polumjer, itd.) u odgovarajuća polja.'
    },
    {
      name: 'Pregledajte rezultate',
      text: 'Pregledajte izračunatu površinu i dodatne informacije poput formule i pretvorbe u druge mjerne jedinice.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Kalkulator Površine | Izračun Površine Oblika, Zemljišta i Prostorija</title>
        <meta
          name="description"
          content="Besplatni online kalkulator površine na hrvatskom jeziku. Izračunajte površinu geometrijskih oblika, zemljišta, prostorija, krovova i pretvorite jedinice površine. Precizni izračuni s detaljnim formulama i objašnjenjima."
        />
        <meta
          name="keywords"
          content="kalkulator površine, izračun površine, površina geometrijskih oblika, pretvaranje jedinica površine, površina zemljišta, površina prostorija, površina krova, kvadratni metri, kvadratne stope, hektari, akeri, površina parcele, površina stana, površina kuće, izračun kvadrature"
        />
        <link rel="canonical" href="https://kalkulacije.com/kalkulator-povrsine" />
      </Helmet>

      <ToolSchema
        name="Kalkulator Površine"
        description="Sveobuhvatni kalkulator za izračun površine geometrijskih oblika, zemljišta, prostorija, krovova i pretvaranje jedinica površine."
        url="https://kalkulacije.com/kalkulator-povrsine"
        keywords={[
          'kalkulator površine', 'izračun površine', 'površina geometrijskih oblika', 'površina zemljišta',
          'površina prostorija', 'površina krova', 'pretvaranje jedinica površine'
        ]}
      />

      <HowToSchema
        name="Kako koristiti kalkulator površine"
        description="Jednostavne upute za korištenje kalkulatora površine za izračun površine geometrijskih oblika, zemljišta, prostorija i krovova."
        steps={howToSteps}
      />

      <FAQSchema
        questions={faqData}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Početna', url: 'https://kalkulacije.com/' },
          { name: 'Kalkulator Površine', url: 'https://kalkulacije.com/kalkulator-povrsine' }
        ]}
      />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="pt-16 pb-8 text-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-display">
            Kalkulator Površine
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            <span>
              Sveobuhvatni alat za izračun površine geometrijskih oblika, zemljišta, prostorija, krovova i pretvaranje između jedinica površine.
              Precizni izračuni s detaljnim objašnjenjima.
            </span>
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section ref={calculatorRef} className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <AreaTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kako Izračunati Površinu?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-green-600 mb-2">1.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Oblik</h3>
              <p className="text-gray-600 text-sm">Odaberite geometrijski lik (kvadrat, krug...) ili vrstu prostora.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-green-600 mb-2">2.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Dimenzije</h3>
              <p className="text-gray-600 text-sm">Unesite tražene mjere (npr. duljinu i širinu).</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-green-600 mb-2">3.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Jedinice</h3>
              <p className="text-gray-600 text-sm">Odaberite mjerne jedinice (m, cm, ft).</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-green-600 mb-2">4.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Izračun</h3>
              <p className="text-gray-600 text-sm">Dobijte površinu i opseg/volumen ako je primjenjivo.</p>
            </div>
          </div>
        </div>
      </section>

      <AreaFeatures onFeatureClick={handleFeatureClick} />
      <AreaDetails />
      <AreaBenefits />
      <AreaFAQ />
    </>
  );
}
