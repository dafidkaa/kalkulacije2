import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema } from '../components/SchemaMarkup';
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

      {/* Hero Section */}
      <section className="pt-16 pb-8 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Kalkulator vremena
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Jednostavan alat za sve vaše vremenske izračune. Zbrajajte ili oduzimajte vrijeme,
            izračunajte vremenske intervale i pretvarajte između različitih vremenskih jedinica.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section ref={calculatorRef} className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <TimeForm
            calculationType={calculationType}
            onCalculationTypeChange={setCalculationType}
          />
        </div>
      </section>

      <TimeFeatures onFeatureClick={handleFeatureClick} />
      <TimeBenefits />
      <TimeFAQ />
      <RelatedCalculators />
    </>
  );
}