import React from 'react';

const faqs = [
  {
    question: 'Kako izračunati postotak od broja?',
    answer: 'Jednostavno unesite postotak i broj u standardnom načinu rada ili napišite pitanje poput "Koliko je 20% od 150?" u tekstualnom načinu.'
  },
  {
    question: 'Kako izračunati postotno povećanje?',
    answer: 'Možete koristiti opciju "Povećaj za X%" ili unijeti tekst poput "Povećanje sa 50 na 75" za automatski izračun postotka povećanja.'
  },
  {
    question: 'Kako radi tekstualni unos?',
    answer: 'Tekstualni unos omogućuje vam da postavite pitanje prirodnim jezikom. Kalkulator će prepoznati što želite izračunati i dati vam točan rezultat.'
  },
  {
    question: 'Mogu li izračunati postotno smanjenje?',
    answer: 'Da, koristite opciju "Smanji za X%" ili unesite tekst poput "Smanjenje sa 100 na 80" za automatski izračun postotka smanjenja.'
  },
  {
    question: 'Koliko su precizni izračuni?',
    answer: 'Svi izračuni su precizni do 2 decimalna mjesta, što je dovoljno za većinu praktičnih primjena. Za posebne potrebe, rezultati se mogu prikazati s više decimala.'
  }
];

export function PercentageFAQ() {
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