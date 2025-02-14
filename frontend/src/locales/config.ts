import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './@types/resources';

i18next.use(initReactI18next).init({
  lng: 'ru',
  fallbackLng: 'en',
  debug: true,
  resources
});
