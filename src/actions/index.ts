export type Status = 'reading' | 'stopped' | 'standby' | 'done';

export interface Book {
    id: string;
    title: string;
    description: string;
    pages: string;
    currentPage: number;
    percentage: number;
    status: Status;
    link: string;
};

export interface EmailOptions {
    from: string;
    to: string;
    cc: string;
    subject: string;
    text: string;
    html?: string;
};

export const prerender = false;

export const actions = {
    getLatestVersion: async () => {
        const response = await fetch(`/api/latest-version`);
        if (!response.ok) return { version: '' };
        return await response.json() as { version: string };
    },
    getBooks: async () => {
        const response = await fetch(`/api/books`);
        if (!response.ok) return [];
        return await response.json() as Book[];
    },
    sendEmail: async (options: EmailOptions) => {
        await fetch(import.meta.env.PUBLIC_API_EMAIL_SERVICE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options),
        });
    }
};
