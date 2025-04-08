import React from 'react';

export function DateDetails() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Detaljni Vodič za Izračun Datuma
        </h2>

        {/* Date Difference Calculator */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 14v1" />
                  <path d="M9 19v2" />
                  <path d="M9 3v2" />
                  <path d="M9 9v1" />
                  <path d="M15 14v1" />
                  <path d="M15 19v2" />
                  <path d="M15 3v2" />
                  <path d="M15 9v1" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Izračun Razlike Između Datuma
              </h3>
              <p className="text-gray-600 mb-4">
                Izračun razlike između dva datuma je jedna od najčešćih operacija s datumima. Naš kalkulator omogućuje precizno izračunavanje razlike u godinama, mjesecima, tjednima i danima, s mogućnošću prikaza detaljnog ili sažetog rezultata.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Kako se izračunava razlika između datuma:</h4>
                  <p className="text-gray-600">
                    Izračun razlike između datuma može biti složeniji nego što se čini na prvi pogled. Naš kalkulator koristi dva glavna pristupa:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 mt-2">
                    <li><strong>Ukupni dani:</strong> Najjednostavniji način je izračunati ukupan broj dana između dva datuma. Ovo daje precizan rezultat, ali nije uvijek najintuitivniji za korisnika.</li>
                    <li><strong>Godine, mjeseci i dani:</strong> Ovaj pristup daje rezultat u formatu koji je prirodniji za ljude, ali je složeniji za izračun zbog različitih duljina mjeseci i prijestupnih godina.</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Naš kalkulator razlike između datuma idealan je za planiranje projekata, izračun trajanja ugovora, praćenje vremena između događaja i mnoge druge primjene gdje je potrebno znati točnu vremensku razliku.
                </p>
                <p className="text-gray-600">
                  Ključne riječi: kalkulator datuma, izračun razlike između datuma, razlika u danima, razlika u godinama i mjesecima, vremenski razmak, trajanje
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Subtract Date Calculator */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M15 3v18" />
                  <path d="M9 15l3-3 3 3" />
                  <path d="M10 9h4" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Dodavanje i Oduzimanje Dana od Datuma
              </h3>
              <p className="text-gray-600 mb-4">
                Dodavanje ili oduzimanje određenog broja dana, tjedana, mjeseci ili godina od datuma je korisna funkcionalnost za planiranje budućih događaja ili izračunavanje prošlih datuma. Naš kalkulator omogućuje jednostavno dodavanje ili oduzimanje vremenskih jedinica od odabranog datuma.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Primjene dodavanja i oduzimanja datuma:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Planiranje projekata:</strong> Izračunavanje rokova i ključnih datuma na temelju početnog datuma i trajanja zadataka.</li>
                    <li><strong>Financijsko planiranje:</strong> Izračunavanje datuma dospijeća plaćanja, datuma obnove ugovora ili datuma isteka jamstva.</li>
                    <li><strong>Zdravstvo:</strong> Izračunavanje datuma kontrolnih pregleda, trajanja terapije ili očekivanog datuma poroda.</li>
                    <li><strong>Pravni rokovi:</strong> Izračunavanje rokova za pravne postupke, žalbe ili dostavu dokumenata.</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Naš kalkulator za dodavanje i oduzimanje datuma pruža dodatne informacije o rezultatu, uključujući dan u tjednu, tjedan u godini, dan u godini i informaciju o prijestupnoj godini, što ga čini sveobuhvatnim alatom za rad s datumima.
                </p>
                <p className="text-gray-600">
                  Ključne riječi: dodavanje dana datumu, oduzimanje dana od datuma, izračun budućeg datuma, izračun prošlog datuma, planiranje datuma, rokovi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Working Days Calculator */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M8 3v3" />
                  <path d="M16 3v3" />
                  <path d="M3 9h18" />
                  <path d="M9 14h6" />
                  <path d="M9 18h6" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Kalkulator Radnih Dana
              </h3>
              <p className="text-gray-600 mb-4">
                Izračun radnih dana između dva datuma je ključan za poslovno planiranje, upravljanje projektima i izračun rokova. Naš kalkulator radnih dana omogućuje precizno izračunavanje broja radnih dana, isključujući vikende i praznike.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Značajke kalkulatora radnih dana:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Isključivanje vikenda:</strong> Automatsko isključivanje subota i nedjelja iz izračuna.</li>
                    <li><strong>Hrvatski praznici:</strong> Uključeni su svi hrvatski državni praznici za preciznije izračune.</li>
                    <li><strong>Prilagođeni neradni dani:</strong> Mogućnost dodavanja vlastitih neradnih dana za specifične potrebe (godišnji odmori, lokalni praznici, itd.).</li>
                    <li><strong>Dva načina izračuna:</strong> Izračun radnih dana između dva datuma ili dodavanje određenog broja radnih dana na početni datum.</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Kalkulator radnih dana posebno je koristan za poslovno planiranje, izračun rokova isporuke, trajanje projekata, obračun plaća i sve situacije gdje je potrebno uzeti u obzir samo radne dane.
                </p>
                <p className="text-gray-600">
                  Ključne riječi: kalkulator radnih dana, izračun radnih dana, poslovni dani, radni tjedan, isključivanje vikenda, hrvatski praznici, neradni dani
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Age Calculator */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Kalkulator Starosti
              </h3>
              <p className="text-gray-600 mb-4">
                Kalkulator starosti omogućuje precizno izračunavanje starosti osobe u godinama, mjesecima i danima na temelju datuma rođenja. Osim osnovnog izračuna starosti, naš kalkulator nudi i dodatne zanimljive informacije.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Što sve nudi naš kalkulator starosti:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Precizna starost:</strong> Izračun točne starosti u godinama, mjesecima i danima.</li>
                    <li><strong>Različite jedinice:</strong> Prikaz starosti u različitim jedinicama (dani, tjedni, mjeseci, godine).</li>
                    <li><strong>Sljedeći rođendan:</strong> Izračun datuma sljedećeg rođendana i broja dana do njega.</li>
                    <li><strong>Horoskopski znak:</strong> Prikaz horoskopskog znaka i kineskog zodijaka na temelju datuma rođenja.</li>
                    <li><strong>Starost na određeni datum:</strong> Mogućnost izračuna starosti na bilo koji odabrani datum, ne samo trenutni.</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Kalkulator starosti koristan je za različite svrhe, od osobne znatiželje do službenih potreba poput provjere ispunjavanja dobnih uvjeta za određene usluge, pogodnosti ili pravne zahtjeve.
                </p>
                <p className="text-gray-600">
                  Ključne riječi: kalkulator starosti, izračun godina, koliko imam godina, točna starost, godine mjeseci i dani, horoskopski znak, kineski zodijak, sljedeći rođendan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Event Countdown */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Odbrojavanje do Događaja
              </h3>
              <p className="text-gray-600 mb-4">
                Odbrojavanje do važnih događaja pomaže u praćenju vremena do značajnih datuma u vašem životu. Naš alat za odbrojavanje omogućuje stvaranje i praćenje više događaja s detaljnim prikazom preostalog vremena.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Značajke odbrojavanja do događaja:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Precizno odbrojavanje:</strong> Prikaz preostalog vremena u danima, satima, minutama i sekundama.</li>
                    <li><strong>Uobičajeni događaji:</strong> Brzi odabir uobičajenih događaja poput praznika i blagdana.</li>
                    <li><strong>Kategorije događaja:</strong> Organizacija događaja po kategorijama (praznici, osobni, poslovni).</li>
                    <li><strong>Vizualni prikaz:</strong> Grafički prikaz napretka odbrojavanja.</li>
                    <li><strong>Spremanje događaja:</strong> Mogućnost spremanja više događaja i praćenja svih odbrojavanja na jednom mjestu.</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Alat za odbrojavanje do događaja idealan je za planiranje i praćenje važnih datuma poput rođendana, godišnjica, praznika, rokova, putovanja i drugih značajnih događaja u vašem životu.
                </p>
                <p className="text-gray-600">
                  Ključne riječi: odbrojavanje do datuma, praćenje događaja, koliko dana do, odbrojavanje do rođendana, odbrojavanje do praznika, planiranje događaja, važni datumi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
