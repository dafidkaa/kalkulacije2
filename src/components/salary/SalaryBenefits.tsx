import React from 'react';

export function SalaryBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Prednosti Kalkulatora Plaće
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Točnost i Pouzdanost
              </h3>
              <p className="text-gray-600">
                Precizni izračuni utemeljeni na aktualnim poreznim stopama i propisima Republike Hrvatske.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Jednostavnost Korištenja
              </h3>
              <p className="text-gray-600">
                Intuitivno sučelje prilagođeno svim korisnicima, bez potrebe za tehničkim znanjem.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Trenutni Rezultati
              </h3>
              <p className="text-gray-600">
                Instantni izračun svih relevantnih stavki - od bruto do neto iznosa, uključujući poreze i doprinose.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}