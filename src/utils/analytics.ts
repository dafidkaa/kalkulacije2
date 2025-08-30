/**
 * Analytics Utility
 * Centralized tracking for Google Analytics and Microsoft Clarity with Cookie Consent
 */

import { hasConsent, getGoogleConsentMode } from './cookieConsent';

// Extend window object for analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Analytics configuration
const GA_TRACKING_ID = 'G-KMWE9DLRD1';
const CLARITY_PROJECT_ID = 'owjgqfafcf';

// Track if analytics have been initialized
let analyticsInitialized = false;
let clarityInitialized = false;

/**
 * Initialize Google Analytics with consent
 */
export const initializeGoogleAnalytics = (): void => {
  if (analyticsInitialized || typeof window === 'undefined') return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { window.dataLayer.push(arguments); };

  // Set default consent state
  const consentMode = getGoogleConsentMode();
  window.gtag('consent', 'default', consentMode);

  // Initialize GA
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    anonymize_ip: true,
    allow_google_signals: consentMode.analytics_storage === 'granted',
    allow_ad_personalization_signals: consentMode.ad_storage === 'granted',
  });

  // Load GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  analyticsInitialized = true;
};

/**
 * Initialize Microsoft Clarity with consent
 */
export const initializeMicrosoftClarity = (): void => {
  if (clarityInitialized || typeof window === 'undefined') return;

  // Initialize Clarity
  (function(c: any, l: any, a: any, r: any, i: any, t: any, y: any) {
    c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_PROJECT_ID);

  clarityInitialized = true;
};

/**
 * Update consent for Google Analytics
 */
export const updateGoogleConsent = (): void => {
  if (!analyticsInitialized || typeof window.gtag !== 'function') return;

  const consentMode = getGoogleConsentMode();
  window.gtag('consent', 'update', consentMode);
};

/**
 * Update consent for Microsoft Clarity
 */
export const updateClarityConsent = (): void => {
  if (!clarityInitialized || typeof window.clarity !== 'function') return;

  const hasAnalyticsConsent = hasConsent('analytics');

  // Clarity consent API
  if (hasAnalyticsConsent) {
    window.clarity('consent');
  } else {
    // Disable Clarity tracking
    window.clarity('stop');
  }
};

/**
 * Check if analytics are available and consent is given
 */
export const isAnalyticsAvailable = (): boolean => {
  return typeof window !== 'undefined' &&
         typeof window.gtag === 'function' &&
         hasConsent('analytics');
};

export const isClarityAvailable = (): boolean => {
  return typeof window !== 'undefined' &&
         typeof window.clarity === 'function' &&
         hasConsent('analytics');
};

/**
 * Generic event tracking
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  customParameters?: Record<string, any>
): void => {
  if (!isAnalyticsAvailable()) return;

  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParameters
    });
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
};

/**
 * Page view tracking
 */
export const trackPageView = (
  page_title: string,
  page_location: string,
  page_path?: string
): void => {
  if (!isAnalyticsAvailable()) return;

  try {
    window.gtag('config', GA_TRACKING_ID, {
      page_title,
      page_location,
      page_path: page_path || window.location.pathname
    });
  } catch (error) {
    console.warn('Page view tracking failed:', error);
  }
};

/**
 * Blog-specific event tracking
 */
export const blogAnalytics = {
  // Blog post interactions
  trackBlogPostView: (postSlug: string, postTitle: string, category: string): void => {
    trackEvent('blog_post_view', 'Blog', postSlug, undefined, {
      post_title: postTitle,
      post_category: category,
      content_type: 'blog_post'
    });

    // Clarity custom event
    if (isClarityAvailable()) {
      window.clarity('event', 'blog_post_view', {
        post_slug: postSlug,
        post_title: postTitle,
        post_category: category
      });
    }
  },

  trackBlogPostRead: (postSlug: string, readPercentage: number, timeSpent: number): void => {
    trackEvent('blog_post_read', 'Blog', postSlug, readPercentage, {
      read_percentage: readPercentage,
      time_spent_seconds: timeSpent,
      engagement_level: readPercentage > 75 ? 'high' : readPercentage > 25 ? 'medium' : 'low'
    });
  },

  // Table of Contents interactions
  trackTOCClick: (postSlug: string, sectionTitle: string, sectionIndex: number): void => {
    trackEvent('toc_click', 'Blog Navigation', `${postSlug}:${sectionTitle}`, sectionIndex, {
      post_slug: postSlug,
      section_title: sectionTitle,
      section_index: sectionIndex
    });
  },

  // Search interactions
  trackBlogSearch: (searchQuery: string, resultsCount: number): void => {
    trackEvent('blog_search', 'Blog', searchQuery, resultsCount, {
      search_query: searchQuery,
      results_count: resultsCount
    });
  },

  trackBlogSearchClick: (searchQuery: string, clickedPostSlug: string, position: number): void => {
    trackEvent('blog_search_click', 'Blog', `${searchQuery}:${clickedPostSlug}`, position, {
      search_query: searchQuery,
      clicked_post: clickedPostSlug,
      click_position: position
    });
  },

  // Category and tag filtering
  trackCategoryFilter: (category: string, postsCount: number): void => {
    trackEvent('category_filter', 'Blog', category, postsCount, {
      filter_type: 'category',
      filter_value: category,
      results_count: postsCount
    });
  },

  trackTagFilter: (tag: string, postsCount: number): void => {
    trackEvent('tag_filter', 'Blog', tag, postsCount, {
      filter_type: 'tag',
      filter_value: tag,
      results_count: postsCount
    });
  },

  // Related content clicks
  trackRelatedPostClick: (fromPostSlug: string, toPostSlug: string, position: number): void => {
    trackEvent('related_post_click', 'Blog', `${fromPostSlug}:${toPostSlug}`, position, {
      from_post: fromPostSlug,
      to_post: toPostSlug,
      click_position: position
    });
  },

  trackRelatedCalculatorClick: (fromPostSlug: string, calculatorHref: string, calculatorTitle: string): void => {
    trackEvent('related_calculator_click', 'Blog to Calculator', calculatorHref, undefined, {
      from_post: fromPostSlug,
      calculator_href: calculatorHref,
      calculator_title: calculatorTitle,
      conversion_type: 'blog_to_calculator'
    });
  }
};

/**
 * Calculator-specific event tracking
 */
export const calculatorAnalytics = {
  trackCalculatorUse: (calculatorType: string, inputValues: Record<string, any>): void => {
    trackEvent('calculator_use', 'Calculator', calculatorType, undefined, {
      calculator_type: calculatorType,
      input_values: JSON.stringify(inputValues)
    });
  },

  trackCalculatorResult: (calculatorType: string, result: any, inputComplexity: 'simple' | 'medium' | 'complex'): void => {
    trackEvent('calculator_result', 'Calculator', calculatorType, undefined, {
      calculator_type: calculatorType,
      result_type: typeof result,
      input_complexity: inputComplexity
    });
  },

  trackCalculatorError: (calculatorType: string, errorType: string): void => {
    trackEvent('calculator_error', 'Calculator', `${calculatorType}:${errorType}`, undefined, {
      calculator_type: calculatorType,
      error_type: errorType
    });
  },

  // AI calculator features
  trackAICalculatorUse: (inputText: string, success: boolean): void => {
    trackEvent('ai_calculator_use', 'AI Features', success ? 'success' : 'failure', undefined, {
      input_length: inputText.length,
      success: success,
      feature_type: 'ai_calculation'
    });
  },

  trackVoiceCalculatorUse: (success: boolean, recognizedText?: string): void => {
    trackEvent('voice_calculator_use', 'AI Features', success ? 'success' : 'failure', undefined, {
      success: success,
      recognized_text_length: recognizedText?.length || 0,
      feature_type: 'voice_recognition'
    });
  }
};

/**
 * User engagement tracking
 */
export const engagementAnalytics = {
  trackTimeOnPage: (pageType: string, timeSpent: number): void => {
    trackEvent('time_on_page', 'Engagement', pageType, timeSpent, {
      page_type: pageType,
      time_spent_seconds: timeSpent,
      engagement_level: timeSpent > 300 ? 'high' : timeSpent > 60 ? 'medium' : 'low'
    });
  },

  trackScrollDepth: (pageType: string, scrollPercentage: number): void => {
    // Only track significant scroll milestones
    if ([25, 50, 75, 90, 100].includes(scrollPercentage)) {
      trackEvent('scroll_depth', 'Engagement', pageType, scrollPercentage, {
        page_type: pageType,
        scroll_percentage: scrollPercentage
      });
    }
  },

  trackContactFormSubmit: (formType: string, success: boolean): void => {
    trackEvent('contact_form_submit', 'Contact', formType, success ? 1 : 0, {
      form_type: formType,
      success: success
    });
  }
};

/**
 * Conversion tracking
 */
export const conversionAnalytics = {
  trackCalculatorToCalculator: (fromCalculator: string, toCalculator: string): void => {
    trackEvent('calculator_to_calculator', 'Conversion', `${fromCalculator}:${toCalculator}`, undefined, {
      from_calculator: fromCalculator,
      to_calculator: toCalculator,
      conversion_type: 'cross_calculator'
    });
  },

  trackBlogToCalculator: (fromBlogPost: string, toCalculator: string): void => {
    trackEvent('blog_to_calculator', 'Conversion', `${fromBlogPost}:${toCalculator}`, undefined, {
      from_blog_post: fromBlogPost,
      to_calculator: toCalculator,
      conversion_type: 'blog_to_calculator'
    });
  },

  trackCalculatorToBlog: (fromCalculator: string, toBlogPost: string): void => {
    trackEvent('calculator_to_blog', 'Conversion', `${fromCalculator}:${toBlogPost}`, undefined, {
      from_calculator: fromCalculator,
      to_blog_post: toBlogPost,
      conversion_type: 'calculator_to_blog'
    });
  }
};

/**
 * Performance tracking
 */
export const performanceAnalytics = {
  trackPageLoadTime: (pageType: string, loadTime: number): void => {
    trackEvent('page_load_time', 'Performance', pageType, loadTime, {
      page_type: pageType,
      load_time_ms: loadTime,
      performance_level: loadTime < 1000 ? 'fast' : loadTime < 3000 ? 'medium' : 'slow'
    });
  },

  trackCalculatorPerformance: (calculatorType: string, calculationTime: number): void => {
    trackEvent('calculator_performance', 'Performance', calculatorType, calculationTime, {
      calculator_type: calculatorType,
      calculation_time_ms: calculationTime
    });
  }
};

/**
 * Initialize analytics tracking with consent
 */
export const initializeAnalytics = (): void => {
  if (typeof window === 'undefined') return;

  // Initialize analytics if consent is given
  if (hasConsent('analytics')) {
    initializeGoogleAnalytics();
    initializeMicrosoftClarity();
  }

  // Listen for consent changes
  window.addEventListener('cookieConsentChanged', (event: any) => {
    const { consent } = event.detail;

    if (consent.analytics) {
      // Initialize analytics if not already done
      if (!analyticsInitialized) {
        initializeGoogleAnalytics();
      }
      if (!clarityInitialized) {
        initializeMicrosoftClarity();
      }

      // Update consent
      updateGoogleConsent();
      updateClarityConsent();
    } else {
      // Update consent to deny
      updateGoogleConsent();
      updateClarityConsent();
    }
  });

  // Track initial page load (only if consent given)
  if (hasConsent('analytics')) {
    const loadTime = performance.now();
    const pageType = window.location.pathname.includes('/blog') ? 'blog' :
                    window.location.pathname === '/' ? 'homepage' : 'calculator';

    performanceAnalytics.trackPageLoadTime(pageType, loadTime);

    // Track scroll depth
    let maxScrollPercentage = 0;
    const trackScroll = () => {
      if (!hasConsent('analytics')) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercentage > maxScrollPercentage) {
        maxScrollPercentage = scrollPercentage;
        engagementAnalytics.trackScrollDepth(pageType, scrollPercentage);
      }
    };

    window.addEventListener('scroll', trackScroll, { passive: true });

    // Track time on page when user leaves
    let startTime = Date.now();
    const trackTimeOnPage = () => {
      if (!hasConsent('analytics')) return;

      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      engagementAnalytics.trackTimeOnPage(pageType, timeSpent);
    };

    window.addEventListener('beforeunload', trackTimeOnPage);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        trackTimeOnPage();
        startTime = Date.now(); // Reset for when they come back
      }
    });
  }
};
