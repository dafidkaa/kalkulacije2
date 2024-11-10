import React from 'react';

const faqs = [
  {
    question: 'Kako izračunati neto plaću iz bruto iznosa?',
    answer: 'Jednostavno unesite bruto iznos u kalkulator, odaberite željeno razdoblje (mjesečno/godišnje) i kalkulator će automatski izračunati neto plaću sa svim doprinosima i porezima.'
  },
  {
    question: 'Koje poreze i doprinose kalkulator obuhvaća?',
    answer: 'Kalkulator obuhvaća mirovinske doprinose (15% + 5%), zdravstveno osiguranje (16.5%) i porez na dohodak prema važećim poreznim razredima.'
  },
  {
    question: 'Jesu li izračuni usklađeni s trenutnim poreznim stopama?',
    answer: 'Da, kalkulator se redovito ažurira prema važećim poreznim stopama i propisima Republike Hrvatske.'
  },
  {
    question: 'Mogu li izračunati plaću za različita vremenska razdoblja?',
    answer: 'Da, možete izračunati plaću po satu, danu, tjednu, mjesecu ili godini, uz automatsku konverziju između razdoblja.'
  },
  {
    question: 'Je li kalkulator prikladan za obrtnike?',
    answer: 'Da, kalkulator je prikladan za izračun plaća zaposlenika, obrtnika i freelancera, uz prilagodbu prema vrsti zaposlenja.'
  }
];

export function SalaryFAQ() {
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