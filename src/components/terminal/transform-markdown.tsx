import React from 'react';
import { patternMap, syntax } from './syntax';

export function transformMarkdown(text: string) {
    const parts: React.ReactNode[] = [];
    let remainingText = text;

    while (remainingText) {
        let matched = false;

        for (const key in syntax) {
            const { isPattern, transform } = syntax[key];
            if (isPattern(remainingText)) {
                const match = remainingText.match(patternMap[key]);
                if (match) {
                    const [matchedText] = match;

                    const index = remainingText.indexOf(matchedText);
                    if (index > 0) {
                        parts.push(remainingText.slice(0, index));
                    }

                    parts.push(transform(matchedText));

                    remainingText = remainingText.slice(index + matchedText.length);
                    matched = true;
                    break;
                }
            }
        }

        if (!matched) {
            parts.push(remainingText);
            break;
        }
    }

    return parts;
};
