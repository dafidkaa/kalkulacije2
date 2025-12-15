import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { GradientCard } from '../components/GradientCard';
import { Calculator } from 'lucide-react';
import { calculateCredit, CreditCalculationResult } from '../utils/creditCalculator';
import { ToolSchema, BreadcrumbSchema, HowToSchema, FAQSchema } from '../components/SchemaMarkup';
import { RelatedCalculators } from '../components/RelatedCalculators';

export function CreditCalculator() {
    const [formData, setFormData] = useState({
        amount: 10000,
        rate: 5.5,
        years: 5
    });

    const [result, setResult] = useState<CreditCalculationResult | null>(null);

    useEffect(() => {
        const calcResult = calculateCredit(formData.amount, formData.rate, formData.years);
        setResult(calcResult);
    }, [formData]);

    const faqData = [
        {
            question: "Što je EKS?",
            answer: "Efektivna kamatna stopa (EKS) je stvarna cijena kredita koja uključuje nominalnu kamatu i sve dodatne naknade banke."
        },
        {
            question: "Što utječe na visinu rate?",
            answer: "Najviše utječu iznos kredita, rok otplate i kamatna stopa. Duži rok znači manju ratu, ali veću ukupnu kamatu."
        },
        {
            question: "Mogu li prijevremeno otplatiti kredit?",
            answer: "Da, imate zakonsko pravo na prijevremenu otplatu, često bez naknade za promjenjive stope."
        },
        {
            question: "Fiksna ili promjenjiva kamata?",
            answer: "Fiksna pruža sigurnost (ista rata), dok je promjenjiva u startu niža ali nosi rizik rasta kamatnih stopa."
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' }).format(val);
    };

    const inputClasses = `
    block w-full rounded-lg
    border-2 border-gray-200
    focus:border-blue-500 focus:ring-blue-500
    shadow-sm hover:border-gray-300
    text-base py-3 px-4
    transition-colors duration-200
  `;

    return (
        <>
            <Helmet>
                <title>Kreditni Kalkulator | Izračun Rate i Kamate | Kalkulacije.com</title>
                <meta name="description" content="Besplatni kreditni kalkulator za izračun mjesečne rate, ukupne kamate i otplatnog plana. Jednostavan izračun stambenih i nenamjenskih kredita." />
                <meta name="keywords" content="kreditni kalkulator, izračun rate kredita, kamatna stopa, kalkulator kredita, stambeni kredit, nenamjenski kredit" />
                <link rel="canonical" href="https://kalkulacije.com/kreditni-kalkulator" />
            </Helmet>

            <ToolSchema
                name="Kreditni Kalkulator"
                description="Besplatni online kreditni kalkulator za izračun anuiteta, kamata i ukupnog troška kredita."
                url="https://kalkulacije.com/kreditni-kalkulator"
                keywords={['kredit', 'kalkulator', 'rata', 'kamata']}
            />

            <BreadcrumbSchema
                items={[
                    { name: 'Početna', url: 'https://kalkulacije.com/' },
                    { name: 'Kreditni Kalkulator', url: 'https://kalkulacije.com/kreditni-kalkulator' }
                ]}
            />
            <HowToSchema
                name="Kako izračunati ratu kredita?"
                description="Vodič za izračun mjesečne rate kredita i ukupne kamate."
                steps={[
                    { name: 'Iznos', text: 'Unesite željeni iznos kredita u eurima.' },
                    { name: 'Kamata', text: 'Upišite godišnju kamatnu stopu (npr. 4.5%).' },
                    { name: 'Rok', text: 'Odaberite rok otplate u godinama.' },
                    { name: 'Plan', text: 'Saznajte iznos mjesečne rate i ukupno plaćene kamate.' }
                ]}
            />
            <FAQSchema questions={faqData} />

            {/* Hero Section */}
            <section className="pt-16 pb-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 font-display">
                        Kreditni Kalkulator
                    </h1>
                    <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                        Izračunajte mjesečnu ratu i ukupne troškove kredita.
                        <span className="block text-sm mt-2 text-gray-500">Planirajte svoje financije uz precizan izračun kamata.</span>
                    </p>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Input Form */}
                        <GradientCard>
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Parametri Kredita</h2>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Iznos kredita (€)
                                    </label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                        min="0"
                                        className={inputClasses}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Godišnja kamatna stopa (%)
                                    </label>
                                    <input
                                        type="number"
                                        name="rate"
                                        value={formData.rate}
                                        onChange={handleInputChange}
                                        min="0"
                                        step="0.1"
                                        className={inputClasses}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Rok otplate (godina)
                                    </label>
                                    <input
                                        type="number"
                                        name="years"
                                        value={formData.years}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="40"
                                        className={inputClasses}
                                    />
                                </div>
                            </div>
                        </GradientCard>

                        {/* Results */}
                        <div className="space-y-6">
                            {result && (
                                <GradientCard>
                                    <div className="text-center space-y-6">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-600 mb-2">Mjesečna Rata</h3>
                                            <div className="text-4xl font-bold text-blue-600">
                                                {formatCurrency(result.monthlyPayment)}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                                            <div>
                                                <div className="text-sm text-gray-500 mb-1">Ukupna Kamata</div>
                                                <div className="text-lg font-semibold text-gray-900">
                                                    {formatCurrency(result.totalInterest)}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-500 mb-1">Ukupno za Otplatu</div>
                                                <div className="text-lg font-semibold text-gray-900">
                                                    {formatCurrency(result.totalPayment)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 text-xs text-gray-400">
                                            *Izračun je informativan. Za točne uvjete obratite se banci.
                                        </div>
                                    </div>
                                </GradientCard>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Use Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Kako Izračunati Ratu Kredita?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-blue-600 mb-2">1.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Iznos</h3>
                            <p className="text-gray-600 text-sm">Koliko novca želite posuditi od banke?</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-blue-600 mb-2">2.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Kamata</h3>
                            <p className="text-gray-600 text-sm">Unesite kamatnu stopu (npr. 4.5%)</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-blue-600 mb-2">3.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Rok</h3>
                            <p className="text-gray-600 text-sm">Broj godina kroz koje ćete vraćati kredit</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-blue-600 mb-2">4.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Plan</h3>
                            <p className="text-gray-600 text-sm">Dobijte iznos mjesečne rate i ukupne kamate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Kako funkcionira */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Kako Funkcionira Kreditni Kalkulator?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold text-blue-600 mb-4">Anuitetni Otplata</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Ovaj kalkulator koristi metodu anuitetne otplate, što znači da je vaša mjesečna rata (anuitet) ista tijekom cijelog razdoblja otplate.
                                U početku veći dio rate odlazi na kamatu, a manji na glavnicu. S vremenom se taj omjer mijenja u korist glavnice.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold text-blue-600 mb-4">Bitni Pojmovi</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start"><span className="mr-2 font-bold text-blue-500">•</span> <span><strong>Glavnica:</strong> Iznos koji ste posudili od banke.</span></li>
                                <li className="flex items-start"><span className="mr-2 font-bold text-blue-500">•</span> <span><strong>Kamata:</strong> Cijena koju plaćate za posudbu novca.</span></li>
                                <li className="flex items-start"><span className="mr-2 font-bold text-blue-500">•</span> <span><strong>EKS:</strong> Efektivna kamatna stopa koja uključuje sve troškove.</span></li>
                                <li className="flex items-start"><span className="mr-2 font-bold text-blue-500">•</span> <span><strong>Rok otplate:</strong> Vrijeme kroz koje vraćate kredit.</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Primjer Izračuna (New) */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Primjer Izračuna Kredita
                    </h2>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Stambeni kredit od 100.000 € na 20 godina</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <p className="text-gray-600">Ako uzmete stambeni kredit s kamatnom stopom od 4.5%, otplatni plan izgleda ovako:</p>
                                <ul className="space-y-2">
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-600">Mjesečna rata:</span>
                                        <span className="font-semibold text-gray-900">632,65 €</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-600">Ukupno kamata:</span>
                                        <span className="font-semibold text-red-500">51.835,68 €</span>
                                    </li>
                                    <li className="flex justify-between pt-2">
                                        <span className="text-gray-600">Ukupno za vratiti:</span>
                                        <span className="font-bold text-blue-600">151.835,68 €</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <h4 className="font-semibold text-blue-800 mb-2">Što ovo znači?</h4>
                                <p className="text-sm text-blue-700 leading-relaxed">
                                    Za svaki posuđeni euro, banci vraćate približno 1.52 €. Ovo pokazuje važnost odabira najniže moguće kamatne stope i, ako je moguće, kraćeg roka otplate.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Vrste Kredita */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Vrste Kredita u Hrvatskoj
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-3">
                                    <Calculator className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Stambeni Krediti</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Dugoročni krediti (15-30 godina) namijenjeni kupnji, izgradnji ili adaptaciji nekretnine.
                                Obično imaju niže kamatne stope, ali zahtijevaju hipoteku (zalog nekretnine) kao osiguranje.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="p-2 bg-green-100 rounded-lg text-green-600 mr-3">
                                    <Calculator className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Gotovinski Krediti</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Krediti kraćeg roka (do 10 godina) s višim kamatnim stopama.
                                Sredstva se isplaćuju direktno na račun i mogu se trošiti bez pravdanja troškova (nenamjenski).
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* FAQ Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Česta Pitanja (FAQ)
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {faqData.map((faq, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600 text-sm mb-6">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <RelatedCalculators />
        </>
    );
}
