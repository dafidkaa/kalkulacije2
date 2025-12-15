import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema, BreadcrumbSchema, HowToSchema } from '../components/SchemaMarkup';
import { Converter } from '../components/converter/Converter';
import { UnitFeatures } from '../components/unit/UnitFeatures';
import { UnitBenefits } from '../components/unit/UnitBenefits';
import { UnitFAQ } from '../components/unit/UnitFAQ';
import { RelatedCalculators } from '../components/RelatedCalculators';
import { QuickAnswer, ComparisonTable, StatisticCard } from '../components/FeaturedSnippets';
import { AISummary, UseCaseExample } from '../components/GEOComponents';
import { Ruler, Scale, Thermometer } from 'lucide-react';

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

      {/* AI Summary */}
      <AISummary
        summary="Univerzalni pretvarač mjernih jedinica. Brza konverzija duljine (inči, stope), mase (lbs, kg), temperature i volumena. Precizni rezultati za školu i posao."
        keywords={['pretvarač jedinica', 'konverter mjera', 'inči u cm', 'funte u kg', 'tečajna lista']}
        useCases={[
          'Pretvaranje inča u centimetre za kupnju TV-a',
          'Kuhinjske mjere (šalice u mililitre)',
          'Pretvorba američkih jedinica (milje, galoni) u europske'
        ]}
        statistics={[
          { label: '1 Inč (inch)', value: '2.54 cm', source: 'Međunarodni standard' },
          { label: '1 Milja (mile)', value: '1.609 km', source: 'Međunarodni standard' },
          { label: '1 Funta (lb)', value: '0.453 kg', source: 'Međunarodni standard' }
        ]}
      />

      {/* Quick Answer */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <QuickAnswer
            question="Koliko je 1 inč centimetara?"
            answer="Točno 2.54 centimetra."
            highlight="1 inch = 2.54 cm"
            details="Inč je carska mjerna jedinica koja se danas najčešće koristi za dijagonale ekrana (TV, mobiteli)."
          />

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <StatisticCard
              value="1000 m"
              label="1 Kilometar"
              source="Metrički sustav"
              color="blue"
            />
            <StatisticCard
              value="0.62 mi"
              label="1 Kilometar"
              source="Imperijalni sustav"
              color="green"
            />
            <StatisticCard
              value="3 ft 3 in"
              label="1 Metar"
              source="Kombinirano"
              color="purple"
            />
          </div>

          <ComparisonTable
            title="Najčešće Pretvorbe"
            caption="Tablica konverzije popularnih mjernih jedinica"
            headers={['Veličina', 'Imperijalno (SAD/UK)', 'Metričko (EU)', 'Omjer']}
            rows={[
              ['Duljina', '1 inch', '2.54 cm', 'x 2.54'],
              ['Duljina', '1 foot (stopa)', '30.48 cm', 'x 30.48'],
              ['Udaljenost', '1 mile (milja)', '1.61 km', 'x 1.61'],
              ['Masa', '1 pound (lb)', '0.45 kg', '/ 2.204'],
              ['Volumen', '1 gallon (US)', '3.785 L', 'x 3.785']
            ]}
            highlightColumn={2}
          />
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Primjeri Korištenja</h2>

          <UseCaseExample
            title="Primjer 1: Dijagonala Ekrana"
            scenario="Kupujete TV od 55 inča. Koliko je to u centimetrima?"
            input="55 inch"
            output="139.7 cm"
            explanation="Zaslon širine 55 inča ima dijagonalu od gotovo 140 cm."
            icon={<Ruler className="w-6 h-6 text-blue-600" />}
          />

          <UseCaseExample
            title="Primjer 2: Tjelesna Težina"
            scenario="Aplikacija traži težinu u lbs (funtama). Imate 80 kg."
            input="80 kg"
            output="176.4 lbs"
            explanation="Kilograme množimo s 2.204 da dobijemo funte."
            icon={<Scale className="w-6 h-6 text-green-600" />}
          />

          <UseCaseExample
            title="Primjer 3: Putovanje u SAD"
            scenario="Ograničenje brzine je 65 mph. Koliko je to km/h?"
            input="65 mph"
            output="105 km/h"
            explanation="Milje množimo s 1.61 da dobijemo kilometre. 65 mph je standardna brzina na autocestama."
            icon={<Thermometer className="w-6 h-6 text-red-600" />}
          />
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