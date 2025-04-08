import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

function FAQItem({ question, answer, isOpen, toggleOpen }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-teal-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export function AreaFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Kako izračunati površinu nepravilnog oblika?',
      answer: 'Za nepravilne oblike, najbolji pristup je podijeliti ih na jednostavnije oblike (trokute, pravokutnike, itd.) i zatim zbrojiti površine tih dijelova. Alternativno, za složenije oblike, možete koristiti naprednije metode poput integracije ili specijalizirane softverske alate.'
    },
    {
      question: 'Koje mjerne jedinice mogu koristiti za izračun površine?',
      answer: 'Naš kalkulator podržava različite mjerne jedinice, uključujući kvadratne milimetre (mm²), kvadratne centimetre (cm²), kvadratne metre (m²), kvadratne kilometre (km²), kvadratne inče (in²) i kvadratne stope (ft²). Odaberite jedinicu koja najbolje odgovara vašim potrebama. Također možete koristiti naš pretvač jedinica za pretvaranje između različitih mjernih jedinica.'
    },
    {
      question: 'Kako pretvoriti hektare u kvadratne metre?',
      answer: 'Jedan hektar (ha) jednak je 10,000 kvadratnih metara (m²). Za pretvorbu, jednostavno pomnožite broj hektara s 10,000. Na primjer, 2.5 ha = 2.5 × 10,000 = 25,000 m². Možete koristiti naš pretvač jedinica površine za brzu i točnu pretvorbu.'
    },
    {
      question: 'Koliko kvadratnih metara ima jedan aker?',
      answer: 'Jedan aker (ac) jednak je otprilike 4,046.86 kvadratnih metara (m²). Aker je jedinica koja se najčešće koristi u SAD-u i Ujedinjenom Kraljevstvu za mjerenje površine zemljišta. Naš pretvač jedinica površine može vam pomoći u pretvaranju između akera i drugih jedinica.'
    },
    {
      question: 'Kako izračunati površinu trokuta ako znam duljine svih stranica?',
      answer: 'Ako znate duljine svih stranica trokuta (a, b, c), možete koristiti Heronovu formulu: A = √(s(s-a)(s-b)(s-c)), gdje je s = (a+b+c)/2 (poluopseg trokuta). Naš kalkulator trenutno koristi metodu osnovice i visine, ali planiramo dodati i Heronovu formulu u budućim ažuriranjima.'
    },
    {
      question: 'Mogu li koristiti kalkulator za izračun površine zemljišta?',
      answer: 'Da, naš kalkulator je idealan za izračun površine zemljišta. Ovisno o obliku zemljišta, odaberite odgovarajući geometrijski oblik i unesite dimenzije. Za nepravilna zemljišta, možete ih podijeliti na pravilnije oblike i zbrojiti pojedinačne površine.'
    },
    {
      question: 'Kako izračunati površinu kruga ako znam promjer umjesto polumjera?',
      answer: 'Ako znate promjer (d) kruga umjesto polumjera, jednostavno podijelite promjer s 2 da biste dobili polumjer (r = d/2), a zatim koristite standardnu formulu za površinu kruga: A = πr². Alternativno, možete koristiti formulu A = π(d/2)² ili A = πd²/4.'
    },
    {
      question: 'Koje međunarodne jedinice za površinu podržava vaš pretvač?',
      answer: 'Naš pretvač jedinica površine podržava širok raspon međunarodnih jedinica, uključujući metričke (mm², cm², m², ha, km²), imperijalne/US (in², ft², yd², ac, mi²) i druge međunarodne jedinice poput raija (Tajland), tsuboa (Japan), pinga (Kina/Tajvan) i bighe (Indija).'
    },
    {
      question: 'Kako izračunati površinu zemljišta nepravilnog oblika?',
      answer: 'Za izračun površine zemljišta nepravilnog oblika, možete koristiti naš kalkulator zemljišta. Unesite koordinate točaka koje označavaju granice zemljišta, a kalkulator će automatski izračunati površinu koristeći Gauss-ovu formulu (metoda šoelace). Ova metoda je precizna za bilo koji poligonalni oblik.'
    },
    {
      question: 'Kako izračunati ukupnu površinu stana ili kuće?',
      answer: 'Za izračun ukupne površine stana ili kuće, koristite naš kalkulator prostorija. Unesite dimenzije svake prostorije (duljinu i širinu), a kalkulator će automatski zbrojiti površine svih prostorija. Također će izračunati površinu zidova, što je korisno za procjenu količine boje ili tapeta potrebnih za uređenje.'
    },
    {
      question: 'Kako izračunati površinu krova za procjenu materijala?',
      answer: 'Za izračun površine krova, koristite naš kalkulator krova. Odaberite tip krova (dvostrešni, četverostrešni, ravni, itd.), unesite dimenzije i nagib, a kalkulator će izračunati ukupnu površinu krova. Također će procijeniti količinu potrebnih materijala poput crijepa, letvi, izolacije i čavala/vijaka.'
    },
    {
      question: 'Je li kalkulator precizan za profesionalnu upotrebu?',
      answer: 'Da, naš kalkulator koristi standardne matematičke formule i pruža precizne rezultate prikladne za obrazovne, osobne i profesionalne potrebe. Međutim, za kritične profesionalne primjene gdje je potrebna ekstremna preciznost, preporučujemo dodatnu provjeru rezultata.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Često Postavljana Pitanja
        </h2>

        <div className="bg-white rounded-xl shadow-sm p-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
