// Google Analytics 4 (GA4) integration for CutMatch
import { Platform } from 'react-native';

// Configuration - replace with your actual GA4 measurement ID
const GA4_MEASUREMENT_ID = process.env.EXPO_PUBLIC_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX';
const GA4_API_SECRET = process.env.EXPO_PUBLIC_GA4_API_SECRET || 'your-api-secret';

// Analytics configuration
const ANALYTICS_CONFIG = {
  enabled: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS !== 'false',
  debug: __DEV__,
};

// Generate a unique client ID for this app installation
let clientId = null;

const generateClientId = async () => {
  if (clientId) return clientId;
  
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const storedClientId = await AsyncStorage.getItem('ga4_client_id');
    
    if (storedClientId) {
      clientId = storedClientId;
    } else {
      // Generate a new client ID
      clientId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await AsyncStorage.setItem('ga4_client_id', clientId);
    }
    
    return clientId;
  } catch (error) {
    console.warn('Error generating client ID:', error);
    // Fallback to session-based client ID
    clientId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return clientId;
  }
};

// Send event to GA4 Measurement Protocol
const sendGA4Event = async (eventName, parameters = {}) => {
  if (!ANALYTICS_CONFIG.enabled) {
    if (ANALYTICS_CONFIG.debug) {
      console.log('[Analytics] Event (disabled):', eventName, parameters);
    }
    return;
  }

  try {
    const client_id = await generateClientId();
    
    const payload = {
      client_id,
      events: [
        {
          name: eventName,
          params: {
            ...parameters,
            platform: Platform.OS,
            app_version: '1.0.0',
            timestamp_micros: Date.now() * 1000,
            engagement_time_msec: parameters.engagement_time_msec || 1000,
          },
        },
      ],
    };

    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (ANALYTICS_CONFIG.debug) {
      console.log('[Analytics] Event sent:', eventName, parameters, response.status);
    }

    if (!response.ok) {
      console.warn('GA4 event failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.warn('Error sending GA4 event:', error);
  }
};

// Analytics helper functions for CutMatch events

export const Analytics = {
  // App lifecycle events
  appLaunched: () => {
    sendGA4Event('app_open', {
      engagement_time_msec: 1,
    });
  },

  // Screen view tracking
  trackScreenView: (screenName, screenClass = null) => {
    sendGA4Event('screen_view', {
      screen_name: screenName,
      screen_class: screenClass || screenName,
      engagement_time_msec: 1000,
    });
  },

  // Photo upload and analysis events
  photoUploaded: (source) => {
    sendGA4Event('photo_uploaded', {
      photo_source: source, // 'camera' or 'gallery'
    });
  },

  analysisStarted: (photoSource) => {
    sendGA4Event('analysis_started', {
      photo_source: photoSource,
    });
  },

  analysisCompleted: (duration, suggestionsCount) => {
    sendGA4Event('analysis_completed', {
      analysis_duration: duration,
      suggestions_count: suggestionsCount,
    });
  },

  // Style interaction events
  styleViewed: (styleId, styleName, confidence) => {
    sendGA4Event('style_viewed', {
      style_id: styleId,
      style_name: styleName,
      confidence_score: confidence,
    });
  },

  styleFavorited: (styleId, styleName) => {
    sendGA4Event('style_favorited', {
      style_id: styleId,
      style_name: styleName,
    });
  },

  styleUnfavorited: (styleId, styleName) => {
    sendGA4Event('style_unfavorited', {
      style_id: styleId,
      style_name: styleName,
    });
  },

  styleShared: (styleId, styleName, shareMethod) => {
    sendGA4Event('share', {
      content_type: 'hairstyle',
      item_id: styleId,
      style_name: styleName,
      method: shareMethod, // 'link', 'qr_code', 'social'
    });
  },

  // Filter and search events
  filtersApplied: (filters) => {
    sendGA4Event('filters_applied', {
      mood: filters.mood || 'none',
      event: filters.event || 'none',
      season: filters.season || 'none',
      hair_type: filters.hairType || 'none',
    });
  },

  searchPerformed: (query, resultsCount) => {
    sendGA4Event('search', {
      search_term: query,
      results_count: resultsCount,
    });
  },

  // User profile events
  profileUpdated: (changes) => {
    sendGA4Event('profile_updated', {
      fields_changed: Object.keys(changes).join(','),
    });
  },

  languageChanged: (fromLanguage, toLanguage) => {
    sendGA4Event('language_changed', {
      from_language: fromLanguage,
      to_language: toLanguage,
    });
  },

  // Engagement events
  sessionStarted: () => {
    sendGA4Event('session_start', {
      engagement_time_msec: 1,
    });
  },

  screenViewed: (screenName, timeSpent) => {
    sendGA4Event('screen_view', {
      screen_name: screenName,
      time_spent: timeSpent,
    });
  },

  // Error events
  errorOccurred: (errorType, errorMessage, screen) => {
    sendGA4Event('exception', {
      description: `${errorType}: ${errorMessage}`,
      fatal: false,
      screen_name: screen,
    });
  },

  // Custom events for CutMatch specific features
  pricingViewed: (styleId) => {
    sendGA4Event('pricing_viewed', {
      style_id: styleId,
    });
  },

  salonContactAttempted: (method) => {
    sendGA4Event('salon_contact_attempted', {
      contact_method: method, // 'phone', 'website', 'directions'
    });
  },

  affirmationViewed: (affirmationType) => {
    sendGA4Event('affirmation_viewed', {
      affirmation_type: affirmationType,
    });
  },

  // Conversion events
  userSignedUp: (method) => {
    sendGA4Event('sign_up', {
      method: method, // 'email', 'google', 'apple'
    });
  },

  userLoggedIn: (method) => {
    sendGA4Event('login', {
      method: method,
    });
  },

  // Helper function to track custom events
  trackCustomEvent: (eventName, parameters = {}) => {
    sendGA4Event(eventName, parameters);
  },

  // Action tracking methods
  trackEvent: (eventName, parameters = {}) => {
    sendGA4Event(eventName, parameters);
  },

  trackAction: (actionName, actionData = {}) => {
    sendGA4Event('user_action', {
      action_name: actionName,
      ...actionData,
    });
  },

  // Button and interaction tracking
  trackButtonPress: (buttonName, screenName) => {
    sendGA4Event('button_press', {
      button_name: buttonName,
      screen_name: screenName,
    });
  },

  trackNavigation: (fromScreen, toScreen) => {
    sendGA4Event('navigation', {
      from_screen: fromScreen,
      to_screen: toScreen,
    });
  },

  // Feature usage tracking
  trackFeatureUsage: (featureName, featureData = {}) => {
    sendGA4Event('feature_usage', {
      feature_name: featureName,
      ...featureData,
    });
  },
};

// Initialize analytics when the module is imported
if (ANALYTICS_CONFIG.enabled) {
  Analytics.appLaunched();
}

export default Analytics;

