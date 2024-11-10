import React from 'react';

export function BMIBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Prednosti BMI Kalkulatora
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-r from-[#fff5f5] to-[#ffe5e5] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Personalizirani Pristup
              </h3>
              <p className="text-gray-600">
                Izračun prilagođen vašoj dobi, spolu i razini aktivnosti za preciznije rezultate.
              </p>
            </div>
            <div className="bg-gradient-to-r from-[#ffe5e5] to-[#fff5f5] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Detaljne Informacije
              </h3>
              <p className="text-gray-600">
                Uz BMI dobivate i informacije o idealnoj težini, dnevnim kalorijama i zdravstvenim preporukama.
              </p>
            </div>
            <div className="bg-gradient-to-r from-[#fff5f5] to-[#ffe5e5] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Zdravstvene Smjernice
              </h3>
              <p className="text-gray-600">
                Praktične preporuke za održavanje zdrave težine temeljene na vašim rezultatima.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}