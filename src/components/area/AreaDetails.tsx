import React from 'react';
import {
  Square,
  Circle,
  Triangle,
  MoveHorizontal,
  MapPin,
  Home,
  Building
} from 'lucide-react';

export function AreaDetails() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Detaljni Vodič za Izračun Površine
        </h2>

        {/* Geometric Shapes Calculator */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center">
                <Square className="w-12 h-12 text-teal-600" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Kalkulator Geometrijskih Oblika
              </h3>
              <p className="text-gray-600 mb-4">
                Naš kalkulator geometrijskih oblika omogućuje precizno izračunavanje površine različitih oblika poput kvadrata, pravokutnika, trokuta, kruga, trapeza, paralelograma, pravilnih poligona i elipse.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Podržani oblici i formule:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Kvadrat:</strong> A = a² (a = duljina stranice)</li>
                    <li><strong>Pravokutnik:</strong> A = a × b (a = duljina, b = širina)</li>
                    <li><strong>Trokut:</strong> A = (b × h) / 2 (b = osnovica, h = visina)</li>
                    <li><strong>Krug:</strong> A = π × r² (r = polumjer)</li>
                    <li><strong>Trapez:</strong> A = ((a + c) × h) / 2 (a, c = osnovice, h = visina)</li>
                    <li><strong>Paralelogram:</strong> A = b × h (b = osnovica, h = visina)</li>
                    <li><strong>Pravilni poligon:</strong> A = (n × s² × cot(π/n)) / 4 (n = broj stranica, s = duljina stranice)</li>
                    <li><strong>Elipsa:</strong> A = π × a × b (a, b = poluosi)</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Ovaj kalkulator je idealan za učenike, nastavnike, arhitekte, građevinare i sve koji trebaju brzo i precizno izračunati površinu geometrijskih oblika. Jednostavno odaberite oblik, unesite dimenzije i dobijte rezultat s detaljnim objašnjenjem.
                </p>
                <p className="text-gray-600">
                  Ključne riječi: izračun površine, površina kvadrata, površina pravokutnika, površina trokuta, površina kruga, površina trapeza, površina paralelograma, površina poligona, površina elipse, geometrijski oblici, matematički kalkulator
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Unit Converter */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <MoveHorizontal className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Pretvarač Jedinica Površine
              </h3>
              <p className="text-gray-600 mb-4">
                Naš pretvarač jedinica površine omogućuje jednostavno i brzo pretvaranje između različitih mjernih jedinica površine, uključujući metričke, imperijalne i druge međunarodne jedinice.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Podržane mjerne jedinice:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-800">Metričke jedinice:</h5>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Kvadratni milimetar (mm²)</li>
                        <li>Kvadratni centimetar (cm²)</li>
                        <li>Kvadratni decimetar (dm²)</li>
                        <li>Kvadratni metar (m²)</li>
                        <li>Ar (a)</li>
                        <li>Hektar (ha)</li>
                        <li>Kvadratni kilometar (km²)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Imperijalne/US jedinice:</h5>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Kvadratni inč (in²)</li>
                        <li>Kvadratna stopa (ft²)</li>
                        <li>Kvadratni jard (yd²)</li>
                        <li>Aker (ac)</li>
                        <li>Kvadratna milja (mi²)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Međunarodne jedinice:</h5>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Rai (Tajland)</li>
                        <li>Tsubo (Japan)</li>
                        <li>Ping (Kina/Tajvan)</li>
                        <li>Bigha (Indija)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Ovaj pretvarač je koristan za arhitekte, građevinare, agente za nekretnine, poljoprivrednike i sve koji rade s različitim mjernim jedinicama površine. Jednostavno unesite vrijednost, odaberite izvornu i ciljnu jedinicu, i dobijte preciznu konverziju.
                </p>
                <p className="text-gray-600">
                  Ključne riječi: pretvarač jedinica površine, konverzija jedinica, kvadratni metri u kvadratne stope, hektari u akere, metričke jedinice površine, imperijalne jedinice površine, međunarodne jedinice površine, pretvaranje mjernih jedinica
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Land Area Calculator */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Kalkulator Površine Zemljišta
              </h3>
              <p className="text-gray-600 mb-4">
                Naš kalkulator površine zemljišta omogućuje izračun površine parcela i zemljišta nepravilnog oblika pomoću koordinata točaka koje označavaju granice zemljišta.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Ključne značajke:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Gauss-ova formula:</strong> Koristi naprednu matematičku metodu (Shoelace formula) za precizno izračunavanje površine nepravilnih poligona</li>
                    <li><strong>Vizualizacija:</strong> Prikazuje grafički prikaz zemljišta na temelju unesenih koordinata</li>
                    <li><strong>Fleksibilnost:</strong> Podržava neograničen broj točaka za precizno definiranje granica</li>
                    <li><strong>Višestruke jedinice:</strong> Rezultate prikazuje u različitim jedinicama (m², km², ha, a, ft², yd², ac)</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Ovaj kalkulator je idealan za geodete, arhitekte, građevinare, agente za nekretnine, poljoprivrednike i vlasnike zemljišta. Koristite ga za izračun površine građevinskih parcela, poljoprivrednog zemljišta, šumskih područja ili bilo kojeg zemljišta nepravilnog oblika.
                </p>
                <p className="text-gray-600">
                  Za najbolje rezultate, koristite precizne koordinate iz geodetskih mjerenja, katastarskih planova ili GPS uređaja. Kalkulator podržava i kartezijske koordinate i može se koristiti za bilo koji poligonalni oblik.
                </p>
                <p className="text-gray-600">
                  Ključne riječi: izračun površine zemljišta, površina parcele, nepravilno zemljište, Gauss-ova formula, koordinate zemljišta, katastar, geodetska izmjera, površina poligona, građevinska parcela, poljoprivredno zemljište
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Room Area Calculator */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
                <Home className="w-12 h-12 text-yellow-600" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Kalkulator Površine Prostorija
              </h3>
              <p className="text-gray-600 mb-4">
                Naš kalkulator površine prostorija omogućuje izračun ukupne površine poda i zidova u stanu, kući ili bilo kojem stambenom prostoru, što je korisno za planiranje renoviranja, kupnju materijala ili procjenu nekretnina.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Ključne značajke:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Upravljanje prostorijama:</strong> Dodajte, uređujte i uklanjajte prostorije s prilagođenim nazivima</li>
                    <li><strong>Izračun zidova:</strong> Automatski izračunava površinu zidova na temelju dimenzija prostorija i visine</li>
                    <li><strong>Procjena materijala:</strong> Pruža procjenu potrebnih materijala za podove, zidove i druge površine</li>
                    <li><strong>Vizualizacija:</strong> Prikazuje grafički prikaz rasporeda prostorija prema njihovim relativnim veličinama</li>
                    <li><strong>Višestruke jedinice:</strong> Podržava različite mjerne jedinice (m², cm², ft², yd²)</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Ovaj kalkulator je koristan za vlasnike domova, stanare, arhitekte, dizajnere interijera, građevinare i majstore. Koristite ga za planiranje renoviranja, izračun količine boje, tapeta, podnih obloga, pločica i drugih materijala potrebnih za uređenje prostora.
                </p>
                <p className="text-gray-600">
                  Za najbolje rezultate, precizno izmjerite dimenzije svake prostorije i visinu zidova. Kalkulator će automatski izračunati ukupnu površinu poda, površinu zidova i dati vam detaljan pregled po prostorijama.
                </p>
                <p className="text-gray-600">
                  Ključne riječi: izračun površine prostorija, površina poda, površina zidova, stambeni prostor, renoviranje, materijali za uređenje, boja za zidove, podne obloge, pločice, kvadratura stana, neto površina, korisna površina
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Roof Area Calculator */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <Building className="w-12 h-12 text-red-600" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Kalkulator Površine Krova
              </h3>
              <p className="text-gray-600 mb-4">
                Naš kalkulator površine krova omogućuje izračun ukupne površine krova i procjenu potrebnih materijala za različite tipove krovova, što je ključno za planiranje izgradnje ili renoviranja krova.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Podržani tipovi krovova:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Dvostrešni krov (Gable):</strong> Najčešći tip krova s dva nagiba koji se spajaju u sljemenu</li>
                    <li><strong>Četverostrešni krov (Hip):</strong> Krov s četiri nagiba koji se spajaju u vrhu</li>
                    <li><strong>Ravni krov (Flat):</strong> Krov s minimalnim nagibom ili bez nagiba</li>
                    <li><strong>Mansardni krov (Mansard):</strong> Krov s dva nagiba na svakoj strani, donji je strmiji</li>
                    <li><strong>Gambrel krov:</strong> Sličan mansardnom, ali samo s dvije strane (kao na tradicionalnim ambarima)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Procjena materijala:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Crijep/šindra (broj komada)</li>
                    <li>Letve (duljina u metrima ili stopama)</li>
                    <li>Izolacija (površina s dodatkom za preklapanje)</li>
                    <li>Čavli/vijci (približan broj)</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Ovaj kalkulator je koristan za vlasnike domova, krovopokrivače, građevinare, arhitekte i sve koji planiraju izgradnju ili renoviranje krova. Precizno izračunavanje površine krova ključno je za točnu procjenu troškova materijala i rada.
                </p>
                <p className="text-gray-600">
                  Za najbolje rezultate, precizno izmjerite dimenzije krova (duljinu, širinu) i odredite nagib krova. Kalkulator uzima u obzir nagib krova pri izračunu stvarne površine, što je važno jer je stvarna površina krova veća od tlocrtne površine zgrade.
                </p>
                <p className="text-gray-600">
                  Ključne riječi: izračun površine krova, krovopokrivanje, nagib krova, dvostrešni krov, četverostrešni krov, ravni krov, mansardni krov, gambrel krov, crijep, šindra, letve, izolacija krova, materijali za krov, renoviranje krova
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
