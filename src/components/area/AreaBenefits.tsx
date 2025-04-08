import React from 'react';
import { 
  School, 
  Home, 
  Briefcase, 
  Ruler 
} from 'lucide-react';

export function AreaBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Zašto Koristiti Naš Kalkulator Površine?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal-100 flex items-center justify-center">
              <School className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Za Obrazovanje</h3>
            <p className="text-gray-600">
              Savršen alat za učenike i nastavnike za učenje i podučavanje geometrije.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal-100 flex items-center justify-center">
              <Home className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Za Dom</h3>
            <p className="text-gray-600">
              Izračunajte površinu prostorija, podova, zidova ili vrta za kućne projekte.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal-100 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Za Posao</h3>
            <p className="text-gray-600">
              Brzi izračuni za arhitekte, građevinare, dizajnere i druge profesionalce.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal-100 flex items-center justify-center">
              <Ruler className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Za Preciznost</h3>
            <p className="text-gray-600">
              Dobijte precizne rezultate s detaljnim objašnjenjima i formulama.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
