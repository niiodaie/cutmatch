import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform } from 'react-native';

// Import translation files
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import sw from '../locales/sw.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  sw: { translation: sw },
};

// Get device language with fallback - web-safe version
const getDeviceLanguage = () => {
  try {
    let languageCode = 'en'; // Default fallback
    
    if (Platform.OS === 'web') {
      // Web-specific language detection
      languageCode = navigator.language || navigator.userLanguage || 'en';
      languageCode = languageCode.split('-')[0].toLowerCase();
    } else {
      // React Native - dynamically import expo-localization
      try {
        const Localization = require('expo-localization');
        const locale = Localization.locale || Localization.getLocales()[0]?.languageCode || 'en';
        languageCode = locale.split('-')[0].toLowerCase();
      } catch (error) {
        console.warn('Expo Localization not available:', error);
        languageCode = 'en';
      }
    }
    
    // Check if we support this language
    if (resources[languageCode]) {
      return languageCode;
    }
    
    // Fallback to English
    return 'en';
  } catch (error) {
    console.warn('Error detecting device language:', error);
    return 'en';
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    react: {
      useSuspense: false, // Disable suspense for React Native and web
    },
    
    // Add debug mode for development
    debug: __DEV__ && Platform.OS !== 'web', // Disable debug on web to reduce console noise
    
    // Ensure initialization doesn't fail
    initImmediate: false,
    
    // Add load path for web compatibility
    load: 'languageOnly',
    
    // Ensure consistent behavior across platforms
    cleanCode: true,
    
    // Handle missing keys gracefully
    saveMissing: false,
    missingKeyHandler: (lng, ns, key) => {
      console.warn(`Missing translation key: ${key} for language: ${lng}`);
      return key; // Return the key itself as fallback
    },
  });

export default i18n;

