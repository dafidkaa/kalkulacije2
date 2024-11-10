import React from 'react';

export function Benefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Prednosti BMI Kalkulatora
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Praćenje Zdravlja
              </h3>
              <p className="text-gray-600">
                Redovito praćenje BMI indeksa pomaže u održavanju zdrave težine i prevenciji zdravstvenih problema.
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Personalizirani Pristup
              </h3>
              <p className="text-gray-600">
                Dobijte prilagođene preporuke na temelju vaših osobnih karakteristika i razine aktivnosti.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Dodatne Informacije
              </h3>
              <p className="text-gray-600">
                Uz BMI, saznajte i svoj dnevni kalorijski unos te raspon idealne težine za vašu visinu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}