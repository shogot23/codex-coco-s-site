// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

/** @param {string} relativePath */
const explicitUpdatedAt = (relativePath) => {
  const source = readFileSync(new URL(relativePath, import.meta.url), 'utf8');
  const match = source.match(/^updatedAt:\s*["']?(\d{4}-\d{2}-\d{2})["']?\s*$/mu);
  return match?.[1];
};

const sitemapLastmodBySuffix = new Map([
  ['/about/', explicitUpdatedAt('./src/content/about/about.md')],
  ['/profile/', explicitUpdatedAt('./src/content/profile/profile.md')],
]);

export default defineConfig({
  site: process.env.ASTRO_SITE || 'https://shogot23.github.io',
  base: process.env.ASTRO_BASE || '/codex-coco-s-site/',
  integrations: [sitemap({
    serialize(item) {
      const pathname = new URL(item.url).pathname;
      const match = [...sitemapLastmodBySuffix.entries()].find(([suffix]) => pathname.endsWith(suffix));
      return match?.[1] ? { ...item, lastmod: match[1] } : item;
    },
  })],
  image: {
    // Remote image optimization service
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
