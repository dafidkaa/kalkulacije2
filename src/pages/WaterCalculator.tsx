import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { GradientCard } from '../components/GradientCard';
import { GlassWater, Droplets, Info, Scale, Sun, Activity, User } from 'lucide-react';
import { calculateWaterIntake, WaterResult } from '../utils/waterCalculator';
import { ToolSchema, HowToSchema, FAQSchema } from '../components/SchemaMarkup';
import { RelatedCalculators } from '../components/RelatedCalculators';
import { QuickAnswer, ComparisonTable, StatisticCard } from '../components/FeaturedSnippets';
import { AISummary, UseCaseExample } from '../components/GEOComponents';

export function WaterCalculator() {
    const [formData, setFormData] = useState({
        weight: 70,
        activityMinutes: 30
    });

    const [result, setResult] = useState<WaterResult | null>(null);

    useEffect(() => {
        const calcResult = calculateWaterIntake(formData.weight, formData.activityMinutes);
        setResult(calcResult);
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
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
                <title>Kalkulator Unosa Vode | Koliko Vode Trebam Piti? | Kalkulacije.com</title>
                <meta name="description" content="Besplatni kalkulator unosa vode. Saznajte koliko vode trebate piti dnevno na temelju vaše kilaže i razine aktivnosti. Spriječite dehidraciju." />
                <meta name="keywords" content="kalkulator vode, unos vode, hidratacija, koliko vode piti, dehidracija, voda i zdravlje" />
                <link rel="canonical" href="https://kalkulacije.com/kalkulator-vode" />
            </Helmet>

            <ToolSchema
                name="Kalkulator Unosa Vode"
                description="Izračunajte optimalan dnevni unos vode na temelju vaše tjelesne težine i razine tjelesne aktivnosti."
                url="https://kalkulacije.com/kalkulator-vode"
                keywords={['voda', 'hidratacija', 'zdravlje', 'kalkulator']}
            />
            <HowToSchema
                name="Kako izračunati koliko vode piti?"
                description="Vodič za korištenje kalkulatora unosa vode na temelju težine i dnevne aktivnosti."
                steps={[
                    { name: 'Unos težine', text: 'Unesite svoju tjelesnu težinu u kilogramima.' },
                    { name: 'Unos aktivnosti', text: 'Procijenite koliko minuta dnevno ste fizički aktivni.' },
                    { name: 'Rezultat', text: 'Saznajte preporučeni dnevni unos vode u litrama i čašama.' }
                ]}
            />
            <FAQSchema
                questions={[
                    {
                        question: "Računaju li se kava i čaj kao voda?",
                        answer: "Da, ali imaju blagi diuretički učinak. Najbolje je primarno piti čistu vodu."
                    },
                    {
                        question: "Mogu li popiti previše vode?",
                        answer: "Da, to se zove hiponatrijemija, ali je rijetko i događa se samo kod ekstremnog unosa u kratkom vremenu."
                    },
                    {
                        question: "Koja je boja urina znak dobre hidratacije?",
                        answer: "Svijetlo žuta, poput limunade. Tamna boja je znak dehidracije."
                    },
                    {
                        question: "Je li bolja hladna ili topla voda?",
                        answer: "Za hidrataciju je svejedno. Pijte temperaturu koja vam odgovara kako biste lakše popili potrebnu količinu."
                    }
                ]}
            />

            {/* Hero Section */}
            <section className="pt-16 pb-8 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Kalkulator Unosa Vode
                    </h1>
                    <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                        Koliko vode vašem tijelu zaista treba?
                        Izračunajte preporučeni dnevni unos prilagođen vašoj težini i aktivnosti.
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
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Vaši Podaci</h2>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tjelesna težina (kg)
                                    </label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleInputChange}
                                        className={inputClasses}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Dnevna aktivnost (minuta)
                                    </label>
                                    <input
                                        type="number"
                                        name="activityMinutes"
                                        value={formData.activityMinutes}
                                        onChange={handleInputChange}
                                        className={inputClasses}
                                    />
                                    <p className="text-xs text-gray-500">Uključuje trening, trčanje ili fizički rad.</p>
                                </div>
                            </div>
                        </GradientCard>

                        {/* Results */}
                        <div className="space-y-6">
                            {result && (
                                <GradientCard>
                                    <div className="text-center space-y-6">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-600 mb-2">Preporučeni Dnevni Unos</h3>
                                            <div className="text-5xl font-bold text-blue-500 mb-1">
                                                {result.liters.toFixed(2)} <span className="text-2xl text-gray-400">L</span>
                                            </div>
                                            <p className="text-gray-500">ili približno</p>
                                        </div>

                                        <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-center space-x-3">
                                            <GlassWater className="w-8 h-8 text-blue-500" />
                                            <span className="text-2xl font-bold text-blue-700">{result.glasses}</span>
                                            <span className="text-blue-600 font-medium">čaša (250ml)</span>
                                        </div>

                                        <div className="text-xs text-gray-400 pt-2">
                                            *Ovo je procjena. Ljeti ili kod pojačanog znojenja povećajte unos.
                                        </div>
                                    </div>
                                </GradientCard>
                            )}

                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                    <Info className="w-4 h-4 mr-2 text-blue-500" />
                                    Znakovi dehidracije?
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Suha usta, umor, glavobolja i tamna boja urina su prvi znakovi da ne pijete dovoljno vode.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Summary */}
            <AISummary
                summary="Kalkulator unosa vode pomaže izračunati preporučeni dnevni unos vode na temelju tjelesne težine i razine aktivnosti. Sprječava dehidraciju i poboljšava zdravlje."
                keywords={['kalkulator vode', 'dnevni unos vode', 'hidratacija', 'dehidracija', 'voda za piće']}
                useCases={[
                    'Izračun potrebnog unosa vode za aktivne sportaše',
                    'Praćenje hidratacije tijekom vrućih ljetnih dana',
                    'Određivanje bazičnog unosa vode prema težini'
                ]}
                statistics={[
                    { label: 'Prosječan unos vode (muškarci)', value: '3.7 L', source: 'Institute of Medicine' },
                    { label: 'Prosječan unos vode (žene)', value: '2.7 L', source: 'Institute of Medicine' },
                    { label: 'Sadržaj vode u ljudskom tijelu', value: '60%', source: 'USGS' }
                ]}
            />

            {/* Quick Answer */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <QuickAnswer
                        question="Koliko vode trebam piti dnevno?"
                        answer="Opća preporuka je piti oko 30-35 ml vode po kilogramu tjelesne težine dnevno, plus dodatno za fizičku aktivnost."
                        highlight="Formula: Težina (kg) x 0.033 = Litre vode"
                        details="Fizička aktivnost i vruće vrijeme povećavaju potrebu za vodom."
                    />

                    <div className="grid md:grid-cols-3 gap-6 my-12">
                        <StatisticCard
                            value="30-35 ml"
                            label="Preporučeno po kg težine"
                            source="Nutricionisti"
                            color="blue"
                        />
                        <StatisticCard
                            value="60%"
                            label="Vode u ljudskom tijelu"
                            source="Biologija"
                            color="green"
                        />
                        <StatisticCard
                            value="2% gubitka"
                            label="Početak dehidracije"
                            source="Medicina"
                            color="orange"
                        />
                    </div>

                    <ComparisonTable
                        title="Unos Vode Prema Težini"
                        caption="Preporučeni dnevni unos vode (bez dodatne aktivnosti)"
                        headers={['Težina', 'Unos (ml)', 'Unos (čaše od 250ml)']}
                        rows={[
                            ['50 kg', '1650 ml', '6-7 čaša'],
                            ['60 kg', '1980 ml', '8 čaša'],
                            ['70 kg', '2310 ml', '9 čaša'],
                            ['80 kg', '2640 ml', '10-11 čaša'],
                            ['90 kg', '2970 ml', '12 čaša']
                        ]}
                        highlightColumn={1}
                    />
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Primjeri Korištenja</h2>

                    <UseCaseExample
                        title="Primjer 1: Uredski Posao"
                        scenario="Marko (80 kg) radi u uredu i nije fizički aktivan. Želi znati koliko vode treba piti."
                        input="Težina: 80 kg | Aktivnost: 0 min"
                        output="Preporuka: 2.6 litara vode dnevno"
                        explanation="Bazična potreba za hidratacijom bez dodatnog znojenja."
                        icon={<User className="w-6 h-6 text-blue-600" />}
                    />

                    <UseCaseExample
                        title="Primjer 2: Ljetni Trening"
                        scenario="Ivana (60 kg) trči 45 minuta po vrućem vremenu."
                        input="Težina: 60 kg | Aktivnost: 45 min"
                        output="Preporuka: 2.5 litara vode dnevno"
                        explanation="Zbog znojenja tijekom trčanja, preporuča se dodatnih 500-600 ml vode."
                        icon={<Activity className="w-6 h-6 text-orange-600" />}
                    />

                    <UseCaseExample
                        title="Primjer 3: Cjelodnevni Obilazak"
                        scenario="Turist (75 kg) hoda gradom cijeli dan (120 min lagane aktivnosti)."
                        input="Težina: 75 kg | Aktivnost: 120 min"
                        output="Preporuka: 3.5 litara vode dnevno"
                        explanation="Dugotrajna niska aktivnost također zahtijeva povećan unos tekućine."
                        icon={<Sun className="w-6 h-6 text-yellow-600" />}
                    />
                </div>
            </section>

            {/* How to Use Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-400">
                            <div className="text-2xl font-bold text-blue-400 mb-2">1.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Težina</h3>
                            <p className="text-gray-600 text-sm">Unesite svoju trenutnu tjelesnu težinu u kilogramima</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-400">
                            <div className="text-2xl font-bold text-blue-400 mb-2">2.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Aktivnost</h3>
                            <p className="text-gray-600 text-sm">Koliko minuta dnevno ste fizički aktivni (trening, hodanje)</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-400">
                            <div className="text-2xl font-bold text-blue-400 mb-2">3.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Izračun</h3>
                            <p className="text-gray-600 text-sm">Kalkulator koristi formulu (kg / 30) + dodatak za aktivnost</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-400">
                            <div className="text-2xl font-bold text-blue-400 mb-2">4.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Rezultat</h3>
                            <p className="text-gray-600 text-sm">Dobit ćete preporuku u litrama i čašama</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Zašto je voda važna */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Znanost Iza Hidratacije
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                                <Droplets className="w-5 h-5 mr-2" />
                                Zašto nam treba voda?
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Voda čini oko 60% ljudskog tijela. Svaka stanica treba vodu da bi funkcionirala. Voda regulira tjelesnu temperaturu, "podmazuje" zglobove, štiti leđnu moždinu i pomaže izbacivanju otpada putem mokraće i znoja.
                            </p>
                            <p className="text-gray-600 text-sm">
                                Već gubitak od 1-2% tjelesne tekućine može uzrokovati pad koncentracije, glavobolju i umor.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                                <Scale className="w-5 h-5 mr-2" />
                                Voda i Mršavljenje
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Voda može pomoći u kontroli tjelesne težine. Pijenje vode prije jela može smanjiti apetit jer želudac šalje signal sitosti.
                            </p>
                            <p className="text-gray-600 text-sm">
                                Također, zamjena zaslađenih sokova vodom je najlakši način za smanjenje unosa šećera i kalorija.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Hrana bogata vodom (New) */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Hrana Bogata Vodom
                    </h2>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
                        Oko 20% dnevnog unosa vode dolazi iz hrane. Uključite ove namirnice u prehranu za bolju hidrataciju.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-green-50 p-4 rounded-xl text-center">
                            <div className="text-3xl mb-2">🥒</div>
                            <div className="font-bold text-gray-900">Krastavac</div>
                            <div className="text-green-600 text-sm">96% vode</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl text-center">
                            <div className="text-3xl mb-2">🍉</div>
                            <div className="font-bold text-gray-900">Lubenica</div>
                            <div className="text-green-600 text-sm">92% vode</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl text-center">
                            <div className="text-3xl mb-2">🍓</div>
                            <div className="font-bold text-gray-900">Jagode</div>
                            <div className="text-green-600 text-sm">91% vode</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl text-center">
                            <div className="text-3xl mb-2">🥗</div>
                            <div className="font-bold text-gray-900">Zelena salata</div>
                            <div className="text-green-600 text-sm">95% vode</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Savjeti */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Kako Piti Više Vode?
                    </h2>
                    <ul className="space-y-4 max-w-2xl mx-auto">
                        <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                            <span className="text-2xl mr-4">🌅</span>
                            <div>
                                <h4 className="font-bold text-gray-900">Jutarnji Start</h4>
                                <p className="text-gray-600">Popijte veliku čašu vode odmah nakon buđenja. To pokreće metabolizam i nadoknađuje tekućinu izgubljenu tijekom noći.</p>
                            </div>
                        </li>
                        <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                            <span className="text-2xl mr-4">🧴</span>
                            <div>
                                <h4 className="font-bold text-gray-900">Uvijek uz vas</h4>
                                <p className="text-gray-600">Držite bocu vode na radnom stolu. Često pijemo samo jer nam je voda pri ruci (vizualni poticaj).</p>
                            </div>
                        </li>
                        <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                            <span className="text-2xl mr-4">💧</span>
                            <div>
                                <h4 className="font-bold text-gray-900">Prije svakog obroka</h4>
                                <p className="text-gray-600">Stvorite naviku da popijete čašu vode 30 min prije jela. To pomaže probavi i hidrataciji.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Česta Pitanja (FAQ)
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Računaju li se kava i čaj?</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Da, ali s oprezom. Iako doprinose unosu tekućine, kofein ima blagi diuretički učinak (potiče mokrenje). Voda je uvijek najbolji izbor.
                            </p>
                            <h3 className="font-semibold text-gray-900 mb-2">Mogu li popiti previše vode?</h3>
                            <p className="text-gray-600 text-sm">
                                Da, stanje se zove hiponatrijemija (otrovanje vodom), gdje razina soli u krvi opasno padne. To je rijetko i događa se kod ekstremnog unosa (npr. maratonci) u kratkom roku.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Kako znam da pijem dovoljno?</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Najbolji indikator je boja urina. Trebala bi biti svijetlo žuta (poput limunade). Tamno žuta ili narančasta boja znak je dehidracije.
                            </p>
                            <h3 className="font-semibold text-gray-900 mb-2">Hladna ili topla voda?</h3>
                            <p className="text-gray-600 text-sm">
                                Nema značajne razlike za hidrataciju. Pijte temperaturu koja vam najviše odgovara jer ćete tako vjerojatno popiti više.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <RelatedCalculators />
        </>
    );
}
