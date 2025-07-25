import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Import translation files
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import es from '../locales/es.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es },
};

// Get device language
const getDeviceLanguage = () => {
  const locale = Localization.locale;
  if (locale.startsWith('fr')) return 'fr';
  if (locale.startsWith('es')) return 'es';
  return 'en'; // Default to English
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

