import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema, HowToSchema, FAQSchema, BreadcrumbSchema } from '../components/SchemaMarkup';
import { AreaTabs } from '../components/area/AreaTabs';
import { AreaFeatures } from '../components/area/AreaFeatures';
import { AreaBenefits } from '../components/area/AreaBenefits';
import { AreaDetails } from '../components/area/AreaDetails';
import { AreaFAQ } from '../components/area/AreaFAQ';
import { QuickAnswer, ComparisonTable, StatisticCard } from '../components/FeaturedSnippets';
import { AISummary, UseCaseExample } from '../components/GEOComponents';
import { Square, Map, Home } from 'lucide-react';

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

      {/* AI Summary */}
      <AISummary
        summary="Kalkulator površine za brzi izračun kvadrature stana, površine zemljišta ili geometrijskih likova (kvadrat, pravokutnik, trokut). Pretvorite m2 u hektare ili rali."
        keywords={['kalkulator površine', 'izračun kvadrature', 'površina trokuta formula', 'površina kruga', 'hektar u m2']}
        useCases={[
          'Izračun kvadrature stana prije krečenja',
          'Provjera površine zemljišne parcele',
          'Pomoć u učenju geometrije za školu'
        ]}
        statistics={[
          { label: '1 Hektar (ha)', value: '10.000 m²', source: 'SI Sustav' },
          { label: '1 Ral (jutro)', value: '5.755 m²', source: 'Stare mjere' },
          { label: 'Površina nogometnog terena', value: '~7.140 m²', source: 'FIFA Standard' }
        ]}
      />

      {/* Quick Answer */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <QuickAnswer
            question="Kako se računa kvadratura sobe?"
            answer="Jednostavno pomnožite duljinu i širinu sobe. Ako soba nije pravokutna, podijelite je na manje pravokutnike i zbrojite njihove površine."
            highlight="Formula: Duljina x Širina = m²"
            details="Ne zaboravite oduzeti površine koje nećete oblagati (npr. prozori, vrata) ako računate za pločice ili bojanje."
          />

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <StatisticCard
              value="P = a²"
              label="Površina Kvadrata"
              source="Matematika"
              color="blue"
            />
            <StatisticCard
              value="P = a*b"
              label="Površina Pravokutnika"
              source="Matematika"
              color="green"
            />
            <StatisticCard
              value="P = r²π"
              label="Površina Kruga"
              source="Matematika"
              color="purple"
            />
          </div>

          <ComparisonTable
            title="Jedinice za Površinu Zemljišta"
            caption="Usporedba modernih i starih mjernih jedinica"
            headers={['Jedinica', 'Vrijednost (m²)', 'Opis']}
            rows={[
              ['Četvorni metar (m²)', '1 m²', 'Osnovna jedinica'],
              ['Hektar (ha)', '10.000 m²', '100 x 100 metara'],
              ['Ral (Jutro)', '5.755 m²', 'Stara hrvatska mjera'],
              ['Dulum', '1.000 m²', 'Regionalna mjera'],
              ['Aker (Acre)', '4.047 m²', 'Anglosaksonska mjera']
            ]}
            highlightColumn={1}
          />
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Primjeri Korištenja</h2>

          <UseCaseExample
            title="Primjer 1: Bojanje Zidova"
            scenario="Soba je 4x5 metara, visine 2.5m. Treba izračunati površinu zidova."
            input="Dimenzije: 4m, 5m, 2.5m"
            output="Površina zidova: 45 m²"
            explanation="Opseg (18m) puta visina (2.5m) daje 45 m². Oduzmite prozore za točnu potrošnju boje."
            icon={<Home className="w-6 h-6 text-blue-600" />}
          />

          <UseCaseExample
            title="Primjer 2: Površina Zemljišta"
            scenario="Parcela je pravokutnog oblika, dimenzija 30x40 metara."
            input="30m x 40m"
            output="1.200 m² (0.12 hektara)"
            explanation="Množenjem stranica dobivamo ukupnu površinu u m²."
            icon={<Map className="w-6 h-6 text-green-600" />}
          />

          <UseCaseExample
            title="Primjer 3: Opločavanje Terase"
            scenario="Terasa je kvadratna, stranice 6 metara."
            input="Stranica: 6m"
            output="36 m²"
            explanation="Za terasu od 36 m² trebat će vam oko 38 m² pločica (uračunajte 5-10% otpada)."
            icon={<Square className="w-6 h-6 text-purple-600" />}
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
