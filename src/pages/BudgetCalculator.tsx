import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Wallet, PieChart, PiggyBank, ShoppingBag, Home } from 'lucide-react';
import { ToolSchema, BreadcrumbSchema, FAQSchema } from '../components/SchemaMarkup';
import { QuickAnswer, ComparisonTable, StatisticCard } from '../components/FeaturedSnippets';
import { AISummary, UseCaseExample } from '../components/GEOComponents';

export function BudgetCalculator() {
    const [income, setIncome] = useState<number>(1000);

    const needs = income * 0.50;
    const wants = income * 0.30;
    const savings = income * 0.20;

    const faqData = [
        {
            question: 'Što je pravilo 50/30/20?',
            answer: 'Pravilo 50/30/20 je jednostavna metoda budžetiranja koja dijeli vaš prihod na tri dijela: 50% za potrebe, 30% za želje i 20% za štednju.'
        },
        {
            question: 'Što spada u potrebe (50%)?',
            answer: 'Stanarina, režije, hrana, prijevoz i osiguranja. To su stvari bez kojih ne možete živjeti.'
        },
        {
            question: 'Koliko trebam štedjeti?',
            answer: 'Preporučuje se odvajati 20% prihoda za štednju, otplatu dugova i investicije.'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Kalkulator Budžeta 50/30/20 | Planer Kućnog Budžeta</title>
                <meta name="description" content="Izračunajte idealnu raspodjelu plaće pomoću 50/30/20 pravila. Saznajte koliko trošiti na potrebe, želje i štednju." />
            </Helmet>

            <ToolSchema
                name="Kalkulator Budžeta"
                description="Alat za planiranje kućnog budžeta prema pravilu 50/30/20."
                url="https://kalkulacije.com/kalkulator-budzeta"
            />
            <BreadcrumbSchema items={[{ name: 'Početna', url: '/' }, { name: 'Kalkulator Budžeta', url: '/kalkulator-budzeta' }]} />
            <FAQSchema questions={faqData} />

            {/* HERO */}
            <section className="pt-16 pb-12 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-6">
                        <Wallet className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
                        Kalkulator Budžeta
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Organizirajte svoje financije uz jednostavno 50/30/20 pravilo.
                    </p>
                </div>
            </section>

            {/* CALCULATOR */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Input */}
                    <div className="mb-12 max-w-md mx-auto">
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                            Vaša Mjesečna Neto Plaća (€)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(Number(e.target.value))}
                                className="w-full pl-4 pr-12 py-4 text-2xl font-bold border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-0 text-gray-900"
                                placeholder="1000"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">€</span>
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Needs */}
                        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Home className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-blue-900">Potrebe (50%)</h3>
                            </div>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{needs.toFixed(0)}€</p>
                            <p className="text-sm text-gray-500">Stanarina, režije, hrana, prijevoz.</p>
                        </div>

                        {/* Wants */}
                        <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <ShoppingBag className="w-5 h-5 text-purple-600" />
                                </div>
                                <h3 className="font-bold text-purple-900">Želje (30%)</h3>
                            </div>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{wants.toFixed(0)}€</p>
                            <p className="text-sm text-gray-500">Izlasci, hobiji, shopping, putovanja.</p>
                        </div>

                        {/* Savings */}
                        <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <PiggyBank className="w-5 h-5 text-green-600" />
                                </div>
                                <h3 className="font-bold text-green-900">Štednja (20%)</h3>
                            </div>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{savings.toFixed(0)}€</p>
                            <p className="text-sm text-gray-500">Investicije, crni fond, otplata duga.</p>
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
                            <div className="text-2xl font-bold text-indigo-600 mb-2">1.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Unesite prihod</h3>
                            <p className="text-gray-600 text-sm">Upišite svoj ukupni mjesečni neto prihod (plaća + honorari)</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-indigo-600 mb-2">2.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Potrebe (50%)</h3>
                            <p className="text-gray-600 text-sm">Automatski izračun limita za stanarinu, hranu i režije</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-indigo-600 mb-2">3.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Želje (30%)</h3>
                            <p className="text-gray-600 text-sm">Određivanje budžeta za zabavu, shopping i izlaske</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-indigo-600 mb-2">4.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Štednja (20%)</h3>
                            <p className="text-gray-600 text-sm">Ciljani iznos za štednju ili otplatu dugova</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Summary */}
            <AISummary
                summary="Kalkulator budžeta 50/30/20 pomaže vam raspodijeliti prihod na potrebe (50%), želje (30%) i štednju (20%). Jednostavna metoda za kontrolu financija."
                keywords={['kalkulator budžeta', '50 30 20 pravilo', 'planiranje budžeta', 'osobne financije', 'štednja']}
                useCases={[
                    'Izrada mjesečnog plana potrošnje',
                    'Određivanje limita za stanarinu i režije',
                    'Planiranje iznosa za štednju i otplatu dugova'
                ]}
                statistics={[
                    { label: 'Potrebe (Max)', value: '50%', source: 'Pravilo 50/30/20' },
                    { label: 'Želje (Max)', value: '30%', source: 'Pravilo 50/30/20' },
                    { label: 'Štednja (Min)', value: '20%', source: 'Pravilo 50/30/20' }
                ]}
            />

            {/* Quick Answer */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <QuickAnswer
                        question="Kako podijeliti plaću od 1000€ po 50/30/20 pravilu?"
                        answer="500€ za potrebe (stan, hrana), 300€ za želje (zabava, shopping) i 200€ za štednju."
                        highlight="Formula: Prihod x 0.5 / 0.3 / 0.2"
                        details="Ako su vam potrebe veće od 50%, smanjite budžet za želje dok se ne uskladite."
                    />

                    <div className="grid md:grid-cols-3 gap-6 my-12">
                        <StatisticCard
                            value="50%"
                            label="Za nuzne troskove"
                            source="Stan, hrana, rezije"
                            color="blue"
                        />
                        <StatisticCard
                            value="30%"
                            label="Za fleksibilne troskove"
                            source="Zabava, odjeca"
                            color="purple"
                        />
                        <StatisticCard
                            value="20%"
                            label="Za buducnost"
                            source="Stednja, dugovi"
                            color="green"
                        />
                    </div>

                    <ComparisonTable
                        title="Primjeri Raspodjele Budžeta"
                        caption="Iznosi za različite plaće prema 50/30/20 pravilu"
                        headers={['Neto Plaća', 'Potrebe (50%)', 'Želje (30%)', 'Štednja (20%)']}
                        rows={[
                            ['800€', '400€', '240€', '160€'],
                            ['1.000€', '500€', '300€', '200€'],
                            ['1.500€', '750€', '450€', '300€'],
                            ['2.000€', '1.000€', '600€', '400€'],
                            ['3.000€', '1.500€', '900€', '600€']
                        ]}
                        highlightColumn={3}
                    />
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Primjeri Korištenja</h2>

                    <UseCaseExample
                        title="Primjer 1: Studentski Budžet"
                        scenario="Student s budžetom od 600€."
                        input="Prihod: 600€"
                        output="Potrebe: 300€ | Želje: 180€ | Štednja: 120€"
                        explanation="Fokus na pokrivanje osnovnih troškova, a štednja za hitne slučajeve."
                        icon={<Wallet className="w-6 h-6 text-blue-600" />}
                    />

                    <UseCaseExample
                        title="Primjer 2: Obiteljski Budžet"
                        scenario="Obitelj s ukupnim prihodima od 2000€."
                        input="Prihod: 2000€"
                        output="Potrebe: 1000€ | Želje: 600€ | Štednja: 400€"
                        explanation="Ključno je držati fiksne troškove unutar 1000€ kako bi se moglo štedjeti."
                        icon={<Home className="w-6 h-6 text-indigo-600" />}
                    />

                    <UseCaseExample
                        title="Primjer 3: Otplata Dugova"
                        scenario="Osoba s 1000€ plaće ima 150€ rata kredita."
                        input="Prihod: 1000€"
                        output="Štednja (Dugovi): 200€"
                        explanation="Dio od 20% (200€) koristi se prvenstveno za otplatu duga (150€), ostaje 50€ za štednju."
                        icon={<PiggyBank className="w-6 h-6 text-green-600" />}
                    />
                </div>
            </section>
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <article className="prose prose-indigo max-w-none">
                        <h2>Što je 50/30/20 pravilo?</h2>
                        <p>
                            Pravilo 50/30/20 je jedna od najpopularnijih metoda za upravljanje osobnim financijama.
                            Popularizirala ga je američka senatorica Elizabeth Warren. Ideja je jednostavna: umjesto detaljnog
                            praćenja svakog centa, podijelite svoj prihod nakon poreza u tri glavne kategorije:
                        </p>
                        <ul>
                            <li><strong>50% za Potrebe (Needs):</strong> Troškovi koji su neophodni za život (stanovanje, hrana, režije).</li>
                            <li><strong>30% za Želje (Wants):</strong> Troškovi koji nisu neophodni, ali poboljšavaju kvalitetu života (Netflix, večere, novi gadgeti).</li>
                            <li><strong>20% za Štednju (Savings):</strong> Novac za budućnost, otplatu dugova ili fond za hitne slučajeve.</li>
                        </ul>

                        <h2>Kako koristiti ovaj kalkulator?</h2>
                        <p>
                            Samo unesite svoj <strong>mjesečni neto prihod</strong> (iznos koji dobijete na račun nakon poreza).
                            Kalkulator će automatski izračunati limite za svaku kategoriju. Ako trošite više od 50% na potrebe,
                            možda ćete morati smanjiti želje kako biste i dalje mogli štedjeti 20%.
                        </p>

                        <h2>Savjeti za budžetiranje u Hrvatskoj</h2>
                        <p>
                            U uvjetima inflacije, držanje "Potreba" ispod 50% može biti izazovno s obzirom na cijene najma i hrane.
                            Ako vaše potrebe prelaze 50%, nemojte odustati od štednje. Pokušajte smanjiti kategoriju "Želja"
                            na 20% ili 10% dok se financijska situacija ne stabilizira. Ključ je u dosljednosti – čak i mala ušteda
                            dugoročno čini veliku razliku.
                        </p>
                    </article>
                </div>
            </section>
        </>
    );
}
