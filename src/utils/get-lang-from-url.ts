import { defaultLang, languages } from "@/hooks/use-translations";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (languages.includes(lang)) return lang;
  return defaultLang;
}