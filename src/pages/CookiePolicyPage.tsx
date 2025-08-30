import React, { useState, useEffect } from 'react';
import { Shield, Cookie, Settings, Check, X, Info } from 'lucide-react';
import { 
  getConsentState, 
  saveCustomConsent, 
  clearConsent,
  CookieConsent,
  COOKIE_CATEGORIES 
} from '../utils/cookieConsent';

export function CookiePolicyPage() {
  const [preferences, setPreferences] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Load existing preferences
    const existingConsent = getConsentState();
    if (existingConsent) {
      setPreferences(existingConsent.consent);
    }
  }, []);

  const handlePreferenceChange = (category: keyof CookieConsent, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: category === 'necessary' ? true : value, // Necessary always true
    }));
  };

  const handleSavePreferences = () => {
    saveCustomConsent(preferences);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setPreferences(allAccepted);
    saveCustomConsent(allAccepted);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setPreferences(onlyNecessary);
    saveCustomConsent(onlyNecessary);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Pravila o kolačićima</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Saznajte kako koristimo kolačiće na našoj stranici i upravljajte svojim postavkama privatnosti.
        </p>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <Check className="w-5 h-5 text-green-600" />
          <span className="text-green-800">Vaše postavke kolačića su uspješno spremljene!</span>
        </div>
      )}

      {/* Cookie Settings */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Postavke kolačića</h2>
          </div>
          <p className="text-gray-600">
            Upravljajte svojim postavkama kolačića prema vašim preferencijama.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {Object.entries(COOKIE_CATEGORIES).map(([key, category]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences[key as keyof CookieConsent]}
                    onChange={(e) => handlePreferenceChange(key as keyof CookieConsent, e.target.checked)}
                    disabled={key === 'necessary'}
                    className="sr-only peer"
                  />
                  <div className={`relative w-11 h-6 rounded-full peer transition-colors duration-200 ${
                    key === 'necessary' 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : preferences[key as keyof CookieConsent]
                        ? 'bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300'
                        : 'bg-gray-200 peer-focus:ring-4 peer-focus:ring-gray-300'
                  }`}>
                    <div className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform duration-200 ${
                      preferences[key as keyof CookieConsent] ? 'translate-x-full' : ''
                    }`} />
                  </div>
                </label>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{category.description}</p>
              
              {category.cookies.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Kolačići:</h4>
                  {category.cookies.map((cookie, index) => (
                    <div key={index} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      <div className="font-medium">{cookie.name}</div>
                      <div>Svrha: {cookie.purpose}</div>
                      <div>Trajanje: {cookie.duration}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRejectAll}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Odbaci sve
            </button>
            <button
              onClick={handleSavePreferences}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              Spremi postavke
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
            >
              Prihvati sve
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Policy Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Info className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Što su kolačići?</h2>
          </div>
        </div>

        <div className="p-6 prose prose-gray max-w-none">
          <p className="text-gray-600 mb-4">
            Kolačići su male tekstualne datoteke koje se pohranjuju na vašem uređaju kada posjećujete našu web stranicu. 
            Oni nam pomažu pružiti vam bolje korisničko iskustvo i analizirati kako koristite našu stranicu.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">Kako koristimo kolačiće</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Za osnovnu funkcionalnost stranice (potrebni kolačići)</li>
            <li>Za analizu prometa i poboljšanje korisničkog iskustva</li>
            <li>Za pamćenje vaših postavki i preferencija</li>
            <li>Za mjerenje učinkovitosti naših usluga</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">Vaša prava</h3>
          <p className="text-gray-600 mb-4">
            Imate pravo kontrolirati kako koristimo kolačiće na našoj stranici. Možete:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Prihvatiti ili odbaciti određene kategorije kolačića</li>
            <li>Promijeniti svoje postavke u bilo kojem trenutku</li>
            <li>Obrisati postojeće kolačiće iz vašeg preglednika</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">Kontakt</h3>
          <p className="text-gray-600">
            Ako imate pitanja o našoj politici kolačića, možete nas kontaktirati putem naše web stranice.
          </p>
        </div>
      </div>
    </div>
  );
}
