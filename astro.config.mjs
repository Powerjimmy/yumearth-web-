// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // SSR for API routes (contact form)
  output: 'server',

  site: 'https://yumearth.eu',

  trailingSlash: 'always',

  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/legal-notice') &&
        !page.includes('/privacy-policy'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
});