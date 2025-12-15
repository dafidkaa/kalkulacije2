import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, Fuel, Banknote, Users, Info, MapPin, TrendingUp } from 'lucide-react';
import { calculateFuelCost } from '../utils/fuelCalculator';
import { ToolSchema, BreadcrumbSchema, FAQSchema, HowToSchema } from '../components/SchemaMarkup';
import { RelatedCalculators } from '../components/RelatedCalculators';
import { QuickAnswer, ComparisonTable, StatisticCard } from '../components/FeaturedSnippets';
import { AISummary, UseCaseExample } from '../components/GEOComponents';

export function FuelCalculator() {
    const [distance, setDistance] = useState<string>('');
    const [consumption, setConsumption] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [passengers, setPassengers] = useState<string>('1');

    const result = calculateFuelCost(
        Number(distance),
        Number(consumption),
        Number(price),
        Number(passengers)
    );

    const faqData = [
        {
            question: 'Kako se računa potrošnja goriva?',
            answer: 'Potrošnja goriva računa se formulom: (Prijeđeni kilometri × Prosječna potrošnja) / 100. Rezultat množite s cijenom goriva da dobijete ukupni trošak.'
        },
        {
            question: 'Kako smanjiti potrošnju goriva?',
            answer: 'Potrošnju možete smanjiti redovitim održavanjem vozila, provjerom tlaka u gumama, izbjegavanjem naglog ubrzavanja i kočenja te uklanjanjem nepotrebnog tereta iz vozila.'
        },
        {
            question: 'Koliko košta put od 100km?',
            answer: 'Cijena ovisi o vašoj potrošnji i cijeni goriva. Ako auto troši 7L/100km, a gorivo je 1.50€/L, put košta 10.50€ (7 × 1.50).'
        },
        {
            question: 'Isplati li se dijeliti troškove puta?',
            answer: 'Da, dijeljenje troškova (carpooling) značajno smanjuje individualni trošak. S 4 putnika, trošak po osobi je 75% manji.'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Kalkulator Potrošnje Goriva | Izračun Cijene Puta</title>
                <meta
                    name="description"
                    content="Besplatni kalkulator potrošnje goriva. Izračunajte cijenu puta, potrošnju po kilometru i trošak po putniku. Planirajte putovanje precizno uz trenutne cijene goriva."
                />
                <meta
                    name="keywords"
                    content="kalkulator goriva, potrošnja goriva, kalkulator puta, cijena goriva, trošak puta, dijeljenje troškova, izračun goriva"
                />
                <link rel="canonical" href="https://kalkulacije.com/kalkulator-goriva" />
            </Helmet>

            <ToolSchema
                name="Kalkulator Potrošnje Goriva"
                description="Besplatni alat za izračun troškova goriva i cijene puta po putniku."
                url="https://kalkulacije.com/kalkulator-goriva"
                keywords={['kalkulator goriva', 'cijena puta', 'potrošnja goriva']}
            />

            <BreadcrumbSchema
                items={[
                    { name: 'Početna', url: 'https://kalkulacije.com/' },
                    { name: 'Kalkulator Goriva', url: 'https://kalkulacije.com/kalkulator-goriva' }
                ]}
            />

            <HowToSchema
                name="Kako izračunati potrošnju goriva i cijenu puta?"
                description="Vodič za izračun troška goriva i podjelu troškova na putovanju."
                steps={[
                    { name: 'Udaljenost', text: 'Unesite udaljenost putovanja u kilometrima.' },
                    { name: 'Potrošnja', text: 'Unesite prosječnu potrošnju vašeg automobila (L/100km).' },
                    { name: 'Cijena', text: 'Upišite trenutnu cijenu goriva po litri.' },
                    { name: 'Putnici', text: 'Unesite broj putnika za izračun troška po osobi.' }
                ]}
            />

            <FAQSchema questions={faqData} />

            {/* Hero Section */}
            <section className="pt-16 pb-12 bg-gradient-to-br from-blue-50 to-indigo-50 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 font-display">
                        Kalkulator Potrošnje Goriva
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        <span>
                            Planirate putovanje? Izračunajte točan trošak goriva, ukupnu potrošnju
                            i podijelite troškove sa suputnicima u nekoliko klikova.
                        </span>
                    </p>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-8">
                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Input Form */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Udaljenost (km)
                                        </label>
                                        <div className="relative">
                                            <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="number"
                                                value={distance}
                                                onChange={(e) => setDistance(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                placeholder="npr. 350"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Potrošnja (L/100km)
                                        </label>
                                        <div className="relative">
                                            <Fuel className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="number"
                                                value={consumption}
                                                onChange={(e) => setConsumption(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                placeholder="npr. 7.5"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cijena goriva (€/L)
                                        </label>
                                        <div className="relative">
                                            <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                placeholder="npr. 1.45"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Broj putnika
                                        </label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="number"
                                                min="1"
                                                value={passengers}
                                                onChange={(e) => setPassengers(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Results - Gradient Card */}
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white flex flex-col justify-center shadow-lg">
                                    <h3 className="text-xl font-medium text-blue-100 mb-6">Rezultat Izračuna</h3>

                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-blue-200 text-sm mb-1">Ukupni trošak goriva</p>
                                            <div className="text-5xl font-bold">
                                                {result.totalCost.toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-blue-500/30">
                                            <div>
                                                <p className="text-blue-200 text-xs mb-1">Trošak po osobi</p>
                                                <p className="text-2xl font-semibold">
                                                    {result.costPerPerson.toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-blue-200 text-xs mb-1">Potrebno goriva</p>
                                                <p className="text-2xl font-semibold">
                                                    {result.fuelCompumptionTotal} L
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Summary */}
            <AISummary
                summary="Kalkulator goriva izračunava trošak puta na temelju udaljenosti, potrošnje i cijene goriva. Podijeli troškove po putniku. Besplatno, precizno."
                keywords={['kalkulator goriva', 'potrošnja goriva', 'cijena puta', 'trošak goriva', 'dijeljenje troškova']}
                useCases={[
                    'Planiranje puta - koliko će koštati putovanje',
                    'Usporedba vozila - koje auto je ekonomičniji',
                    'Dijeljenje troškova s putnicima (carpooling)',
                    'Mjesečni troškovi vožnje na posao'
                ]}
                statistics={[
                    { label: 'Prosječna potrošnja benzinac', value: '6-8 L/100km', source: 'Procjena' },
                    { label: 'Prosječna potrošnja dizelac', value: '5-7 L/100km', source: 'Procjena' },
                    { label: 'Cijena goriva u Hrvatskoj', value: '~1.50 EUR/L', source: 'Prosjek 2024' }
                ]}
            />

            {/* Quick Answer */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <QuickAnswer
                        question="Koliko košta put od 300 km s potrošnjom 6 L/100km?"
                        answer="Približno 27 EUR (cijena goriva 1.50 EUR/L)"
                        highlight="Formula: (300 km × 6 L/100km) × 1.50 EUR/L = 27 EUR"
                        details="Točan trošak ovisi o vašoj potrošnji i trenutnoj cijeni goriva. S 4 putnika, trošak po osobi je 6.75 EUR."
                    />

                    <div className="grid md:grid-cols-3 gap-6 my-12">
                        <StatisticCard
                            value="6-8 L"
                            label="Prosječna potrošnja benzinac"
                            source="/100km"
                            color="blue"
                        />
                        <StatisticCard
                            value="1.50 EUR"
                            label="Prosječna cijena goriva"
                            source="Hrvatska, 2024"
                            color="green"
                        />
                        <StatisticCard
                            value="15.000 km"
                            label="Prosječno godišnje"
                            source="Prijeđeni put"
                            color="purple"
                        />
                    </div>

                    <ComparisonTable
                        title="Trošak Puta po Udaljenosti"
                        caption="Potrošnja 7 L/100km, cijena goriva 1.50 EUR/L"
                        headers={['Udaljenost', 'Potrebno Goriva', 'Trošak', 'Po Osobi (4 putnika)']}
                        rows={[
                            ['50 km', '3.5 L', '5.25 EUR', '1.31 EUR'],
                            ['100 km', '7 L', '10.50 EUR', '2.63 EUR'],
                            ['200 km', '14 L', '21 EUR', '5.25 EUR'],
                            ['300 km', '21 L', '31.50 EUR', '7.88 EUR'],
                            ['500 km', '35 L', '52.50 EUR', '13.13 EUR']
                        ]}
                        highlightColumn={2}
                    />
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Primjeri Korištenja</h2>

                    <UseCaseExample
                        title="Primjer 1: Planiranje Putovanja"
                        scenario="Ana planira put od Zagreba do Splita (400 km). Auto troši 6.5 L/100km, gorivo košta 1.48 EUR/L."
                        input="Udaljenost: 400 km, Potrošnja: 6.5 L/100km, Cijena: 1.48 EUR/L"
                        output="Trošak: 38.48 EUR | Potrebno goriva: 26 L"
                        explanation="Ana treba napuniti rezervoar prije puta. Ako putuje s 3 prijatelja, trošak po osobi je 9.62 EUR."
                        icon={<MapPin className="w-6 h-6 text-blue-600" />}
                    />

                    <UseCaseExample
                        title="Primjer 2: Usporedba Dva Automobila"
                        scenario="Marko bira između dva auta: benzinac (7.5 L/100km) i dizelac (5.5 L/100km). Voži 20.000 km godišnje."
                        input="Benzinac: 7.5 L/100km × 1.50 EUR | Dizelac: 5.5 L/100km × 1.45 EUR"
                        output="Benzinac: 2.250 EUR/god | Dizelac: 1.595 EUR/god | Ušteda: 655 EUR"
                        explanation="Dizelac je ekonomičniji za 655 EUR godišnje, što se isplati ako Marko puno voži."
                        icon={<TrendingUp className="w-6 h-6 text-green-600" />}
                    />

                    <UseCaseExample
                        title="Primjer 3: Carpooling (Dijeljenje Troškova)"
                        scenario="Ivana svaki dan voži na posao (50 km tamo-natrag). Želi podijeliti troškove s 2 kolege."
                        input="Dnevno: 50 km, Mjesečno: ~1.000 km, Potrošnja: 6 L/100km, 3 osobe"
                        output="Trošak mjesečno: 90 EUR | Po osobi: 30 EUR"
                        explanation="Dijeljenje troškova smanjuje individualni trošak za 67%. Ivana uštedi 60 EUR mjesečno."
                        icon={<Users className="w-6 h-6 text-purple-600" />}
                    />
                </div>
            </section>

            {/* How to Use Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Kako Izračunati Cijenu Puta?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-blue-600 mb-2">1.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">KM</h3>
                            <p className="text-gray-600 text-sm">Koliko kilometara putujete?</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-blue-600 mb-2">2.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Auto</h3>
                            <p className="text-gray-600 text-sm">Koliko auto troši litara na 100km?</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-blue-600 mb-2">3.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Cijena</h3>
                            <p className="text-gray-600 text-sm">Koliko košta litra goriva?</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-blue-600 mb-2">4.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Trošak</h3>
                            <p className="text-gray-600 text-sm">Saznajte ukupan trošak i cijenu po putniku.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Razumijevanje Troškova Putovanja
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                                <Fuel className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Kako izračunati potrošnju?</h3>
                            <p className="text-gray-600 mb-4">
                                Formula je jednostavna: pomnožite prijeđene kilometre s prosječnom potrošnjom
                                i podijelite sa 100.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <code className="text-sm text-blue-800 font-mono">
                                    Potrošnja (L) = (Km × L/100km) ÷ 100
                                </code>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                                <Banknote className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Savjeti za uštedu</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    Provjeravajte tlak u gumama redovito
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    Koristite tempomat na autocesti
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    Izbjegavajte nagla ubrzanja
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Česta Pitanja (FAQ)
                    </h2>
                    <div className="space-y-6">
                        {faqData.map((faq, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                                <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-3">
                                    <Info className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 ml-8">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <RelatedCalculators />
        </>
    );
}
