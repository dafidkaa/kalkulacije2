import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator } from '../components/Calculator';
import { SalaryFeatures } from '../components/salary/SalaryFeatures';
import { SalaryBenefits } from '../components/salary/SalaryBenefits';
import { SalaryFAQ } from '../components/salary/SalaryFAQ';

export function SalaryCalculator() {
  return (
    <>
      <Helmet>
        <title>Kalkulator Plaće | Kalkulacije.com</title>
        <meta name="description" content="Besplatni online kalkulator plaće za izračun neto i bruto plaće. Precizni izračuni prema hrvatskim poreznim propisima." />
        <meta name="keywords" content="kalkulator plaće, izračun plaće, neto plaća, bruto plaća, porez na dohodak, doprinosi" />
      </Helmet>

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
    </>
  );
}