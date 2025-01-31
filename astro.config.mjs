import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

import fs from 'fs';
import path from 'path';

const languages = ['en', 'pt'];
const i18nPath = './src/i18n';

const translations = {};

for (const lang of languages) {
  const langPath = path.join(i18nPath, lang);
  const files = fs.readdirSync(langPath);

  translations[lang] = files.reduce((acc, file) => {
    const filePath = path.join(langPath, file);
    const key = path.basename(file, '.json');
    acc[key] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return acc;
  }, {});
}

const outputPath = path.join(i18nPath, 'translations.json');
fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2));

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [tailwind(), icon(), mdx(), react()],
  optimizeDeps: {
    include: ['react-compiler-runtime']
  },
  i18n: {
    defaultLocale: 'en',
    locales: languages,
    routing: {
      prefixDefaultLocale: true,
    }
  }
});