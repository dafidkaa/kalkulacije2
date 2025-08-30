import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema, HowToSchema, FAQSchema, BreadcrumbSchema } from '../components/SchemaMarkup';
import { CalculatorTabs } from '../components/calculator/CalculatorTabs';
import { CalculatorFeatures } from '../components/calculator/CalculatorFeatures';
import { CalculatorBenefits } from '../components/calculator/CalculatorBenefits';
import { CalculatorFAQ } from '../components/calculator/CalculatorFAQ';

type CalculatorMode = 'regular' | 'scientific';
type InputMode = 'buttons' | 'text';

export function Calculator() {
  const [calculatorMode, setCalculatorMode] = useState<CalculatorMode>('regular');
  const [inputMode, setInputMode] = useState<InputMode>('buttons');
  const calculatorRef = useRef<HTMLElement>(null);

  const handleFeatureClick = (mode: CalculatorMode, input: InputMode) => {
    setCalculatorMode(mode);
    setInputMode(input);
    // Smooth scroll to calculator section
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // FAQ data for schema
  const faqData = [
    {
      question: 'Kako koristiti glasovni unos i AI pomoć?',
      answer: 'Kliknite na ikonu mikrofona pokraj tekstualnog polja i izgovorite svoj matematički izraz. Ako lokalni kalkulator ne može riješiti izraz, pojavit će se gumb "Pokušaj s AI" koji koristi naprednu AI tehnologiju za rješavanje složenih problema.'
    },
    {
      question: 'Koje matematičke operacije podržava znanstveni kalkulator?',
      answer: 'Znanstveni kalkulator podržava trigonometrijske funkcije (sin, cos, tan), logaritme (log, ln), kvadratni korijen, stepene, faktorijalе i mnoge druge napredne matematičke operacije.'
    },
    {
      question: 'Mogu li koristiti tipkovnicu za unos?',
      answer: 'Da! Kalkulator podržava tipkovnicu. Možete koristiti brojeve, operatore (+, -, *, /), Enter za jednako, Escape za brisanje i mnoge druge tipke za brže računanje.'
    },
    {
      question: 'Kako funkcionira tekstualni unos matematičkih izraza?',
      answer: 'U tekstualnom načinu možete upisati matematičke izraze prirodnim jezikom poput "25 plus 37", "kvadratni korijen od 144" ili "15 posto od 200". Kalkulator će automatski parsirati i izračunati rezultat.'
    }
  ];

  // How-to steps for schema
  const howToSteps = [
    {
      name: 'Odaberite način rada',
      text: 'Odaberite između osnovnog i znanstvenog kalkulatora ovisno o vašim potrebama.'
    },
    {
      name: 'Odaberite način unosa',
      text: 'Odaberite između unosa gumbovima ili tekstualnog unosa s mogućnošću glasovnog unosa.'
    },
    {
      name: 'Unesite matematički izraz',
      text: 'Koristite gumbove, tipkovnicu ili glasovni unos za unos vašeg matematičkog izraza.'
    },
    {
      name: 'Dobijte rezultat',
      text: 'Pritisnite jednako (=) ili Enter za izračun rezultata. Rezultat će se prikazati odmah.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Kalkulator | Osnovni i Znanstveni Kalkulator s Glasovnim Unosom</title>
        <meta
          name="description"
          content="Napredni online kalkulator s AI podrškom, osnovnim i znanstvenim funkcijama. Podržava glasovni unos, tipkovnicu i prirodni jezik. AI automatski rješava složene matematičke probleme."
        />
        <meta
          name="keywords"
          content="kalkulator, AI kalkulator, online kalkulator, znanstveni kalkulator, glasovni kalkulator, matematički kalkulator, kalkulator s AI, besplatni kalkulator, groq AI, kalkulator s gumbovima, tekstualni kalkulator"
        />
        <meta property="og:title" content="AI Kalkulator - Napredni Online Kalkulator s Glasovnim Unosom" />
        <meta property="og:description" content="Napredni online kalkulator s AI podrškom, osnovnim i znanstvenim funkcijama. Podržava glasovni unos, tipkovnicu i prirodni jezik." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kalkulacije.com/kalkulator" />
        <meta property="og:image" content="https://kalkulacije.com/calculator-preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Kalkulator - Napredni Online Kalkulator s Glasovnim Unosom" />
        <meta name="twitter:description" content="Napredni online kalkulator s AI podrškom, osnovnim i znanstvenim funkcijama. Podržava glasovni unos, tipkovnicu i prirodni jezik." />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Kalkulacije.com" />
        <link rel="canonical" href="https://kalkulacije.com/kalkulator" />
        <link rel="canonical" href="https://kalkulacije.com/kalkulator" />
      </Helmet>

      <ToolSchema
        name="AI Kalkulator"
        description="Napredni online kalkulator s AI podrškom, osnovnim i znanstvenim funkcijama, glasovnim unosom i automatskim rješavanjem složenih matematičkih problema."
        url="https://kalkulacije.com/kalkulator"
        keywords={[
          'AI kalkulator', 'online kalkulator', 'znanstveni kalkulator', 'glasovni kalkulator',
          'matematički kalkulator', 'kalkulator s AI', 'groq AI', 'besplatni kalkulator'
        ]}
      />

      {/* Additional JSON-LD for SoftwareApplication */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "AI Kalkulator",
          "description": "Napredni online kalkulator s AI podrškom, osnovnim i znanstvenim funkcijama, glasovnim unosom i automatskim rješavanjem složenih matematičkih problema.",
          "url": "https://kalkulacije.com/kalkulator",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
          },
          "featureList": [
            "AI podrška za složene matematičke probleme",
            "Glasovni unos na hrvatskom i engleskom jeziku",
            "Osnovni i znanstveni kalkulator",
            "Tekstualni unos prirodnim jezikom",
            "Gumbovi za brže računanje",
            "Memorijske funkcije",
            "Povijest izračuna"
          ],
          "screenshot": "https://kalkulacije.com/calculator-screenshot.jpg",
          "author": {
            "@type": "Organization",
            "name": "Kalkulacije.com"
          }
        })}
      </script>

      <HowToSchema
        name="Kako koristiti kalkulator"
        description="Jednostavne upute za korištenje osnovnog i znanstvenog kalkulatora s glasovnim unosom."
        steps={howToSteps}
      />

      <FAQSchema
        questions={faqData}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Početna', url: 'https://kalkulacije.com/' },
          { name: 'Kalkulator', url: 'https://kalkulacije.com/kalkulator' }
        ]}
      />

      {/* Hero Section */}
      <section className="pt-12 pb-6 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            AI Kalkulator - Napredni Online Kalkulator s Glasovnim Unosom
          </h1>
          <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
            Napredni online kalkulator s AI podrškom, osnovnim i znanstvenim funkcijama.
            Automatski rješava složene matematičke probleme glasovnim unosom i prirodnim jezikom.
            Podržava gumbove, tekstualni unos i memorijske funkcije za sve vaše matematičke potrebe.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section ref={calculatorRef} className="py-6">
        <div className="container mx-auto px-4 max-w-5xl">
          <CalculatorTabs
            calculatorMode={calculatorMode}
            inputMode={inputMode}
            onCalculatorModeChange={setCalculatorMode}
            onInputModeChange={setInputMode}
          />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kako Koristiti AI Kalkulator
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🔢 Gumbovi Kalkulator
              </h3>
              <ol className="space-y-2 text-gray-600">
                <li>1. Odaberite "Osnovni" ili "Znanstveni" tip</li>
                <li>2. Kliknite gumbove za unos brojeva i operacija</li>
                <li>3. Pritisnite "=" za rezultat</li>
                <li>4. Koristite memorijske funkcije (M+, M-, MC)</li>
              </ol>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🎤 Tekstualni i Glasovni Unos
              </h3>
              <ol className="space-y-2 text-gray-600">
                <li>1. Odaberite "Tekstualni" unos</li>
                <li>2. Upišite izraz ili kliknite mikrofon</li>
                <li>3. Govorite prirodnim jezikom</li>
                <li>4. AI automatski rješava složene probleme</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <CalculatorFeatures onFeatureClick={handleFeatureClick} />
      <CalculatorBenefits />
      <CalculatorFAQ />
    </>
  );
}
