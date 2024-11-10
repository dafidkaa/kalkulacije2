import React, { useState } from 'react';
import { Modal } from './Modal';
import { ContactForm } from './ContactForm';

export function Footer() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">O Kalkulatorima</h3>
            <p className="text-gray-400">
              Besplatni online kalkulatori za svakodnevne potrebe. Pretvarajte jedinice,
              računajte plaće, površine i više.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Brzi Linkovi</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveModal('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Kontakt
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('privacy')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privatnost
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('terms')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Uvjeti korištenja
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Pratite Nas</h3>
            <p className="text-gray-400">
              Budite u toku s najnovijim kalkulatorima i ažuriranjima.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Kalkulacije.com by <a href="https://ajde.online" className="text-blue-400 hover:text-blue-300">Ajde.Online</a>. Sva prava pridržana.</p>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title="Politika Privatnosti"
      >
        <div className="prose prose-sm max-w-none text-gray-600">
          <p className="mb-4">
            Naši kalkulatori ne prikupljaju niti pohranjuju osobne podatke. Svi izračuni se izvršavaju lokalno u vašem pregledniku.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Kolačići</h3>
          <p className="mb-4">
            Ne koristimo kolačiće niti druge tehnologije praćenja.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Kontakt Obrazac</h3>
          <p className="mb-4">
            Podaci koje unesete u kontakt obrazac koriste se isključivo za odgovaranje na vaše upite.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title="Uvjeti Korištenja"
      >
        <div className="prose prose-sm max-w-none text-gray-600">
          <p className="mb-4">
            Korištenjem naših kalkulatora prihvaćate sljedeće uvjete korištenja.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Točnost Podataka</h3>
          <p className="mb-4">
            Iako se trudimo osigurati točnost svih izračuna, ne možemo garantirati apsolutnu preciznost. Preporučujemo provjeru rezultata za kritične izračune.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Ograničenje Odgovornosti</h3>
          <p className="mb-4">
            Ne snosimo odgovornost za odluke donesene na temelju izračuna naših kalkulatora.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
        title="Kontaktirajte Nas"
      >
        <ContactForm onClose={() => setActiveModal(null)} />
      </Modal>
    </footer>
  );
}