import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationCs from './locales/cs/translation.js';  // Use .js instead of .json


const resources = {
  cs: {
    translation: translationCs,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'cs', // default language
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
  });

export default i18n;
