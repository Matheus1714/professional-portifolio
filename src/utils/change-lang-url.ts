export function changeLangUrl(
  lang: string,
  url: URL
) {
  const [base, _, ...rest] = url.pathname.split('/');
  const path = [base, lang, ...rest].join('/');
  return new URL(path, url.origin)
}