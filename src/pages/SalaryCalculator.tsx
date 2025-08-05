import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema } from '../components/SchemaMarkup';
import { Calculator } from '../components/Calculator';
import { SalaryFeatures } from '../components/salary/SalaryFeatures';
import { SalaryBenefits } from '../components/salary/SalaryBenefits';
import { SalaryFAQ } from '../components/salary/SalaryFAQ';
import { RelatedCalculators } from '../components/RelatedCalculators';

export function SalaryCalculator() {
  return (
    <>
      <Helmet>
        <title>Kalkulator Plaće | Izračun Neto i Bruto Plaće | Kalkulacije.com</title>
        <meta name="description" content="🧮 Besplatni kalkulator plaće za Hrvatsku. Izračunajte neto iz bruto plaće ili obrnuto. Precizni izračuni s porezima, doprinosima i osobnim odbitkom za 2025." />
        <meta name="keywords" content="kalkulator plaće, izračun plaće, neto plaća, bruto plaća, porez na dohodak, doprinosi, osobni odbitak, hrvatska plaća 2025" />
        <link rel="canonical" href="https://kalkulacije.com/kalkulator-place" />
      </Helmet>

      <ToolSchema
        name="Kalkulator Plaće"
        description="Besplatni online kalkulator za izračun neto i bruto plaće prema hrvatskim poreznim propisima za 2025. godinu."
        url="https://kalkulacije.com/kalkulator-place"
        keywords={[
          'kalkulator plaće', 'izračun plaće', 'neto plaća', 'bruto plaća',
          'porez na dohodak', 'doprinosi', 'osobni odbitak', 'hrvatska plaća'
        ]}
      />

      {/* Hero Section */}
      <section className="pt-16 pb-8 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Kalkulator Plaće
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Jednostavan i precizan izračun neto plaće prema hrvatskim poreznim propisima.
            Savršen za zaposlenike, obrtnike i freelancere.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Calculator />
        </div>
      </section>

      <SalaryFeatures />
      <SalaryBenefits />
      <SalaryFAQ />
      <RelatedCalculators />
    </>
  );
}