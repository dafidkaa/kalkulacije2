import React, { useState } from 'react';

export function TemperatureFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Koja je razlika između Celzija i Fahrenheita?',
      answer: 'Celzij (°C) i Fahrenheit (°F) su dvije različite temperaturne ljestvice. Glavna razlika je u njihovim referentnim točkama i veličini stupnja. U Celzijevoj ljestvici, voda se smrzava na 0°C i vrije na 100°C pri standardnom atmosferskom tlaku. U Fahrenheitovoj ljestvici, voda se smrzava na 32°F i vrije na 212°F. Jedan stupanj Celzija veći je od jednog stupnja Fahrenheita - točnije, 1°C = 1.8°F. Celzijeva ljestvica koristi se u većini zemalja svijeta, dok se Fahrenheitova ljestvica primarno koristi u SAD-u.'
    },
    {
      question: 'Kako pretvoriti Celzij u Fahrenheit?',
      answer: 'Za pretvorbu temperature iz Celzija (°C) u Fahrenheit (°F), koristite formulu: °F = °C × (9/5) + 32. Na primjer, za pretvorbu 25°C u Fahrenheit: °F = 25 × (9/5) + 32 = 25 × 1.8 + 32 = 45 + 32 = 77°F. Naš pretvarač temperature automatski vrši ovu pretvorbu za vas, uz prikaz formule i postupka izračuna.'
    },
    {
      question: 'Kako pretvoriti Fahrenheit u Celzij?',
      answer: 'Za pretvorbu temperature iz Fahrenheita (°F) u Celzij (°C), koristite formulu: °C = (°F - 32) × (5/9). Na primjer, za pretvorbu 77°F u Celzij: °C = (77 - 32) × (5/9) = 45 × (5/9) = 45 × 0.556 = 25°C. Naš pretvarač temperature automatski vrši ovu pretvorbu za vas, uz prikaz formule i postupka izračuna.'
    },
    {
      question: 'Što je Kelvin i kako ga pretvoriti u Celzij?',
      answer: 'Kelvin (K) je SI jedinica za temperaturu i apsolutna temperaturna ljestvica, što znači da počinje od apsolutne nule, najniže teoretski moguće temperature. Za pretvorbu iz Kelvina u Celzij, koristite formulu: °C = K - 273.15. Na primjer, 300K = 300 - 273.15 = 26.85°C. Za pretvorbu iz Celzija u Kelvin, koristite formulu: K = °C + 273.15. Na primjer, 25°C = 25 + 273.15 = 298.15K. Kelvin se primarno koristi u znanstvenim i inženjerskim primjenama.'
    },
    {
      question: 'Koja je normalna tjelesna temperatura čovjeka?',
      answer: 'Normalna tjelesna temperatura zdravog čovjeka je oko 37°C (98.6°F), ali može varirati između 36.1°C (97°F) i 37.2°C (99°F) ovisno o dobu dana, fizičkoj aktivnosti i drugim faktorima. Temperatura iznad 38°C (100.4°F) obično se smatra povišenom temperaturom ili vrućicom. Važno je napomenuti da se normalna tjelesna temperatura može razlikovati od osobe do osobe i da je trend temperature često važniji od pojedinačnog mjerenja.'
    },
    {
      question: 'Koje su uobičajene temperature pećnice za pečenje?',
      answer: 'Uobičajene temperature pećnice za pečenje variraju ovisno o vrsti hrane koja se priprema. Evo nekih standardnih raspona: Vrlo niska temperatura (120-150°C / 250-300°F) koristi se za sporo pečenje mesa i sušenje hrane. Niska do srednja temperatura (150-180°C / 300-350°F) koristi se za pečenje kolača, keksa i peciva. Srednja temperatura (180-200°C / 350-400°F) koristi se za pečenje kruha i većine jela. Visoka temperatura (200-230°C / 400-450°F) koristi se za pečenje pizze i zapecanje. Vrlo visoka temperatura (230-250°C / 450-500°F) koristi se za brzo pečenje i stvaranje korice. Naš pretvarač za kuhanje nudi detaljne preporuke za različite vrste jela.'
    },
    {
      question: 'Što je apsolutna nula i zašto je važna?',
      answer: 'Apsolutna nula je najniža teoretski moguća temperatura i iznosi -273.15°C, -459.67°F ili 0K. Na ovoj temperaturi, čestice tvari imaju minimalnu moguću toplinsku energiju. Važna je jer predstavlja donju granicu temperaturne ljestvice i referentnu točku za Kelvinovu ljestvicu. Prema trećem zakonu termodinamike, nemoguće je postići apsolutnu nulu u konačnom broju koraka, iako su znanstvenici uspjeli postići temperature vrlo blizu apsolutne nule u laboratorijskim uvjetima. Na temperaturama blizu apsolutne nule javljaju se zanimljivi kvantni fenomeni poput supravodljivosti i Bose-Einsteinovog kondenzata.'
    },
    {
      question: 'Koje su druge temperaturne ljestvice osim Celzija, Fahrenheita i Kelvina?',
      answer: 'Osim Celzija (°C), Fahrenheita (°F) i Kelvina (K), postoje i druge, manje poznate temperaturne ljestvice: Rankine (°R) - apsolutna ljestvica bazirana na Fahrenheitu, gdje je 0°R apsolutna nula. Réaumur (°Ré) - povijesna ljestvica gdje je 0°Ré ledište vode, a 80°Ré vrelište vode. Delisle (°De) - povijesna ljestvica gdje je 0°De vrelište vode, a 150°De ledište vode. Newton (°N) - ljestvica koju je predložio Isaac Newton, gdje je 0°N ledište vode, a 33°N vrelište vode. Rømer (°Rø) - jedna od najstarijih temperaturnih ljestvica, gdje je 7.5°Rø ledište vode, a 60°Rø vrelište vode. Naš pretvarač temperature podržava sve ove ljestvice.'
    },
    {
      question: 'Kako temperatura utječe na svakodnevni život?',
      answer: 'Temperatura utječe na mnoge aspekte svakodnevnog života: Zdravlje - tjelesna temperatura je važan pokazatelj zdravlja, a ekstremne vanjske temperature mogu uzrokovati zdravstvene probleme poput hipotermije ili toplinskog udara. Odijevanje - temperatura određuje kakvu odjeću nosimo, od zimskih jakni na niskim temperaturama do lagane ljetne odjeće na visokim temperaturama. Kuhanje - temperatura je ključna za pripremu hrane, od temperature hladnjaka za čuvanje hrane do temperature pećnice za pečenje. Energija - grijanje i hlađenje domova i zgrada značajno ovisi o vanjskoj temperaturi i željenim unutarnjim temperaturama. Poljoprivreda - temperatura utječe na rast biljaka i životinja, određujući koje kulture mogu rasti u kojem podneblju. Naš pretvarač temperature nudi praktične alate za razumijevanje i primjenu temperature u svim ovim kontekstima.'
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
          Odgovori na najčešća pitanja o temperaturi i njezinoj pretvorbi između različitih jedinica.
        </p>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-4 rounded-lg flex justify-between items-center transition-colors duration-200 ${
                  openIndex === index 
                    ? 'bg-blue-50 text-blue-900' 
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
