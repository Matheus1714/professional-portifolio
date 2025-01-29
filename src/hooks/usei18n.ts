export const languages = ['en', 'pt'];
export const defaultLanguage = 'en';

import translations from '@/i18n/translations.json';

function getLanguage() {
  if (typeof window === 'undefined') return defaultLanguage;
  const url = new URL(window.location.href);
  const paths = url.pathname.split('/');
  return languages.includes(paths?.[1]) ? paths[1] : defaultLanguage;
}

export function usei18n() {
  const lang = getLanguage();

  return {
    lang,
    t: (key: string) => {
      return key.split('.').reduce((o, i) => o?.[i], translations[lang]) || key;
    }
  }
}