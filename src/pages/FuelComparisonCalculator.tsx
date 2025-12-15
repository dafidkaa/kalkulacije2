import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Fuel, Zap, Droplets, Timer, ArrowRight, TrendingDown } from 'lucide-react';
import { ToolSchema, BreadcrumbSchema, FAQSchema } from '../components/SchemaMarkup';
import { RelatedCalculators } from '../components/RelatedCalculators';
import { QuickAnswer, ComparisonTable, StatisticCard } from '../components/FeaturedSnippets';
import { AISummary, UseCaseExample } from '../components/GEOComponents';
import { Info } from 'lucide-react';

// Default Data (Avg 2024 Croatia/EU)
const DEFAULTS = {
    petrol: { price: 1.54, consumption: 7.0, unit: 'L', name: 'Benzin', refuelTime: 5, range: 700 },
    diesel: { price: 1.48, consumption: 6.0, unit: 'L', name: 'Dizel', refuelTime: 5, range: 850 },
    electric: { price: 0.25, consumption: 18.0, unit: 'kWh', name: 'Električni', refuelTime: 45, range: 400 }, // Blended price (home/public)
    hydrogen: { price: 12.00, consumption: 0.9, unit: 'kg', name: 'Vodik (H2)', refuelTime: 5, range: 600 }
};

export function FuelComparisonCalculator() {
    // Inputs
    const [mileage, setMileage] = useState<number>(15000);

    // Modifiable Stats
    const [stats, setStats] = useState(DEFAULTS);

    // Results
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        const calc = Object.entries(stats).map(([key, data]) => {
            const costPer100 = data.price * data.consumption;
            const costAnnual = (costPer100 * mileage) / 100;
            return {
                key,
                ...data,
                costPer100,
                costAnnual
            };
        }).sort((a, b) => a.costAnnual - b.costAnnual); // Sort cheapest first

        setResults(calc);
    }, [mileage, stats]);

    const handleStatChange = (fuelKey: string, field: string, value: string) => {
        setStats(prev => ({
            ...prev,
            [fuelKey]: {
                ...prev[fuelKey as keyof typeof DEFAULTS],
                [field]: parseFloat(value) || 0
            }
        }));
    };

    const faqData = [
        {
            question: 'Je li električni auto stvarno jeftiniji?',
            answer: `Da, u većini slučajeva. Uz kućno punjenje (cca 2-3€/100km), električni auto je 3-4 puta jeftiniji po kilometru od benzinca (cca 10-11€/100km).`
        },
        {
            question: 'Isplati li se vodik?',
            answer: 'Trenutno je vodik najskuplja opcija po kilometru i stanice su rijetke, ali nudi brzo punjenje slično gorivu.'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Usporedba Goriva i Troškova Vozila | Benzin vs Dizel vs Struja</title>
                <meta name="description" content="Usporedite troškove vožnje: Električni auto, Benzinac, Dizelaš ili Vodik. Izračunajte uštedu na 100km i godišnjoj razini." />
            </Helmet>

            <ToolSchema
                name="Usporedba Goriva"
                description="Kalkulator za usporedbu troškova različitih pogonskih goriva (benzin, dizel, struja, vodik)."
                url="https://kalkulacije.com/usporedba-goriva"
            />
            <BreadcrumbSchema items={[{ name: 'Početna', url: '/' }, { name: 'Usporedba Goriva', url: '/usporedba-goriva' }]} />
            <FAQSchema questions={faqData} />

            {/* HERO */}
            <section className="pt-16 pb-12 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6 relative">
                        <Fuel className="w-8 h-8 text-blue-600" />
                        <Zap className="w-5 h-5 text-yellow-500 absolute -right-1 -bottom-1 bg-white rounded-full" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
                        Usporedba Goriva
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Tko pobjeđuje u utrci troškova? Usporedite Benzin, Dizel, Struju i Vodik.
                    </p>
                </div>
            </section>

            {/* INPUTS SECTION */}
            <section className="py-8 bg-white border-b">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <label className="text-lg font-medium text-gray-700">Godišnja Kilometraža:</label>
                        <div className="relative w-full md:w-64">
                            <input
                                type="number"
                                value={mileage}
                                onChange={(e) => setMileage(Number(e.target.value))}
                                className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl text-xl font-bold text-gray-900 focus:border-blue-500 focus:ring-0"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">km</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPARISON CARDS */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-7xl">

                    {/* WINNER CARD */}
                    {results[0] && (
                        <div className="mb-12 max-w-4xl mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-1 shadow-lg transform hover:scale-[1.01] transition-transform">
                            <div className="bg-white rounded-[22px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-green-100 rounded-full">
                                        <TrendingDown className="w-8 h-8 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-green-600 font-bold uppercase tracking-wider text-sm">Pobjednik Uštede</p>
                                        <h3 className="text-3xl font-bold text-gray-900">{results[0].name}</h3>
                                    </div>
                                </div>
                                <div className="text-center md:text-right">
                                    <p className="text-gray-500 text-sm mb-1">Godišnji trošak goriva</p>
                                    <p className="text-4xl font-bold text-green-600">
                                        {results[0].costAnnual.toLocaleString('hr-HR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                                    </p>
                                    {results[1] && (
                                        <p className="text-sm text-gray-400 mt-2">
                                            Štedite <span className="font-semibold text-gray-800">
                                                {(results[1].costAnnual - results[0].costAnnual).toLocaleString('hr-HR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                                            </span> u odnosu na {results[1].name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DETAILED GRID */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {results.map((item, index) => (
                            <div key={item.key} className={`bg-white rounded-2xl shadow-sm border p-6 relative ${index === 0 ? 'border-green-500 ring-2 ring-green-100' : 'border-gray-200'}`}>
                                {index === 0 && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                                        Najjeftiniji
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-6">
                                    <div className="text-xl font-bold text-gray-900">{item.name}</div>
                                    {item.key === 'electric' ? <Zap className="w-6 h-6 text-yellow-500" /> :
                                        item.key === 'hydrogen' ? <Droplets className="w-6 h-6 text-blue-400" /> :
                                            <Fuel className="w-6 h-6 text-gray-400" />}
                                </div>

                                {/* Cost Block */}
                                <div className="mb-6 pb-6 border-b border-gray-100">
                                    <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Cijena na 100km</p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {item.costPer100.toFixed(2)} €
                                    </p>
                                </div>

                                {/* Editable Stats */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Cijena ({item.unit})</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={stats[item.key as keyof typeof DEFAULTS].price}
                                            onChange={(e) => handleStatChange(item.key, 'price', e.target.value)}
                                            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:bg-white focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Potrošnja (na 100km)</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={stats[item.key as keyof typeof DEFAULTS].consumption}
                                            onChange={(e) => handleStatChange(item.key, 'consumption', e.target.value)}
                                            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:bg-white focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Specs */}
                                <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span className="flex items-center gap-2"><Timer className="w-4 h-4" /> Punjenje</span>
                                        <span className="font-medium">{item.refuelTime} min</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span className="flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Domet</span>
                                        <span className="font-medium">{item.range} km</span>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="mt-12 bg-blue-50 p-6 rounded-2xl text-sm text-blue-800 border border-blue-100 max-w-3xl mx-auto text-center">
                        <p>
                            <strong>Napomena:</strong> Cijene su prosječne za Hrvatsku (2024). Električna energija je kombinacija kućnog (niža tarifa) i javnog punjenja.
                            Vodik je procijenjen prema EU prosjeku jer su punionice rijetke.
                        </p>
                    </div>

                </div>
            </section>

            {/* AI Summary */}
            <AISummary
                summary="Kalkulator za usporedbu troškova goriva: Benzin vs Dizel vs Struja vs Vodik. Izračunajte uštedu na 100km i godišnjoj razini."
                keywords={['usporedba goriva', 'električni auto ušteda', 'cijena benzina', 'dizel vs benzin', 'potrošnja goriva']}
                useCases={[
                    'Usporedba godišnjih troškova prije kupnje auta',
                    'Izračun isplativosti električnog vozila',
                    'Analiza uštede prelaskom na dizel'
                ]}
                statistics={[
                    { label: 'Cijena vožnje na struju', value: '~2-3€/100km', source: 'HEP (Kućno punjenje)' },
                    { label: 'Cijena vožnje na benzin', value: '~10-12€/100km', source: 'Trenutne cijene' },
                    { label: 'Ušteda EV vs Benzin', value: '~1000€/god', source: 'Prosjek na 15k km' }
                ]}
            />

            {/* Quick Answer */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <QuickAnswer
                        question="Što je najisplativije voziti u 2024?"
                        answer="Električni automobili punjeni kod kuće su uvjerljivo najjeftiniji (2-3€/100km). Dizelaši su i dalje isplativiji od benzinaca za veće kilometraže."
                        highlight="Pobjednik: Električni auto (Kućno punjenje)"
                        details="Javno punjenje može biti skupo i izjednačiti cijenu sa dizelom. Vodik je trenutno najskuplja opcija."
                    />

                    <div className="grid md:grid-cols-3 gap-6 my-12">
                        <StatisticCard
                            value="80%"
                            label="Jeftinije na struju (kući)"
                            source="Usporedba"
                            color="green"
                        />
                        <StatisticCard
                            value="15-20%"
                            label="Ušteda Dizel vs Benzin"
                            source="Potrošnja"
                            color="blue"
                        />
                        <StatisticCard
                            value="7x"
                            label="Skuplji Vodik od Struje"
                            source="Cijena kg"
                            color="orange"
                        />
                    </div>

                    <ComparisonTable
                        title="Trošak na 100km"
                        caption="Prosječna cijena vožnje za različite vrste pogona"
                        headers={['Pogon', 'Potrošnja', 'Cijena/jed.', 'Trošak (€/100km)']}
                        rows={[
                            ['Benzin (Eurosuper 95)', '7 L', '1.54 €', '10.78 €'],
                            ['Dizel (Eurodizel)', '6 L', '1.48 €', '8.88 €'],
                            ['Električni (Kućno)', '18 kWh', '0.15 €', '2.70 €'],
                            ['Električni (Javno)', '18 kWh', '0.60 €', '10.80 €'],
                            ['Vodik (H2)', '0.9 kg', '12.00 €', '10.80 €']
                        ]}
                        highlightColumn={3}
                    />
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Primjeri Korištenja</h2>

                    <UseCaseExample
                        title="Primjer 1: Gradski Auto"
                        scenario="Godišnje 10.000 km, uglavnom gradska vožnja."
                        input="Kilometraža: 10.000 km"
                        output="Ušteda EV: ~800€/god"
                        explanation="Električni auto je idealan za grad zbog regenerativnog kočenja i niske potrošnje."
                        icon={<Zap className="w-6 h-6 text-yellow-600" />}
                    />

                    <UseCaseExample
                        title="Primjer 2: Putnik (Autocesta)"
                        scenario="Godišnje 30.000 km, puno autoceste."
                        input="Kilometraža: 30.000 km"
                        output="Dizel je konkurentan"
                        explanation="Na autocesti potrošnja EV-a raste, a dizel je efikasan. Ipak, EV je i dalje jeftiniji ako se puni kod kuće."
                        icon={<Fuel className="w-6 h-6 text-blue-600" />}
                    />

                    <UseCaseExample
                        title="Primjer 3: Benzinac"
                        scenario="Mala godišnja kilometraža (5.000 km)."
                        input="Kilometraža: 5.000 km"
                        output="Benzin je OK izbor"
                        explanation="Za male kilometraže, niža nabavna cijena benzinca nadoknađuje skuplje gorivo."
                        icon={<TrendingDown className="w-6 h-6 text-red-600" />}
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
                            <div className="text-2xl font-bold text-blue-600 mb-2">1.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Godišnja ruta</h3>
                            <p className="text-gray-600 text-sm">Unesite koliko kilometara planirate prijeći godišnje</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-blue-600 mb-2">2.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Provjerite cijene</h3>
                            <p className="text-gray-600 text-sm">Ažurirajte cijene goriva/struje ako se razlikuju od prosjeka</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-blue-600 mb-2">3.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Usporedba</h3>
                            <p className="text-gray-600 text-sm">Kalkulator rangira opcije od najjeftinije do najskuplje</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-blue-600 mb-2">4.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Analiza</h3>
                            <p className="text-gray-600 text-sm">Usporedite ukupni godišnji trošak i uštede</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO CONTENT */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-3xl">
                    <article className="prose prose-blue max-w-none">
                        <h2>Benzin, Dizel, Struja ili Vodik - Što se najviše isplati?</h2>
                        <p>
                            Vječna dilema pri kupnji automobila: jeftinija vožnja na struju ili praktičnost benzina/dizela?
                            Ovaj kalkulator vam omogućuje direktnu usporedbu "krušaka i jabuka" svođenjem svih troškova na
                            zajednički nazivnik - <strong>cijenu po kilometru</strong>.
                        </p>

                        <h3>Električna vozila (EV)</h3>
                        <p>
                            Električni auti su u 2024. godini apsolutni pobjednici u kategoriji "cijena goriva", pogotovo ako
                            se pune kod kuće. Trošak može biti i do 4-5 puta manji od dizela. Glavni nedostatak je viša početna
                            cijena vozila i vrijeme potrebno za punjenje na putovanjima.
                        </p>

                        <h3>Dizel i Benzin</h3>
                        <p>
                            Klasični motori (ICE) i dalje dominiraju zbog praktičnosti. Natočite za 5 minuta i vozite 800+ km.
                            Dizel je tradicionalno bio izbor za one koji rade puno kilometara, no razlika u cijeni goriva se smanjila,
                            a moderni benzinci su postali štedljiviji.
                        </p>

                        <h3>Vodik (FCEV)</h3>
                        <p>
                            Vodik nudi najbolje od oba svijeta - ekološki je kao struja, a puni se brzo kao benzin.
                            Nažalost, infrastruktura u Hrvatskoj je još u povojima, a cijena vodika po kilogramu je i dalje visoka.
                        </p>
                    </article>
                </div>
            </section>
        </>
    );
}
