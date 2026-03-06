// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://shogot23.github.io',
  base: '/codex-coco-s-site/',
  integrations: [sitemap()],
  image: {
    // Remote image optimization service
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
