import { expect, test, type Page } from '@playwright/test';

const SITE_BASE = '/codex-coco-s-site/';

const expectNoHorizontalOverflow = async (page: Page) => {
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 4;
  });

  expect(hasOverflow).toBe(false);
};

test('home first viewport shows brand and review-led hero CTA flow', async ({ page }) => {
  await page.goto(SITE_BASE);

  const hero = page.locator('.hero');

  await expect(page.getByRole('link', { name: '読書 with Coco' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '読書で生まれた世界を、ココちゃんが旅する。' })).toBeVisible();
  await expect(hero.getByRole('link', { name: 'レビューを見る', exact: true })).toBeVisible();
  await expect(hero.getByRole('link', { name: 'ギャラリーを見る', exact: true })).toBeVisible();

  await expectNoHorizontalOverflow(page);

  await hero.getByRole('link', { name: 'レビューを見る', exact: true }).click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/reviews\/$/);
  await expect(page.getByRole('heading', { name: 'Reviews' })).toBeVisible();
});

test('primary navigation reaches reviews and videos without layout breakage', async ({ page }) => {
  await page.goto(SITE_BASE);

  const primaryNav = page.getByRole('navigation', { name: 'Primary' });

  await primaryNav.getByRole('link', { name: 'Reviews', exact: true }).click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/reviews\/$/);
  await expect(page.getByRole('heading', { name: 'Reviews' })).toBeVisible();

  await primaryNav.getByRole('link', { name: 'Videos', exact: true }).click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/videos\/$/);
  await expect(page.getByRole('heading', { name: 'Videos' })).toBeVisible();

  await expectNoHorizontalOverflow(page);
});

test('about page remains readable on small and large viewports', async ({ page }) => {
  await page.goto(`${SITE_BASE}about/`);

  await expect(page.getByRole('heading', { name: 'ココちゃんと、本の余韻をもう一度ひらく場所。' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '3つの入り口' })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
