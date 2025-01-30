export const languages = ['en', 'pt'];
export const defaultLang = 'en';

import { en, pt } from '@/i18n/translations.json';

export function useTranslations(lang: string = defaultLang) {
  return (key: string) => {
    return key.split('.').reduce((o, i) => o?.[i], lang === 'en' ? en : pt) || key;
  };
}
