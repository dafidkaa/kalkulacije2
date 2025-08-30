import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema, HowToSchema, FAQSchema, BreadcrumbSchema } from '../components/SchemaMarkup';
import { DateTabs } from '../components/date/DateTabs';
import { DateFeatures } from '../components/date/DateFeatures';
import { DateDetails } from '../components/date/DateDetails';
import { DateFAQ } from '../components/date/DateFAQ';

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
      question: 'Kako se izračunava razlika između dva datuma?',
      answer: 'Razlika između dva datuma izračunava se oduzimanjem ranijeg datuma od kasnijeg datuma. Naš kalkulator prikazuje rezultat u godinama, mjesecima, tjednima i danima, uzimajući u obzir različite duljine mjeseci i prijestupne godine.'
    },
    {
      question: 'Kako kalkulator radnih dana isključuje vikende i praznike?',
      answer: 'Kalkulator radnih dana automatski isključuje subote i nedjelje (vikende) iz izračuna. Također sadrži ugrađeni popis hrvatskih državnih praznika koji se također isključuju iz izračuna ako je odabrana ta opcija.'
    },
    {
      question: 'Kako izračunati točnu starost u godinama, mjesecima i danima?',
      answer: 'Za izračun točne starosti, unesite datum rođenja u kalkulator starosti. Kalkulator će automatski izračunati starost u godinama, mjesecima i danima na temelju trenutnog datuma ili bilo kojeg drugog odabranog datuma.'
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
        <title>Kalkulator Datuma | Izračun Razlike, Radnih Dana i Odbrojavanja</title>
        <meta
          name="description"
          content="Besplatni online kalkulator datuma na hrvatskom jeziku. Izračunajte razliku između datuma, dodajte ili oduzmite dane, izračunajte radne dane, pratite starost i stvarajte odbrojavanja do važnih događaja."
        />
        <meta
          name="keywords"
          content="kalkulator datuma, izračun razlike između datuma, dodavanje dana datumu, oduzimanje dana od datuma, razlika između datuma, izračun radnih dana, kalkulator godina mjeseci i dana, kalkulator događaja, odbrojavanje do datuma, pretvarač formata datuma, kalkulator praznika, izračun starosti, radni dani, vikendi, praznici"
        />
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
            Kalkulator Datuma
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Sveobuhvatni alat za izračun razlike između datuma, dodavanje ili oduzimanje dana, izračun radnih dana, praćenje starosti i stvaranje odbrojavanja do važnih događaja.
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

      <DateFeatures onFeatureClick={handleFeatureClick} />
      <DateDetails />
      <DateFAQ />
    </>
  );
}
