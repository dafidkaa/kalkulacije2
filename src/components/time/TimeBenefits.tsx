import React from 'react';

export function TimeBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Prednosti kalkulatora vremena
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Jednostavno korištenje
              </h3>
              <p className="text-gray-600">
                Intuitivno sučelje za brze i jednostavne izračune vremena, bez potrebe za složenim formulama.
              </p>
            </div>
            <div className="bg-gradient-to-r from-indigo-100 to-indigo-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Precizni rezultati
              </h3>
              <p className="text-gray-600">
                Točni izračuni s detaljnom razradom rezultata u svim relevantnim vremenskim jedinicama.
              </p>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Višestruke funkcije
              </h3>
              <p className="text-gray-600">
                Sve potrebne funkcije za rad s vremenom na jednom mjestu - od zbrajanja do pretvaranja jedinica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}