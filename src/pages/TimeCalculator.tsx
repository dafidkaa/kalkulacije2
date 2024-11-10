import React from 'react';
import { Helmet } from 'react-helmet-async';
import { TimeForm } from '../components/time/TimeForm';
import { TimeFeatures } from '../components/time/TimeFeatures';
import { TimeBenefits } from '../components/time/TimeBenefits';
import { TimeFAQ } from '../components/time/TimeFAQ';

export function TimeCalculator() {
  return (
    <>
      <Helmet>
        <title>Kalkulator vremena | Kalkulacije.com</title>
        <meta 
          name="description" 
          content="Jednostavan i precizan kalkulator vremena na hrvatskom jeziku. Zbrajajte i oduzimajte vrijeme, računajte vremenske intervale i pretvarajte vremenske jedinice." 
        />
        <meta 
          name="keywords" 
          content="kalkulator vremena, zbrajanje vremena, oduzimanje vremena, vremenski interval, pretvaranje vremena" 
        />
      </Helmet>

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
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <TimeForm />
        </div>
      </section>

      <TimeFeatures />
      <TimeBenefits />
      <TimeFAQ />
    </>
  );
}