import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Calculator,
    Wallet,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Info,
    Car,
    ShoppingBag,
    DollarSign,
    PieChart,
    Home,
    CreditCard
} from 'lucide-react';
import { calculateAffordability, type FinanceType, type AssetType, type Verdict } from '../utils/affordabilityCalculator';
import { ToolSchema, BreadcrumbSchema, FAQSchema } from '../components/SchemaMarkup';
import { RelatedCalculators } from '../components/RelatedCalculators';

export function AffordabilityCalculator() {
    // State
    const [assetType, setAssetType] = useState<AssetType>('CAR');
    const [netIncome, setNetIncome] = useState<string>('');
    const [fixedExpenses, setFixedExpenses] = useState<string>('');
    const [savings, setSavings] = useState<string>('');

    const [assetPrice, setAssetPrice] = useState<string>('');
    const [financeType, setFinanceType] = useState<FinanceType>('LOAN');
    const [downPayment, setDownPayment] = useState<string>('');
    const [loanTerm, setLoanTerm] = useState<string>('60');
    const [interestRate, setInterestRate] = useState<string>('5.5');
    const [maintenanceCost, setMaintenanceCost] = useState<string>(''); // For Car/House

    const [verdict, setVerdict] = useState<Verdict | null>(null);

    // Calculate on change
    useEffect(() => {
        if (!netIncome || !assetPrice) {
            setVerdict(null);
            return;
        }

        const v = calculateAffordability(
            Number(netIncome),
            Number(fixedExpenses),
            Number(assetPrice),
            Number(downPayment),
            financeType,
            Number(loanTerm),
            Number(interestRate),
            Number(maintenanceCost),
            Number(savings),
            assetType
        );
        setVerdict(v);
    }, [netIncome, fixedExpenses, savings, assetPrice, financeType, downPayment, loanTerm, interestRate, maintenanceCost, assetType]);

    // Handle Asset Change defaults
    const handleAssetChange = (type: AssetType) => {
        setAssetType(type);
        if (type === 'HOUSE') {
            setLoanTerm('360'); // 30 Years
            setInterestRate('4.5');
            setFinanceType('LOAN');
        } else if (type === 'CAR') {
            setLoanTerm('60'); // 5 Years
            setInterestRate('6');
        } else {
            setLoanTerm('24');
            setInterestRate('0');
        }
    };

    // Handle Finance Type Change defaults
    const handleFinanceChange = (type: FinanceType) => {
        setFinanceType(type);
        if (type === 'INSTALLMENTS') {
            setInterestRate('0');
            setDownPayment('0');
            if (loanTerm === '60' || loanTerm === '360') setLoanTerm('12');
        }
    };

    const faqData = [
        {
            question: 'Koje se pravilo najčešće koristi za ocjenu priuštivosti?',
            answer: 'Za automobile preporučuje se pravilo 20/4/10 (20% učešća, 4 godine otplate, trošak <10% prihoda). Za nekretnine vrijedi pravilo 28/36 (stambeni troškovi <28% bruto prihoda).'
        },
        {
            question: 'Kako se računa kupnja na rate?',
            answer: 'Kupnja na rate dijeli ukupni iznos s brojem mjeseci bez kamata. Iako nema kamate, to i dalje opterećuje vaš mjesečni "slobodni novac" (disposable income) i smanjuje kreditnu sposobnost.'
        },
        {
            question: 'Koje troškove uključuje "Nekretnina"?',
            answer: 'Uz ratu kredita, kalkulator procjenjuje i troškove održavanja kuće (obično 1% vrijednosti godišnje) kako bi dobili realniju sliku stvarnog troška stanovanja.'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Kalkulator Priuštivosti | Mogu li kupiti Stan ili Auto?</title>
                <meta
                    name="description"
                    content="Besplatni kalkulator financijske priuštivosti. Provjerite možete li si priuštiti novi stan, auto ili kupnju na rate. Analiza kredita, budžeta i rizika."
                />
                <meta
                    name="keywords"
                    content="kalkulator priuštivosti, mogu li si priuštiti, financijsko zdravlje, kupnja auta, kalkulator budžeta, osobne financije"
                />
                <link rel="canonical" href="https://kalkulacije.com/kalkulator-priuštivosti" />
            </Helmet>

            <ToolSchema
                name="Kalkulator Priuštivosti"
                description="Alat za procjenu financijske sigurnosti pri kupnji nekretnina, vozila ili robe na rate."
                url="https://kalkulacije.com/kalkulator-priustivosti"
                keywords={['kalkulator priuštivosti', 'financijski savjetnik', 'kupnja auta']}
            />

            <BreadcrumbSchema
                items={[
                    { name: 'Početna', url: 'https://kalkulacije.com/' },
                    { name: 'Kalkulator Priuštivosti', url: 'https://kalkulacije.com/kalkulator-priustivosti' }
                ]}
            />

            <FAQSchema questions={faqData} />

            {/* Hero */}
            <section className="pt-16 pb-12 bg-gradient-to-br from- emerald-50 to-teal-50">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 font-display">
                        Mogu li si to priuštiti?
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        Unesite svoje prihode i cijenu željenog stana, auta ili uređaja.
                        Naš algoritam će vam reći je li ta kupnja sigurna za vaš budžet.
                    </p>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-12 gap-8">

                        {/* LEFT COLUMN: INPUTS */}
                        <div className="lg:col-span-7 space-y-8">

                            {/* 1. Asset Type Selector */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5 text-teal-600" />
                                    Što kupujete?
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        onClick={() => handleAssetChange('CAR')}
                                        className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${assetType === 'CAR'
                                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                                            : 'border-gray-200 hover:border-teal-200 text-gray-600'
                                            }`}
                                    >
                                        <Car className="w-6 h-6" />
                                        <span className="font-medium text-sm">Automobil</span>
                                    </button>
                                    <button
                                        onClick={() => handleAssetChange('HOUSE')}
                                        className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${assetType === 'HOUSE'
                                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                                            : 'border-gray-200 hover:border-teal-200 text-gray-600'
                                            }`}
                                    >
                                        <Home className="w-6 h-6" />
                                        <span className="font-medium text-sm">Nekretnina</span>
                                    </button>
                                    <button
                                        onClick={() => handleAssetChange('GENERAL')}
                                        className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${assetType === 'GENERAL'
                                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                                            : 'border-gray-200 hover:border-teal-200 text-gray-600'
                                            }`}
                                    >
                                        <ShoppingBag className="w-6 h-6" />
                                        <span className="font-medium text-sm">Ostalo</span>
                                    </button>
                                </div>
                            </div>

                            {/* 2. Personal Finance */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Wallet className="w-5 h-5 text-teal-600" />
                                    Vaše Financije (Mjesečno)
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Neto Prihodi (Plaća)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                                            <input
                                                type="number"
                                                value={netIncome}
                                                onChange={e => setNetIncome(e.target.value)}
                                                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                                                placeholder="npr. 1200"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fiksni Troškovi (Stan, hrana, krediti)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                                            <input
                                                type="number"
                                                value={fixedExpenses}
                                                onChange={e => setFixedExpenses(e.target.value)}
                                                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                                                placeholder="npr. 800"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Sve ono što MORATE platiti svaki mjesec.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Trenutna Ušteđevina</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                                            <input
                                                type="number"
                                                value={savings}
                                                onChange={e => setSavings(e.target.value)}
                                                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                                                placeholder="npr. 5000"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 3. The Purchase */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-teal-600" />
                                    Detalji Kupnje
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Ukupna cijena</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                                            <input
                                                type="number"
                                                value={assetPrice}
                                                onChange={e => setAssetPrice(e.target.value)}
                                                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                                                placeholder="npr. 15000"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg overflow-x-auto">
                                        <button
                                            onClick={() => handleFinanceChange('LOAN')}
                                            className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${financeType === 'LOAN' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            Kredit
                                        </button>
                                        <button
                                            onClick={() => handleFinanceChange('INSTALLMENTS')}
                                            className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${financeType === 'INSTALLMENTS' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            Na Rate (0%)
                                        </button>
                                        <button
                                            onClick={() => handleFinanceChange('CASH')}
                                            className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${financeType === 'CASH' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            Gotovina
                                        </button>
                                    </div>

                                    {/* Installments / Loan Inputs */}
                                    {financeType !== 'CASH' && (
                                        <div className="grid grid-cols-2 gap-4 animate-fadeIn">
                                            {financeType === 'LOAN' && (
                                                <>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Učešće</label>
                                                        <input
                                                            type="number"
                                                            value={downPayment}
                                                            onChange={e => setDownPayment(e.target.value)}
                                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Kamatna stopa (%)</label>
                                                        <input
                                                            type="number"
                                                            value={interestRate}
                                                            onChange={e => setInterestRate(e.target.value)}
                                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                                                            placeholder="5.5"
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    {financeType === 'INSTALLMENTS' ? 'Broj rata' : 'Rok otplate (mjeseci)'}
                                                </label>
                                                <input
                                                    type="number"
                                                    value={loanTerm}
                                                    onChange={e => setLoanTerm(e.target.value)}
                                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                                                    placeholder={financeType === 'INSTALLMENTS' ? "12" : "60"}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Maintenance Inputs (Car or House) */}
                                    {(assetType === 'CAR' || assetType === 'HOUSE') && (
                                        <div className="animate-fadeIn">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {assetType === 'CAR' ? 'Mjesečni troškovi (gorivo, osiguranje)' : 'Mjesečno održavanje/režije'}
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                                                <input
                                                    type="number"
                                                    value={maintenanceCost}
                                                    onChange={e => setMaintenanceCost(e.target.value)}
                                                    className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                                                    placeholder={assetType === 'HOUSE' ? "Preporuka: 1% vrijednosti god." : "npr. 150"}
                                                />
                                            </div>
                                            {assetType === 'HOUSE' && !maintenanceCost && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Ako ostavite prazno, procijenit ćemo 1% vrijednosti godišnje.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: RESULTS */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-24 space-y-6">
                                {/* Verdict Card */}
                                <div className={`rounded-2xl shadow-xl overflow-hidden text-white transition-all duration-300 ${!verdict ? 'bg-gray-800' :
                                    verdict.color === 'green' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
                                        verdict.color === 'yellow' ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                                            verdict.color === 'red' ? 'bg-gradient-to-br from-red-500 to-rose-600' :
                                                'bg-gray-800'
                                    }`}>
                                    <div className="p-8 text-center">
                                        {!verdict ? (
                                            <div className="py-8">
                                                <PieChart className="w-16 h-16 mx-auto mb-4 text-gray-500 opacity-50" />
                                                <p className="text-gray-400">Unesite podatke za analizu</p>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                                                    {verdict.color === 'green' && <CheckCircle className="w-10 h-10" />}
                                                    {verdict.color === 'yellow' && <AlertTriangle className="w-10 h-10" />}
                                                    {(verdict.color === 'red' || verdict.color === 'gray') && <AlertTriangle className="w-10 h-10" />}
                                                </div>
                                                <h2 className="text-3xl font-bold mb-2">{verdict.message}</h2>
                                                <div className="text-white/90 text-sm font-medium mt-4 bg-black/10 inline-block px-4 py-1 rounded-full">
                                                    Score: {Math.max(0, Math.round(verdict.score))}/100
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {verdict && (
                                        <div className="bg-black/10 p-6 backdrop-blur-md">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-white/80">Mjesečni trošak (Total):</span>
                                                <span className="text-2xl font-bold">{verdict.monthlyTotal.toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-white/70">Preostalo za život:</span>
                                                <span className="font-semibold">{verdict.remainingCash.toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Details List */}
                                {verdict && verdict.details.length > 0 && (
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <Info className="w-5 h-5 text-gray-400" />
                                            Zašto ovaj rezultat?
                                        </h4>
                                        <ul className="space-y-3">
                                            {verdict.details.map((detail, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600">
                                                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${verdict.color === 'green' ? 'bg-emerald-500' :
                                                        verdict.color === 'yellow' ? 'bg-amber-500' :
                                                            'bg-red-500'
                                                        }`} />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
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
                            <h3 className="font-semibold text-gray-900 mb-2">Tip kupnje</h3>
                            <p className="text-gray-600 text-sm">Odaberite računate li za stan, auto, rate ili općenito</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-blue-600 mb-2">2.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Unesite prihod</h3>
                            <p className="text-gray-600 text-sm">Upišite svoja mjesečna neto primanja</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-blue-600 mb-2">3.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Unesite trošak</h3>
                            <p className="text-gray-600 text-sm">Upišite cijenu željenog predmeta ili ratu kredita</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-blue-600 mb-2">4.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Analiza</h3>
                            <p className="text-gray-600 text-sm">Saznajte je li kupnja financijski odgovorna</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Educational Content */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
                        Pravila Financijskog Zdravlja
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-600 font-bold text-lg">
                                50
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Potrebe</h3>
                            <p className="text-gray-600 text-sm">
                                50% vaših prihoda trebalo bi pokrivati fiksne troškove (stan, hrana, režije).
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-purple-600 font-bold text-lg">
                                30
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Želje</h3>
                            <p className="text-gray-600 text-sm">
                                30% budžeta je za zabavu, izlaske i kupovinu stvari koje želite (kao ovaj auto).
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-green-600 font-bold text-lg">
                                20
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Štednja</h3>
                            <p className="text-gray-600 text-sm">
                                20% uvijek treba odvajati za štednju, investicije ili otplatu dugova.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO CONTENT */}
            <section className="py-12 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-4 max-w-3xl">
                    <article className="prose prose-blue max-w-none">
                        <h2>Mogu li si to priuštiti? Pravila financijske odgovornosti.</h2>
                        <p>
                            Kupnja novog mobitela, auta ili stana velika je odluka. Ovaj kalkulator koristi provjerena
                            financijska pravila kako bi vam dao objektivan odgovor, umjesto emocionalnog.
                        </p>

                        <h3>Pravilo 28/36 za Stambene Kredite</h3>
                        <p>
                            Banke često koriste ovo pravilo. Ono kaže da vaši mjesečni troškovi stanovanja (rata kredita + osiguranje)
                            ne bi smjeli prelaziti <strong>28%</strong> vaših bruto mjesečnih prihoda. Također, ukupni dugovi
                            (stan + auto + kartice) ne bi smjeli prelaziti <strong>36%</strong>.
                        </p>

                        <h3>Kupovina na rate (0% kamata)</h3>
                        <p>
                            Iako "beskamatno" zvuči primamljivo, svaka rata opterećuje vaš mjesečni budžet.
                            Pravilo je da ukupan iznos svih rata ne smije ugroziti vašu likvidnost. Ako rata iznosi više od
                            10-15% vašeg slobodnog prihoda (nakon nužnih troškova), kupnja je možda previše rizična.
                        </p>
                    </article>
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
                            <h3 className="font-semibold text-gray-900 mb-2">Tip kupnje</h3>
                            <p className="text-gray-600 text-sm">Odaberite računate li za stan, auto, rate ili općenito</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-blue-600 mb-2">2.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Unesite prihod</h3>
                            <p className="text-gray-600 text-sm">Upišite svoja mjesečna neto primanja</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-blue-600 mb-2">3.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Unesite trošak</h3>
                            <p className="text-gray-600 text-sm">Upišite cijenu željenog predmeta ili ratu kredita</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-blue-600 mb-2">4.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Analiza</h3>
                            <p className="text-gray-600 text-sm">Saznajte je li kupnja financijski odgovorna</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Što Možete Izračunati?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">Velike Investicije</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Kreditna sposobnost za stan (28/36 pravilo)</li>
                                <li>• Leasing za novi automobil (20/4/10 pravilo)</li>
                                <li>• Isplativost renovacije</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">Svakodnevne Odluke</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Kupovina novog iPhonea na rate</li>
                                <li>• Uzimanje potrošačkog kredita</li>
                                <li>• Procjena "crnog fonda" nakon kupnje</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Česta Pitanja
                    </h2>
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600 text-sm">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <RelatedCalculators />
        </>
    );
}
