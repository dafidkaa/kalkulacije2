import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema, BreadcrumbSchema, HowToSchema } from '../components/SchemaMarkup';
import { BMIForm } from '../components/bmi/BMIForm';
import { BMIFeatures } from '../components/bmi/BMIFeatures';
import { BMIBenefits } from '../components/bmi/BMIBenefits';
import { BMIFAQ } from '../components/bmi/BMIFAQ';
import { RelatedCalculators } from '../components/RelatedCalculators';

export function BMICalculator() {
  return (
    <>
      <Helmet>
        <title>BMI Kalkulator | Izračun Indeksa Tjelesne Mase | Kalkulacije.com</title>
        <meta
          name="description"
          content="💪 Besplatni BMI kalkulator na hrvatskom. Izračunajte indeks tjelesne mase, idealnu težinu i dobijte zdravstvene preporuke. Jednostavan i precizan BMI izračun."
        />
        <meta
          name="keywords"
          content="bmi kalkulator, indeks tjelesne mase, izračun idealne težine, kalkulator težine, zdravstveni kalkulator, BMI tablica, normalna težina"
        />
        <link rel="canonical" href="https://kalkulacije.com/kalkulator-bmi" />
      </Helmet>

      <ToolSchema
        name="BMI Kalkulator"
        description="Besplatni kalkulator za izračun indeksa tjelesne mase (BMI) s preporukama za idealnu težinu i zdravstvenim savjetima."
        url="https://kalkulacije.com/kalkulator-bmi"
        keywords={[
          'bmi kalkulator', 'indeks tjelesne mase', 'izračun idealne težine',
          'kalkulator težine', 'zdravstveni kalkulator', 'BMI tablica'
        ]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Početna', url: 'https://kalkulacije.com/' },
          { name: 'BMI Kalkulator', url: 'https://kalkulacije.com/kalkulator-bmi' }
        ]}
      />

      <HowToSchema
        name="Kako izračunati BMI?"
        description="Jednostavan vodič za izračun indeksa tjelesne mase (BMI) koristeći naš besplatni kalkulator."
        steps={[
          { name: 'Odabir sustava', text: 'Odaberite želite li unos u metričkom (kg/cm) ili imperijalnom (lbs/in) sustavu.' },
          { name: 'Unos visine', text: 'Unesite svoju točnu visinu.' },
          { name: 'Unos težine', text: 'Unesite svoju trenutnu tjelesnu težinu.' },
          { name: 'Rezultat', text: 'Kalkulator odmah prikazuje vaš BMI i kategoriju u koju spadate.' }
        ]}
      />

      <section className="pt-16 pb-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-display">
            Kalkulator BMI
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Izračunajte svoj indeks tjelesne mase (BMI).
            <span className="block text-sm mt-2 text-gray-500">Provjerite jeste li u zdravom rasponu težine u sekundi.</span>
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <BMIForm />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kako Izračunati BMI?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">1.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Sustav</h3>
              <p className="text-gray-600 text-sm">Odaberite metrički (kg/cm) ili imperijalni sustav</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">2.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Visina</h3>
              <p className="text-gray-600 text-sm">Upišite svoju visinu (preciznost je važna)</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">3.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Težina</h3>
              <p className="text-gray-600 text-sm">Upišite svoju trenutnu tjelesnu težinu</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">4.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Analiza</h3>
              <p className="text-gray-600 text-sm">Saznajte spadate li u pothranjenost, normalnu težinu ili pretilost</p>
            </div>
          </div>
        </div>
      </section>

      <BMIFeatures />
      <BMIBenefits />
      <BMIFAQ />
      <RelatedCalculators />
    </>
  );
}