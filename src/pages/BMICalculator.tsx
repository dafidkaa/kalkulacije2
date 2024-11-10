import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BMIForm } from '../components/bmi/BMIForm';
import { BMIFeatures } from '../components/bmi/BMIFeatures';
import { BMIBenefits } from '../components/bmi/BMIBenefits';
import { BMIFAQ } from '../components/bmi/BMIFAQ';

export function BMICalculator() {
  return (
    <>
      <Helmet>
        <title>Kalkulator BMI | Kalkulacije.com</title>
        <meta 
          name="description" 
          content="Izračunajte svoj BMI (indeks tjelesne mase) pomoću našeg besplatnog online kalkulatora. Saznajte svoju idealnu težinu i dobijte personalizirane zdravstvene preporuke." 
        />
        <meta 
          name="keywords" 
          content="bmi kalkulator, indeks tjelesne mase, izračun idealne težine, kalkulator težine, zdravstveni kalkulator" 
        />
      </Helmet>

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
    </>
  );
}