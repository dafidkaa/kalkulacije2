import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Home, 
  Accessibility,
  Globe,
  Shield
} from 'lucide-react';

export function CalculatorBenefits() {
  const benefits = [
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      title: 'Za Studente',
      description: 'Idealan za matematiku, fiziku, kemiju i inženjerstvo. Podržava sve osnovne i napredne funkcije potrebne za studij.'
    },
    {
      icon: <Briefcase className="w-8 h-8 text-green-600" />,
      title: 'Za Profesionalce',
      description: 'Brzi izračuni s AI podrškom za inženjere, arhitekte, financijske analitičare i sve koji trebaju precizne rezultate.'
    },
    {
      icon: <Home className="w-8 h-8 text-purple-600" />,
      title: 'Za Svakodnevnu Upotrebu',
      description: 'Jednostavan za osnovne izračune poput postotaka, tipova, računa i drugih svakodnevnih matematičkih potreba.'
    },
    {
      icon: <Accessibility className="w-8 h-8 text-orange-600" />,
      title: 'AI Pristupačnost',
      description: 'Glasovni unos s AI podrškom čini kalkulator dostupnim svima. Automatsko rješavanje složenih izraza.'
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-600" />,
      title: 'Višejezična Podrška',
      description: 'Podržava hrvatski i engleski jezik za glasovni unos i prirodni jezik. Lokalizirano sučelje na hrvatskom.'
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: 'Privatnost i AI Sigurnost',
      description: 'Lokalni izračuni s opcionalnom AI podrškom. AI se koristi samo kada je potrebno, s maksimalnom privatnošću.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Zašto Koristiti Naš Kalkulator?
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Naš kalkulator kombinira tradicionalne funkcije s modernim tehnologijama 
          poput glasovnog unosa i prirodnog jezika za najbolje korisničko iskustvo.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-md">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Počnite koristiti napredni kalkulator već danas!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Bez registracije, bez preuzimanja - jednostavno otvorite i počnite računati.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                ✓ Besplatno za korištenje
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                ✓ Radi na svim uređajima
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                ✓ AI podrška
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                ✓ Potpuna privatnost
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
