import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQSchema } from './SchemaMarkup';

/**
 * Global FAQ Component for Homepage
 * Helps AI tools understand site purpose and improves SEO
 */
export const GlobalFAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'Jesu li svi kalkulatori potpuno besplatni?',
            answer: 'Da, svi kalkulatori na Kalkulacije.com su 100% besplatni i bez ikakvih skrivenih troškova. Ne trebate se registrirati niti preuzimati aplikaciju. Sve radi direktno u vašem pregledniku.'
        },
        {
            question: 'Trebam li instalirati aplikaciju ili se registrirati?',
            answer: 'Ne, svi naši kalkulatori rade direktno u web pregledniku bez potrebe za instalacijom ili registracijom. Jednostavno posjetite stranicu, unesite podatke i dobijte rezultate.'
        },
        {
            question: 'Koliko su točni izračuni?',
            answer: 'Naši kalkulatori koriste provjerene formule i najnovije podatke (porezne stope, tarife, znanstvene formule). Za financijske kalkulatore koristimo službene podatke Porezne uprave i drugih institucija.'
        },
        {
            question: 'Mogu li koristiti kalkulatore na mobitelu?',
            answer: 'Da, svi kalkulatori su potpuno prilagođeni za mobilne uređaje. Možete ih koristiti na bilo kojem telefonu, tabletu ili računalu s modernim web preglednikom.'
        },
        {
            question: 'Spremaju li se moji podaci?',
            answer: 'Ne, svi izračuni se izvode lokalno u vašem pregledniku. Ne spremamo niti dijelimo vaše podatke. Vaša privatnost je zaštićena.'
        },
        {
            question: 'Koje kalkulatore nudite?',
            answer: 'Nudimo preko 20 različitih kalkulatora: financijski (plaća, kredit, PDV, štednja), zdravstveni (BMI, kalorije, voda), vozila (gorivo, punjenje EV, snaga), matematički (postotci, površina, vrijeme) i mnoge druge.'
        },
        {
            question: 'Kako mogu predložiti novi kalkulator?',
            answer: 'Uvijek tražimo načine da poboljšamo našu uslugu. Ako imate ideju za novi kalkulator, kontaktirajte nas putem email adrese ili društvenih mreža.'
        },
        {
            question: 'Ažurirate li kalkulatore s novim podacima?',
            answer: 'Da, redovno ažuriramo kalkulatore s najnovijim podacima - porezne stope, tarife struje, cijene goriva i druge relevantne informacije. Pratimo službene izvore kako bi izračuni bili što točniji.'
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                        <HelpCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Često Postavljana Pitanja
                    </h2>
                    <p className="text-xl text-gray-600">
                        Sve što trebate znati o našim kalkulatorima
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                                aria-expanded={openIndex === index}
                            >
                                <span className="font-semibold text-gray-900 pr-8">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                            </button>

                            {openIndex === index && (
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                    <p className="text-gray-700 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Schema Markup */}
                <FAQSchema questions={faqs} />
            </div>
        </section>
    );
};
