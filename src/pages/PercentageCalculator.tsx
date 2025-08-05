import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema } from '../components/SchemaMarkup';
import { PercentageForm } from '../components/percentage/PercentageForm';
import { PercentageFeatures } from '../components/percentage/PercentageFeatures';
import { PercentageBenefits } from '../components/percentage/PercentageBenefits';
import { PercentageFAQ } from '../components/percentage/PercentageFAQ';
import { RelatedCalculators } from '../components/RelatedCalculators';

export function PercentageCalculator() {
  return (
    <>
      <Helmet>
        <title>Kalkulator Postotaka | Izračun Postotka, Povećanja i Smanjenja | Kalkulacije.com</title>
        <meta
          name="description"
          content="📊 Besplatni kalkulator postotaka na hrvatskom. Izračunajte postotak od broja, povećanje, smanjenje, razliku u postocima. Jednostavan i brz postotni kalkulator."
        />
        <meta
          name="keywords"
          content="izračun postotka, kalkulator postotka, postotni proračun, povećanje i smanjenje postotka, postotak od broja, razlika u postocima, PDV kalkulator"
        />
        <link rel="canonical" href="https://kalkulacije.com/kalkulator-postotaka" />
      </Helmet>

      <ToolSchema
        name="Kalkulator Postotaka"
        description="Besplatni kalkulator za izračun postotaka, povećanja, smanjenja i razlike u postocima. Idealan za financijske i poslovne izračune."
        url="https://kalkulacije.com/kalkulator-postotaka"
        keywords={[
          'kalkulator postotaka', 'izračun postotka', 'povećanje postotka',
          'smanjenje postotka', 'postotak od broja', 'PDV kalkulator'
        ]}
      />

      {/* Hero Section */}
      <section className="pt-16 pb-8 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Kalkulator Postotaka
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Jednostavan i precizan način za izračun postotaka, povećanja, smanjenja i više.
            Idealan za svakodnevne izračune, financije i obrazovanje.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <PercentageForm />
        </div>
      </section>

      <PercentageFeatures />
      <PercentageBenefits />
      <PercentageFAQ />
      <RelatedCalculators />
    </>
  );
}