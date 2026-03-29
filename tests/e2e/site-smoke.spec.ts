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
  await expect(page.getByRole('heading', { name: '次の一冊をひらく前に、言葉の余韻をひとくち。' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'まずは、この一冊から。' })).toBeVisible();
  await expect(page.locator('#review-stream')).toBeVisible();
});

test('primary navigation reaches reviews and videos without layout breakage', async ({ page }) => {
  await page.goto(SITE_BASE);

  const primaryNav = page.getByRole('navigation', { name: 'Primary' });

  await primaryNav.getByRole('link', { name: 'Reviews', exact: true }).click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/reviews\/$/);
  await expect(page.getByRole('heading', { name: '次の一冊をひらく前に、言葉の余韻をひとくち。' })).toBeVisible();

  await primaryNav.getByRole('link', { name: 'Videos', exact: true }).click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/videos\/$/);
  await expect(page.getByRole('heading', { name: 'Videos' })).toBeVisible();

  await expectNoHorizontalOverflow(page);
});

test('review detail keeps the reading flow and afterglow link intact', async ({ page }) => {
  await page.goto(`${SITE_BASE}reviews/seiten/`);

  await expect(page.locator('#review-title')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'ページに入る前の、短い手がかり。' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'ことばの散歩道' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '言葉を読み終えたあと、景色のほうへ。' })).toBeVisible();
  await expect(page.getByText('「青天」とはアメフト用語で')).toBeVisible();

  await expectNoHorizontalOverflow(page);

  const galleryBridgeLink = page.getByRole('link', { name: 'この本から広がる景色へ' });
  await expect(galleryBridgeLink).toBeVisible();
  await galleryBridgeLink.click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/gallery\/novel-seiten\/$/);
  await expect(page.getByRole('heading', { name: '青天', exact: true }).first()).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test('about page remains readable on small and large viewports', async ({ page }) => {
  await page.goto(`${SITE_BASE}about/`);

  await expect(page.getByRole('heading', { name: '本を閉じたあとも、ココちゃんと世界はつづいていく。' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '本 × ココちゃん × 学び は、余韻のなかでゆっくり交わる。' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'レビューを見る', exact: true }).first()).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
