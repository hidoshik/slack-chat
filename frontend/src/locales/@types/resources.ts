import translationRU from '../ru/translationRU.json';
import translationEN from '../en/translationEN.json';

const resources = {
  ru: {
    translation: translationRU
  },
  en: {
    translation: translationEN
  }
} as const;

export default resources;
