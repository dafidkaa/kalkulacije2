import React, { useState } from 'react';

export function DateFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Kako se izračunava razlika između dva datuma?',
      answer: 'Razlika između dva datuma može se izračunati na nekoliko načina. Najjednostavniji način je izračunati ukupan broj dana između datuma. Za detaljniji rezultat, naš kalkulator izračunava razliku u godinama, mjesecima i danima. Prvo se izračunava razlika u godinama, zatim u mjesecima, a preostali dani čine razliku u danima. Ovaj pristup uzima u obzir različite duljine mjeseci i prijestupne godine za najprecizniji rezultat. Naš kalkulator također prikazuje razliku u tjednima i danima, kao i ukupan broj dana između datuma.'
    },
    {
      question: 'Kako kalkulator radnih dana isključuje vikende i praznike?',
      answer: 'Kalkulator radnih dana automatski isključuje subote i nedjelje (vikende) iz izračuna ako je ta opcija odabrana. Za praznike, kalkulator sadrži ugrađeni popis hrvatskih državnih praznika koji se također isključuju iz izračuna ako je odabrana opcija isključivanja praznika. Dodatno, korisnici mogu dodati vlastite neradne dane za specifične potrebe, poput godišnjih odmora, lokalnih praznika ili drugih neradnih dana. Kalkulator zatim prolazi kroz svaki dan između početnog i završnog datuma, provjerava je li taj dan vikend ili praznik, i broji samo radne dane.'
    },
    {
      question: 'Kako dodati ili oduzeti radne dane od datuma?',
      answer: 'Za dodavanje ili oduzimanje radnih dana od datuma, koristite kalkulator radnih dana i odaberite opciju "Dodaj radne dane". Unesite početni datum i broj radnih dana koje želite dodati. Kalkulator će automatski preskočiti vikende i praznike (ako su te opcije odabrane) i izračunati rezultirajući datum. Na primjer, ako dodate 5 radnih dana od ponedjeljka, rezultat će biti sljedeći ponedjeljak, jer kalkulator preskače subotu i nedjelju. Ova funkcionalnost je posebno korisna za izračun rokova u poslovnom okruženju gdje se računaju samo radni dani.'
    },
    {
      question: 'Kako izračunati točnu starost u godinama, mjesecima i danima?',
      answer: 'Za izračun točne starosti, unesite datum rođenja u kalkulator starosti. Kalkulator će automatski izračunati starost u godinama, mjesecima i danima na temelju trenutnog datuma. Ako želite izračunati starost na neki drugi datum, označite opciju "Izračunaj starost na određeni datum" i unesite željeni datum. Kalkulator uzima u obzir različite duljine mjeseci i prijestupne godine za najprecizniji rezultat. Osim osnovne starosti, kalkulator prikazuje i starost u različitim jedinicama (ukupno dana, tjedana, mjeseci), kao i dodatne informacije poput horoskopskog znaka i kineskog zodijaka.'
    },
    {
      question: 'Koji su hrvatski državni praznici uključeni u kalkulator?',
      answer: 'Kalkulator uključuje sve službene hrvatske državne praznike: Nova godina (1.1.), Sveta tri kralja (6.1.), Uskrs (promjenjiv datum), Uskrsni ponedjeljak (promjenjiv datum), Praznik rada (1.5.), Dan državnosti (30.5.), Tijelovo (promjenjiv datum), Dan antifašističke borbe (22.6.), Dan pobjede i domovinske zahvalnosti (5.8.), Velika Gospa (15.8.), Svi sveti (1.11.), Dan sjećanja na žrtve Domovinskog rata (18.11.), Božić (25.12.) i Sveti Stjepan (26.12.). Praznici s promjenjivim datumima poput Uskrsa izračunavaju se za svaku godinu posebno.'
    },
    {
      question: 'Kako stvoriti odbrojavanje do važnog događaja?',
      answer: 'Za stvaranje odbrojavanja do važnog događaja, koristite funkciju "Odbrojavanje" u kalkulatoru datuma. Unesite naziv događaja i datum događaja. Možete odabrati i jedan od uobičajenih događaja poput praznika iz padajućeg izbornika. Nakon unosa, kalkulator će prikazati odbrojavanje u danima, satima, minutama i sekundama do odabranog datuma. Možete dodati događaj u "Moje događaje" kako biste pratili više odbrojavanja istovremeno. Događaji su organizirani po kategorijama (praznici, osobni, poslovni) i vizualno označeni bojama ovisno o tome koliko je vremena preostalo do događaja.'
    },
    {
      question: 'Kako izračunati datum koji je određeni broj dana, tjedana, mjeseci ili godina od današnjeg datuma?',
      answer: 'Za izračun datuma koji je određeni broj dana, tjedana, mjeseci ili godina od današnjeg datuma, koristite funkciju "Dodaj/Oduzmi" u kalkulatoru datuma. Unesite današnji datum (ili bilo koji drugi početni datum), odaberite operaciju (dodavanje ili oduzimanje), unesite količinu i odaberite jedinicu (dani, tjedni, mjeseci ili godine). Kalkulator će izračunati rezultirajući datum i prikazati dodatne informacije poput dana u tjednu, tjedna u godini i dana u godini. Ova funkcionalnost je korisna za planiranje budućih događaja ili izračunavanje prošlih datuma.'
    },
    {
      question: 'Kako izračunati dan u tjednu za određeni datum?',
      answer: 'Za izračun dana u tjednu za određeni datum, možete koristiti bilo koju funkciju kalkulatora datuma koja uključuje unos datuma. Nakon unosa datuma, kalkulator će automatski prikazati dan u tjednu za taj datum. Na primjer, u funkciji "Dodaj/Oduzmi", nakon izračuna rezultirajućeg datuma, prikazat će se dan u tjednu za taj datum. U funkciji "Kalkulator starosti", prikazat će se dan u tjednu za datum rođenja. Ova informacija je korisna za planiranje događaja, sastanaka ili aktivnosti koje ovise o danu u tjednu.'
    },
    {
      question: 'Kako izračunati broj dana do sljedećeg rođendana?',
      answer: 'Za izračun broja dana do sljedećeg rođendana, koristite funkciju "Kalkulator starosti". Unesite datum rođenja, i kalkulator će automatski izračunati datum sljedećeg rođendana i broj dana do njega. Ako je rođendan već prošao u tekućoj godini, kalkulator će izračunati datum rođendana u sljedećoj godini. Osim broja dana do rođendana, kalkulator će prikazati i koliko ćete godina napuniti na sljedeći rođendan. Ova funkcionalnost je korisna za planiranje proslava rođendana ili jednostavno za praćenje vremena do sljedećeg rođendana.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Često Postavljana Pitanja
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Odgovori na najčešća pitanja o izračunu datuma i funkcionalnostima našeg kalkulatora.
        </p>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-4 rounded-lg flex justify-between items-center transition-colors duration-200 ${
                  openIndex === index 
                    ? 'bg-purple-50 text-purple-900' 
                    : 'bg-white text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium">{faq.question}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 transition-transform duration-200 ${openIndex === index ? 'transform rotate-180' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-4 bg-white rounded-b-lg border-t border-gray-100">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
