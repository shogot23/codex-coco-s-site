import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, readdirSync } from 'node:fs';
const base = '/codex-coco-s-site/';
const preview = process.env.WORKS_PREVIEW === '1';
const items = readdirSync('src/content/works').filter((name) => name.endsWith('.md')).map((name) => {
  const text = readFileSync(`src/content/works/${name}`, 'utf8');
  const header = text.split('---')[1];
  const field = (key: string) => {
    const match = header.match(new RegExp(`^${key}: (.+)$`, 'm'));
    if (!match) throw new Error(`${name}: missing ${key}`);
    return JSON.parse(match[1]);
  };
  return { slug: name.slice(0, -3), review: field('relatedReview'), title: field('title'), book: field('bookTitle'), published: field('published') === true, steps: (text.match(/^\d+\. /gm) ?? []).length };
});
const visibleItems = items.filter((item) => preview || item.published);

test('works visibility matches preview mode', async ({ page }) => {
  await page.goto(`${base}works/`);
  await expect(page).toHaveTitle('ワーク | 読書 with Coco');
  await expect(page.locator('.work-entry')).toHaveCount(visibleItems.length);
  if (visibleItems.length === 0) {
    await expect(page.getByText('ワークはただいま準備中です。', { exact: false })).toBeVisible();
    await page.goto(`${base}reviews/seiten/`);
    await expect(page.getByRole('heading', { name: 'この本から試せるワーク' })).toHaveCount(0);
  }
  if (!preview) {
    for (const { slug } of items.filter((item) => !item.published)) {
      expect((await page.request.get(`${base}works/${slug}/`)).status()).toBe(404);
      expect((await page.request.get(`${base}works/media/${slug}/480.webp`)).status()).toBe(404);
    }
  } else {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect.poll(() => page.locator('.work-entry img').evaluateAll((images) => images.every((img) => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0))).toBe(true);
    expect((await new AxeBuilder({ page }).include('.works-shell').analyze()).violations).toEqual([]);
    await page.screenshot({ path: `test-results/works-list-${test.info().project.name}.png`, fullPage: true });
    await page.goto(base);
    await page.getByRole('link', { name: '今日のワークを選ぶ' }).click();
    await expect(page).toHaveURL(new RegExp('/works/$'));
  }
});

for (const { slug, review, title, book, published, steps } of items) test(`work and book round trip: ${slug}`, async ({ page }) => {
  test.skip(!preview && !published, 'Drafts are only available in explicit local preview');
  await page.goto(`${base}works/`);
  await page.getByRole('heading', { name: title, exact: true }).getByRole('link').click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  const picture = page.locator('.work-opening img');
  await expect(picture).toBeVisible();
  await expect.poll(() => picture.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  expect(await picture.getAttribute('alt')).toBeTruthy();
  const box = await picture.boundingBox();
  expect(box!.width / box!.height).toBeCloseTo(.8, 2);
  await page.getByRole('link', { name: '手順へ進む' }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#steps$/);
  await expect(page.locator('#steps ol li')).toHaveCount(steps);
  await expect(page.getByText('この短縮ワーク自体は未検証です。変化を保証するものではありません。')).toBeVisible();
  const bookSection = page.getByRole('region', { name: 'このワークにつながる本' });
  const expectedGallery = ({
    'seiten-kind-voice': 'novel-seiten',
    'happiness-three-things': 'psychology-eaa988',
    'third-party-note': 'nonfiction-watashi-ga-machigatteru',
  } as Record<string, string>)[slug];
  if (expectedGallery) {
    const galleryLink = bookSection.locator(`a[href="${base}gallery/${expectedGallery}/"]`);
    await expect(galleryLink).toBeVisible();
    await galleryLink.click();
    await expect(page).toHaveURL(`${base}gallery/${expectedGallery}/`);
    await page.goBack();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  }
  const purchaseLinks = bookSection.locator('a[href^="https://af.moshimo.com/"]');
  const expectedPurchaseUrls = [...readFileSync(`src/content/reviews/${review}.md`, 'utf8').matchAll(/^\s+url: "(https:\/\/af\.moshimo\.com\/[^"]+)"$/gm)].map((match) => match[1]);
  const actualPurchaseUrls = await purchaseLinks.evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href));
  expect(expectedPurchaseUrls.length).toBeGreaterThan(0);
  for (const url of expectedPurchaseUrls) expect(actualPurchaseUrls).toContain(url);
  expect(new Set(actualPurchaseUrls).size).toBe(actualPurchaseUrls.length);
  for (const link of await purchaseLinks.all()) {
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'sponsored nofollow noopener noreferrer');
  }
  if (actualPurchaseUrls.length) await expect(bookSection.getByText('購入先へのリンクには、もしもアフィリエイトを利用しています。')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2)).toBe(true);
  const audit = await new AxeBuilder({ page }).include('.works-shell').analyze();
  expect(audit.violations).toEqual([]);
  await page.screenshot({ path: `test-results/works-${slug}-${test.info().project.name}.png`, fullPage: true });
  await page.getByRole('link', { name: `『${book}』のレビューを読む` }).click();
  await expect(page).toHaveURL(new RegExp(`/reviews/${review}/$`));
  await page.getByRole('link', { name: title, exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
});
