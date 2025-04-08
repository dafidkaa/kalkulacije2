import React from 'react';

export function TemperatureDetails() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Detaljni Vodič za Pretvorbu Temperature
        </h2>

        {/* Basic Temperature Conversion */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Osnovne Pretvorbe Temperature
              </h3>
              <p className="text-gray-600 mb-4">
                Pretvorba temperature između različitih mjernih jedinica ključna je vještina u mnogim područjima, od svakodnevnog života do znanosti i inženjerstva. Naš pretvarač omogućuje jednostavno i precizno pretvaranje između svih glavnih temperaturnih ljestvica.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Glavne formule za pretvorbu:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Celzij u Fahrenheit:</strong> °F = °C × (9/5) + 32</li>
                    <li><strong>Fahrenheit u Celzij:</strong> °C = (°F - 32) × (5/9)</li>
                    <li><strong>Celzij u Kelvin:</strong> K = °C + 273.15</li>
                    <li><strong>Kelvin u Celzij:</strong> °C = K - 273.15</li>
                    <li><strong>Fahrenheit u Kelvin:</strong> K = (°F - 32) × (5/9) + 273.15</li>
                    <li><strong>Kelvin u Fahrenheit:</strong> °F = (K - 273.15) × (9/5) + 32</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Naš pretvarač temperature podržava i druge, manje poznate temperaturne ljestvice poput Rankine, Réaumur, Delisle, Newton i Rømer, što ga čini sveobuhvatnim alatom za sve potrebe pretvorbe temperature.
                </p>
                <p className="text-gray-600">
                  Ključne riječi: pretvarač temperature, konverter temperature, pretvorba temperature, Celzij u Fahrenheit, Fahrenheit u Celzij, Kelvin pretvorba, formula za pretvorbu temperature
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Scales */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M12 7v5l4 2" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Temperaturne Ljestvice i Njihova Povijest
              </h3>
              <p className="text-gray-600 mb-4">
                Kroz povijest su razvijene različite temperaturne ljestvice, svaka sa svojim referentnim točkama i primjenama. Razumijevanje ovih ljestvica pomaže u boljem shvaćanju temperature i njezine uloge u različitim kontekstima.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Glavne temperaturne ljestvice:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Celzijeva ljestvica (°C):</strong> Razvijena 1742. godine od strane Andersa Celzija. Izvorno je 0° bila točka vrelišta vode, a 100° točka ledišta, ali je kasnije obrnuta. Danas je 0°C točka ledišta vode, a 100°C točka vrelišta vode pri standardnom atmosferskom tlaku.</li>
                    <li><strong>Fahrenheitova ljestvica (°F):</strong> Razvijena 1724. godine od strane Daniela Gabriela Fahrenheita. Definirana je tako da je 32°F točka ledišta vode, a 212°F točka vrelišta vode pri standardnom atmosferskom tlaku.</li>
                    <li><strong>Kelvinova ljestvica (K):</strong> Razvijena 1848. godine od strane Lorda Kelvina. To je apsolutna temperaturna ljestvica gdje je 0K apsolutna nula, najniža teoretski moguća temperatura. 273.15K odgovara 0°C.</li>
                    <li><strong>Rankineova ljestvica (°R):</strong> Razvijena 1859. godine od strane Williama Johna Macquorna Rankinea. To je apsolutna temperaturna ljestvica bazirana na Fahrenheitovoj ljestvici, gdje je 0°R apsolutna nula.</li>
                    <li><strong>Réaumurova ljestvica (°Ré):</strong> Razvijena 1730. godine od strane Renéa Antoinea Ferchaulta de Réaumura. Definirana je tako da je 0°Ré točka ledišta vode, a 80°Ré točka vrelišta vode.</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Danas se Celzijeva ljestvica koristi u većini zemalja svijeta, Fahrenheitova ljestvica primarno u SAD-u, a Kelvinova ljestvica u znanstvenim i inženjerskim primjenama gdje je potrebna apsolutna temperaturna ljestvica.
                </p>
                <p className="text-gray-600">
                  Ključne riječi: temperaturne ljestvice, povijest temperature, Celzijeva ljestvica, Fahrenheitova ljestvica, Kelvinova ljestvica, Rankineova ljestvica, Réaumurova ljestvica, apsolutna nula
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Applications */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 5h8" />
                  <path d="M8 10h8" />
                  <path d="M8 15h8" />
                  <path d="M8 20h8" />
                  <path d="M12 5v15" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Praktične Primjene Pretvorbe Temperature
              </h3>
              <p className="text-gray-600 mb-4">
                Pretvorba temperature ima brojne praktične primjene u svakodnevnom životu, od kuhanja i vremenske prognoze do zdravlja i znanosti. Naš pretvarač nudi specijalizirane alate za različite kontekste.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Primjene u različitim područjima:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Kuhanje i pečenje:</strong> Pretvorba između Celzija i Fahrenheita za recepte iz različitih zemalja. Naš pretvarač za kuhanje nudi preporuke za različite temperature pećnice i jela koja se pripremaju na tim temperaturama.</li>
                    <li><strong>Vremenska prognoza:</strong> Razumijevanje vremenskih prognoza pri putovanju u zemlje koje koriste različite temperaturne ljestvice. Naš pretvarač za vrijeme nudi preporuke za odjeću i osjećaj temperature.</li>
                    <li><strong>Zdravlje:</strong> Pretvorba tjelesne temperature između Celzija i Fahrenheita, posebno važno za razumijevanje medicinskih informacija iz različitih izvora.</li>
                    <li><strong>Znanost i obrazovanje:</strong> Precizne pretvorbe za znanstvene eksperimente i obrazovne svrhe, uključujući podršku za znanstvenu notaciju i fizikalne karakteristike na različitim temperaturama.</li>
                    <li><strong>Industrija i inženjerstvo:</strong> Pretvorbe za industrijske procese i inženjerske proračune, gdje se često koriste različite temperaturne ljestvice ovisno o kontekstu.</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Naš pretvarač temperature dizajniran je da pokrije sve ove primjene s intuitivnim sučeljem i detaljnim objašnjenjima, čineći ga korisnim alatom za širok raspon korisnika.
                </p>
                <p className="text-gray-600">
                  Ključne riječi: primjene pretvorbe temperature, kuhanje temperature, vremenska prognoza, tjelesna temperatura, znanstvena temperatura, industrijska temperatura, temperatura pećnice, pretvaranje temperature za kuhanje
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reference Points */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Referentne Točke Temperature
              </h3>
              <p className="text-gray-600 mb-4">
                Referentne točke temperature pomažu nam razumjeti i kontekstualizirati različite temperature. Naš pretvarač nudi usporedbu s uobičajenim referentnim točkama iz svakodnevnog života, vremena, znanosti i kuhanja.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Važne referentne točke temperature:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-800">Svakodnevne referentne točke:</h5>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Tjelesna temperatura: 37°C / 98.6°F</li>
                        <li>Sobna temperatura: 20-22°C / 68-72°F</li>
                        <li>Temperatura hladnjaka: 4°C / 39°F</li>
                        <li>Temperatura zamrzivača: -18°C / 0°F</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Znanstvene referentne točke:</h5>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Apsolutna nula: -273.15°C / -459.67°F / 0K</li>
                        <li>Ledište vode: 0°C / 32°F / 273.15K</li>
                        <li>Vrelište vode: 100°C / 212°F / 373.15K</li>
                        <li>Trojna točka vode: 0.01°C / 32.02°F / 273.16K</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Naš alat za referentne točke omogućuje vam da usporedite bilo koju temperaturu s ovim i mnogim drugim referentnim točkama, pružajući kontekst i bolje razumijevanje temperature koju promatrate.
                </p>
                <p className="text-gray-600">
                  Ključne riječi: referentne točke temperature, apsolutna nula, ledište vode, vrelište vode, tjelesna temperatura, sobna temperatura, temperatura hladnjaka, temperatura zamrzivača, trojna točka vode
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
