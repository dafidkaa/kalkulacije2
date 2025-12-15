import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, Tag, Percent, Wallet, Info, ArrowDown } from 'lucide-react';
import { calculateDiscount } from '../utils/discountCalculator';
import { ToolSchema, BreadcrumbSchema, FAQSchema as FeaturedFAQ, HowToSchema } from '../components/SchemaMarkup';
import { RelatedCalculators } from '../components/RelatedCalculators';

export function DiscountCalculator() {
    const [price, setPrice] = useState<string>('');
    const [discount, setDiscount] = useState<string>('');
    const [extraDiscount, setExtraDiscount] = useState<string>('');

    const result = calculateDiscount(
        Number(price),
        Number(discount),
        Number(extraDiscount)
    );

    const faqData = [
        {
            question: 'Kako izračunati cijenu s popustom?',
            answer: 'Pomnožite cijenu s postotkom popusta i podijelite sa 100 da dobijete iznos uštede. Oduzmite taj iznos od originalne cijene.'
        },
        {
            question: 'Kako se računa dodatni popust na sniženu cijenu?',
            answer: 'Dodatni popust se obično ne zbraja (npr. 50% + 20% nije 70%), već se primjenjuje na novu, sniženu cijenu. Naš kalkulator to automatski radi točno.'
        },
        {
            question: 'Što je to 20+10% popusta?',
            answer: 'To znači da se prvo oduzme 20% od cijene, a zatim se na taj sniženi iznos oduzima još 10%. Ukupni popust je zapravo 28%, a ne 30%.'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Kalkulator Popusta | Izračun Sniženja i Akcija</title>
                <meta
                    name="description"
                    content="Besplatni kalkulator popusta i sniženja. Izračunajte konačnu cijenu nakon popusta, uštedu i dvostruke popuste (dodatni popust na sniženje)."
                />
                <meta
                    name="keywords"
                    content="kalkulator popusta, izračun popusta, sniženje kalkulator, postotak sniženja, kako izračunati popust, black friday popusti"
                />
                <link rel="canonical" href="https://kalkulacije.com/kalkulator-popusta" />
            </Helmet>

            <ToolSchema
                name="Kalkulator Popusta"
                description="Alat za brz i točan izračun cijena s popustom i dodatnih sniženja."
                url="https://kalkulacije.com/kalkulator-popusta"
                keywords={['kalkulator popusta', 'izračun sniženja', 'akcija']}
            />

            <BreadcrumbSchema
                items={[
                    { name: 'Početna', url: 'https://kalkulacije.com/' },
                    { name: 'Kalkulator Popusta', url: 'https://kalkulacije.com/kalkulator-popusta' }
                ]}
            />

            <HowToSchema
                name="Kako izračunati popust?"
                description="Jednostavan vodič za izračun sniženih cijena i uštede."
                steps={[
                    { name: 'Cijena', text: 'Unesite originalnu (staru) cijenu proizvoda.' },
                    { name: 'Popust', text: 'Unesite postotak popusta (npr. 50%).' },
                    { name: 'Extra', text: 'Opcionalno dodajte dodatni popust (npr. +20% na blagajni).' },
                    { name: 'Ušteda', text: 'Saznajte novu cijenu i koliko ste točno uštedjeli.' }
                ]}
            />

            <FeaturedFAQ questions={faqData} />

            {/* Hero Section */}
            <section className="pt-16 pb-12 bg-gradient-to-br from-red-50 to-pink-50 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 font-display">
                        Kalkulator Popusta
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        Kupujete na sniženju? Brzo provjerite konačnu cijenu i uštedu.
                        <span className="block text-sm mt-2 text-gray-500">Podržava i izračun dodatnih popusta na već snižene artikle.</span>
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
                                            Originalna cijena (€)
                                        </label>
                                        <div className="relative">
                                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                                placeholder="npr. 100"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Popust (%)
                                        </label>
                                        <div className="relative">
                                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="number"
                                                value={discount}
                                                onChange={(e) => setDiscount(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                                placeholder="npr. 20"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <label className="block text-sm font-medium text-gray-600 mb-2">
                                            Dodatni popust (opcionalno)
                                        </label>
                                        <div className="relative">
                                            <ArrowDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="number"
                                                value={extraDiscount}
                                                onChange={(e) => setExtraDiscount(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50"
                                                placeholder="npr. 10 (za dodatnih 10%)"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Koristite ovo za akcije tipa "20% + dodatnih 10% na blagajni".
                                        </p>
                                    </div>
                                </div>

                                {/* Results - Gradient Card */}
                                <div className="bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl p-8 text-white flex flex-col justify-center shadow-lg transform rotate-1 md:rotate-0 transition-transform">
                                    <h3 className="text-xl font-medium text-red-100 mb-6">Vaša Ušteda</h3>

                                    <div className="space-y-8">
                                        <div className="relative">
                                            <p className="text-red-200 text-sm mb-1">Nova Cijena</p>
                                            <div className="text-6xl font-bold tracking-tight">
                                                {result.finalPrice.toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}
                                            </div>
                                            {price && (
                                                <div className="absolute top-0 right-0 bg-white/20 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                                                    -{Math.round((result.savings / Number(price)) * 100) || 0}%
                                                </div>
                                            )}
                                        </div>

                                        <div className="border-t border-red-400/30 pt-6">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-red-200 text-sm mb-1">Ukupno ušteda</p>
                                                    <p className="text-3xl font-semibold">
                                                        {result.savings.toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-red-200 text-xs mb-1">Stara cijena</p>
                                                    <p className="text-xl opacity-75 line-through decoration-2 decoration-red-300">
                                                        {Number(price || 0).toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Use Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Kako Izračunati Cijenu s Popustom?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-red-500 mb-2">1.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Stara Cijena</h3>
                            <p className="text-gray-600 text-sm">Kolika je početna cijena na etiketi?</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-red-500 mb-2">2.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Postotak</h3>
                            <p className="text-gray-600 text-sm">Koliki je popust izražen u postocima?</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-red-500 mb-2">3.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Dodatno</h3>
                            <p className="text-gray-600 text-sm">Imate li dodatni popust na blagajni?</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-red-500 mb-2">4.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Ušteda</h3>
                            <p className="text-gray-600 text-sm">Provjerite koliko novca ostaje u novčaniku</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-red-600" />
                                Sezonska Sniženja
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Tijekom sezonskih sniženja (Zimsko/Ljetno) popusti često dosežu 50% ili 70%.
                                Uvijek provjerite finalnu cijenu jer trgovci ponekad dižu cijene prije sniženja.
                            </p>
                            <div className="h-1 bg-red-200 rounded w-16"></div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Wallet className="w-5 h-5 text-red-600" />
                                Pametna Kupovina
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Izračunajte isplativost "3 za 2" akcija. Ako kupujete 3 ista proizvoda,
                                a plaćate 2, to je ekvivalent popustu od 33.33% na ukupnu cijenu.
                            </p>
                            <div className="h-1 bg-red-200 rounded w-16"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Pitanja o Sniženjima
                    </h2>
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
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
