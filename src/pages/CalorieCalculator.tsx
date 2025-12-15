import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { GradientCard } from '../components/GradientCard';
import { Activity, Flame, Scale } from 'lucide-react';
import { calculateCalories, CalorieResult } from '../utils/calorieCalculator';
import { ToolSchema, HowToSchema, FAQSchema } from '../components/SchemaMarkup';
import { RelatedCalculators } from '../components/RelatedCalculators';

export function CalorieCalculator() {
    const [formData, setFormData] = useState<{
        age: number;
        gender: 'male' | 'female';
        weight: number;
        height: number;
        activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';
    }>({
        age: 30,
        gender: 'male',
        weight: 70,
        height: 175,
        activityLevel: 'moderately_active'
    });

    const [result, setResult] = useState<CalorieResult | null>(null);

    useEffect(() => {
        const calcResult = calculateCalories(formData.age, formData.gender, formData.weight, formData.height, formData.activityLevel);
        setResult(calcResult);
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'gender' || name === 'activityLevel' ? value : (parseFloat(value) || 0)
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
                <title>Kalkulator Kalorija (BMR & TDEE) | Preporučeni Dnevni Unos | Kalkulacije.com</title>
                <meta name="description" content="Besplatni kalkulator kalorija. Izračunajte svoj BMR, TDEE i dnevne potrebe za mršavljenje, održavanje ili debljanje koristeći Mifflin-St Jeor formulu." />
                <meta name="keywords" content="kalkulator kalorija, bmr kalkulator, tdee kalkulator, dnevni unos kalorija, mršavljenje, debljanje" />
                <link rel="canonical" href="https://kalkulacije.com/kalkulator-kalorija" />
            </Helmet>

            <ToolSchema
                name="Kalkulator Kalorija"
                description="Precizan kalkulator za izračun dnevnog unosa kalorija, BMR-a i TDEE-a. Saznajte koliko kalorija trebate za mršavljenje ili dobivanje mišića."
                url="https://kalkulacije.com/kalkulator-kalorija"
                keywords={['kalorije', 'bmr', 'tdee', 'mršavljenje', 'prehrana']}
            />
            <HowToSchema
                name="Kako izračunati potreban unos kalorija?"
                description="Korak po korak vodič za izračun dnevnih kalorijskih potreba pomoću Mifflin-St Jeor formule."
                steps={[
                    { name: 'Unos podataka', text: 'Unesite svoje osobne podatke: dob, spol, visinu i težinu.' },
                    { name: 'Odabir aktivnosti', text: 'Odaberite razinu tjelesne aktivnosti koja najbolje opisuje vaš tjedan.' },
                    { name: 'Izračun', text: 'Kalkulator automatski računa vaš BMR (bazalni metabolizam) i TDEE (ukupnu potrošnju).' },
                    { name: 'Odabir cilja', text: 'Na temelju rezultata, odaberite unos za mršavljenje (-500kcal) ili debljanje (+500kcal).' }
                ]}
            />
            <FAQSchema
                questions={[
                    {
                        question: "Smijem li jesti ispod svog BMR-a?",
                        answer: "Ne preporučuje se dugoročno jesti ispod BMR-a jer to može usporiti metabolizam i ugroziti zdravlje."
                    },
                    {
                        question: "Koliko često trebam računati kalorije?",
                        answer: "Preporučuje se ponovni izračun nakon svakih 5-10 kg promjene u težini."
                    },
                    {
                        question: "Jesu li sve kalorije iste?",
                        answer: "Nutricionistički ne. Kalorije iz proteina, masti i ugljikohidrata različito utječu na hormne i sitost."
                    },
                    {
                        question: "Što je 'starvation mode'?",
                        answer: "Obrambeni mehanizam tijela kod drastičnog smanjenja unosa (ispod BMR-a), gdje tijelo počinje 'štedjeti' energiju usporavanjem metabolizma."
                    }
                ]}
            />

            {/* Hero Section */}
            <section className="pt-16 pb-8 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Kalkulator Kalorija
                    </h1>
                    <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                        Saznajte koliko kalorija vaše tijelo troši (BMR & TDEE).
                        Prilagodite unos za mršavljenje, održavanje ili debljanje.
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

                                {/* Gender Toggle */}
                                <div className="flex gap-4 p-1 bg-gray-100 rounded-lg">
                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
                                        className={`flex-1 py-2 rounded-md font-medium transition-all ${formData.gender === 'male' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Muško
                                    </button>
                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, gender: 'female' }))}
                                        className={`flex-1 py-2 rounded-md font-medium transition-all ${formData.gender === 'female' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Žensko
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Godine</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Visina (cm)</label>
                                        <input
                                            type="number"
                                            name="height"
                                            value={formData.height}
                                            onChange={handleInputChange}
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Težina (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleInputChange}
                                        className={inputClasses}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Razina Aktivnosti</label>
                                    <select
                                        name="activityLevel"
                                        value={formData.activityLevel}
                                        onChange={handleInputChange}
                                        className={inputClasses}
                                    >
                                        <option value="sedentary">Sjedilački (malo ili nimalo)</option>
                                        <option value="lightly_active">Lagano aktivan (1-3 puta tjedno)</option>
                                        <option value="moderately_active">Umjereno aktivan (3-5 puta tjedno)</option>
                                        <option value="very_active">Vrlo aktivan (6-7 puta tjedno)</option>
                                        <option value="extra_active">Ekstremno aktivan (fizički posao)</option>
                                    </select>
                                </div>
                            </div>
                        </GradientCard>

                        {/* Results */}
                        <div className="space-y-6">
                            {result && (
                                <GradientCard>
                                    <div className="space-y-6 text-center">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-600 mb-2">Vaš TDEE (Dnevna Potrošnja)</h3>
                                            <div className="text-4xl font-bold text-blue-600">
                                                {Math.round(result.tdee)} <span className="text-xl text-gray-500">kcal/dan</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">BMR (Mirovanje): {Math.round(result.bmr)} kcal</p>
                                        </div>

                                        <div className="space-y-3 pt-4 border-t border-gray-100">
                                            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                                <span className="text-gray-700 font-medium">Mršavljenje (-0.5kg)</span>
                                                <span className="text-red-600 font-bold">{Math.round(result.goals.weightLoss)} kcal</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                                <span className="text-gray-700 font-medium">Održavanje</span>
                                                <span className="text-green-600 font-bold">{Math.round(result.goals.maintain)} kcal</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                                <span className="text-gray-700 font-medium">Debljanje (+0.5kg)</span>
                                                <span className="text-blue-600 font-bold">{Math.round(result.goals.weightGain)} kcal</span>
                                            </div>
                                        </div>
                                    </div>
                                </GradientCard>
                            )}

                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h4 className="font-semibold text-gray-900 mb-2">Savjet</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Nikada ne idite ispod BMR vrijednosti ({Math.round(result?.bmr || 0)} kcal) bez nadzora stručnjaka, jer to usporava metabolizam.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Use Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
                            <div className="text-2xl font-bold text-blue-500 mb-2">1.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Podaci</h3>
                            <p className="text-gray-600 text-sm">Unesite dob, spol, visinu i trenutnu težinu</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
                            <div className="text-2xl font-bold text-blue-500 mb-2">2.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Aktivnost</h3>
                            <p className="text-gray-600 text-sm">Iskreno procijenite koliko se krećete tjedno</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
                            <div className="text-2xl font-bold text-blue-500 mb-2">3.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Rezultat</h3>
                            <p className="text-gray-600 text-sm">Dobit ćete tvoj TDEE (dnevnu potrošnju)</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
                            <div className="text-2xl font-bold text-blue-500 mb-2">4.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Cilj</h3>
                            <p className="text-gray-600 text-sm">Odaberite deficit za mršavljenje ili suficit za masu</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: BMR vs TDEE */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Razumijevanje Potrošnje Kalorija
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                                <Flame className="w-5 h-5 mr-2" />
                                BMR (Bazalni Metabolizam)
                            </h3>
                            <p className="text-gray-600 mb-4">
                                BMR (Basal Metabolic Rate) je broj kalorija koje vaše tijelo troši <strong>u potpunom mirovanju</strong> (npr. dok spavate) samo za održavanje osnovnih funkcija poput disanja, rada srca i regulacije temperature.
                            </p>
                            <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                                Naš kalkulator koristi Mifflin-St Jeor formulu, koja se smatra "zlatnim standardom" preciznosti za modernu populaciju.
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                                <Activity className="w-5 h-5 mr-2" />
                                TDEE (Ukupna Potrošnja)
                            </h3>
                            <p className="text-gray-600 mb-4">
                                TDEE (Total Daily Energy Expenditure) je vaš stvarni dnevni trošak kalorija. Dobiva se množenjem BMR-a s koeficijentom aktivnosti.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li>• Sjedilački: BMR x 1.2</li>
                                <li>• Umjereno aktivni: BMR x 1.55</li>
                                <li>• Jako aktivni: BMR x 1.725</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Makronutrijenti (New) */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Što su Makronutrijenti?
                    </h2>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
                        Nije važno samo <em>koliko</em> jedete, već i <em>što</em> jedete. Svaka kalorija nije ista. Za optimalno zdravlje i rezultate, važno je pratiti unos tri glavna makronutrijenta.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-red-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Proteini</h3>
                            <div className="text-sm font-semibold text-red-500 mb-4">4 kcal po gramu</div>
                            <p className="text-gray-600 text-sm">
                                Ključni za izgradnju i obnovu mišića. Povećavaju osjećaj sitosti i imaju visok termički efekt (tijelo troši energiju probavljajući ih).
                                <br /><br />
                                <strong>Izvori:</strong> Meso, riba, jaja, sir, grah, leća.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-yellow-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Ugljikohidrati</h3>
                            <div className="text-sm font-semibold text-yellow-500 mb-4">4 kcal po gramu</div>
                            <p className="text-gray-600 text-sm">
                                Glavni izvor energije za tijelo i mozak. Dijelimo ih na jednostavne (šećeri) i složene (vlakna, škrob).
                                <br /><br />
                                <strong>Izvori:</strong> Kruh, riža, tjestenina, voće, povrće.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Masti</h3>
                            <div className="text-sm font-semibold text-blue-500 mb-4">9 kcal po gramu</div>
                            <p className="text-gray-600 text-sm">
                                Nužne za apsorpciju vitamina i hormonsku ravnotežu. Energetski su najgušće, pa s njima treba umjereno.
                                <br /><br />
                                <strong>Izvori:</strong> Ulja, orašasti plodovi, avokado, maslac.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Kako Mršaviti */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Strategija za Promjenu Težine
                    </h2>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-sm">
                            <div className="p-3 bg-red-100 rounded-lg text-red-600 flex-shrink-0">
                                <Scale className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Za Mršavljenje (Deficit)</h3>
                                <p className="text-gray-600 mb-3">
                                    Cilj je unijeti manje kalorija nego što potrošite. Preporučuje se deficit od <strong>300-500 kcal</strong> dnevno.
                                </p>
                                <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                                    <li>Zdrav gubitak: 0.5 - 1 kg tjedno</li>
                                    <li>Ne idite ispod BMR-a (rizik od usporavanja metabolizma)</li>
                                    <li>Povećajte unos proteina za očuvanje mišića</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-sm">
                            <div className="p-3 bg-green-100 rounded-lg text-green-600 flex-shrink-0">
                                <Scale className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Za Dobivanje Mase (Suficit)</h3>
                                <p className="text-gray-600 mb-3">
                                    Potreban je blagi suficit od <strong>200-500 kcal</strong> dnevno uz trening snage.
                                </p>
                                <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                                    <li>Fokus na kvalitetnu hranu, ne "junk food"</li>
                                    <li>Adekvatan san je ključan za rast mišića</li>
                                    <li>Pratite napredak na vagi i u ogledalu</li>
                                </ul>
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
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Smijem li jesti ispod svog BMR-a?</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Kratkoročno da, ali dugoročno se <strong>ne preporučuje</strong>. To može dovesti do usporavanja metabolizma, gubitka mišićne mase, hormonskog disbalansa i nedostatka nutrijenata.
                            </p>
                            <h3 className="font-semibold text-gray-900 mb-2">Koliko često trebam računati kalorije?</h3>
                            <p className="text-gray-600 text-sm">
                                Kako gubite kilograme, vaš BMR se smanjuje. Preporučljivo je ponovno izračunati potrebe svakih 5-10 izgubljenih kilograma kako biste prilagodili unos.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Jesu li sve kalorije iste?</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Termodinamički da (za mršavljenje), ali nutricionistički ne. 100 kcal iz brokule i 100 kcal iz čokolade različito utječu na hormne gladi, razinu šećera u krvi i zdravlje.
                            </p>
                            <h3 className="font-semibold text-gray-900 mb-2">Što je "starvation mode"?</h3>
                            <p className="text-gray-600 text-sm">
                                To je obrambeni mehanizam tijela kod drastičnog smanjenja unosa. Tijelo postaje efikasnije i troši manje energije, što otežava daljnje mršavljenje. Zato su ekstremne dijete loše.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <RelatedCalculators />
        </>
    );
}
