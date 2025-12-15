import React from 'react';
import { Calculator, Zap, CheckCircle, TrendingUp } from 'lucide-react';

/**
 * How It Works Section Component
 * Explains the process of using calculators to users and AI tools
 */
export const HowItWorks: React.FC = () => {
    const steps = [
        {
            icon: Calculator,
            number: '1',
            title: 'Odaberite Kalkulator',
            description: 'Izaberite alat koji vam treba iz naše kolekcije besplatnih kalkulatora',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            icon: Zap,
            number: '2',
            title: 'Unesite Podatke',
            description: 'Upišite potrebne vrijednosti u jednostavna polja za unos',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100'
        },
        {
            icon: CheckCircle,
            number: '3',
            title: 'Dobijte Rezultat',
            description: 'Instant prikaz preciznih rezultata s detaljnim objašnjenjima',
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            icon: TrendingUp,
            number: '4',
            title: 'Koristite Uvide',
            description: 'Primjenite rezultate za bolje financijske i životne odluke',
            color: 'text-purple-600',
            bgColor: 'bg-purple-100'
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Kako Funkcioniraju Naši Kalkulatori?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Jednostavan proces u 4 koraka do točnih rezultata
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Step Number Badge */}
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                                {step.number}
                            </div>

                            {/* Icon */}
                            <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mb-4 mt-4`}>
                                <step.icon className={`w-8 h-8 ${step.color}`} />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">
                        ✅ Potpuno besplatno • ✅ Bez registracije • ✅ Instant rezultati
                    </p>
                </div>
            </div>
        </section>
    );
};
