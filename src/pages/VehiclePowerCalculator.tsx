import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Zap, Gauge, Car, Info } from 'lucide-react';
import { ToolSchema, BreadcrumbSchema, FAQSchema } from '../components/SchemaMarkup';
import { RelatedCalculators } from '../components/RelatedCalculators';
import { QuickAnswer, ComparisonTable, StatisticCard } from '../components/FeaturedSnippets';
import { AISummary, UseCaseExample } from '../components/GEOComponents';

// Conversion constant: 1 kW = 1.35962 KS
const KW_TO_KS = 1.35962;

// Fun car references for context
const CAR_REFERENCES = [
    { power: 45, name: 'Fiat 500 (1.0 Hybrid)', type: 'City Car' },
    { power: 66, name: 'Renault Clio (TCe 90)', type: 'Compact' },
    { power: 81, name: 'VW Golf 8 (1.0 TSI)', type: 'Hatchback' },
    { power: 110, name: 'Audi A4 (35 TFSI)', type: 'Sedan' },
    { power: 150, name: 'Škoda Octavia RS (2.0 TSI)', type: 'Sport Sedan' },
    { power: 235, name: 'Honda Civic Type R', type: 'Hot Hatch' },
    { power: 300, name: 'Porsche 718 Cayman', type: 'Sports Car' },
    { power: 400, name: 'BMW M5 Competition', type: 'Super Sedan' },
    { power: 550, name: 'Lamborghini Aventador', type: 'Supercar' },
    { power: 735, name: 'Ferrari SF90 Stradale', type: 'Hypercar' },
    { power: 1400, name: 'Rimac Nevera', type: 'Electric Hypercar' }
];

export function VehiclePowerCalculator() {
    const [kw, setKw] = useState<string>('');
    const [ks, setKs] = useState<string>('');
    const [closestRef, setClosestRef] = useState<typeof CAR_REFERENCES[0] | null>(null);

    // Handle kW Input
    const handleKwChange = (val: string) => {
        setKw(val);
        if (!val || isNaN(Number(val))) {
            setKs('');
            setClosestRef(null);
            return;
        }
        const kwVal = parseFloat(val);
        setKs((kwVal * KW_TO_KS).toFixed(0));
        findClosestRef(kwVal);
    };

    // Handle KS Input
    const handleKsChange = (val: string) => {
        setKs(val);
        if (!val || isNaN(Number(val))) {
            setKw('');
            setClosestRef(null);
            return;
        }
        const ksVal = parseFloat(val);
        const kwVal = ksVal / KW_TO_KS;
        setKw(kwVal.toFixed(1));
        findClosestRef(kwVal);
    };

    // Find closest car reference
    const findClosestRef = (powerKw: number) => {
        const sorted = [...CAR_REFERENCES].sort((a, b) =>
            Math.abs(a.power - powerKw) - Math.abs(b.power - powerKw)
        );
        setClosestRef(sorted[0]);
    };

    const faqData = [
        {
            question: 'Koja je razlika između kW i KS?',
            answer: 'kW (kilovat) je službena mjerna jedinica za snagu u EU, dok je KS (konjska snaga) tradicionalna jedinica. 1 kW iznosi približno 1.36 KS.'
        },
        {
            question: 'Kako pretvoriti kW u KS?',
            answer: 'Pomnožite iznos u kilovatima s 1.36. Npr. 100 kW * 1.36 = 136 KS.'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Kalkulator Snage Vozila (kW u KS) | Pretvarač Konjskih Snaga</title>
                <meta name="description" content="Brzo pretvorite kilovate (kW) u konjske snage (KS) i obrnuto. Usporedite snagu svog auta s popularnim modelima." />
            </Helmet>

            <ToolSchema
                name="Kalkulator Snage Vozila"
                description="Besplatan alat za pretvaranje snage motora iz kW u KS i obrnuto."
                url="https://kalkulacije.com/kalkulator-snage-vozila"
            />
            <BreadcrumbSchema
                items={[
                    { name: 'Početna', url: 'https://kalkulacije.com/' },
                    { name: 'Kalkulator Snage', url: 'https://kalkulacije.com/kalkulator-snage-vozila' }
                ]}
            />
            <FAQSchema questions={faqData} />

            <section className="pt-16 pb-12 bg-gradient-to-br from-red-50 to-orange-50">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-6">
                        <Gauge className="w-8 h-8 text-red-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
                        Kalkulator Snage
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Pretvorite kW u KS i saznajte kojem je autu slična vaša "mašina".
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">

                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* kW Input */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    Snaga u kW
                                </label>
                                <input
                                    type="number"
                                    value={kw}
                                    onChange={(e) => handleKwChange(e.target.value)}
                                    className="w-full text-4xl font-bold p-4 border-2 border-gray-100 rounded-xl focus:border-red-500 focus:ring-0 text-gray-900 placeholder-gray-200"
                                    placeholder="0"
                                />
                                <span className="absolute right-6 top-10 text-gray-400 font-medium">kW</span>
                            </div>

                            {/* KS Input */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    Snaga u KS (HP)
                                </label>
                                <input
                                    type="number"
                                    value={ks}
                                    onChange={(e) => handleKsChange(e.target.value)}
                                    className="w-full text-4xl font-bold p-4 border-2 border-red-500 bg-red-50/30 rounded-xl focus:border-red-600 focus:ring-0 text-red-900 placeholder-red-200"
                                    placeholder="0"
                                />
                                <span className="absolute right-6 top-10 text-red-400 font-medium">KS</span>
                            </div>
                        </div>

                        {/* Context Card */}
                        {closestRef && kw && (
                            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-6 animate-fade-in">
                                <div className="p-4 bg-white rounded-full shadow-sm">
                                    <Car className="w-8 h-8 text-gray-700" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm font-medium mb-1">Jeste li znali?</p>
                                    <p className="text-gray-900 text-lg">
                                        Ova snaga je slična modelu <span className="font-bold text-red-600">{closestRef.name}</span>
                                        <span className="text-gray-400 text-sm ml-2">({closestRef.power} kW)</span>
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </section>

            {/* AI Summary */}
            <AISummary
                summary="Kalkulator za pretvaranje snage motora iz kilovata (kW) u konjske snage (KS). Usporedite snagu svog automobila s popularnim modelima."
                keywords={['kalkulator kw u ks', 'pretvarač snage', 'konjske snage kalkulator', 'kw to hp', 'snaga motora']}
                useCases={[
                    'Pretvaranje podataka iz prometne dozvole (kW) u KS',
                    'Usporedba snage kod kupnje automobila',
                    'Provjera tehničkih karakteristika vozila'
                ]}
                statistics={[
                    { label: 'Faktor konverzije', value: '1.36', source: 'Standard' },
                    { label: 'Snaga gradskog auta', value: '50-70 kW', source: 'Prosjek' },
                    { label: 'Snaga sportskog auta', value: '>200 kW', source: 'Prosjek' }
                ]}
            />

            {/* Quick Answer */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <QuickAnswer
                        question="Kako pretvoriti kW u KS?"
                        answer="Jednostavno pomnožite kilovate s 1.35962 (približno 1.36). Npr. 100 kW je 136 KS."
                        highlight="Formula: kW * 1.36 = KS"
                        details="Za pretvorbu iz KS u kW, dijelite s 1.36. Konjska snaga (KS) nije SI jedinica, ali se često koristi."
                    />

                    <div className="grid md:grid-cols-3 gap-6 my-12">
                        <StatisticCard
                            value="1.36"
                            label="KS u 1 kW"
                            source="Fizika"
                            color="blue"
                        />
                        <StatisticCard
                            value="0.74"
                            label="kW u 1 KS"
                            source="Fizika"
                            color="orange"
                        />
                        <StatisticCard
                            value="HP vs KS"
                            label="Mala razlika (0.98)"
                            source="Standardi"
                            color="purple"
                        />
                    </div>

                    <ComparisonTable
                        title="Tablica Snage (kW u KS)"
                        caption="Popularne vrijednosti snage motora"
                        headers={['kW (Kilovati)', 'KS (Konjske snage)', 'Primjer vozila']}
                        rows={[
                            ['44 kW', '60 KS', 'Osnovni gradski auto'],
                            ['66 kW', '90 KS', 'Standardni kompakt (Clio, Polo)'],
                            ['81 kW', '110 KS', 'Srednja klasa (Golf, Octavia)'],
                            ['110 kW', '150 KS', 'Snažniji dizel/benzinac'],
                            ['200 kW', '272 KS', 'Sportski model (GTI, RS)']
                        ]}
                        highlightColumn={1}
                    />
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Primjeri Korištenja</h2>

                    <UseCaseExample
                        title="Primjer 1: Kupnja Auta"
                        scenario="Oglas kaže da auto ima 85 kW. Vas zanima koliko je to 'konja'."
                        input="Snaga: 85 kW"
                        output="Rezultat: 115 KS"
                        explanation="Solidna snaga za pretjecanja i ugodnu vožnju."
                        icon={<Car className="w-6 h-6 text-blue-600" />}
                    />

                    <UseCaseExample
                        title="Primjer 2: Prometna Dozvola"
                        scenario="U prometnoj piše 110 kW. Prijatelj pita koliko auto ima konja."
                        input="Snaga: 110 kW"
                        output="Rezultat: 150 KS"
                        explanation="Standardna snaga za moderne 2.0 dizel motore (npr. Audi, BMW, VW)."
                        icon={<Gauge className="w-6 h-6 text-red-600" />}
                    />

                    <UseCaseExample
                        title="Primjer 3: Električni Auto"
                        scenario="Tesla Model 3 ima 208 kW."
                        input="Snaga: 208 kW"
                        output="Rezultat: 283 KS"
                        explanation="Električni motori često imaju veliku snagu i moment."
                        icon={<Zap className="w-6 h-6 text-yellow-600" />}
                    />
                </div>
            </section>

            {/* How to Use Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Kako Funkcionira
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-red-600 mb-2">1.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Unesite vrijednost</h3>
                            <p className="text-gray-600 text-sm">Upišite snagu motora u kilovatima (kW) ili konjskim snagama (KS)</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-red-600 mb-2">2.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Instant konverzija</h3>
                            <p className="text-gray-600 text-sm">Kalkulator automatski preračunava drugu vrijednost</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-red-600 mb-2">3.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Usporedba</h3>
                            <p className="text-gray-600 text-sm">Pogledajte kojem poznatom autu odgovara ta snaga</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-red-600 mb-2">4.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Saznajte klasu</h3>
                            <p className="text-gray-600 text-sm">Otkrijte spada li vozilo u gradsku, sportsku ili super klasu</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO CONTENT */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-3xl">
                    <article className="prose prose-red max-w-none">
                        <h2>Što je Kilovat (kW), a što Konjska Snaga (KS)?</h2>
                        <p>
                            Kada kupujemo automobil, jedna od prvih brojki koju gledamo je snaga motora. U Hrvatskoj i Europi,
                            službena mjerna jedinica je <strong>kilovat (kW)</strong>, no u svakodnevnom govoru i dalje svi
                            koristimo <strong>konjske snage (KS)</strong>.
                        </p>
                        <p>
                            Odnos je fiksan: <strong>1 kW = 1.35962 KS</strong>. To znači da je snaga u "konjima" uvijek brojčano
                            veća od snage u kilovatima za otprilike 36%.
                        </p>

                        <h2>Kako koristiti ovaj kalkulator snage?</h2>
                        <p>
                            Jednostavno upišite iznos u jednom polju (npr. 110 kW) i kalkulator će automatski izračunati
                            drugo polje (150 KS). Kao bonus, naš alat će vam pokazati i koji poznati automobil ima sličnu snagu,
                            kako biste lakše vizualizirali što ta brojka znači u stvarnosti.
                        </p>

                        <h3>Primjeri snage popularnih auta:</h3>
                        <ul>
                            <li>Gradski auto: cca 50-70 kW (65-95 KS)</li>
                            <li>Obiteljski kompakt: cca 85-110 kW (115-150 KS)</li>
                            <li>Sportska limuzina: cca 150-200 kW (200-270 KS)</li>
                            <li>Superautomobil: preko 400 kW (540+ KS)</li>
                        </ul>
                    </article>
                </div>
            </section>
        </>
    );
}
