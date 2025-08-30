/**
 * Cookie Consent Management System
 * GDPR-compliant cookie consent for Google Analytics and Microsoft Clarity
 */

// Cookie consent types
export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface ConsentState {
  hasConsented: boolean;
  consentDate: string;
  consent: CookieConsent;
  version: string;
}

// Default consent state
const DEFAULT_CONSENT: CookieConsent = {
  necessary: true, // Always true - required for basic functionality
  analytics: false,
  marketing: false,
  preferences: false,
};

// Current consent version (increment when cookie policy changes)
const CONSENT_VERSION = '1.0';

// Cookie names
const CONSENT_COOKIE_NAME = 'kalkulacije_cookie_consent';
const CONSENT_EXPIRY_DAYS = 365;

/**
 * Check if user is in EEA, UK, or Switzerland (requires consent)
 */
export const requiresConsent = (): boolean => {
  // List of countries that require explicit consent
  const consentRequiredCountries = [
    // EEA countries
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
    // Additional EEA
    'IS', 'LI', 'NO',
    // UK and Switzerland
    'GB', 'CH'
  ];

  try {
    // Try to get user's country from timezone or other indicators
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Simple heuristic based on timezone (not 100% accurate but good enough)
    if (timezone.includes('Europe/')) {
      return true; // Assume European timezone requires consent
    }
    
    // Default to requiring consent for safety
    return true;
  } catch {
    // If we can't determine location, require consent for safety
    return true;
  }
};

/**
 * Get current consent state from localStorage
 */
export const getConsentState = (): ConsentState | null => {
  try {
    const stored = localStorage.getItem(CONSENT_COOKIE_NAME);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored) as ConsentState;
    
    // Check if consent is still valid (version matches)
    if (parsed.version !== CONSENT_VERSION) {
      return null;
    }
    
    return parsed;
  } catch {
    return null;
  }
};

/**
 * Save consent state to localStorage
 */
export const saveConsentState = (consent: CookieConsent): void => {
  const consentState: ConsentState = {
    hasConsented: true,
    consentDate: new Date().toISOString(),
    consent,
    version: CONSENT_VERSION,
  };
  
  try {
    localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(consentState));
    
    // Also set a simple cookie for server-side detection if needed
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);
    
    document.cookie = `${CONSENT_COOKIE_NAME}=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  } catch (error) {
    console.warn('Failed to save consent state:', error);
  }
};

/**
 * Check if user has given consent for a specific category
 */
export const hasConsent = (category: keyof CookieConsent): boolean => {
  const consentState = getConsentState();
  
  if (!consentState) {
    // If no consent given and consent is required, default to false
    if (requiresConsent()) {
      return category === 'necessary';
    }
    // If consent not required (non-EEA), allow analytics by default
    return true;
  }
  
  return consentState.consent[category];
};

/**
 * Accept all cookies
 */
export const acceptAllCookies = (): void => {
  const consent: CookieConsent = {
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true,
  };
  
  saveConsentState(consent);
  
  // Trigger consent change event
  window.dispatchEvent(new CustomEvent('cookieConsentChanged', { 
    detail: { consent, accepted: true } 
  }));
};

/**
 * Reject all non-necessary cookies
 */
export const rejectAllCookies = (): void => {
  const consent: CookieConsent = {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  };
  
  saveConsentState(consent);
  
  // Trigger consent change event
  window.dispatchEvent(new CustomEvent('cookieConsentChanged', { 
    detail: { consent, accepted: false } 
  }));
};

/**
 * Save custom consent preferences
 */
export const saveCustomConsent = (consent: CookieConsent): void => {
  // Ensure necessary cookies are always enabled
  const finalConsent = {
    ...consent,
    necessary: true,
  };
  
  saveConsentState(finalConsent);
  
  // Trigger consent change event
  window.dispatchEvent(new CustomEvent('cookieConsentChanged', { 
    detail: { consent: finalConsent, accepted: true } 
  }));
};

/**
 * Clear all consent data (for testing or reset)
 */
export const clearConsent = (): void => {
  try {
    localStorage.removeItem(CONSENT_COOKIE_NAME);
    
    // Clear the cookie
    document.cookie = `${CONSENT_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    
    // Trigger consent change event
    window.dispatchEvent(new CustomEvent('cookieConsentChanged', { 
      detail: { consent: DEFAULT_CONSENT, accepted: false } 
    }));
  } catch (error) {
    console.warn('Failed to clear consent:', error);
  }
};

/**
 * Check if consent banner should be shown
 */
export const shouldShowConsentBanner = (): boolean => {
  // Don't show if consent not required
  if (!requiresConsent()) {
    return false;
  }
  
  // Show if no consent state exists
  const consentState = getConsentState();
  return !consentState;
};

/**
 * Get consent for Google Consent Mode
 */
export const getGoogleConsentMode = () => {
  const consentState = getConsentState();
  
  if (!consentState) {
    return {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
    };
  }
  
  return {
    ad_storage: consentState.consent.marketing ? 'granted' : 'denied',
    analytics_storage: consentState.consent.analytics ? 'granted' : 'denied',
    functionality_storage: consentState.consent.preferences ? 'granted' : 'denied',
    personalization_storage: consentState.consent.preferences ? 'granted' : 'denied',
    security_storage: 'granted',
  };
};

/**
 * Cookie categories information
 */
export const COOKIE_CATEGORIES = {
  necessary: {
    name: 'Potrebni kolačići',
    description: 'Ovi kolačići su neophodni za osnovnu funkcionalnost stranice i ne mogu se onemogućiti.',
    cookies: [
      {
        name: 'kalkulacije_cookie_consent',
        purpose: 'Pamti vaše postavke za kolačiće',
        duration: '1 godina',
      },
    ],
  },
  analytics: {
    name: 'Analitički kolačići',
    description: 'Pomažu nam razumjeti kako koristite našu stranicu i poboljšati korisničko iskustvo.',
    cookies: [
      {
        name: 'Google Analytics (_ga, _ga_*)',
        purpose: 'Prikuplja anonimne podatke o korištenju stranice',
        duration: '2 godine',
      },
      {
        name: 'Microsoft Clarity',
        purpose: 'Analizira ponašanje korisnika za poboljšanje stranice',
        duration: '1 godina',
      },
    ],
  },
  marketing: {
    name: 'Marketing kolačići',
    description: 'Koriste se za prikazivanje relevantnih oglasa i mjerenje njihove učinkovitosti.',
    cookies: [],
  },
  preferences: {
    name: 'Kolačići za postavke',
    description: 'Pamte vaše postavke i preferencije za personalizirano iskustvo.',
    cookies: [],
  },
} as const;
