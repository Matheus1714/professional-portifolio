export const actions = {
    getLatestVersion: async () => {
        const response = await fetch('/api/latest-version');
        if (!response.ok) return { version: '' };
        return await response.json() as { version: string };
    },
};
