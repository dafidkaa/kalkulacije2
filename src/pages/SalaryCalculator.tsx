import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema, BreadcrumbSchema, HowToSchema } from '../components/SchemaMarkup';
import { Calculator } from '../components/Calculator';
import { SalaryFeatures } from '../components/salary/SalaryFeatures';
import { SalaryBenefits } from '../components/salary/SalaryBenefits';
import { SalaryFAQ } from '../components/salary/SalaryFAQ';
import { RelatedCalculators } from '../components/RelatedCalculators';

export function SalaryCalculator() {
  return (
    <>
      <Helmet>
        <title>Kalkulator Plaće – Bruto u Neto (Hrvatska) + Objašnjenje Poreza</title>
        <meta name="description" content="Bruto-neto kalkulator plaće za Hrvatsku s najnovijim stopama i doprinosima. Izračunajte neto plaću i trošak poslodavca." />
        <meta name="keywords" content="kalkulator plaće, bruto neto, porez na dohodak, doprinosi, trošak poslodavca, hrvatska plaća 2025, bruto 1 bruto 2, neoporezivi dodatci" />
        <meta property="og:title" content="Kalkulator Plaće – Bruto u Neto (Hrvatska) + Objašnjenje Poreza" />
        <meta property="og:description" content="Bruto-neto kalkulator plaće za Hrvatsku s najnovijim stopama i doprinosima. Izračunajte neto plaću i trošak poslodavca." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kalkulacije.com/kalkulator-place" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Kalkulator Plaće – Bruto u Neto (Hrvatska)" />
        <meta name="twitter:description" content="Bruto-neto kalkulator plaće za Hrvatsku s najnovijim stopama i doprinosima." />
        <meta name="robots" content="index, follow" />
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

      <BreadcrumbSchema
        items={[
          { name: 'Početna', url: 'https://kalkulacije.com/' },
          { name: 'Kalkulator Plaće', url: 'https://kalkulacije.com/kalkulator-place' }
        ]}
      />

      <HowToSchema
        name="Kako izračunati neto plaću?"
        description="Vodič za izračun neto plaće iz bruto iznosa prema hrvatskim propisima."
        steps={[
          { name: 'Bruto iznos', text: 'Unesite iznos svoje bruto plaće u eurima.' },
          { name: 'Osobne postavke', text: 'Označite živite li u Zagrebu (zbog prireza/poreza) i broj djece/uzdržavanih osoba.' },
          { name: 'Izračun', text: 'Kalkulator automatski obračunava doprinose za mirovinsko, porez na dohodak i prirez.' },
          { name: 'Rezultat', text: 'Prikazuje se točan iznos neto plaće koji sjeda na račun te ukupni trošak poslodavca.' }
        ]}
      />

      {/* Hero Section */}
      <section className="pt-16 pb-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Kalkulator Plaće (Bruto u Neto i Trošak Poslodavca)
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Precizno izračunajte neto plaću iz bruto plaće i trošak poslodavca prema najnovijim hrvatskim poreznim propisima.
            Uključuje sve doprinose, poreze i neoporezive dodatke.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <Calculator />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kako Izračunati Plaću?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">1.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Bruto</h3>
              <p className="text-gray-600 text-sm">Unesite ugovoreni bruto iznos plaće</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">2.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Postavke</h3>
              <p className="text-gray-600 text-sm">Grad, djeca i uzdržavani članovi</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">3.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Izračun</h3>
              <p className="text-gray-600 text-sm">Automatski obračun poreza i doprinosa</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">4.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Rezultat</h3>
              <p className="text-gray-600 text-sm">Vaša neto plaća i trošak poslodavca</p>
            </div>
          </div>
        </div>
      </section>

      {/* Što ulazi u izračun Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Što Ulazi u Izračun
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-red-600 mb-4">Porezi i Doprinosi</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Porez na dohodak:</strong> 20% ili 30% (ovisno o visini)</li>
                <li>• <strong>Prirez:</strong> 0-18% (ovisno o gradu/općini)</li>
                <li>• <strong>Mirovinsko osiguranje I. stup:</strong> 15%</li>
                <li>• <strong>Mirovinsko osiguranje II. stup:</strong> 5%</li>
                <li>• <strong>Zdravstveno osiguranje:</strong> 16.5%</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Doprinosi Poslodavca</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Mirovinsko osiguranje I. stup:</strong> 15%</li>
                <li>• <strong>Zdravstveno osiguranje:</strong> 16.5%</li>
                <li>• <strong>Osiguranje za slučaj ozljede:</strong> 0.5%</li>
                <li>• <strong>Osiguranje za nezaposlenost:</strong> 1.7%</li>
                <li>• <strong>Ukupno doprinosi poslodavca:</strong> 33.7%</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Primjeri Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Primjeri
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Primjer 1: Bruto plaća 8.000 kn</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Bruto plaća:</strong> 8.000,00 kn</p>
                <p><strong>Doprinosi (36.5%):</strong> -2.920,00 kn</p>
                <p><strong>Porezna osnovica:</strong> 5.080,00 kn</p>
                <p><strong>Osobni odbitak:</strong> -4.000,00 kn</p>
                <p><strong>Porez (20%):</strong> -216,00 kn</p>
                <p className="font-semibold text-green-600"><strong>Neto plaća:</strong> 4.864,00 kn</p>
                <p className="text-sm text-gray-500"><strong>Trošak poslodavca:</strong> 10.696,00 kn</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Primjer 2: Bruto plaća 15.000 kn</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Bruto plaća:</strong> 15.000,00 kn</p>
                <p><strong>Doprinosi (36.5%):</strong> -5.475,00 kn</p>
                <p><strong>Porezna osnovica:</strong> 9.525,00 kn</p>
                <p><strong>Osobni odbitak:</strong> -4.000,00 kn</p>
                <p><strong>Porez (20%/30%):</strong> -1.357,50 kn</p>
                <p className="font-semibold text-green-600"><strong>Neto plaća:</strong> 8.167,50 kn</p>
                <p className="text-sm text-gray-500"><strong>Trošak poslodavca:</strong> 20.055,00 kn</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Česte pogreške Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Česte Pogreške
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-red-600 mb-3">❌ Zaboravljanje prireza</h3>
              <p className="text-gray-600 text-sm">Prirez se razlikuje po gradovima i općinama (0-18%) i značajno utječe na konačnu neto plaću.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-red-600 mb-3">❌ Miješanje bruto 1 i bruto 2</h3>
              <p className="text-gray-600 text-sm">Bruto 1 je plaća prije doprinosa, bruto 2 je nakon doprinosa ali prije poreza.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-red-600 mb-3">❌ Zanemarivanje neoporezivog dijela</h3>
              <p className="text-gray-600 text-sm">Osobni odbitak od 4.000 kn mjesečno značajno smanjuje poreznu osnovicu.</p>
            </div>
          </div>
        </div>
      </section>

      <SalaryFeatures />
      <SalaryBenefits />
      <SalaryFAQ />
      <RelatedCalculators />
    </>
  );
}