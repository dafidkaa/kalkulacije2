import React from 'react';

export function UnitBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Prednosti Pretvarača Jedinica
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Širok Izbor Jedinica
              </h3>
              <p className="text-gray-600">
                Podržava sve popularne mjerne jedinice za duljinu, masu, volumen, temperaturu i više.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Precizni Izračuni
              </h3>
              <p className="text-gray-600">
                Točni rezultati s mogućnošću prilagodbe decimalne preciznosti prema vašim potrebama.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Brza Konverzija
              </h3>
              <p className="text-gray-600">
                Trenutačno pretvaranje između različitih mjernih jedinica uz jednostavno sučelje.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}