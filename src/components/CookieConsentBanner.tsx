import React, { useState, useEffect } from 'react';
import { Cookie, Settings, X, Check, Shield } from 'lucide-react';
import { 
  shouldShowConsentBanner, 
  acceptAllCookies, 
  rejectAllCookies,
  getConsentState,
  CookieConsent,
  saveCustomConsent,
  COOKIE_CATEGORIES
} from '../utils/cookieConsent';

interface CookieConsentBannerProps {
  onConsentChange?: (consent: CookieConsent) => void;
}

export function CookieConsentBanner({ onConsentChange }: CookieConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    setShowBanner(shouldShowConsentBanner());
    
    // Load existing preferences if any
    const existingConsent = getConsentState();
    if (existingConsent) {
      setPreferences(existingConsent.consent);
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setShowBanner(false);
    setShowPreferences(false);
    onConsentChange?.({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  };

  const handleRejectAll = () => {
    rejectAllCookies();
    setShowBanner(false);
    setShowPreferences(false);
    onConsentChange?.({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  const handleSavePreferences = () => {
    saveCustomConsent(preferences);
    setShowBanner(false);
    setShowPreferences(false);
    onConsentChange?.(preferences);
  };

  const handlePreferenceChange = (category: keyof CookieConsent, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: category === 'necessary' ? true : value, // Necessary always true
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Kolačići i privatnost
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Koristimo kolačiće za poboljšanje vašeg iskustva, analizu prometa i personalizaciju sadržaja. 
                  Možete upravljati svojim postavkama ili prihvatiti sve kolačiće.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowPreferences(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                <Settings className="w-4 h-4" />
                Postavke
              </button>
              
              <button
                onClick={handleRejectAll}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                Odbaci sve
              </button>
              
              <button
                onClick={handleAcceptAll}
                className="flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                <Check className="w-4 h-4" />
                Prihvati sve
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowPreferences(false)} />
            
            <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Postavke privatnosti
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-600">
                    Upravljajte svojim postavkama kolačića. Možete omogućiti ili onemogućiti različite kategorije kolačića prema vašim preferencijama.
                  </p>

                  {/* Cookie Categories */}
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

                <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
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
          </div>
        </div>
      )}
    </>
  );
}
