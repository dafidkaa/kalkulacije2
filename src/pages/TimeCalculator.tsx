import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema, BreadcrumbSchema, HowToSchema } from '../components/SchemaMarkup';
import { TimeForm } from '../components/time/TimeForm';
import { TimeFeatures } from '../components/time/TimeFeatures';
import { TimeBenefits } from '../components/time/TimeBenefits';
import { TimeFAQ } from '../components/time/TimeFAQ';
import { RelatedCalculators } from '../components/RelatedCalculators';
import { QuickAnswer, ComparisonTable, StatisticCard } from '../components/FeaturedSnippets';
import { AISummary, UseCaseExample } from '../components/GEOComponents';
import { Clock, Calendar, Watch } from 'lucide-react';

type CalculationType = 'arithmetic' | 'interval' | 'conversion';

export function TimeCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>('arithmetic');
  const calculatorRef = useRef<HTMLElement>(null);

  const handleFeatureClick = (type: CalculationType) => {
    setCalculationType(type);
    // Smooth scroll to calculator section
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Kalkulator Vremena | Zbrajanje i Oduzimanje Vremena | Kalkulacije.com</title>
        <meta
          name="description"
          content="⏰ Besplatni kalkulator vremena na hrvatskom. Zbrajajte i oduzimajte vrijeme, računajte radne sate, vremenske intervale i pretvarajte vremenske jedinice."
        />
        <meta
          name="keywords"
          content="kalkulator vremena, zbrajanje vremena, oduzimanje vremena, vremenski interval, pretvaranje vremena, radni sati, kalkulator sati"
        />
        <link rel="canonical" href="https://kalkulacije.com/kalkulator-vremena" />
      </Helmet>

      <ToolSchema
        name="Kalkulator Vremena"
        description="Besplatni kalkulator za zbrajanje i oduzimanje vremena, izračun radnih sati i pretvaranje vremenskih jedinica."
        url="https://kalkulacije.com/kalkulator-vremena"
        keywords={[
          'kalkulator vremena', 'zbrajanje vremena', 'oduzimanje vremena',
          'radni sati', 'vremenski interval', 'kalkulator sati'
        ]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Početna', url: 'https://kalkulacije.com/' },
          { name: 'Kalkulator Vremena', url: 'https://kalkulacije.com/kalkulator-vremena' }
        ]}
      />

      <HowToSchema
        name="Kako koristiti kalkulator vremena?"
        description="Upute za zbrajanje, oduzimanje i pretvaranje vremenskih jedinica."
        steps={[
          { name: 'Odaberite operaciju', text: 'Izaberite želite li zbrajati/oduzimati vrijeme ili računati razliku između dva datuma/sata.' },
          { name: 'Unesite vrijeme', text: 'Upišite sate, minute i sekunde u odgovarajuća polja.' },
          { name: 'Datum', text: 'Za intervale, odaberite početni i završni datum i vrijeme.' },
          { name: 'Izračunaj', text: 'Pritisnite gumb za izračun rezultata i pretvorbu jedinica.' }
        ]}
      />

      {/* Hero Section */}
      <section className="pt-16 pb-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-display">
            Kalkulator Vremena
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            <span>
              Jednostavan alat za sve vaše vremenske izračune. Zbrajajte ili oduzimajte vrijeme,
              izračunajte vremenske intervale i pretvarajte između različitih vremenskih jedinica.
            </span>
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section ref={calculatorRef} className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <TimeForm
            calculationType={calculationType}
            onCalculationTypeChange={setCalculationType}
          />
        </div>
      </section>

      {/* AI Summary */}
      <AISummary
        summary="Kalkulator vremena omogućuje zbrajanje i oduzimanje sati, minuta i sekundi. Izračunajte vremensku razliku između dva trenutka ili datuma. Besplatno."
        keywords={['kalkulator vremena', 'zbrajanje sati', 'oduzimanje vremena', 'razlika u vremenu', 'vremenski kalkulator']}
        useCases={[
          'Zbrajanje radnih sati u tjednu',
          'Izračun trajanja putovanja ili leta',
          'Oduzimanje vremena pauze od radnog vremena',
          'Pretvaranje minuta u sate i obrnuto'
        ]}
        statistics={[
          { label: 'Sati u tjednu', value: '168', source: 'Opće znanje' },
          { label: 'Sekundi u danu', value: '86,400', source: 'Opće znanje' },
          { label: 'Radnih sati mjesečno', value: '160-176', source: 'Zakon o radu' }
        ]}
      />

      {/* Quick Answer */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <QuickAnswer
            question="Koliko je sati između 08:30 i 17:00?"
            answer="8 sati i 30 minuta"
            highlight="Formula: Krajnje vrijeme - Početno vrijeme"
            details="Ako oduzmete pauzu od 30 minuta, efektivno radno vrijeme je 8 sati."
          />

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <StatisticCard
              value="8760"
              label="Sati u godini"
              source="Gregorijanski kalendar"
              color="blue"
            />
            <StatisticCard
              value="1440"
              label="Minuta u danu"
              source="Vrijeme"
              color="green"
            />
            <StatisticCard
              value="365.25"
              label="Dana u godini (prosjek)"
              source="Astronomija"
              color="purple"
            />
          </div>

          <ComparisonTable
            title="Pretvorba Vremenskih Jedinica"
            caption="Odnosi između jedinica vremena"
            headers={['Jedinica', 'Sati', 'Minute', 'Sekunde']}
            rows={[
              ['1 Dan', '24', '1440', '86400'],
              ['1 Tjedan', '168', '10080', '604800'],
              ['1 Radni dan (8h)', '8', '480', '28800'],
              ['1 Školski sat', '0.75', '45', '2700'],
              ['1 Poluvrijeme', '0.75', '45', '2700']
            ]}
            highlightColumn={1}
          />
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Primjeri Korištenja</h2>

          <UseCaseExample
            title="Primjer 1: Radni Sati"
            scenario="Ivan radi od 08:00 do 16:30. Ima pauzu od 30 minuta."
            input="Početak: 08:00 | Kraj: 16:30 | Pauza: 30 min"
            output="Radno vrijeme: 8 sati"
            explanation="Ukupno vrijeme na poslu je 8.5 sati, minus 30 min pauze daje 8 sati rada."
            icon={<Clock className="w-6 h-6 text-blue-600" />}
          />

          <UseCaseExample
            title="Primjer 2: Trajanje Leta"
            scenario="Avion polijeće u 14:15 i slijeće u 17:50."
            input="Polazak: 14:15 | Dolazak: 17:50"
            output="Trajanje: 3 sata i 35 minuta"
            explanation="Jednostavno oduzimanje vremena: 17:50 - 14:15 = 3:35."
            icon={<Watch className="w-6 h-6 text-green-600" />}
          />

          <UseCaseExample
            title="Primjer 3: Projektni Rokovi"
            scenario="Projekt traje 150 sati. Tim radi 8 sati dnevno."
            input="Ukupno sati: 150 | Dnevno: 8"
            output="Dana: 18.75 radnih dana"
            explanation="Podjelom ukupnih sati s dnevnim radnim vremenom dobivamo broj dana."
            icon={<Calendar className="w-6 h-6 text-purple-600" />}
          />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kako Koristiti Kalkulator Vremena?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">1.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Operacija</h3>
              <p className="text-gray-600 text-sm">Odaberite zbrajanje, oduzimanje ili razliku vremena.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">2.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Unos</h3>
              <p className="text-gray-600 text-sm">Upišite sate, minute i sekunde ili odaberite datume.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">3.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Izračun</h3>
              <p className="text-gray-600 text-sm">Dobijte točan rezultat u različitim jedinicama.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">4.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Pretvorba</h3>
              <p className="text-gray-600 text-sm">Automatska konverzija (npr. sati u minute/sekunde).</p>
            </div>
          </div>
        </div>
      </section>

      <TimeFeatures onFeatureClick={handleFeatureClick} />
      <TimeBenefits />
      <TimeFAQ />
      <RelatedCalculators />
    </>
  );
}