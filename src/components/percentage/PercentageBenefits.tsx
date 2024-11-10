import React from 'react';

export function PercentageBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Prednosti Kalkulatora Postotaka
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Prirodni Jezik
              </h3>
              <p className="text-gray-600">
                Unesite izračune prirodnim jezikom - kalkulator razumije različite načine postavljanja pitanja.
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Vizualni Prikazi
              </h3>
              <p className="text-gray-600">
                Grafički prikazi rezultata pomažu u boljem razumijevanju postotnih odnosa.
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Svestrani Izračuni
              </h3>
              <p className="text-gray-600">
                Od osnovnih postotaka do složenih izračuna povećanja i smanjenja - sve na jednom mjestu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}