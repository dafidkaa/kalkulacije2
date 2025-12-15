import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema, BreadcrumbSchema, HowToSchema } from '../components/SchemaMarkup';
import { PercentageForm } from '../components/percentage/PercentageForm';
import { PercentageFeatures } from '../components/percentage/PercentageFeatures';
import { PercentageBenefits } from '../components/percentage/PercentageBenefits';
import { PercentageFAQ } from '../components/percentage/PercentageFAQ';
import { RelatedCalculators } from '../components/RelatedCalculators';
import { QuickAnswer, ComparisonTable, StatisticCard } from '../components/FeaturedSnippets';
import { AISummary, UseCaseExample } from '../components/GEOComponents';
import { Percent, TrendingUp, ShoppingCart } from 'lucide-react';

export function PercentageCalculator() {
  return (
    <>
      <Helmet>
        <title>Kalkulator Postotka – Izračun Postotka, Povećanje, Popusti i PDV</title>
        <meta
          name="description"
          content="Izračunajte postotak, postotno povećanje/smanjenje, popuste i PDV. Jednostavan kalkulator postotka s primjerima i formulama."
        />
        <meta
          name="keywords"
          content="kalkulator postotka, izračun postotka, povećanje postotka, popust kalkulator, PDV kalkulator, postotak od broja, postotno smanjenje, formule postotka"
        />
        <meta property="og:title" content="Kalkulator Postotka – Izračun Postotka, Povećanje, Popusti i PDV" />
        <meta property="og:description" content="Izračunajte postotak, postotno povećanje/smanjenje, popuste i PDV. Jednostavan kalkulator postotka s primjerima i formulama." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kalkulacije.com/kalkulator-postotaka" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Kalkulator Postotka – Izračun Postotka, Povećanje, Popusti i PDV" />
        <meta name="twitter:description" content="Izračunajte postotak, postotno povećanje/smanjenje, popuste i PDV." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://kalkulacije.com/kalkulator-postotaka" />
      </Helmet>

      <ToolSchema
        name="Kalkulator Postotaka"
        description="Besplatni kalkulator za izračun postotaka, povećanja, smanjenja i razlike u postocima. Idealan za financijske i poslovne izračune."
        url="https://kalkulacije.com/kalkulator-postotaka"
        keywords={[
          'kalkulator postotaka', 'izračun postotka', 'povećanje postotka',
          'smanjenje postotka', 'postotak od broja', 'PDV kalkulator'
        ]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Početna', url: 'https://kalkulacije.com/' },
          { name: 'Kalkulator Postotaka', url: 'https://kalkulacije.com/kalkulator-postotaka' }
        ]}
      />

      <HowToSchema
        name="Kako izračunati postotak?"
        description="Vodič za izračun postotaka, povećanja, smanjenja i PDV-a."
        steps={[
          { name: 'Što računate?', text: 'Odaberite želite li računati postotak od broja, udio, povećanje ili smanjenje.' },
          { name: 'Unesite brojeve', text: 'Upišite poznate vrijednosti (npr. ukupnu cijenu i postotak popusta).' },
          { name: 'Izračun', text: 'Kalkulator automatski prikazuje rezultat.' },
          { name: 'Primjena', text: 'Koristite rezultat za izračun popusta, napojnica ili poreza.' }
        ]}
      />

      {/* Hero Section */}
      <section className="pt-16 pb-8 text-center bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-display">
            Kalkulator Postotka
            <span className="block text-2xl font-normal text-gray-600 mt-2">Formule i Primjeri</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            <span>
              Izračunajte postotak, postotno povećanje i smanjenje, popuste i PDV.
              Jednostavan kalkulator s formulama i praktičnim primjerima.
            </span>
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <PercentageForm />
        </div>
      </section>

      {/* AI Summary */}
      <AISummary
        summary="Kalkulator postotaka izračunava postotak od broja, postotno povećanje/smanjenje, razliku u postocima i PDV. Formula: Postotak = (Dio / Cjelina) × 100. Korisno za popuste, PDV, napojnice, kamate. Besplatno."
        keywords={['kalkulator postotka', 'izračun postotka', 'popust', 'PDV', 'povećanje postotka']}
        useCases={[
          'Izračun popusta u trgovini',
          'Dodavanje PDV-a na cijenu',
          'Izračun napojnice u restoranu',
          'Postotna promjena cijene ili plaće'
        ]}
        statistics={[
          { label: 'PDV stopa u Hrvatskoj', value: '25%', source: 'Porezna uprava' },
          { label: 'Prosječan popust Black Friday', value: '30-50%', source: 'Procjena' }
        ]}
      />

      {/* Quick Answer & Examples */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <QuickAnswer
            question="Koliko je 20% od 500 EUR?"
            answer="100 EUR"
            highlight="Formula: 500 × 0.20 = 100"
            details="Za izračun postotka od broja, pomnožite broj s postotkom podijeljenim sa 100 (ili pomnožite s decimalnom vrijednosti postotka)."
          />

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <StatisticCard
              value="25%"
              label="PDV stopa u Hrvatskoj"
              source="Porezna uprava"
              color="blue"
            />
            <StatisticCard
              value="13%"
              label="Snižena PDV stopa"
              source="Porezna uprava"
              color="green"
            />
            <StatisticCard
              value="15-20%"
              label="Uobičajena napojnica"
              source="Bonton"
              color="purple"
            />
          </div>

          <ComparisonTable
            title="Česti Izračuni Postotaka"
            caption="Primjeri najkorištećih postotnih izračuna"
            headers={['Izračun', 'Primjer', 'Rezultat']}
            rows={[
              ['10% od 100', '100 × 0.10', '10'],
              ['20% popust na 500', '500 - (500 × 0.20)', '400'],
              ['PDV 25% na 100', '100 × 1.25', '125'],
              ['Povećanje 15%', '100 × 1.15', '115'],
              ['Smanjenje 30%', '100 × 0.70', '70']
            ]}
            highlightColumn={2}
          />
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Primjeri Korištenja</h2>

          <UseCaseExample
            title="Primjer 1: Popust u Trgovini"
            scenario="Jakna košta 800 EUR i ima 30% popusta. Kolika je konačna cijena?"
            input="Originalna cijena: 800 EUR, Popust: 30%"
            output="Konačna cijena: 560 EUR (ušteda: 240 EUR)"
            explanation="Popust od 30% znači da platite 70% originalne cijene. 800 × 0.70 = 560 EUR."
            icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
          />

          <UseCaseExample
            title="Primjer 2: Dodavanje PDV-a"
            scenario="Usluga košta 200 EUR bez PDV-a. Kolika je cijena s PDV-om (25%)?"
            input="Cijena bez PDV-a: 200 EUR, PDV: 25%"
            output="Cijena s PDV-om: 250 EUR (PDV iznos: 50 EUR)"
            explanation="Za dodavanje PDV-a, pomnožite cijenu s 1.25. 200 × 1.25 = 250 EUR."
            icon={<Percent className="w-6 h-6 text-green-600" />}
          />

          <UseCaseExample
            title="Primjer 3: Povećanje Plaće"
            scenario="Plaća je bila 1.000 EUR i povećana je za 12%. Kolika je nova plaća?"
            input="Stara plaća: 1.000 EUR, Povećanje: 12%"
            output="Nova plaća: 1.120 EUR (povećanje: 120 EUR)"
            explanation="Povećanje od 12% znači da nova plaća iznosi 112% stare. 1.000 × 1.12 = 1.120 EUR."
            icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
          />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kako Koristiti Kalkulator Postotaka?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-yellow-600 mb-2">1.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Odabir</h3>
              <p className="text-gray-600 text-sm">Odaberite tip izračuna (npr. postotak od broja).</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-yellow-600 mb-2">2.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Vrijednosti</h3>
              <p className="text-gray-600 text-sm">Unesite potrebne brojeve u polja.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-yellow-600 mb-2">3.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Rezultat</h3>
              <p className="text-gray-600 text-sm">Saznajte točan iznos odmah.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-yellow-600 mb-2">4.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Formula</h3>
              <p className="text-gray-600 text-sm">Pogledajte korištenu formulu za učenje.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Najčešće radnje Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Najčešće Radnje
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-blue-600 mb-3">Koliko je X% od Y</h3>
              <p className="text-gray-600 text-sm mb-3">Izračunajte koliko je određeni postotak od broja</p>
              <p className="text-xs text-gray-500">Primjer: 25% od 200 = 50</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-blue-600 mb-3">Koliki je postotak X od Y</h3>
              <p className="text-gray-600 text-sm mb-3">Odredite postotni udio jednog broja u drugome</p>
              <p className="text-xs text-gray-500">Primjer: 50 od 200 = 25%</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-blue-600 mb-3">Povećanje/Smanjenje</h3>
              <p className="text-gray-600 text-sm mb-3">Izračunajte postotno povećanje ili smanjenje</p>
              <p className="text-xs text-gray-500">Primjer: 100→120 = +20%</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-blue-600 mb-3">PDV</h3>
              <p className="text-gray-600 text-sm mb-3">Izračunajte PDV i ukupnu cijenu</p>
              <p className="text-xs text-gray-500">Primjer: 100 + 25% PDV = 125</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formule Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Formule
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Osnovne Formule</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">Postotak = (Dio / Cjelina) × 100</p>
                  <p className="text-xs text-gray-600 mt-1">Primjer: (25 / 100) × 100 = 25%</p>
                </div>
                <div>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">Vrijednost = (Postotak / 100) × Broj</p>
                  <p className="text-xs text-gray-600 mt-1">Primjer: (20 / 100) × 150 = 30</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Povećanje/Smanjenje</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">Promjena% = ((Nova - Stara) / Stara) × 100</p>
                  <p className="text-xs text-gray-600 mt-1">Primjer: ((120 - 100) / 100) × 100 = 20%</p>
                </div>
                <div>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">Nova vrijednost = Stara × (1 ± Postotak/100)</p>
                  <p className="text-xs text-gray-600 mt-1">Primjer: 100 × (1 + 0.15) = 115</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primjeri iz prakse Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Primjeri iz Prakse
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">💰 Popust</h3>
              <p className="text-gray-600 mb-3">Proizvod košta 200 kn, popust je 15%</p>
              <p className="font-semibold text-gray-900">Popust: 200 × 0.15 = 30 kn</p>
              <p className="font-semibold text-gray-900">Nova cijena: 200 - 30 = 170 kn</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-green-600 mb-4">🍽️ Napojnica</h3>
              <p className="text-gray-600 mb-3">Račun je 80 kn, napojnica 18%</p>
              <p className="font-semibold text-gray-900">Napojnica: 80 × 0.18 = 14.40 kn</p>
              <p className="font-semibold text-gray-900">Ukupno: 80 + 14.40 = 94.40 kn</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-red-600 mb-4">📊 PDV</h3>
              <p className="text-gray-600 mb-3">Cijena bez PDV-a: 100 kn, PDV 25%</p>
              <p className="font-semibold text-gray-900">PDV: 100 × 0.25 = 25 kn</p>
              <p className="font-semibold text-gray-900">S PDV-om: 100 + 25 = 125 kn</p>
            </div>
          </div>
        </div>
      </section>

      <PercentageFeatures />
      <PercentageBenefits />
      <PercentageFAQ />
      <RelatedCalculators />
    </>
  );
}