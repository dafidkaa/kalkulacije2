import React from 'react';

const faqs = [
  {
    question: 'Kako zbrajati ili oduzimati vrijeme?',
    answer: 'U opciji "Zbrajanje vremena" unesite sate, minute i sekunde. Koristite + za zbrajanje ili - za oduzimanje. Možete dodati više vremenskih unosa prema potrebi.'
  },
  {
    question: 'Kako izračunati vrijeme između dva datuma?',
    answer: 'Odaberite "Vremenski interval", unesite početni i završni datum s vremenom, i dobit ćete točno trajanje između ta dva trenutka.'
  },
  {
    question: 'Kako pretvoriti vrijeme iz jedne jedinice u drugu?',
    answer: 'U opciji "Pretvaranje vremena" unesite količinu, odaberite početnu jedinicu (npr. sati) i željenu jedinicu (npr. minute), i kliknite "Izračunaj".'
  },
  {
    question: 'Što znači detaljna razrada rezultata?',
    answer: 'Detaljna razrada prikazuje vaš rezultat u različitim vremenskim jedinicama - od sekundi do godina, što vam omogućuje potpuni pregled trajanja.'
  },
  {
    question: 'Mogu li spremiti svoje izračune?',
    answer: 'Trenutno nije moguće spremati izračune, ali možete napraviti screenshot rezultata ili ih zapisati za kasniju upotrebu.'
  }
];

export function TimeFAQ() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Često postavljana pitanja
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
              itemScope
              itemType="https://schema.org/Question"
            >
              <div className="p-6">
                <h3
                  className="text-lg font-semibold text-gray-900 mb-2"
                  itemProp="name"
                >
                  {faq.question}
                </h3>
                <div
                  className="text-gray-600"
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                >
                  <div itemProp="text">{faq.answer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}