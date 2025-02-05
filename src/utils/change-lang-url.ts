import { defaultLang } from "@/hooks/use-translations";

export function changeLangUrl(
  lang: string,
  url: URL
) {
  const [base, _, ...rest] = url.pathname.split('/');
  const path = lang === defaultLang ? [base, ...rest].join('/') : [base, lang, ...rest].join('/');
  return new URL(path, url.origin)
}