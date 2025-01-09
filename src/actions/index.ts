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

export const actions = {
    getLatestVersion: async () => {
        const response = await fetch('/api/latest-version');
        if (!response.ok) return { version: '' };
        return await response.json() as { version: string };
    },
    getBooks: async () => {
        const response = await fetch('http://localhost:4321/api/books');
        if (!response.ok) return [];
        return await response.json() as Book[];
    },
};
