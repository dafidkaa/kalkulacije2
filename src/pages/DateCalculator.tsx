import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema, HowToSchema, FAQSchema, BreadcrumbSchema } from '../components/SchemaMarkup';
import { DateTabs } from '../components/date/DateTabs';
import { DateFeatures } from '../components/date/DateFeatures';
import { DateDetails } from '../components/date/DateDetails';
import { DateFAQ } from '../components/date/DateFAQ';
import { QuickAnswer, ComparisonTable, StatisticCard } from '../components/FeaturedSnippets';
import { AISummary, UseCaseExample } from '../components/GEOComponents';
import { Calendar, Clock, Briefcase } from 'lucide-react';

type TabType = 'difference' | 'addSubtract' | 'workingDays' | 'age' | 'countdown';

export function DateCalculator() {
  const [activeTab, setActiveTab] = useState<TabType>('difference');
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
      question: 'Kako izračunati koliko je dana između dva datuma?',
      answer: 'Unesite početni i završni datum i kliknite "Izračunaj". Alat prikazuje ukupan broj dana, a opcionalno i radne dane.'
    },
    {
      question: 'Što su radni dani i koje se blagdane računa?',
      answer: 'Radni dani su pon–pet bez vikenda i državnih blagdana. Lista blagdana je za Hrvatsku i može se prilagoditi.'
    },
    {
      question: 'Mogu li odbrojavati do budućeg datuma?',
      answer: 'Da, unesite današnji datum kao početni i budući datum kao završni – dobit ćete preostale dane.'
    },
    {
      question: 'Kako izračunati koliko imam godina?',
      answer: 'Unesite datum rođenja i današnji datum – rezultat pokazuje punu dob u godinama, mjesecima i danima.'
    },
    {
      question: 'Kako se izračunava razlika između dva datuma?',
      answer: 'Razlika između dva datuma izračunava se oduzimanjem ranijeg datuma od kasnijeg datuma. Naš kalkulator prikazuje rezultat u godinama, mjesecima, tjednima i danima, uzimajući u obzir različite duljine mjeseci i prijestupne godine.'
    },
    {
      question: 'Kako kalkulator radnih dana isključuje vikende i praznike?',
      answer: 'Kalkulator radnih dana automatski isključuje subote i nedjelje (vikende) iz izračuna. Također sadrži ugrađeni popis hrvatskih državnih praznika koji se također isključuju iz izračuna ako je odabrana ta opcija.'
    }
  ];

  // How-to steps for schema
  const howToSteps = [
    {
      name: 'Odaberite vrstu izračuna',
      text: 'Odaberite željenu funkciju: razlika između datuma, dodavanje/oduzimanje dana, radni dani, kalkulator starosti ili odbrojavanje.'
    },
    {
      name: 'Unesite datume',
      text: 'Unesite početni datum i završni datum (ili druge potrebne podatke ovisno o odabranoj funkciji).'
    },
    {
      name: 'Podesite opcije',
      text: 'Odaberite dodatne opcije poput formata datuma, isključivanja vikenda ili praznika, itd.'
    },
    {
      name: 'Pregledajte rezultate',
      text: 'Pregledajte izračunate rezultate koji se prikazuju u različitim formatima i s dodatnim informacijama.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Kalkulator Datuma – Razlika Datuma, Broj Dana, Radni Dani, Odbrojavanje</title>
        <meta
          name="description"
          content="Brzo izračunajte razliku između datuma, broj dana i radnih dana te napravite odbrojavanje. Jednostavno, precizno i besplatno."
        />
        <meta
          name="keywords"
          content="kalkulator datuma, kalkulator dana, izračun broja dana, radni dani, odbrojavanje, razlika datuma, broj dana između datuma, radni dani kalkulator, kalkulator starosti, dodavanje dana"
        />
        <meta property="og:title" content="Kalkulator Datuma – Razlika Datuma, Broj Dana, Radni Dani" />
        <meta property="og:description" content="Brzo izračunajte razliku između datuma, broj dana i radnih dana te napravite odbrojavanje. Jednostavno, precizno i besplatno." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kalkulacije.com/kalkulator-datuma" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Kalkulator Datuma – Razlika Datuma, Broj Dana, Radni Dani" />
        <meta name="twitter:description" content="Brzo izračunajte razliku između datuma, broj dana i radnih dana te napravite odbrojavanje." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://kalkulacije.com/kalkulator-datuma" />
      </Helmet>

      <ToolSchema
        name="Kalkulator Datuma"
        description="Sveobuhvatni kalkulator za izračun razlike između datuma, dodavanje ili oduzimanje dana, izračun radnih dana, praćenje starosti i stvaranje odbrojavanja."
        url="https://kalkulacije.com/kalkulator-datuma"
        keywords={[
          'kalkulator datuma', 'razlika između datuma', 'dodavanje dana', 'oduzimanje dana',
          'radni dani', 'kalkulator starosti', 'odbrojavanje do događaja'
        ]}
      />

      <HowToSchema
        name="Kako koristiti kalkulator datuma"
        description="Jednostavne upute za korištenje kalkulatora datuma za izračun razlike između datuma, dodavanje ili oduzimanje dana, izračun radnih dana i više."
        steps={howToSteps}
      />

      <FAQSchema
        questions={faqData}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Početna', url: 'https://kalkulacije.com/' },
          { name: 'Kalkulator Datuma', url: 'https://kalkulacije.com/kalkulator-datuma' }
        ]}
      />

      {/* Hero Section */}
      <section className="pt-16 pb-8 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Kalkulator Datuma (Razlika, Broj Dana i Radnih Dana)
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Precizno izračunajte razliku između datuma, broj dana i radnih dana. Napravite odbrojavanje do važnih događaja i izračunajte starost. Jednostavan kalkulator datuma s podrškom za hrvatske praznike.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section ref={calculatorRef} className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <DateTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </section>

      {/* AI Summary */}
      <AISummary
        summary="Kalkulator datuma izračunava razliku između dva datuma, broj dana, radne dane, starost i odbrojavanje. Podržava hrvatske praznike. Besplatno, precizno."
        keywords={['kalkulator datuma', 'razlika datuma', 'radni dani', 'broj dana', 'odbrojavanje']}
        useCases={[
          'Izračun radnih dana između dva datuma',
          'Odbrojavanje do važnog događaja (vjenčanje, rođendan)',
          'Izračun točne starosti u godinama, mjesecima i danima',
          'Planiranje projekta - koliko radnih dana do roka'
        ]}
        statistics={[
          { label: 'Radnih dana godišnje u Hrvatskoj', value: '~252', source: 'Prosjek' },
          { label: 'Državnih praznika', value: '13', source: 'Vlada RH' }
        ]}
      />

      {/* Quick Answer */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <QuickAnswer
            question="Koliko je dana između 1. siječnja i 31. prosinca 2024?"
            answer="366 dana (prijestupna godina)"
            highlight="Radnih dana: ~252 (bez vikenda i praznika)"
            details="Kalkulator automatski uzima u obzir prijestupne godine, vikende i hrvatske državne praznike."
          />

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <StatisticCard
              value="365/366"
              label="Dana u godini"
              source="Kalendar"
              color="blue"
            />
            <StatisticCard
              value="~252"
              label="Radnih dana godišnje"
              source="Prosjek HR"
              color="green"
            />
            <StatisticCard
              value="13"
              label="Državnih praznika"
              source="Vlada RH"
              color="purple"
            />
          </div>

          <ComparisonTable
            title="Primjeri Razlike Datuma"
            caption="Česti izračuni između datuma"
            headers={['Period', 'Ukupno Dana', 'Radnih Dana', 'Tjedana']}
            rows={[
              ['1 mjesec (30 dana)', '30', '~22', '~4.3'],
              ['1 kvartal (3 mjeseca)', '~90', '~63', '~13'],
              ['Pola godine (6 mjeseci)', '~183', '~126', '~26'],
              ['1 godina', '365', '~252', '~52'],
              ['Trudnoća (40 tjedana)', '280', '~196', '40']
            ]}
            highlightColumn={1}
          />
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Primjeri Korištenja</h2>

          <UseCaseExample
            title="Primjer 1: Planiranje Projekta"
            scenario="Ana mora završiti projekt do 31. prosinca. Danas je 15. studenog. Koliko radnih dana ima?"
            input="Od: 15. studenog 2024, Do: 31. prosinca 2024"
            output="Ukupno: 47 dana | Radnih dana: ~33 (bez vikenda i praznika)"
            explanation="Ana ima 33 radna dana za završetak projekta, što je oko 6.5 radnih tjedana."
            icon={<Briefcase className="w-6 h-6 text-blue-600" />}
          />

          <UseCaseExample
            title="Primjer 2: Odbrojavanje do Vjenčanja"
            scenario="Marko se ženi 15. lipnja 2025. Koliko dana još ima do vjenčanja?"
            input="Od: Danas, Do: 15. lipanj 2025"
            output="Preostalo: 182 dana (26 tjedana, 6 mjeseci)"
            explanation="Marko može pratiti odbrojavanje i planirati pripreme prema preostalom vremenu."
            icon={<Calendar className="w-6 h-6 text-green-600" />}
          />

          <UseCaseExample
            title="Primjer 3: Izračun Točne Starosti"
            scenario="Ivana je rođena 5. ožujka 1990. Koliko točno ima godina?"
            input="Datum rođenja: 5. ožujak 1990, Danas: 15. prosinac 2024"
            output="Starost: 34 godine, 9 mjeseci, 10 dana"
            explanation="Precizan izračun starosti u godinama, mjesecima i danima, koristan za službene dokumente."
            icon={<Clock className="w-6 h-6 text-purple-600" />}
          />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kako Funkcionira
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-2">1.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Odaberite funkciju</h3>
              <p className="text-gray-600 text-sm">Izaberite razliku datuma, dodavanje dana, radne dane ili odbrojavanje</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-2">2.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Unesite datume</h3>
              <p className="text-gray-600 text-sm">Postavite početni i završni datum ili broj dana za dodavanje</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-2">3.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Prilagodite opcije</h3>
              <p className="text-gray-600 text-sm">Uključite/isključite vikende i hrvatske praznike po potrebi</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-2">4.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Dobijte rezultat</h3>
              <p className="text-gray-600 text-sm">Instant prikaz rezultata u danima, tjednima, mjesecima i godinama</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Primjeri Korištenja
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Poslovni Rokovi</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Izračun rokova za ugovore i projekte</li>
                <li>• Planiranje radnih dana za dostavu</li>
                <li>• Određivanje datuma završetka zadataka</li>
                <li>• Praćenje trajanja projekata</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Osobni Događaji</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Odbrojavanje do rođendana i godišnjica</li>
                <li>• Planiranje godišnjih odmora</li>
                <li>• Izračun starosti u danima</li>
                <li>• Praćenje važnih datuma</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <DateFeatures onFeatureClick={handleFeatureClick} />
      <DateDetails />
      <DateFAQ />

      {/* ČPP Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ČPP (Često Postavljana Pitanja)
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 text-center mb-8">
              Dodatne informacije o korištenju kalkulatora datuma možete pronaći u našoj FAQ sekciji iznad.
              Za specifična pitanja o hrvatskim praznicima ili radnim danima, molimo kontaktirajte nas.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
