import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PercentageForm } from '../components/percentage/PercentageForm';
import { PercentageFeatures } from '../components/percentage/PercentageFeatures';
import { PercentageBenefits } from '../components/percentage/PercentageBenefits';
import { PercentageFAQ } from '../components/percentage/PercentageFAQ';

export function PercentageCalculator() {
  return (
    <>
      <Helmet>
        <title>Kalkulator Postotaka | Kalkulacije.com</title>
        <meta 
          name="description" 
          content="Kalkulator postotaka na hrvatskom jeziku za sve vaše potrebe. Brzo izračunajte postotak, povećanje, smanjenje i više. Prikladan i jednostavan za upotrebu." 
        />
        <meta 
          name="keywords" 
          content="izračun postotka, kalkulator postotka, postotni proračun, povećanje i smanjenje postotka, postotak od broja" 
        />
      </Helmet>

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
    </>
  );
}