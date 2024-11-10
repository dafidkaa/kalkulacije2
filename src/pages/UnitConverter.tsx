import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Converter } from '../components/converter/Converter';
import { UnitFeatures } from '../components/unit/UnitFeatures';
import { UnitBenefits } from '../components/unit/UnitBenefits';
import { UnitFAQ } from '../components/unit/UnitFAQ';

export function UnitConverter() {
  return (
    <>
      <Helmet>
        <title>Pretvarač Jedinica | Kalkulacije.com</title>
        <meta name="description" content="Besplatni online pretvarač jedinica za duljinu, masu, volumen, temperaturu i površinu. Jednostavan za korištenje, precizan i brz." />
        <meta name="keywords" content="pretvarač jedinica, konverter jedinica, pretvaranje mjernih jedinica, kalkulator jedinica, metrički sustav, imperijalne jedinice" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-16 pb-8 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Pretvarač Jedinica
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Jednostavan i precizan pretvarač za sve vrste mjernih jedinica.
            Idealan za svakodnevnu upotrebu, obrazovanje i profesionalni rad.
          </p>
        </div>
      </section>

      {/* Converter Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Converter />
        </div>
      </section>

      <UnitFeatures />
      <UnitBenefits />
      <UnitFAQ />
    </>
  );
}