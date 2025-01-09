export type Status = 'reading' | 'stopped' | 'standby' | 'done';

interface Book {
    id: string;
    title: string;
    description: string;
    pages: string;
    currentPage: number;
    percentage: number;
    status: Status;
    link: string;
}

const baseUrl = import.meta.env.PUBLIC_BASE_URL;

export const actions = {
    getLatestVersion: async () => {
        const response = await fetch(`${baseUrl}/api/latest-version`);
        if (!response.ok) return { version: '' };
        return await response.json() as { version: string };
    },
    getBooks: async () => {
        const response = await fetch(`${baseUrl}/api/books`);
        if (!response.ok) return [];
        return await response.json() as Book[];
    },
};
