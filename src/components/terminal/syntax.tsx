import type { ReactNode } from 'react';

interface Syntax {
    [key: string]: {
        transform: (text: string) => ReactNode;
        isPattern: (text: string) => boolean;
    }
}

export const patternMap = {
    link: /\[([^\]]+)\]\(([^)]+)\)/,
    strong: /\*\*([^*]+)\*\*/,
    mark: /`([^`]+)`/,
    italic: /_([^_]+)_/,
    keyword: /\(([^)]+)\)/,
};

export const syntax: Syntax = {
    link: {
        transform: (text: string) => {
            const match = text.match(patternMap.link);

            if (match) {
                const [, linkText, linkHref] = match;
                return <a href={linkHref} target="_blank" className="text-primary hover:text-secondary">{linkText}</a>;
            }

            return text;
        },
        isPattern: (text: string) => patternMap.link.test(text),
    },
    strong: {
        transform: (text: string) => {
            const match = text.match(patternMap.strong);

            if (match) {
                const [, strongText] = match;
                return <span className="text-primary">{strongText}</span>;
            }

            return text;
        },
        isPattern: (text: string) => patternMap.strong.test(text),
    },
    mark: {
        transform: (text: string) => {
            const match = text.match(patternMap.mark);

            if (match) {
                const [, markText] = match;
                return <mark className="bg-highlight">{markText}</mark>;
            }

            return text;
        },
        isPattern: (text: string) => patternMap.mark.test(text),
    },
    italic: {
        transform: (text: string) => {
            const match = text.match(patternMap.italic);

            if (match) {
                const [, italicText] = match;
                return <em>{italicText}</em>;
            }

            return text;
        },
        isPattern: (text: string) => patternMap.italic.test(text),
    },
};
