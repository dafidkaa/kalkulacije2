import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Zap,
    BatteryCharging,
    Car,
    Settings,
    ChevronRight,
    Sun,
    Moon,
    Info
} from 'lucide-react';
import { ToolSchema, BreadcrumbSchema, FAQSchema } from '../components/SchemaMarkup';
import { CAR_BRANDS, POPULAR_EVS, TARIFFS, EV_HINTS } from '../utils/evData';
import { calculateChargingCost, formatCurrency, formatEnergy } from '../utils/evChargingCalculator';

export function EVChargingCalculator() {
    // --- STATE ---

    // Car Selection
    const [selectedBrand, setSelectedBrand] = useState<string>('Tesla');
    const [selectedCarId, setSelectedCarId] = useState<string>('tesla-3-rwd');
    const [customCapacity, setCustomCapacity] = useState<string>('60');

    // Charge Settings
    const [startCharge, setStartCharge] = useState<number>(20);
    const [targetCharge, setTargetCharge] = useState<number>(80);

    // Tariff Settings
    const [tariffId, setTariffId] = useState<string>('bijeli');
    const [priceHigh, setPriceHigh] = useState<string>(TARIFFS[0].defaultPriceHigh.toString());
    const [priceLow, setPriceLow] = useState<string>(TARIFFS[0].defaultPriceLow.toString());
    const [nightShare, setNightShare] = useState<number>(50); // % of charging done at night

    // Results
    const [result, setResult] = useState<{ cost: number, energy: number } | null>(null);

    // --- EFFECT: Handle Brand Change ---
    const availableModels = useMemo(() => {
        return POPULAR_EVS.filter(car => car.brand === selectedBrand);
    }, [selectedBrand]);

    // --- EFFECT: Handle Car Selection ---
    useEffect(() => {
        if (selectedCarId === 'custom') {
            // Don't overwrite custom capacity if user selected custom
        } else {
            const car = POPULAR_EVS.find(c => c.id === selectedCarId);
            if (car) {
                setCustomCapacity(car.batteryUsable.toString());
            }
        }
    }, [selectedCarId]);

    // --- EFFECT: Handle Tariff Change ---
    useEffect(() => {
        const tariff = TARIFFS.find(t => t.id === tariffId);
        if (tariff) {
            setPriceHigh(tariff.defaultPriceHigh.toString());
            setPriceLow(tariff.defaultPriceLow.toString());
        }
    }, [tariffId]);

    // --- CALCULATION ---
    useEffect(() => {
        const capacity = parseFloat(customCapacity);
        const high = parseFloat(priceHigh);
        const low = parseFloat(priceLow);

        if (!capacity || isNaN(capacity) || !high || isNaN(high)) {
            setResult(null);
            return;
        }

        const calc = calculateChargingCost(
            capacity,
            startCharge,
            targetCharge,
            tariffId === 'bijeli' ? 'dual' : 'single',
            high,
            low,
            nightShare
        );

        setResult({ cost: calc.costTotal, energy: calc.energyAdded });

    }, [customCapacity, startCharge, targetCharge, tariffId, priceHigh, priceLow, nightShare]);

    // --- FAQ Data ---
    const faqData = [
        {
            question: 'Koliko košta punjenje električnog auta kod kuće?',
            answer: 'Cijena ovisi o tarifi (Bijeli/Plavi model) i dobu dana. Noćno punjenje je otprilike u pola jeftinije. Prosječno punjenje od 20% do 80% košta između 2 i 5 eura.'
        },
        {
            question: 'Koja je razlika između kWh i kW?',
            answer: 'kW (kilovat) je snaga punjenja (brzina), dok je kWh (kilovatsat) količina energije pohranjena u bateriji (kapacitet/spremnik).'
        },
        {
            question: 'Trebam li puniti do 100%?',
            answer: 'Za svakodnevnu vožnju preporuča se puniti do 80% radi očuvanja zdravlja baterije. Punite do 100% samo prije dugih putovanja.'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Kalkulator Punjenja EV | Cijena Punjenja Električnog Auta</title>
                <meta
                    name="description"
                    content="Izračunajte točnu cijenu punjenja električnog automobila kod kuće. Podrška za Tesla, VW, Renault i druge modele uz aktualne HEP tarife."
                />
                <meta name="keywords" content="kalkulator punjenja el automobila, cijena struje za auto, punjenje tesla, hep cijene struje, električna vozila hrvatska" />
            </Helmet>

            <ToolSchema
                name="Kalkulator Punjenja Električnih Vozila"
                description="Besplatan alat za izračun cijene punjenja električnog automobila prema HEP tarifama."
                url="https://kalkulacije.com/kalkulator-punjenja-ev"
            />
            <BreadcrumbSchema
                items={[
                    { name: 'Početna', url: 'https://kalkulacije.com/' },
                    { name: 'Kalkulator Punjenja EV', url: 'https://kalkulacije.com/kalkulator-punjenja-ev' }
                ]}
            />
            <FAQSchema questions={faqData} />

            {/* HERO SECTION */}
            <section className="pt-16 pb-12 bg-gradient-to-br from-yellow-50 to-orange-50">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-6">
                        <Zap className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
                        Kalkulator Punjenja
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Saznajte koliko vas točno košta "tankiranje" električnog ljubimca kod kuće.
                        Usporedite dnevnu i noćnu tarifu.
                    </p>
                </div>
            </section>

            {/* CALCULATOR GRID */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-12 gap-8">

                        {/* LEFT COLUMN: CONTROLS */}
                        <div className="lg:col-span-7 space-y-6">

                            {/* 1. CAR SELECTION */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Car className="w-5 h-5 text-yellow-600" />
                                    Odaberite Vozilo
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Marka</label>
                                        <select
                                            value={selectedBrand}
                                            onChange={(e) => {
                                                setSelectedBrand(e.target.value);
                                                // Reset model to first available or custom
                                                const firstModel = POPULAR_EVS.find(c => c.brand === e.target.value);
                                                if (firstModel) setSelectedCarId(firstModel.id);
                                                else if (e.target.value === 'Ostalo / Ručni unos') setSelectedCarId('custom');
                                            }}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white"
                                        >
                                            {CAR_BRANDS.map(brand => (
                                                <option key={brand} value={brand}>{brand}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                                        <select
                                            value={selectedCarId}
                                            onChange={(e) => setSelectedCarId(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white"
                                            disabled={selectedBrand === 'Ostalo / Ručni unos'}
                                        >
                                            {availableModels.map(car => (
                                                <option key={car.id} value={car.id}>
                                                    {car.model} {car.variant}
                                                </option>
                                            ))}
                                            <option value="custom">Ručni unos...</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Kapacitet Baterije (neto kWh)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={customCapacity}
                                            onChange={(e) => {
                                                setCustomCapacity(e.target.value);
                                                setSelectedCarId('custom'); // Switch to custom if user edits manually
                                            }}
                                            className="w-full px-3 py-2 pl-3 pr-12 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                                            placeholder="npr. 60"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">kWh</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        *Koristimo iskoristivi (neto) kapacitet za točniji izračun.
                                    </p>
                                </div>
                            </div>

                            {/* 2. CHARGE SLIDER */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <BatteryCharging className="w-5 h-5 text-green-600" />
                                    Razina Punjenja
                                </h3>

                                <div className="px-2 mb-6">
                                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                                        <span>Start: {startCharge}%</span>
                                        <span>Cilj: {targetCharge}%</span>
                                    </div>

                                    {/* Range Preset Buttons */}
                                    <div className="flex gap-2 mb-4 justify-center">
                                        <button
                                            onClick={() => { setStartCharge(0); setTargetCharge(100); }}
                                            className="px-3 py-1 text-xs bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-700 rounded-full transition-colors"
                                        >
                                            0% - 100%
                                        </button>
                                        <button
                                            onClick={() => { setStartCharge(20); setTargetCharge(80); }}
                                            className="px-3 py-1 text-xs bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-700 rounded-full transition-colors"
                                        >
                                            20% - 80%
                                        </button>
                                        <button
                                            onClick={() => { setStartCharge(10); setTargetCharge(90); }}
                                            className="px-3 py-1 text-xs bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-700 rounded-full transition-colors"
                                        >
                                            10% - 90%
                                        </button>
                                    </div>

                                    {/* Simple Dual Range Slider Simulation using two inputs */}
                                    <div className="relative h-2 bg-gray-200 rounded-full">
                                        <div
                                            className="absolute h-full bg-green-500 rounded-full opacity-80"
                                            style={{
                                                left: `${startCharge}%`,
                                                right: `${100 - targetCharge}%`
                                            }}
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={startCharge}
                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                if (val < targetCharge) setStartCharge(val);
                                            }}
                                            className="absolute w-full h-full opacity-0 cursor-pointer pointer-events-auto z-20"
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={targetCharge}
                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                if (val > startCharge) setTargetCharge(val);
                                            }}
                                            className="absolute w-full h-full opacity-0 cursor-pointer pointer-events-auto z-10"
                                        />
                                        {/* Handles visual */}
                                        <div
                                            className="absolute w-4 h-4 bg-white border-2 border-green-600 rounded-full top-1/2 -translate-y-1/2 shadow pointer-events-none"
                                            style={{ left: `${startCharge}%` }}
                                        />
                                        <div
                                            className="absolute w-4 h-4 bg-white border-2 border-green-600 rounded-full top-1/2 -translate-y-1/2 shadow pointer-events-none"
                                            style={{ left: `${targetCharge}%` }}
                                        />
                                    </div>
                                    <div className="mt-4 text-center text-sm text-gray-600">
                                        Dodajete <span className="font-bold text-gray-900">{(targetCharge - startCharge)}%</span> baterije
                                        ({result ? formatEnergy(result.energy) : '...'})
                                    </div>
                                </div>
                            </div>

                            {/* 3. PRICES & TARIFFS */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Settings className="w-5 h-5 text-gray-600" />
                                    Cijena Struje (HEP)
                                </h3>

                                <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                                    {TARIFFS.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setTariffId(t.id)}
                                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${tariffId === t.id ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            {t.name}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                            {tariffId === 'bijeli' ? 'Viša tarifa (Dan)' : 'Jedinstvena tarifa'}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                step="0.001"
                                                value={priceHigh}
                                                onChange={(e) => setPriceHigh(e.target.value)}
                                                className="w-full pl-3 pr-8 py-2 border rounded bg-gray-50 focus:bg-white focus:ring-1 focus:ring-yellow-500"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
                                        </div>
                                    </div>
                                    {tariffId === 'bijeli' && (
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                Niža tarifa (Noć)
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    step="0.001"
                                                    value={priceLow}
                                                    onChange={(e) => setPriceLow(e.target.value)}
                                                    className="w-full pl-3 pr-8 py-2 border rounded bg-gray-50 focus:bg-white focus:ring-1 focus:ring-yellow-500"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {tariffId === 'bijeli' && (
                                    <div className="border-t pt-4">
                                        <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                                            <span>Kada punite?</span>
                                            <span className="text-blue-600">{nightShare}% Noću</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="10"
                                            value={nightShare}
                                            onChange={(e) => setNightShare(Number(e.target.value))}
                                            className="w-full h-2 bg-gradient-to-r from-yellow-200 to-blue-200 rounded-lg cursor-pointer"
                                        />
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span className="flex items-center gap-1"><Sun className="w-3 h-3" /> Sve po danu</span>
                                            <span className="flex items-center gap-1"><Moon className="w-3 h-3" /> Sve po noći</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* RIGHT COLUMN: RESULTS */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl sticky top-24">
                                <h2 className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-2">
                                    Procijenjeni Trošak
                                </h2>

                                <div className="text-5xl font-bold text-white mb-2 tracking-tight">
                                    {result ? formatCurrency(result.cost) : '---'}
                                </div>

                                <div className="text-gray-400 mb-8 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-yellow-400" />
                                    za {result ? formatEnergy(result.energy) : '0 kWh'} energije
                                </div>

                                <div className="space-y-4 border-t border-gray-800 pt-6">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Ljeto (Noćna tarifa)</span>
                                        <span className="font-medium">22:00 - 08:00</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Zima (Noćna tarifa)</span>
                                        <span className="font-medium">21:00 - 07:00</span>
                                    </div>
                                </div>

                                {tariffId === 'bijeli' && nightShare < 100 && result && (
                                    <div className="mt-8 bg-blue-900/30 border border-blue-500/30 p-4 rounded-xl">
                                        <div className="flex gap-3">
                                            <Info className="w-5 h-5 text-blue-400 shrink-0" />
                                            <div className="text-sm">
                                                <p className="text-blue-200 mb-1 font-medium">Savjet za uštedu:</p>
                                                <p className="text-blue-300/80">
                                                    Da ste punili 100% noću, ovo punjenje bi koštalo
                                                    <span className="text-white font-bold ml-1">
                                                        {formatCurrency(result.energy * parseFloat(priceLow))}
                                                    </span>.
                                                </p>
                                            </div>
                                        </div>
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
                            <div className="text-2xl font-bold text-green-600 mb-2">1.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Odaberite auto</h3>
                            <p className="text-gray-600 text-sm">Izaberite model iz liste ili ručno unesite kapacitet baterije</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-green-600 mb-2">2.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Postavite punjenje</h3>
                            <p className="text-gray-600 text-sm">Odredite početni i ciljani postotak napunjenosti</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-green-600 mb-2">3.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Odaberite tarifu</h3>
                            <p className="text-gray-600 text-sm">Prebacite između Bijelog (dvotarifnog) i Plavog modela</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-green-600 mb-2">4.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Uštedite</h3>
                            <p className="text-gray-600 text-sm">Namjestite postotak noćnog punjenja za maksimalnu uštedu</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* HINTS SECTION */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Korisni Savjeti za Vlasnike EV</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {EV_HINTS.tips.map((tip, i) => (
                            <div key={i} className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl">
                                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 font-bold">
                                    {i + 1}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Kada Koristiti Kalkulator?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">Planiranje Puta</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Procjena troška "tankanja" prije puta</li>
                                <li>• Usporedba cijene s benzinom</li>
                                <li>• Provjera koliko kWh trebate dodati</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">Optimizacija Računa</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Izračun uštede noćnim punjenjem</li>
                                <li>• Provjera isplativosti prelaska na dvotarifni model</li>
                                <li>• Praćenje mjesečnih troškova struje</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO CONTENT */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <article className="prose prose-green max-w-none">
                        <h2>Kako se računa cijena punjenja električnog auta?</h2>
                        <p>
                            Cijena punjenja ovisi primarno o <strong>kapacitetu baterije</strong> (kWh) i <strong>cijeni struje</strong>.
                            U Hrvatskoj većina kućanstava koristi HEP-ov Bijeli (dvotarifni) ili Plavi (jednotarifni) model.
                        </p>
                        <p>
                            Formula je jednostavna: <em>Potrebna energija (kWh) x Cijena po kWh = Ukupni trošak</em>.
                        </p>

                        <h2>Jeftina vs. Skupa struja</h2>
                        <p>
                            Ako imate dvotarifno brojilo (Bijeli model), punjenje noću je drastično jeftinije.
                            Noćna tarifa (zimi od 21h, ljeti od 22h) je otprilike u pola cijene u odnosu na dnevnu.
                            Vlasnici električnih vozila mogu uštedjeti stotine eura godišnje samo programiranjem punjenja
                            da kreće nakon početka niže tarife.
                        </p>

                        <h2>Koliko traje punjenje?</h2>
                        <p>
                            Na običnoj kućnoj utičnici (shuko, 2.3 kW), punjenje je sporo i može trajati 20+ sati za veliku bateriju.
                            Instalacijom <strong>Wallbox</strong> punjača (7kW ili 11kW), vrijeme punjenja se skraćuje na 4-8 sati,
                            što je idealno za punjenje preko noći.
                        </p>
                    </article>
                </div>
            </section>
        </>
    );
}
