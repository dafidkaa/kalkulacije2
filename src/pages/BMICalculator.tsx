import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolSchema, BreadcrumbSchema, HowToSchema } from '../components/SchemaMarkup';
import { BMIForm } from '../components/bmi/BMIForm';
import { BMIFeatures } from '../components/bmi/BMIFeatures';
import { BMIBenefits } from '../components/bmi/BMIBenefits';
import { BMIFAQ } from '../components/bmi/BMIFAQ';
import { RelatedCalculators } from '../components/RelatedCalculators';
import { QuickAnswer, ComparisonTable, StatisticCard } from '../components/FeaturedSnippets';
import { AISummary, UseCaseExample } from '../components/GEOComponents';
import { Heart, TrendingUp, Activity } from 'lucide-react';

export function BMICalculator() {
  return (
    <>
      <Helmet>
        <title>BMI Kalkulator | Izračun Indeksa Tjelesne Mase | Kalkulacije.com</title>
        <meta
          name="description"
          content="💪 Besplatni BMI kalkulator na hrvatskom. Izračunajte indeks tjelesne mase, idealnu težinu i dobijte zdravstvene preporuke. Jednostavan i precizan BMI izračun."
        />
        <meta
          name="keywords"
          content="bmi kalkulator, indeks tjelesne mase, izračun idealne težine, kalkulator težine, zdravstveni kalkulator, BMI tablica, normalna težina"
        />
        <link rel="canonical" href="https://kalkulacije.com/kalkulator-bmi" />
      </Helmet>

      <ToolSchema
        name="BMI Kalkulator"
        description="Besplatni kalkulator za izračun indeksa tjelesne mase (BMI) s preporukama za idealnu težinu i zdravstvenim savjetima."
        url="https://kalkulacije.com/kalkulator-bmi"
        keywords={[
          'bmi kalkulator', 'indeks tjelesne mase', 'izračun idealne težine',
          'kalkulator težine', 'zdravstveni kalkulator', 'BMI tablica'
        ]}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Početna', url: 'https://kalkulacije.com/' },
          { name: 'BMI Kalkulator', url: 'https://kalkulacije.com/kalkulator-bmi' }
        ]}
      />

      <HowToSchema
        name="Kako izračunati BMI?"
        description="Jednostavan vodič za izračun indeksa tjelesne mase (BMI) koristeći naš besplatni kalkulator."
        steps={[
          { name: 'Odabir sustava', text: 'Odaberite želite li unos u metričkom (kg/cm) ili imperijalnom (lbs/in) sustavu.' },
          { name: 'Unos visine', text: 'Unesite svoju točnu visinu.' },
          { name: 'Unos težine', text: 'Unesite svoju trenutnu tjelesnu težinu.' },
          { name: 'Rezultat', text: 'Kalkulator odmah prikazuje vaš BMI i kategoriju u koju spadate.' }
        ]}
      />

      <section className="pt-16 pb-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-display">
            Kalkulator BMI
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Izračunajte svoj indeks tjelesne mase (BMI).
            <span className="block text-sm mt-2 text-gray-500">Provjerite jeste li u zdravom rasponu težine u sekundi.</span>
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <BMIForm />
        </div>
      </section>

      {/* AI-Friendly Summary */}
      <AISummary
        summary="BMI kalkulator izračunava indeks tjelesne mase (Body Mass Index) iz visine i težine. BMI = težina (kg) / visina² (m). Kategorije: pothranjenost (<18.5), normalna težina (18.5-24.9), prekomjerna težina (25-29.9), pretilost (≥30). Besplatno, bez registracije."
        keywords={[
          'bmi kalkulator',
          'indeks tjelesne mase',
          'idealna težina',
          'zdravstvena težina',
          'bmi tablica',
          'izračun bmi'
        ]}
        useCases={[
          'Provjera zdravstvene težine - jeste li u normalnom rasponu',
          'Praćenje napretka mršavljenja ili debljanja',
          'Planiranje dijete i vježbanja',
          'Zdravstveni pregled - priprema za liječnika'
        ]}
        statistics={[
          { label: 'Normalan BMI raspon', value: '18.5 - 24.9', source: 'WHO' },
          { label: 'Prosječan BMI u Hrvatskoj', value: '26.2', source: 'WHO, 2023' },
          { label: 'Preporučena težina za 170cm', value: '53-72 kg', source: 'BMI formula' }
        ]}
      />

      {/* Quick Answer & Statistics */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <QuickAnswer
            question="Kako izračunati BMI?"
            answer="BMI = težina (kg) / visina² (m)"
            highlight="Primjer: 70 kg / (1.75 m)² = 22.9 BMI (normalna težina)"
            details="Unesite visinu i težinu u kalkulator iznad za automatski izračun s kategorijom i preporukama."
          />

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <StatisticCard
              value="18.5-24.9"
              label="Normalan BMI raspon"
              source="WHO"
              trend="neutral"
              color="green"
            />
            <StatisticCard
              value="26.2"
              label="Prosječan BMI u Hrvatskoj"
              source="WHO, 2023"
              trend="up"
              color="orange"
            />
            <StatisticCard
              value="<18.5"
              label="Pothranjenost"
              source="WHO klasifikacija"
              trend="down"
              color="blue"
            />
          </div>

          {/* Comparison Table */}
          <ComparisonTable
            title="BMI Kategorije i Zdravstveni Rizici"
            caption="Klasifikacija prema Svjetskoj zdravstvenoj organizaciji (WHO)"
            headers={['BMI Raspon', 'Kategorija', 'Zdravstveni Rizik']}
            rows={[
              ['< 18.5', 'Pothranjenost', 'Povećan rizik'],
              ['18.5 - 24.9', 'Normalna težina', 'Minimalan rizik'],
              ['25.0 - 29.9', 'Prekomjerna težina', 'Umjereno povećan'],
              ['30.0 - 34.9', 'Pretilost I stupnja', 'Visok rizik'],
              ['35.0 - 39.9', 'Pretilost II stupnja', 'Vrlo visok rizik'],
              ['≥ 40.0', 'Pretilost III stupnja', 'Ekstremno visok']
            ]}
            highlightColumn={1}
          />
        </div>
      </section>

      {/* Use Case Examples */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Primjeri Korištenja</h2>

          <UseCaseExample
            title="Primjer 1: Provjera Zdravstvene Težine"
            scenario="Ana je visoka 165 cm i teška 58 kg. Želi provjeriti je li u zdravom rasponu težine."
            input="Visina: 165 cm, Težina: 58 kg"
            output="BMI: 21.3 (Normalna težina)"
            explanation="Ana je u zdravom rasponu težine. BMI između 18.5 i 24.9 smatra se normalnim i nosi minimalan zdravstveni rizik."
            icon={<Heart className="w-6 h-6 text-green-600" />}
          />

          <UseCaseExample
            title="Primjer 2: Planiranje Mršavljenja"
            scenario="Marko je visok 180 cm i težak 95 kg. Želi znati koliko treba smršaviti da bude u normalnom rasponu."
            input="Visina: 180 cm, Težina: 95 kg"
            output="BMI: 29.3 (Prekomjerna težina) | Cilj: 75-81 kg za normalan BMI"
            explanation="Marko je blizu granice pretilosti. Za normalan BMI (24.9), trebao bi težiti maksimalno 81 kg, što znači mršavljenje od 14 kg."
            icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
          />

          <UseCaseExample
            title="Primjer 3: Praćenje Napretka"
            scenario="Ivana je počela s 85 kg (BMI 30.7) i nakon 3 mjeseca dijete i vježbanja ima 78 kg."
            input="Početak: 85 kg (BMI 30.7) → Sada: 78 kg"
            output="Novi BMI: 28.2 (Prekomjerna težina) | Napredak: -7 kg, -2.5 BMI"
            explanation="Ivana je smršavila 7 kg i prešla iz pretilosti u prekomjernu težinu. Još 10 kg do normalnog BMI-a (24.9)."
            icon={<Activity className="w-6 h-6 text-purple-600" />}
          />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kako Izračunati BMI?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">1.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Sustav</h3>
              <p className="text-gray-600 text-sm">Odaberite metrički (kg/cm) ili imperijalni sustav</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">2.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Visina</h3>
              <p className="text-gray-600 text-sm">Upišite svoju visinu (preciznost je važna)</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">3.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Težina</h3>
              <p className="text-gray-600 text-sm">Upišite svoju trenutnu tjelesnu težinu</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">4.</div>
              <h3 className="font-semibold text-gray-900 mb-2">Analiza</h3>
              <p className="text-gray-600 text-sm">Saznajte spadate li u pothranjenost, normalnu težinu ili pretilost</p>
            </div>
          </div>
        </div>
      </section>

      <BMIFeatures />
      <BMIBenefits />
      <BMIFAQ />
      <RelatedCalculators />
    </>
  );
}