import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, Plus, Trash2, GraduationCap, School, BookOpen } from 'lucide-react';
import { calculateGPA, getGPARating, GradeItem } from '../utils/gpaCalculator';
import { ToolSchema, BreadcrumbSchema, FAQSchema, HowToSchema } from '../components/SchemaMarkup';
import { RelatedCalculators } from '../components/RelatedCalculators';

export function GPACalculator() {
    const [grades, setGrades] = useState<GradeItem[]>([
        { id: '1', name: 'Hrvatski jezik', grade: 0 },
        { id: '2', name: 'Matematika', grade: 0 },
        { id: '3', name: 'Engleski jezik', grade: 0 },
    ]);

    const addSubject = () => {
        setGrades([
            ...grades,
            { id: Date.now().toString(), name: '', grade: 0 }
        ]);
    };

    const removeSubject = (id: string) => {
        if (grades.length > 1) {
            setGrades(grades.filter(g => g.id !== id));
        }
    };

    const updateSubject = (id: string, field: keyof GradeItem, value: string | number) => {
        setGrades(grades.map(g =>
            g.id === id ? { ...g, [field]: value } : g
        ));
    };

    const gpa = calculateGPA(grades);
    const rating = getGPARating(gpa);

    const faqData = [
        {
            question: 'Kako se računa prosjek ocjena?',
            answer: 'Prosjek ocjena računa se kao aritmetička sredina: zbrojite sve ocjene i podijelite taj zbroj s ukupnim brojem predmeta.'
        },
        {
            question: 'Koji je prag za odličan uspjeh?',
            answer: 'Za odličan (5) uspjeh potreban je prosjek od najmanje 4.50. Za vrlo dobar (4) prag je 3.50, a za dobar (3) prag je 2.50.'
        },
        {
            question: 'Mogu li koristiti kalkulator za fakultet?',
            answer: 'Da, ovaj kalkulator je univerzalan i može se koristiti za osnovnu školu, srednju školu i fakultet (težinski prosjek uskoro dolazi).'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Kalkulator Prosjeka Ocjena | Izračun Školskog Uspjeha</title>
                <meta
                    name="description"
                    content="Besplatni kalkulator prosjeka ocjena za školu i fakultet. Jednostavno izračunajte svoj opći uspjeh i saznajte koja vam ocjena treba za željeni prosjek."
                />
                <meta
                    name="keywords"
                    content="kalkulator prosjeka, prosjek ocjena, izračun prosjeka, školski uspjeh, kalkulator ocjena, zaključivanje ocjena"
                />
                <link rel="canonical" href="https://kalkulacije.com/kalkulator-prosjeka" />
            </Helmet>

            <ToolSchema
                name="Kalkulator Prosjeka Ocjena"
                description="Alat za izračun prosjeka školskih ocjena i općeg uspjeha."
                url="https://kalkulacije.com/kalkulator-prosjeka"
                keywords={['kalkulator prosjeka', 'izračun ocjena', 'školski uspjeh']}
            />

            <BreadcrumbSchema
                items={[
                    { name: 'Početna', url: 'https://kalkulacije.com/' },
                    { name: 'Kalkulator Prosjeka', url: 'https://kalkulacije.com/kalkulator-prosjeka' }
                ]}
            />

            <HowToSchema
                name="Kako izračunati prosjek ocjena?"
                description="Vodič za izračun školskog prosjeka i općeg uspjeha."
                steps={[
                    { name: 'Predmeti', text: 'Dodajte sve predmete koje imate (kliknite "Dodaj predmet").' },
                    { name: 'Ocjene', text: 'Za svaki predmet odaberite zaključnu ocjenu (1-5).' },
                    { name: 'Prosjek', text: 'Kalkulator odmah računa aritmetičku sredinu svih ocjena.' },
                    { name: 'Uspjeh', text: 'Provjerite koji ste opći uspjeh ostvarili (npr. Odličan).' }
                ]}
            />

            <FAQSchema questions={faqData} />

            {/* Hero Section */}
            <section className="pt-16 pb-12 bg-gradient-to-br from-indigo-50 to-purple-50 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 font-display">
                        Kalkulator Prosjeka Ocjena
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        <span>
                            Brzo i jednostavno izračunajte svoj školski prosjek.
                            Dodajte predmete, unesite ocjene i saznajte svoj opći uspjeh.
                        </span>
                    </p>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Input Form - Spans 2 cols */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-indigo-600" />
                                        Vaši Predmeti
                                    </h3>
                                    <button
                                        onClick={addSubject}
                                        className="flex items-center gap-1 text-sm bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200 transition-colors font-medium"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Dodaj predmet
                                    </button>
                                </div>

                                <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
                                    {grades.map((item, index) => (
                                        <div key={item.id} className="flex items-center gap-3 animate-fadeIn">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    value={item.name}
                                                    onChange={(e) => updateSubject(item.id, 'name', e.target.value)}
                                                    placeholder={`Predmet ${index + 1}`}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                                />
                                            </div>
                                            <div className="w-24">
                                                <select
                                                    value={item.grade}
                                                    onChange={(e) => updateSubject(item.id, 'grade', Number(e.target.value))}
                                                    className={`w-full px-2 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 font-medium ${item.grade === 5 ? 'text-green-600 border-green-200 bg-green-50' :
                                                        item.grade === 1 ? 'text-red-600 border-red-200 bg-red-50' :
                                                            item.grade === 0 ? 'text-gray-400 border-gray-200' : 'text-gray-900 border-gray-200'
                                                        }`}
                                                >
                                                    <option value="0">---</option>
                                                    <option value="5">5 (Odličan)</option>
                                                    <option value="4">4 (Vrlo dobar)</option>
                                                    <option value="3">3 (Dobar)</option>
                                                    <option value="2">2 (Dovoljan)</option>
                                                    <option value="1">1 (Nedovoljan)</option>
                                                </select>
                                            </div>
                                            <button
                                                onClick={() => removeSubject(item.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Ukloni predmet"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Results - Sticky Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 p-6 sticky top-24">
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full text-white mb-4 shadow-lg ring-4 ring-indigo-50">
                                        <GraduationCap className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-1">
                                        Vaš Prosjek
                                    </h2>
                                    <div className={`text-6xl font-bold mb-2 ${gpa >= 4.5 ? 'text-green-600' :
                                        gpa >= 3.5 ? 'text-blue-600' :
                                            gpa >= 2.5 ? 'text-yellow-600' :
                                                gpa > 0 ? 'text-red-600' : 'text-gray-300'
                                        }`}>
                                        {gpa > 0 ? gpa.toFixed(2) : '0.00'}
                                    </div>
                                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                                        {gpa > 0 ? rating : 'Unesite ocjene'}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-gray-100">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Broj predmeta:</span>
                                        <span className="font-semibold text-gray-900">{grades.length}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Zbroj ocjena:</span>
                                        <span className="font-semibold text-gray-900">
                                            {grades.reduce((acc, curr) => acc + curr.grade, 0)}
                                        </span>
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
                        Kako Izračunati Školski Prosjek?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-indigo-600 mb-2">1.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Unos</h3>
                            <p className="text-gray-600 text-sm">Upišite nazive predmeta (opcionalno).</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-indigo-600 mb-2">2.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Ocjene</h3>
                            <p className="text-gray-600 text-sm">Odaberite ocjenu za svaki predmet.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-indigo-600 mb-2">3.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Izračun</h3>
                            <p className="text-gray-600 text-sm">Automatski izračun prosjeka na 2 decimale.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-indigo-600 mb-2">4.</div>
                            <h3 className="font-semibold text-gray-900 mb-2">Uspjeh</h3>
                            <p className="text-gray-600 text-sm">Saznajte prolazite li s odličnim.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Kriteriji za Uspjeh
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { range: '4.50 - 5.00', label: 'Odličan (5)', color: 'bg-green-100 text-green-800' },
                            { range: '3.50 - 4.49', label: 'Vrlo dobar (4)', color: 'bg-blue-100 text-blue-800' },
                            { range: '2.50 - 3.49', label: 'Dobar (3)', color: 'bg-yellow-100 text-yellow-800' },
                            { range: '1.50 - 2.49', label: 'Dovoljan (2)', color: 'bg-orange-100 text-orange-800' },
                            { range: '1.00 - 1.49', label: 'Nedovoljan (1)', color: 'bg-red-100 text-red-800' },
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
                                <div className="text-2xl font-bold text-gray-900 mb-2">{item.range}</div>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${item.color}`}>
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="bg-gray-50">
                <div className="container mx-auto px-4 py-16 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Česta Pitanja</h2>
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600 text-sm">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <RelatedCalculators />
        </>
    );
}
