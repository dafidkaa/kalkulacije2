import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema } from '../components/SchemaMarkup';
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

      {/* Hero Section */}
      <section className="pt-16 pb-8 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Kalkulator BMI
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Izračunajte svoj indeks tjelesne mase (BMI) i saznajte više o svom zdravlju.
            Jednostavan i precizan način za praćenje vaše idealne težine.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <BMIForm />
        </div>
      </section>

      <BMIFeatures />
      <BMIBenefits />
      <BMIFAQ />
      <RelatedCalculators />
    </>
  );
}