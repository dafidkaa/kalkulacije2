import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema, BreadcrumbSchema, HowToSchema } from '../components/SchemaMarkup';
import { TimeForm } from '../components/time/TimeForm';
import { TimeFeatures } from '../components/time/TimeFeatures';
import { TimeBenefits } from '../components/time/TimeBenefits';
import { TimeFAQ } from '../components/time/TimeFAQ';
import { RelatedCalculators } from '../components/RelatedCalculators';

type CalculationType = 'arithmetic' | 'interval' | 'conversion';

export function TimeCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>('arithmetic');
  const calculatorRef = useRef<HTMLElement>(null);

  const handleFeatureClick = (type: CalculationType) => {
    setCalculationType(type);
    // Smooth scroll to calculator section
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Kalkulator Vremena | Zbrajanje i Oduzimanje Vremena | Kalkulacije.com</title>
        <meta
          name="description"
          content="⏰ Besplatni kalkulator vremena na hrvatskom. Zbrajajte i oduzimajte vrijeme, računajte radne sate, vremenske intervale i pretvarajte vremenske jedinice."
        />
        <meta
          name="keywords"
          content="kalkulator vremena, zbrajanje vremena, oduzimanje vremena, vremenski interval, pretvaranje vremena, radni sati, kalkulator sati"
        />
        <link rel="canonical" href="https://kalkulacije.com/kalkulator-vremena" />
      </Helmet>

      <ToolSchema
        name="Kalkulator Vremena"
        description="Besplatni kalkulator za zbrajanje i oduzimanje vremena, izračun radnih sati i pretvaranje vremenskih jedinica."
        url="https://kalkulacije.com/kalkulator-vremena"
        keywords={[
          'kalkulator vremena', 'zbrajanje vremena', 'oduzimanje vremena',
          'radni sati', 'vremenski interval', 'kalkulator sati'
        ]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Početna', url: 'https://kalkulacije.com/' },
          { name: 'Kalkulator Vremena', url: 'https://kalkulacije.com/kalkulator-vremena' }
        ]}
      />

      <HowToSchema
        name="Kako koristiti kalkulator vremena?"
        description="Upute za zbrajanje, oduzimanje i pretvaranje vremenskih jedinica."
        steps={[
          { name: 'Odaberite operaciju', text: 'Izaberite želite li zbrajati/oduzimati vrijeme ili računati razliku između dva datuma/sata.' },
          { name: 'Unesite vrijeme', text: 'Upišite sate, minute i sekunde u odgovarajuća polja.' },
          { name: 'Datum', text: 'Za intervale, odaberite početni i završni datum i vrijeme.' },
          { name: 'Izračunaj', text: 'Pritisnite gumb za izračun rezultata i pretvorbu jedinica.' }
        ]}
      />

      {/* Hero Section */}
      <section className="pt-16 pb-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-display">
            Kalkulator Vremena
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            <span>
              Jednostavan alat za sve vaše vremenske izračune. Zbrajajte ili oduzimajte vrijeme,
              izračunajte vremenske intervale i pretvarajte između različitih vremenskih jedinica.
            </span>
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section ref={calculatorRef} className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <TimeForm
            calculationType={calculationType}
            onCalculationTypeChange={setCalculationType}
          />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kako Koristiti Kalkulator Vremena?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">1.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Operacija</h3>
              <p className="text-gray-600 text-sm">Odaberite zbrajanje, oduzimanje ili razliku vremena.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">2.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Unos</h3>
              <p className="text-gray-600 text-sm">Upišite sate, minute i sekunde ili odaberite datume.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">3.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Izračun</h3>
              <p className="text-gray-600 text-sm">Dobijte točan rezultat u različitim jedinicama.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">4.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Pretvorba</h3>
              <p className="text-gray-600 text-sm">Automatska konverzija (npr. sati u minute/sekunde).</p>
            </div>
          </div>
        </div>
      </section>

      <TimeFeatures onFeatureClick={handleFeatureClick} />
      <TimeBenefits />
      <TimeFAQ />
      <RelatedCalculators />
    </>
  );
}