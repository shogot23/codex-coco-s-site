import { expect, test } from '@playwright/test';

const SITE_BASE = '/codex-coco-s-site/';

const expectNoHorizontalOverflow = async (page: import('@playwright/test').Page) => {
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 4)
    )
    .toBe(true);
};

test('gallery SSR keeps the first shelf small and omits a hidden image grid', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto(`${SITE_BASE}gallery/`);

  const imageCount = await page.locator('img').count();
  expect(imageCount).toBeGreaterThan(0);
  expect(imageCount).toBeLessThanOrEqual(15);
  await expect(page.locator('[data-browse-panel="grid"] img')).toHaveCount(0);

  await context.close();
});

test('gallery browse progressively reveals its shelf and preserves browser state', async ({ page, isMobile }) => {
  await page.goto(`${SITE_BASE}gallery/`);

  const browse = page.getByTestId('gallery-browse');
  const controls = page.locator('[data-gallery-controls]');

  await expect(controls).toBeVisible();
  await expect(browse.locator('[data-browse-panel="grid"] img')).toHaveCount(0);
  await expect(browse.locator('[data-gallery-piece] img')).toHaveCount(isMobile ? 12 : 15);

  const viewSwitch = page.locator('.view-switch');
  await viewSwitch.getByRole('button', { name: '章で見る' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(viewSwitch.getByRole('button', { name: '一覧で見る' })).toBeFocused();

  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: '一覧で見る', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(browse.locator('[data-grid-card]')).toHaveCount(12);
  await expect(page.getByRole('button', { name: /さらに.*作品を見る/ })).toBeVisible();

  await page.getByRole('button', { name: /さらに.*作品を見る/ }).click();
  await expect(browse.locator('[data-grid-card]')).toHaveCount(24);

  const business = page.getByRole('button', { name: 'ビジネス', exact: true });
  await business.click();
  await expect(business).toBeFocused();
  await expect(page).toHaveURL(/\?view=grid&genre=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9/);
  await expect(page.locator('[data-browse-status]')).toHaveText('ビジネスの景色を一覧で比べながら探す');

  await page.goBack();
  await expect(page.getByRole('button', { name: 'すべて', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: '一覧で見る', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('gallery controls stay inside 360 and 390 pixel mobile viewports', async ({ page }) => {
  for (const width of [360, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(`${SITE_BASE}gallery/`);
    await expectNoHorizontalOverflow(page);

    const browse = page.getByTestId('gallery-browse');
    await browse.getByRole('button', { name: '一覧で見る', exact: true }).click();
    await expectNoHorizontalOverflow(page);
    await expect(browse.locator('[data-grid-card]').first()).toBeVisible();
  }
});

test('gallery browsing respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`${SITE_BASE}gallery/`);

  const duration = await page.getByRole('button', { name: '一覧で見る', exact: true }).evaluate((element) =>
    getComputedStyle(element).transitionDuration
  );

  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.01);
});
