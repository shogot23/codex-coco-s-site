import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const SITE_BASE = '/codex-coco-s-site/';

const assertNoSeriousA11yViolations = async (pagePath: string, page: import('@playwright/test').Page) => {
  await page.goto(`${SITE_BASE}${pagePath}`);
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  const serious = results.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact ?? ''));
  expect(serious, `${pagePath} has serious or critical accessibility violations`).toEqual([]);
};

test('public pages provide the technical discovery metadata', async ({ page }) => {
  await page.goto(SITE_BASE);

  await expect(page.locator('link[rel="alternate"][type="application/rss+xml"]')).toHaveCount(1);
  await expect(page.locator('link[rel="icon"][href$="favicon.svg"]')).toHaveCount(1);
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
  await expect(page.locator('meta[name="theme-color"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:image:width"][content="1200"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:image:height"][content="630"]')).toHaveCount(1);
});

test('review and gallery details expose structured data and responsive media', async ({ page }) => {
  await page.goto(`${SITE_BASE}reviews/seiten/`);
  const reviewSchema = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(reviewSchema.join('\n')).toContain('"Review"');
  expect(reviewSchema.join('\n')).toContain('"Book"');
  expect(reviewSchema.join('\n')).toContain('"BreadcrumbList"');
  expect(await page.locator('picture source[type="image/avif"]').count()).toBeGreaterThan(0);

  await page.goto(`${SITE_BASE}gallery/business-0d597c/`);
  const gallerySchema = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(gallerySchema.join('\n')).toContain('"CreativeWork"');
  expect(gallerySchema.join('\n')).toContain('"BreadcrumbList"');
});

test('key public and error pages have no serious or critical axe violations', async ({ page }) => {
  for (const pagePath of ['', 'reviews/', 'reviews/seiten/', 'gallery/', 'gallery/business-0d597c/', 'about/', 'videos/']) {
    await assertNoSeriousA11yViolations(pagePath, page);
  }
});
