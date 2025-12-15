import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { GradientCard } from '../components/GradientCard';
import { ArrowRightLeft, Percent, Receipt } from 'lucide-react';
import { calculateVat, VatResult, VatCalculationMode } from '../utils/vatCalculator';
import { ToolSchema, BreadcrumbSchema, HowToSchema, FAQSchema } from '../components/SchemaMarkup';
import { RelatedCalculators } from '../components/RelatedCalculators';
import { QuickAnswer, ComparisonTable, StatisticCard } from '../components/FeaturedSnippets';
import { AISummary, UseCaseExample } from '../components/GEOComponents';

export function VatCalculator() {
    const [formData, setFormData] = useState({
        amount: 100,
        rate: 25, // Default Croatian standard rate
        mode: 'add_vat' as VatCalculationMode
    });

    const [result, setResult] = useState<VatResult | null>(null);

    useEffect(() => {
        const calcResult = calculateVat(formData.amount, formData.rate, formData.mode);
        setResult(calcResult);
    }, [formData]);

    const faqData = [
        {
            question: "Tko mora biti u sustavu PDV-a?",
            answer: "Svi poduzetnici čije isporuke u prethodnoj godini prelaze 40.000 € obvezni su ući u sustav PDV-a."
        },
        {
            question: "Koja je stopa PDV-a u Hrvatskoj?",
            answer: "Opća stopa je 25%. Snižene stope su 13% (hrana u restoranima, struja) i 5% (kruh, lijekovi, knjige)."
        },
        {
            question: "Kako izračunati PDV iz bruto iznosa?",
            answer: "Podijelite bruto iznos s 1.25 (za 25% PDV-a) da dobijete osnovicu. Razlika je iznos PDV-a."
        },
        {
            question: "Što je pretporez?",
            answer: "Pretporez je PDV na ulaznim računima koji poduzetnici u sustavu mogu odbiti od svoje porezne obveze."
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    const setRate = (rate: number) => {
        setFormData(prev => ({ ...prev, rate }));
    };

    const toggleMode = () => {
        setFormData(prev => ({
            ...prev,
            mode: prev.mode === 'add_vat' ? 'remove_vat' : 'add_vat'
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
                <title>PDV Kalkulator | Izračun PDV-a i Osnovice | Kalkulacije.com</title>
                <meta name="description" content="Besplatni PDV kalkulator. Brzi izračun PDV-a na neto iznos ili preračun iz bruto iznosa. Podržava sve stope PDV-a (25%, 13%, 5%)." />
                <meta name="keywords" content="pdv kalkulator, izračun pdv, porez na dodanu vrijednost, pdv iz bruta, pdv na neto, stope pdv" />
                <link rel="canonical" href="https://kalkulacije.com/pdv-kalkulator" />
            </Helmet>

            <ToolSchema
                name="PDV Kalkulator"
                description="Kalkulator za brzi izračun poreza na dodanu vrijednost (PDV). Izračunajte PDV na osnovicu ili izvadite PDV iz ukupnog iznosa."
                url="https://kalkulacije.com/pdv-kalkulator"
                keywords={['pdv', 'kalkulator', 'porez', 'bruto', 'neto']}
            />
            <BreadcrumbSchema
                items={[
                    { name: 'Početna', url: 'https://kalkulacije.com/' },
                    { name: 'PDV Kalkulator', url: 'https://kalkulacije.com/pdv-kalkulator' }
                ]}
            />
            <HowToSchema
                name="Kako izračunati PDV?"
                description="Vodič za izračun PDV-a na neto iznos ili preračunavanje iz bruto iznosa."
                steps={[
                    { name: 'Način rada', text: 'Odaberite želite li dodati PDV na neto iznos ili izračunati osnovicu iz bruto iznosa.' },
                    { name: 'Iznos', text: 'Unesite novčani iznos u eurima.' },
                    { name: 'Stopa', text: 'Odaberite stopu PDV-a (25%, 13% ili 5%) ili unesite vlastitu.' },
                    { name: 'Rezultat', text: 'Saznajte točan iznos PDV-a, osnovice i ukupnog iznosa.' }
                ]}
            />
            <FAQSchema questions={faqData} />

            {/* Hero Section */}
            <section className="pt-16 pb-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 font-display">
                        PDV Kalkulator
                    </h1>
                    <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                        Brzo i precizno izračunajte PDV.
                        <span className="block text-sm mt-2 text-gray-500">Dodajte PDV na neto iznos ili ga "izvadite" iz bruto iznosa.</span>
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
                                {/* Mode Toggle */}
                                <button
                                    onClick={toggleMode}
                                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors duration-200 group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
                                            <ArrowRightLeft className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-900">Način Izračuna</div>
                                            <div className="text-sm text-gray-500">
                                                {formData.mode === 'add_vat' ? 'Dodaj PDV na iznos (Neto → Bruto)' : 'Izračunaj osnovicu (Bruto → Neto)'}
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {formData.mode === 'add_vat' ? 'Neto Iznos (€)' : 'Ukupan Iznos (€)'}
                                    </label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                        min="0"
                                        step="0.01"
                                        className={inputClasses}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Stopa PDV-a (%)
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[25, 13, 5].map((rate) => (
                                            <button
                                                key={rate}
                                                onClick={() => setRate(rate)}
                                                className={`
                        py-2 px-4 rounded-lg font-medium transition-all duration-200
                        ${formData.rate === rate
                                                        ? 'bg-blue-600 text-white shadow-md transform scale-105'
                                                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'}
                      `}
                                            >
                                                {rate}%
                                            </button>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="rate"
                                            value={formData.rate}
                                            onChange={handleInputChange}
                                            min="0"
                                            step="0.1"
                                            className={`${inputClasses} pl-10`}
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <Percent className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </GradientCard>

                        {/* Results */}
                        <div className="space-y-6">
                            {result && (
                                <GradientCard>
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-medium text-gray-600 text-center">Rezultat Izračuna</h3>

                                        <div className="space-y-4">
                                            {/* Base Amount */}
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span className="text-gray-600">Osnovica (Neto)</span>
                                                <span className="text-xl font-semibold text-gray-900">
                                                    {formatCurrency(result.baseAmount)}
                                                </span>
                                            </div>

                                            {/* VAT Amount */}
                                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                                                <span className="text-blue-800">Iznos PDV-a ({result.rate}%)</span>
                                                <span className="text-xl font-bold text-blue-600">
                                                    {formatCurrency(result.vatAmount)}
                                                </span>
                                            </div>

                                            {/* Total Amount */}
                                            <div className="flex justify-between items-center p-4 bg-gray-900 rounded-xl text-white shadow-lg transform transition-transform hover:scale-[1.02]">
                                                <span className="text-gray-300">Ukupno (Bruto)</span>
                                                <span className="text-3xl font-bold">
                                                    {formatCurrency(result.totalAmount)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </GradientCard>
                            )}

                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h4 className="font-semibold text-gray-900 mb-2">Jeste li znali?</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Opća stopa PDV-a u Hrvatskoj iznosi <strong>25%</strong>.
                                    Ona se primjenjuje na većinu proizvoda i usluga.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Summary */}
            <AISummary
                summary="PDV kalkulator izračunava porez na dodanu vrijednost. Dodajte PDV na neto iznos ili izvadite PDV iz bruto cijene. Stope: 25% (opća), 13% (snižena), 5% (posebna). Besplatno."
                keywords={['pdv kalkulator', 'porez na dodanu vrijednost', 'pdv iz bruta', 'pdv na neto', 'stope pdv']}
                useCases={[
                    'Izračun PDV-a za račun - dodavanje PDV-a na cijenu',
                    'Pretvarač bruto u neto - izvlačenje PDV-a',
                    'Provjera ispravnosti računa',
                    'Planiranje cijena s PDV-om'
                ]}
                statistics={[
                    { label: 'Opća stopa PDV-a u Hrvatskoj', value: '25%', source: 'Porezna uprava' },
                    { label: 'Snižena stopa PDV-a', value: '13%', source: 'Porezna uprava' },
                    { label: 'Posebna stopa PDV-a', value: '5%', source: 'Porezna uprava' }
                ]}
            />

            {/* Quick Answer */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <QuickAnswer
                        question="Koliko je PDV na 100 EUR (stopa 25%)?"
                        answer="25 EUR PDV, ukupno 125 EUR s PDV-om"
                        highlight="Formula: Neto × 1.25 = Bruto"
                        details="Za izračun PDV-a pomnožite neto iznos sa stopom PDV-a (npr. 100 × 0.25 = 25 EUR PDV-a)."
                    />

                    <div className="grid md:grid-cols-3 gap-6 my-12">
                        <StatisticCard
                            value="25%"
                            label="Opća stopa PDV-a"
                            source="Porezna uprava"
                            color="blue"
                        />
                        <StatisticCard
                            value="13%"
                            label="Snižena stopa"
                            source="Hrana, hoteli"
                            color="green"
                        />
                        <StatisticCard
                            value="5%"
                            label="Posebna stopa"
                            source="Kruh, mlijeko, lijekovi"
                            color="purple"
                        />
                    </div>

                    <ComparisonTable
                        title="Primjeri Izračuna PDV-a"
                        caption="Različite stope PDV-a na 100 EUR neto"
                        headers={['Neto Iznos', 'Stopa PDV-a', 'Iznos PDV-a', 'Bruto Iznos']}
                        rows={[
                            ['100 EUR', '25% (opća)', '25 EUR', '125 EUR'],
                            ['100 EUR', '13% (snižena)', '13 EUR', '113 EUR'],
                            ['100 EUR', '5% (posebna)', '5 EUR', '105 EUR'],
                            ['500 EUR', '25%', '125 EUR', '625 EUR'],
                            ['1.000 EUR', '25%', '250 EUR', '1.250 EUR']
                        ]}
                        highlightColumn={3}
                    />
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Primjeri Korištenja</h2>

                    <UseCaseExample
                        title="Primjer 1: Dodavanje PDV-a na Račun"
                        scenario="Ana prodaje uslugu za 200 EUR bez PDV-a. Mora dodati PDV od 25% na račun."
                        input="Neto cijena: 200 EUR, Stopa PDV-a: 25%"
                        output="PDV: 50 EUR | Ukupno s PDV-om: 250 EUR"
                        explanation="Ana će na računu iskazati 200 EUR osnovicu, 50 EUR PDV-a i ukupno 250 EUR za plaćanje."
                        icon={<Receipt className="w-6 h-6 text-blue-600" />}
                    />

                    <UseCaseExample
                        title="Primjer 2: Izvlačenje PDV-a iz Bruto Cijene"
                        scenario="Marko je platio 625 EUR s PDV-om. Želi znati koliko je neto cijena i PDV."
                        input="Bruto cijena: 625 EUR, Stopa PDV-a: 25%"
                        output="Neto: 500 EUR | PDV: 125 EUR"
                        explanation="Od ukupnog iznosa, 500 EUR je osnovica a 125 EUR je PDV. Formula: 625 / 1.25 = 500 EUR neto."
                        icon={<ArrowRightLeft className="w-6 h-6 text-green-600" />}
                    />

                    <UseCaseExample
                        title="Primjer 3: Snižena Stopa PDV-a"
                        scenario="Restoran izdaje račun za hranu. Primjenjuje se snižena stopa od 13%."
                        input="Neto iznos: 100 EUR, Stopa PDV-a: 13%"
                        output="PDV: 13 EUR | Ukupno: 113 EUR"
                        explanation="Na hranu u restoranima primjenjuje se snižena stopa od 13%, što je povoljnije od opće stope."
                        icon={<Percent className="w-6 h-6 text-purple-600" />}
                    />
                </div>
            </section>

            {/* How to Use Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Kako Izračunati PDV?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-blue-600 mb-2">1.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Smjer</h3>
                            <p className="text-gray-600 text-sm">Odaberite "Dodaj PDV" ili "Izračunaj osnovicu"</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-blue-600 mb-2">2.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Iznos</h3>
                            <p className="text-gray-600 text-sm">Unesite iznos (neto ili bruto)</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-blue-600 mb-2">3.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Stopa</h3>
                            <p className="text-gray-600 text-sm">Standardno 25%, ili snižene 13% i 5%</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-blue-600 mb-2">4.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Izračun</h3>
                            <p className="text-gray-600 text-sm">Dobivate iznose osnovice, PDV-a i ukupno</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Stope PDV-a */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Stope PDV-a u Hrvatskoj
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-600">
                            <div className="text-2xl font-bold text-blue-600 mb-2">25%</div>
                            <h3 className="font-semibold text-gray-900 mb-3">Opća Stopa</h3>
                            <p className="text-gray-600 text-sm">
                                Primjenjuje se na većinu usluga i dobar dio proizvoda (odjeća, obuća, automobili, tehnika, telekomunikacije).
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-400">
                            <div className="text-2xl font-bold text-blue-400 mb-2">13%</div>
                            <h3 className="font-semibold text-gray-900 mb-3">Snižena Stopa</h3>
                            <p className="text-gray-600 text-sm">
                                Za pripremu hrane u ugostiteljstvu, novine, dječje pelene, opskrbu vodom, strujom, te ulaznice za koncerte.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500">
                            <div className="text-2xl font-bold text-green-500 mb-2">5%</div>
                            <h3 className="font-semibold text-gray-900 mb-3">Najniža Stopa</h3>
                            <p className="text-gray-600 text-sm">
                                Za kruh, mlijeko, lijekove, knjige, kino ulaznice i određena medicinska pomagala.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Primjer Izračuna (New) */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Kako Izračunati PDV?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 bg-gray-50 p-2 rounded-lg inline-block">Iz Osnovice (Dodavanje PDV-a)</h3>
                            <p className="text-gray-600 mb-4 text-sm">Ako imate neto cijenu od 100 € i želite dodati 25% PDV-a:</p>
                            <div className="space-y-2 font-mono bg-gray-900 text-green-400 p-4 rounded-lg text-sm">
                                <p>Cijena = 100 €</p>
                                <p>PDV = 100 * 0.25 = 25 €</p>
                                <p>Ukupno = 100 + 25 = 125 €</p>
                            </div>
                            <p className="mt-4 text-sm text-gray-500">Formula: Cijena * (1 + Stopa/100)</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 bg-gray-50 p-2 rounded-lg inline-block">Preračunata Stopa (Izbijanje PDV-a)</h3>
                            <p className="text-gray-600 mb-4 text-sm">Ako imate bruto cijenu od 125 € i želite saznati osnovicu:</p>
                            <div className="space-y-2 font-mono bg-gray-900 text-blue-400 p-4 rounded-lg text-sm">
                                <p>Ukupno = 125 €</p>
                                <p>Cijena = 125 / 1.25 = 100 €</p>
                                <p>PDV = 125 - 100 = 25 €</p>
                            </div>
                            <p className="mt-4 text-sm text-gray-500">Formula: Ukupno / (1 + Stopa/100)</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Tko mora biti u sustavu PDV-a? */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        Tko mora biti u sustavu PDV-a?
                    </h2>
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                                    !
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Prag od 40.000 € (301.380 kn)</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Svi poduzetnici i tvrtke koji u prethodnoj kalendarskoj godini ostvare isporuke dobara i usluga u vrijednosti većoj od <strong>40.000 €</strong> zakonski moraju ući u sustav PDV-a.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Također, u sustav možete ući i dobrovoljno prije prelaska praga, no tada u njemu morate ostati najmanje 3 godine. To se često isplati ako imate velike ulazne troškove i želite pravo na odbitak pretporeza.
                                </p>
                            </div>
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
