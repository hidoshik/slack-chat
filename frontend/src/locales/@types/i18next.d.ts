import resources from './resources';

type Resources = (typeof resources)['ru'] & (typeof resources)['en'];

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: Resources;
  }
}
