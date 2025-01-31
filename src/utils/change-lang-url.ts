export function changeLangUrl(
  lang: string,
  url: URL
) {
  const [base, lastLang, ...rest] = url.pathname.split('/');
  const path = [base, lang, ...rest].join('/');
  return new URL(path, url.origin)
}