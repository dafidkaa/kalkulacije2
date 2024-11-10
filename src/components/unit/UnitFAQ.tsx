import React from 'react';

const faqs = [
  {
    question: 'Koje mjerne jedinice podržava pretvarač?',
    answer: 'Pretvarač podržava širok raspon jedinica uključujući duljinu (metri, kilometri, milje), masu (grami, kilogrami, funte), volumen (litri, galoni), temperaturu (Celsius, Fahrenheit, Kelvin) i mnoge druge.'
  },
  {
    question: 'Koliko su precizni izračuni?',
    answer: 'Svi izračuni su precizni do 4 decimalna mjesta, što je više nego dovoljno za većinu svakodnevnih i profesionalnih potreba.'
  },
  {
    question: 'Mogu li pretvarati između metričkih i imperijalnih jedinica?',
    answer: 'Da, pretvarač podržava konverziju između metričkih (SI) i imperijalnih jedinica u svim kategorijama.'
  },
  {
    question: 'Je li pretvarač prikladan za profesionalnu upotrebu?',
    answer: 'Da, pretvarač je dizajniran za precizne izračune i prikladan je kako za svakodnevnu tako i za profesionalnu upotrebu.'
  },
  {
    question: 'Kako mogu brzo zamijeniti jedinice za pretvaranje?',
    answer: 'Jednostavno kliknite na gumb za zamjenu između ulazne i izlazne jedinice ili odaberite željene jedinice iz padajućih izbornika.'
  }
];

export function UnitFAQ() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Često Postavljana Pitanja
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