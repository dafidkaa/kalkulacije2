import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema, BreadcrumbSchema, HowToSchema } from '../components/SchemaMarkup';
import { Converter } from '../components/converter/Converter';
import { UnitFeatures } from '../components/unit/UnitFeatures';
import { UnitBenefits } from '../components/unit/UnitBenefits';
import { UnitFAQ } from '../components/unit/UnitFAQ';
import { RelatedCalculators } from '../components/RelatedCalculators';

export function UnitConverter() {
  return (
    <>
      <Helmet>
        <title>Pretvarač Jedinica | Konverter Mjernih Jedinica | Kalkulacije.com</title>
        <meta name="description" content="📏 Besplatni pretvarač mjernih jedinica. Pretvorite duljinu, masu, volumen, površinu i temperaturu. Metrički i imperijalni sustav. Brz i precizan konverter." />
        <meta name="keywords" content="pretvarač jedinica, konverter jedinica, pretvaranje mjernih jedinica, kalkulator jedinica, metrički sustav, imperijalne jedinice, pretvorba cm u inče" />
        <link rel="canonical" href="https://kalkulacije.com/pretvaranje-jedinica" />
      </Helmet>

      <ToolSchema
        name="Pretvarač Jedinica"
        description="Sveobuhvatni pretvarač mjernih jedinica za duljinu, masu, volumen, površinu i temperaturu. Podržava metrički i imperijalni sustav."
        url="https://kalkulacije.com/pretvaranje-jedinica"
        keywords={[
          'pretvarač jedinica', 'konverter jedinica', 'pretvaranje mjernih jedinica',
          'metrički sustav', 'imperijalne jedinice', 'pretvorba cm u inče'
        ]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Početna', url: 'https://kalkulacije.com/' },
          { name: 'Pretvarač Jedinica', url: 'https://kalkulacije.com/pretvaranje-jedinica' }
        ]}
      />

      <HowToSchema
        name="Kako koristiti pretvarač mjernih jedinica?"
        description="Vodič za pretvaranje duljine, mase, volumena i drugih mjernih jedinica."
        steps={[
          { name: 'Kategorija', text: 'Odaberite vrstu jedinice (duljina, masa, volumen, itd.).' },
          { name: 'Jedinice', text: 'Odaberite iz koje u koju jedinicu želite pretvarati.' },
          { name: 'Vrijednost', text: 'Unesite brojčanu vrijednost koju pretvarate.' },
          { name: 'Rezultat', text: 'Odmah pročitajte točan rezultat pretvorbe.' }
        ]}
      />

      {/* Hero Section */}
      <section className="pt-16 pb-8 text-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-display">
            Pretvarač Jedinica
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            <span>
              Jednostavan i precizan pretvarač za sve vrste mjernih jedinica.
              Idealan za svakodnevnu upotrebu, obrazovanje i profesionalni rad.
            </span>
          </p>
        </div>
      </section>

      {/* Converter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Converter />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kako Koristiti Pretvarač?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-purple-600 mb-2">1.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Tip</h3>
              <p className="text-gray-600 text-sm">Odaberite što pretvarate (npr. duljinu ili masu).</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-purple-600 mb-2">2.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Odabir</h3>
              <p className="text-gray-600 text-sm">Postavite ulaznu i izlaznu jedinicu (npr. km → milje).</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-purple-600 mb-2">3.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Unos</h3>
              <p className="text-gray-600 text-sm">Unesite iznos koji želite pretvoriti.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-purple-600 mb-2">4.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Točnost</h3>
              <p className="text-gray-600 text-sm">Dobijte precizan rezultat na više decimala.</p>
            </div>
          </div>
        </div>
      </section>

      <UnitFeatures />
      <UnitBenefits />
      <UnitFAQ />
      <RelatedCalculators />
    </>
  );
}