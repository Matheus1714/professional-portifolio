export function formatDate(datetime: string, locale = "en-US"){
    const date = new Date(datetime);
    return date.toLocaleDateString(locale);
}