import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function CalculatorFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Kako koristiti glasovni unos i AI pomoć u kalkulatoru?',
      answer: 'Kliknite na ikonu mikrofona pokraj tekstualnog polja i izgovorite svoj matematički izraz. Ako lokalni kalkulator ne može riješiti izraz, pojavit će se gumb "Pokušaj s AI" koji će koristiti naprednu AI tehnologiju za rješavanje složenih matematičkih problema. AI podržava prirodni jezik na hrvatskom i engleskom.'
    },
    {
      question: 'Koje matematičke operacije podržava znanstveni kalkulator?',
      answer: 'Znanstveni kalkulator podržava sve osnovne operacije (+, -, *, /) plus napredne funkcije: trigonometrijske funkcije (sin, cos, tan), logaritme (log, ln), kvadratni korijen, stepene, faktorijalе, postotke i mnoge druge. Sve funkcije rade i s gumbovima i s tekstualnim/glasovnim unosom.'
    },
    {
      question: 'Mogu li koristiti tipkovnicu za unos?',
      answer: 'Da! Svi kalkulatori podržavaju tipkovnicu za brži unos. Možete koristiti brojeve (0-9), operatore (+, -, *, /), Enter ili = za rezultat, Escape ili C za brisanje, Backspace za brisanje zadnjeg znaka, i točku (.) za decimalne brojeve.'
    },
    {
      question: 'Kako funkcionira tekstualni unos s AI podrškom?',
      answer: 'U tekstualnom načinu možete upisati matematičke izraze prirodnim jezikom. Ako lokalni parser ne može riješiti izraz, automatski se aktivira AI pomoć koja može riješiti i najsloženije matematičke probleme. Primjeri: "25 plus 37", "kvadratni korijen od 144", "sinus od 30 stupnjeva plus logaritam od 100".'
    },
    {
      question: 'Sprema li se povijest mojih izračuna?',
      answer: 'Da, kalkulator automatski sprema povijest vaših izračuna lokalno u pregledniku. Možete vidjeti prethodne izračune, kliknuti na njih za ponovnu upotrebu, ili obrisati povijest. Podaci se ne šalju na servere - sve ostaje privatno na vašem uređaju.'
    },
    {
      question: 'Radi li kalkulator na mobilnim uređajima?',
      answer: 'Da! Kalkulator je potpuno responzivan i radi odlično na svim uređajima - računalima, tabletima i mobitelima. Glasovni unos radi na uređajima koji podržavaju Web Speech API (većina modernih preglednika).'
    },
    {
      question: 'Je li kalkulator besplatan za korištenje?',
      answer: 'Da, kalkulator je potpuno besplatan za korištenje. Nema skrivenih troškova, registracije ili ograničenja. Jednostavno otvorite stranicu i počnite koristiti.'
    },
    {
      question: 'Što je AI pomoć i kada se koristi?',
      answer: 'AI pomoć je napredna značajka koja se aktivira kada lokalni kalkulator ne može riješiti složen matematički izraz. Koristi Groq AI s Llama modelom za rješavanje kompleksnih problema. AI se poziva samo kada je potrebno i vraća samo numerički rezultat bez dodatnih objašnjenja.'
    },
    {
      question: 'Kako se osigurava privatnost s AI funkcijom?',
      answer: 'Svi osnovni izračuni se vrše lokalno u vašem pregledniku. AI se koristi samo za složene izraze koje lokalni parser ne može riješiti. Kada se koristi AI, šalje se samo matematički izraz (bez osobnih podataka) i prima se samo numerički rezultat.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Često Postavljena Pitanja
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Odgovori na najčešća pitanja o korištenju našeg naprednog kalkulatora 
          s glasovnim unosom i znanstvenim funkcijama.
        </p>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Imate dodatno pitanje?
            </h3>
            <p className="text-gray-600">
              Naš kalkulator je dizajniran da bude jednostavan za korištenje, 
              ali ako trebate dodatnu pomoć, sve funkcije imaju ugrađene upute i primjere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
