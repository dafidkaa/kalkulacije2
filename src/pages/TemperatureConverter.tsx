import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema, HowToSchema, FAQSchema, BreadcrumbSchema } from '../components/SchemaMarkup';
import { TemperatureTabs } from '../components/temperature/TemperatureTabs';
import { TemperatureFeatures } from '../components/temperature/TemperatureFeatures';
import { TemperatureDetails } from '../components/temperature/TemperatureDetails';
import { TemperatureFAQ } from '../components/temperature/TemperatureFAQ';
import { QuickAnswer, ComparisonTable, StatisticCard } from '../components/FeaturedSnippets';
import { AISummary, UseCaseExample } from '../components/GEOComponents';
import { Thermometer, Sun, CloudSnow } from 'lucide-react';

export function TemperatureConverter() {
  // FAQ data for schema
  const faqData = [
    {
      question: 'Koja je razlika između Celzija i Fahrenheita?',
      answer: 'Celzij (°C) i Fahrenheit (°F) su dvije različite temperaturne ljestvice. U Celzijevoj ljestvici, voda se smrzava na 0°C i vrije na 100°C pri standardnom atmosferskom tlaku. U Fahrenheitovoj ljestvici, voda se smrzava na 32°F i vrije na 212°F.'
    },
    {
      question: 'Kako pretvoriti Celzij u Fahrenheit?',
      answer: 'Za pretvorbu temperature iz Celzija (°C) u Fahrenheit (°F), koristite formulu: °F = °C × (9/5) + 32. Na primjer, za pretvorbu 25°C u Fahrenheit: °F = 25 × (9/5) + 32 = 25 × 1.8 + 32 = 45 + 32 = 77°F.'
    },
    {
      question: 'Što je Kelvin i kako ga pretvoriti u Celzij?',
      answer: 'Kelvin (K) je SI jedinica za temperaturu i apsolutna temperaturna ljestvica. Za pretvorbu iz Kelvina u Celzij, koristite formulu: °C = K - 273.15. Na primjer, 300K = 300 - 273.15 = 26.85°C.'
    }
  ];

  // How-to steps for schema
  const howToSteps = [
    {
      name: 'Odaberite vrstu pretvarača',
      text: 'Odaberite željenu funkciju: osnovni pretvarač, svi pretvarači odjednom, referentne točke ili praktični alati.'
    },
    {
      name: 'Unesite temperaturu',
      text: 'Unesite vrijednost temperature koju želite pretvoriti.'
    },
    {
      name: 'Odaberite početnu i ciljnu jedinicu',
      text: 'Odaberite iz koje jedinice (npr. Celzij) u koju jedinicu (npr. Fahrenheit) želite pretvoriti temperaturu.'
    },
    {
      name: 'Pregledajte rezultate',
      text: 'Pregledajte pretvorenu temperaturu i dodatne informacije poput formula i referentnih točaka.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pretvarač Temperature | Celzij, Fahrenheit, Kelvin Konverter</title>
        <meta
          name="description"
          content="Besplatni online pretvarač temperature na hrvatskom jeziku. Pretvorite temperature između Celzija, Fahrenheita, Kelvina i drugih jedinica. Saznajte referentne točke temperature i koristite praktične alate za svakodnevne potrebe."
        />
        <meta
          name="keywords"
          content="pretvarač temperature, konverter temperature, pretvorba temperature, Celzij u Fahrenheit, Fahrenheit u Celzij, Kelvin pretvorba, kalkulator temperature, formula za pretvorbu temperature, pretvaranje Celzija u Fahrenheit, Kelvin u Celzij, Rankine skala, Réaumur temperatura, referentne točke temperature, temperatura pećnice, vremenska temperatura"
        />
        <link rel="canonical" href="https://kalkulacije.com/pretvarac-temperature" />
      </Helmet>

      <ToolSchema
        name="Pretvarač Temperature"
        description="Sveobuhvatni pretvarač za pretvaranje temperatura između Celzija, Fahrenheita, Kelvina i drugih jedinica, s referentnim točkama i praktičnim alatima."
        url="https://kalkulacije.com/pretvarac-temperature"
        keywords={[
          'pretvarač temperature', 'konverter temperature', 'Celzij u Fahrenheit', 'Fahrenheit u Celzij',
          'Kelvin pretvorba', 'temperatura pećnice', 'vremenska temperatura'
        ]}
      />

      <HowToSchema
        name="Kako koristiti pretvarač temperature"
        description="Jednostavne upute za korištenje pretvarača temperature za pretvaranje između Celzija, Fahrenheita, Kelvina i drugih jedinica."
        steps={howToSteps}
      />

      <FAQSchema
        questions={faqData}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Početna', url: 'https://kalkulacije.com/' },
          { name: 'Pretvarač Temperature', url: 'https://kalkulacije.com/pretvarac-temperature' }
        ]}
      />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="pt-16 pb-8 text-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-display">
            Pretvarač Temperature
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            <span>
              Sveobuhvatni alat za pretvaranje temperature između Celzija, Fahrenheita, Kelvina i drugih jedinica.
              Saznajte referentne točke temperature i koristite praktične alate.
            </span>
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <TemperatureTabs />
        </div>
      </section>

      {/* AI Summary */}
      <AISummary
        summary="Kalkulator i pretvarač temperature. Pretvorite Celzijuse u Fahrenheite (°C u °F) i Kelvine. Precizne formule za kuhanje, znanost i vremensku prognozu."
        keywords={['pretvarač temperature', 'celzijus u morenheit', 'stupnjevi formula', 'kelvin to celsius', 'kuhinjske temperature']}
        useCases={[
          'Pretvaranje recepta iz američke kuharice (°F u °C)',
          'Razumijevanje vremenske prognoze u inozemstvu',
          'Znanstveni izračuni u Kelvinima'
        ]}
        statistics={[
          { label: 'Vrelište vode', value: '100°C / 212°F', source: 'Fizika' },
          { label: 'Ledište vode', value: '0°C / 32°F', source: 'Fizika' },
          { label: 'Apsolutna nula', value: '-273.15°C', source: '0 Kelvin' }
        ]}
      />

      {/* Quick Answer */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <QuickAnswer
            question="Kako pretvoriti Celzij u Fahrenheit?"
            answer="Pomnožite temperaturu u Celzijima s 1.8 i dodajte 32."
            highlight="Formula: (°C × 1.8) + 32 = °F"
            details="Za brzu procjenu napamet: pomnožite s 2 i dodajte 30 (npr. 20°C -> 40+30=70°F, stvarna je 68°F)."
          />

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <StatisticCard
              value="37°C"
              label="Tjelesna temperatura"
              source="Medicina"
              color="orange"
            />
            <StatisticCard
              value="98.6°F"
              label="Tjelesna temperatura"
              source="Medicina (US)"
              color="blue"
            />
            <StatisticCard
              value="273 K"
              label="Ledište vode"
              source="SI Sustav"
              color="purple"
            />
          </div>

          <ComparisonTable
            title="Važne Temperaturne Točke"
            caption="Usporedba skala na ključnim točkama"
            headers={['Opis', 'Celzij (°C)', 'Fahrenheit (°F)', 'Kelvin (K)']}
            rows={[
              ['Apsolutna nula', '-273.15°C', '-459.67°F', '0 K'],
              ['Smrzavanje vode', '0°C', '32°F', '273.15 K'],
              ['Sobna temperatura', '20-25°C', '68-77°F', '293-298 K'],
              ['Ljudsko tijelo', '37°C', '98.6°F', '310.15 K'],
              ['Vrenje vode', '100°C', '212°F', '373.15 K']
            ]}
            highlightColumn={1}
          />
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Primjeri Korištenja</h2>

          <UseCaseExample
            title="Primjer 1: Pečenje Kolača"
            scenario="Recept kaže: peći na 350°F. Koliko je to naših stupnjeva?"
            input="350°F"
            output="175°C - 180°C"
            explanation="Američki recepti često koriste 350°F, što je standardnih 180°C za pećnicu."
            icon={<Thermometer className="w-6 h-6 text-red-600" />}
          />

          <UseCaseExample
            title="Primjer 2: Ljetna Vrućina"
            scenario="U vijestima kažu 'heatwave of 100°F'."
            input="100°F"
            output="37.8°C"
            explanation="100°F je psihološka granica izuzetne vrućine u SAD-u."
            icon={<Sun className="w-6 h-6 text-orange-600" />}
          />

          <UseCaseExample
            title="Primjer 3: Znanstveni Eksperiment"
            scenario="Temperatura tekućeg dušika je 77 Kelvina."
            input="77 K"
            output="-196°C"
            explanation="Oduzimanjem 273.15 od Kelvina dobivamo Celzijeve stupnjeve."
            icon={<CloudSnow className="w-6 h-6 text-blue-600" />}
          />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kako Koristiti Pretvarač Temperature?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-orange-600 mb-2">1.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Ljestvica</h3>
              <p className="text-gray-600 text-sm">Odaberite ulaznu jedinicu (npr. Celzij).</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-orange-600 mb-2">2.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Unos</h3>
              <p className="text-gray-600 text-sm">Upišite temperaturu koju želite pretvoriti.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-orange-600 mb-2">3.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Cilj</h3>
              <p className="text-gray-600 text-sm">Odaberite u koju jedinicu pretvarate (npr. Fahrenheit).</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-orange-600 mb-2">4.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Rezultat</h3>
              <p className="text-gray-600 text-sm">Dobijte točan iznos i formulu za izračun.</p>
            </div>
          </div>
        </div>
      </section>

      <TemperatureFeatures />
      <TemperatureDetails />
      <TemperatureFAQ />
    </>
  );
}
