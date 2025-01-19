import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import node from '@astrojs/node'

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [tailwind(), icon(), mdx(), react()],
  optimizeDeps: {
    include: ['react-compiler-runtime']
  },
  output: 'server',
  adapter: node({
    mode: "middleware"
  }),
});