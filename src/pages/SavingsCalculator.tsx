import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { GradientCard } from '../components/GradientCard';

import { calculateSavings, SavingsResult } from '../utils/savingsCalculator';
import { ToolSchema, BreadcrumbSchema, HowToSchema, FAQSchema } from '../components/SchemaMarkup';
import { RelatedCalculators } from '../components/RelatedCalculators';
import { QuickAnswer, ComparisonTable, StatisticCard } from '../components/FeaturedSnippets';
import { AISummary, UseCaseExample } from '../components/GEOComponents';
import { TrendingUp, Wallet, PiggyBank, Target } from 'lucide-react';

export function SavingsCalculator() {
    const [formData, setFormData] = useState({
        initialDeposit: 1000,
        monthlyContribution: 100,
        interestRate: 5,
        years: 10
    });

    const [result, setResult] = useState<SavingsResult | null>(null);

    useEffect(() => {
        const calcResult = calculateSavings(
            formData.initialDeposit,
            formData.monthlyContribution,
            formData.interestRate,
            formData.years
        );
        setResult(calcResult);
    }, [formData]);

    const faqData = [
        {
            question: "Što je složena kamata?",
            answer: "Složena kamata je obračun kamate na već zarađenu kamatu. To je ključ eksponencijalnog rasta štednje kroz duže vrijeme."
        },
        {
            question: "Koliki prinos mogu očekivati?",
            answer: "Štednja u banci donosi 1-3%, državne obveznice 3-4%, a dionički ETF-ovi povijesno 7-10% godišnje (uz rizik)."
        },
        {
            question: "Plaća li se porez na štednju?",
            answer: "U RH se na kamate od štednje ne plaća porez. Na kapitalnu dobit (dionice) se plaća porez ako se drže kraće od 2 godine."
        },
        {
            question: "Zašto je bolje početi ranije?",
            answer: "Zbog efekta složene kamate, vrijeme je važnije od iznosa. Malim iznosima kroz dugi niz godina može se stvoriti veliko bogatstvo."
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
                <title>Kalkulator Štednje | Složena Kamata i Prinos | Kalkulacije.com</title>
                <meta name="description" content="Besplatni kalkulator štednje s obračunom složene kamate. Izračunajte koliko možete uštedjeti uz mjesečne uplate i određenu kamatnu stopu." />
                <meta name="keywords" content="kalkulator štednje, složena kamata, štednja, investiranje, kamatni račun, oročena štednja" />
                <link rel="canonical" href="https://kalkulacije.com/kalkulator-stednje" />
            </Helmet>

            <ToolSchema
                name="Kalkulator Štednje"
                description="Simulacija rasta štednje uz složenu kamatu. Izračunajte buduću vrijednost investicije s mjesečnim uplatama."
                url="https://kalkulacije.com/kalkulator-stednje"
                keywords={['štednja', 'kamata', 'investiranje', 'novac']}
            />
            <BreadcrumbSchema
                items={[
                    { name: 'Početna', url: 'https://kalkulacije.com/' },
                    { name: 'Kalkulator Štednje', url: 'https://kalkulacije.com/kalkulator-stednje' }
                ]}
            />
            <HowToSchema
                name="Kako izračunati štednju i složenu kamatu?"
                description="Vodič za korištenje kalkulatora štednje i investiranja."
                steps={[
                    { name: 'Početni Ulog', text: 'Unesite iznos s kojim započinjete štednju (ako postoji).' },
                    { name: 'Mjesečne Uplate', text: 'Koliko planirate odvajati svaki mjesec?' },
                    { name: 'Kamata', text: 'Unesite očekivanu godišnju kamatnu stopu ili prinos.' },
                    { name: 'Vrijeme', text: 'Koliko dugo planirate štedjeti? Pogledajte rezultat s kamatom na kamatu.' }
                ]}
            />
            <FAQSchema questions={faqData} />

            {/* Hero Section */}
            <section className="pt-16 pb-8 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Kalkulator Štednje
                    </h1>
                    <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                        Planirajte svoju financijsku budućnost.
                        Izračunajte rast svoje štednje uz snagu složene kamate.
                    </p>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Input Form */}
                        <GradientCard>
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Plan Štednje</h2>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Početni ulog (€)</label>
                                    <input
                                        type="number"
                                        name="initialDeposit"
                                        value={formData.initialDeposit}
                                        onChange={handleInputChange}
                                        className={inputClasses}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Mjesečna uplata (€)</label>
                                    <input
                                        type="number"
                                        name="monthlyContribution"
                                        value={formData.monthlyContribution}
                                        onChange={handleInputChange}
                                        className={inputClasses}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Godišnja kamatna stopa (%)</label>
                                    <input
                                        type="number"
                                        name="interestRate"
                                        value={formData.interestRate}
                                        onChange={handleInputChange}
                                        className={inputClasses}
                                        step="0.1"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Trajanje (godina)</label>
                                    <input
                                        type="number"
                                        name="years"
                                        value={formData.years}
                                        onChange={handleInputChange}
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
                                            <h3 className="text-lg font-medium text-gray-600 mb-2">Ukupno Ušteđeno</h3>
                                            <div className="text-4xl font-bold text-green-600">
                                                {formatCurrency(result.totalSaved)}
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-4 border-t border-gray-100">
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span className="text-gray-600 text-sm">Vaše uplate (Glavnica)</span>
                                                <span className="text-gray-900 font-semibold">{formatCurrency(result.totalPrincipal)}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                                                <span className="text-green-800 text-sm">Zarađena kamata</span>
                                                <span className="text-green-700 font-bold">{formatCurrency(result.totalInterest)}</span>
                                            </div>
                                        </div>

                                        <div className="text-xs text-gray-400 pt-2">
                                            *Prikaz uz pretpostavku godišnjeg pripisa kamate (složeni kamatni račun).
                                        </div>
                                    </div>
                                </GradientCard>
                            )}

                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                    <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                                    Snaga složene kamate
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Primijetite kako kamata raste s vremenom. Što duže štedite, to "kamata na kamatu" ima veći efekt na ukupan iznos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Summary */}
            <AISummary
                summary="Kalkulator štednje s složenom kamatom. Izračunajte rast vaše ušteđevine kroz vrijeme uz mjesečne uplate i kamatnu stopu. Planirajte financijsku budućnost."
                keywords={['kalkulator štednje', 'složena kamata', 'oročena štednja', 'financijski plan', 'investiranje']}
                useCases={[
                    'Planiranje štednje za mirovinu (dugoročno)',
                    'Štednja za učešće za stan ili auto (srednjoročno)',
                    'Izračun prinosa na investiciju (ETF/Dionice)'
                ]}
                statistics={[
                    { label: 'Prosječni povrat S&P 500', value: '~10%', source: 'Povijesni podaci' },
                    { label: 'Prosječna inflacija', value: '2-3%', source: 'DZS' },
                    { label: 'Preporučena stopa štednje', value: '20%', source: 'Financijski savjetnici' }
                ]}
            />

            {/* Quick Answer */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <QuickAnswer
                        question="Koliko će narasti 100€ mjesečno za 20 godina (7%)?"
                        answer="Ukupno oko 52.000€ (Uplate: 24.000€, Kamata: 28.000€)"
                        highlight="Kamata na kamatu udvostručuje ulog!"
                        details="Snaga složene kamate najbolje se vidi na dugi rok. Većinu dobitka čini kamata u kasnijim godinama."
                    />

                    <div className="grid md:grid-cols-3 gap-6 my-12">
                        <StatisticCard
                            value="72 / Kamata"
                            label="Pravilo 72 (godine za duplanje)"
                            source="Financijska teorija"
                            color="blue"
                        />
                        <StatisticCard
                            value="1-3%"
                            label="Kamata u banci (štednja)"
                            source="HNB"
                            color="orange"
                        />
                        <StatisticCard
                            value="7-10%"
                            label="Povrat na dionice (ETF)"
                            source="Povijesni prosjek"
                            color="green"
                        />
                    </div>

                    <ComparisonTable
                        title="Rast Štednje (Mjesečna uplata 100€)"
                        caption="Usporedba rasta kroz godine uz različite kamatne stope"
                        headers={['Godine', 'Uplaćeno', 'Kamata 2%', 'Kamata 5%', 'Kamata 8%']}
                        rows={[
                            ['5 godina', '6.000€', '6.300€', '6.800€', '7.300€'],
                            ['10 godina', '12.000€', '13.200€', '15.500€', '18.300€'],
                            ['20 godina', '24.000€', '29.500€', '41.100€', '59.300€'],
                            ['30 godina', '36.000€', '49.000€', '83.200€', '150.000€'],
                            ['40 godina', '48.000€', '73.000€', '152.000€', '350.000€']
                        ]}
                        highlightColumn={4}
                    />
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Primjeri Korištenja</h2>

                    <UseCaseExample
                        title="Primjer 1: Štednja za Mirovinu"
                        scenario="Ivan (30) odvaja 200€ mjesečno u ETF fond s prosječnim prinosom od 7%. Planira štedjeti 35 godina."
                        input="Uplata: 200€ | Kamata: 7% | Vrijeme: 35 god"
                        output="Ukupno: ~340.000€ (Uplaćeno: 84.000€)"
                        explanation="Ivan će u mirovinu otići sa značajnim iznosom zahvaljujući ranom početku i složenoj kamati."
                        icon={<TrendingUp className="w-6 h-6 text-green-600" />}
                    />

                    <UseCaseExample
                        title="Primjer 2: Fond za Djecu"
                        scenario="Ana je dobila dijete i želi mu osigurati novac za studij/stan. Uplaćuje 50€ mjesečno na 18 godina (4%)."
                        input="Uplata: 50€ | Kamata: 4% | Vrijeme: 18 god"
                        output="Ukupno: ~15.500€"
                        explanation="Mali mjesečni iznos kroz dugi period stvara solidnu financijsku osnovu za dijete."
                        icon={<PiggyBank className="w-6 h-6 text-pink-600" />}
                    />

                    <UseCaseExample
                        title="Primjer 3: Kratkoročni Cilj (Auto)"
                        scenario="Marko štedi za novi auto. Treba mu 15.000€. Može odvojiti 300€ mjesečno (2% kamata)."
                        input="Cilj: 15.000€ | Uplata: 300€ | Kamata: 2%"
                        output="Vrijeme: ~4 godine"
                        explanation="Za kratkoročne ciljeve kamata ima manji utjecaj, važnija je visina mjesečne uplate."
                        icon={<Target className="w-6 h-6 text-blue-600" />}
                    />
                </div>
            </section>

            {/* How to Use Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Kako Izračunati Štednju?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-green-600 mb-2">1.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Ulog</h3>
                            <p className="text-gray-600 text-sm">Odaberite početni ulog i mjesečne uplate.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-green-600 mb-2">2.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Kamata</h3>
                            <p className="text-gray-600 text-sm">Unesite očekivanu godišnju kamatu/prinos.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-green-600 mb-2">3.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Vrijeme</h3>
                            <p className="text-gray-600 text-sm">Koliko godina planirate štedjeti?</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-green-600 mb-2">4.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Rast</h3>
                            <p className="text-gray-600 text-sm">Vidite rezultat složene kamate na djelu.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Što je složena kamata */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Moć Složene Kamate
                    </h2>
                    <div className="bg-white p-8 rounded-2xl shadow-sm mb-12">
                        <div className="text-center mb-8">
                            <p className="text-lg text-gray-600">
                                Što se dogodi ako ulažete <strong>100 € mjesečno</strong> uz prosječni prinos od <strong>7%</strong>?
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b-2 border-gray-100">
                                        <th className="py-3 px-4 font-semibold text-gray-900">Godina</th>
                                        <th className="py-3 px-4 font-semibold text-gray-900">Uplaćeno (Glavnica)</th>
                                        <th className="py-3 px-4 font-semibold text-green-600">Kamata (Zarada)</th>
                                        <th className="py-3 px-4 font-bold text-gray-900">Ukupno Stanje</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm">
                                    <tr className="border-b border-gray-50 hover:bg-green-50/30 transition-colors">
                                        <td className="py-3 px-4">5 godina</td>
                                        <td className="py-3 px-4">6.000 €</td>
                                        <td className="py-3 px-4 text-green-600">+1.159 €</td>
                                        <td className="py-3 px-4 font-medium">7.159 €</td>
                                    </tr>
                                    <tr className="border-b border-gray-50 hover:bg-green-50/30 transition-colors">
                                        <td className="py-3 px-4">10 godina</td>
                                        <td className="py-3 px-4">12.000 €</td>
                                        <td className="py-3 px-4 text-green-600">+5.309 €</td>
                                        <td className="py-3 px-4 font-medium">17.309 €</td>
                                    </tr>
                                    <tr className="border-b border-gray-50 hover:bg-green-50/30 transition-colors">
                                        <td className="py-3 px-4">20 godina</td>
                                        <td className="py-3 px-4">24.000 €</td>
                                        <td className="py-3 px-4 text-green-600">+28.090 €</td>
                                        <td className="py-3 px-4 font-medium">52.090 €</td>
                                    </tr>
                                    <tr className="bg-green-50 hover:bg-green-100 transition-colors">
                                        <td className="py-3 px-4 font-bold">30 godina</td>
                                        <td className="py-3 px-4 font-bold">36.000 €</td>
                                        <td className="py-3 px-4 font-bold text-green-700">+85.966 €</td>
                                        <td className="py-3 px-4 font-bold text-gray-900 text-lg">121.966 €</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-center text-gray-400 mt-4">
                            *Prikaz je informativan uz pretpostavku godišnjeg pripisa kamate. Inflacija nije uračunata.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                                Eksponencijalni Rast
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Primijetite kako u prvih 10 godina kamata čini manji dio ukupnog iznosa. No, nakon 30 godina, kamata (zarada) je <strong>više nego dvostruko veća</strong> od onoga što ste sami uplatili! To je efekt "kamate na kamatu".
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                                <Wallet className="w-5 h-5 mr-2 text-green-600" />
                                Pravilo 72
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Jednostavan trik: Podijelite broj 72 s vašom kamatnom stopom da saznate za koliko godina će se vaš novac <strong>udvostručiti</strong>.
                                <br />
                                Primjer: Uz 8% kamate, novac se dupla svakih 9 godina (72 / 8 = 9).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Inflacija vs Štednja */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Pazite na "Tihog Ubojicu": Inflaciju
                    </h2>
                    <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                        <div className="flex gap-4">
                            <div className="text-4xl">📉</div>
                            <div>
                                <h3 className="text-xl font-bold text-red-700 mb-2">Štednja u "čarapi" gubi vrijednost</h3>
                                <p className="text-gray-700 mb-4">
                                    Ako novac držite u gotovini ili na tekućem računu s 0% kamate, njegova kupovna moć pada svake godine zbog inflacije.
                                    Ako je inflacija 3%, vaših 1000 € će za godinu dana vrijediti kao da danas imate 970 €.
                                </p>
                                <p className="font-semibold text-gray-900">
                                    Cilj investiranja je ostvariti prinos veći od stope inflacije kako bi sačuvali i povećali svoju imovinu.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Savjeti za štednju */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        3 Zlatna Pravila Investiranja
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Počnite Rano</h3>
                            <p className="text-gray-600 text-sm">Vrijeme je vaš najveći saveznik. Bolje je početi s malim iznosom danas, nego s velikim za 10 godina.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Automatizacija</h3>
                            <p className="text-gray-600 text-sm">Postavite trajni nalog. "Platite prvo sebi". Štednja treba biti prva transakcija u mjesecu.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Diverzifikacija</h3>
                            <p className="text-gray-600 text-sm">"Ne stavljajte sva jaja u istu košaru". Ulaganjem u različite klase imovine smanjujete rizik.</p>
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
