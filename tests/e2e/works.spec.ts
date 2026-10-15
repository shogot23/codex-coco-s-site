import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, readdirSync } from 'node:fs';
const base = '/codex-coco-s-site/';
const preview = process.env.WORKS_PREVIEW === '1';
const taxonomy = JSON.parse(readFileSync('src/data/work-taxonomy.json', 'utf8')) as {
  moods: Array<{ id: string; label: string }>;
  concerns: Array<{ id: string; label: string }>;
};
const items = readdirSync('src/content/works').filter((name) => name.endsWith('.md')).map((name) => {
  const text = readFileSync(`src/content/works/${name}`, 'utf8');
  const header = text.split('---')[1];
  const field = (key: string, optional = false) => {
    const match = header.match(new RegExp(`^${key}: (.+)$`, 'm'));
    if (!match && optional) return undefined;
    if (!match) throw new Error(`${name}: missing ${key}`);
    return JSON.parse(match[1]);
  };
  return { slug: name.slice(0, -3), review: field('relatedReview', true), gallery: field('relatedGallery', true), title: field('title'), book: field('bookTitle'), moods: field('moods'), concerns: field('concerns'), published: field('published') === true, steps: (text.match(/^\d+\. /gm) ?? []).length };
});
const visibleItems = items.filter((item) => preview || item.published);

test('work taxonomy covers every work and every option', async () => {
  const moodIds = new Set(taxonomy.moods.map((mood) => mood.id));
  const concernIds = new Set(taxonomy.concerns.map((concern) => concern.id));
  for (const item of items) {
    expect(item.moods.length).toBeGreaterThan(0);
    expect(item.concerns.length).toBeGreaterThan(0);
    expect(item.moods.every((mood: string) => moodIds.has(mood))).toBe(true);
    expect(item.concerns.every((concern: string) => concernIds.has(concern))).toBe(true);
  }
  for (const mood of taxonomy.moods) expect(items.some((item) => item.published && item.moods.includes(mood.id))).toBe(true);
  for (const concern of taxonomy.concerns) expect(items.some((item) => item.published && item.concerns.includes(concern.id))).toBe(true);
});

test('works visibility matches preview mode', async ({ page }) => {
  await page.goto(`${base}works/`);
  await expect(page).toHaveTitle('ワーク | 読書 with Coco');
  await expect(page.locator('.work-entry')).toHaveCount(visibleItems.length);
  await expect(page.locator('.works-heading-cta')).toHaveCount(visibleItems.length > 0 ? 1 : 0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2)).toBe(true);
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
    const listImages = page.locator('.work-entry img');
    for (let index = 0; index < await listImages.count(); index += 1) await listImages.nth(index).scrollIntoViewIfNeeded();
    await expect.poll(() => listImages.evaluateAll((images) => images.every((img) => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0))).toBe(true);
    expect((await new AxeBuilder({ page }).include('.works-shell').analyze()).violations).toEqual([]);
    await page.screenshot({ path: `test-results/works-list-${test.info().project.name}.png`, fullPage: true });
    await page.goto(base);
    await page.getByRole('link', { name: '今日のワークを選ぶ' }).click();
    await expect(page).toHaveURL(new RegExp('/works/$'));
  }
});

test('works landing keeps its social image separate from the intro image', async ({ page }, testInfo) => {
  await page.goto(`${base}works/`);
  const site = process.env.ASTRO_SITE || 'https://shogot23.github.io';
  const socialUrl = new URL(`${base}works/works-social-20260926.jpg`, site).toString();
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', socialUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', socialUrl);
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630');
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute('content', /ココちゃん/);
  const image = page.locator('.works-hero-image');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute('src', `${base}works/works-intro-20260928.jpg`);
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  const mobileViewport = testInfo.project.name === 'mobile-chrome';
  if (mobileViewport) {
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.currentSrc.endsWith('works-intro-20260928-768.jpg'))).toBe(true);
  } else {
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.currentSrc.endsWith('works-intro-20260928-768.jpg') || element.currentSrc.endsWith('works-intro-20260928.jpg'))).toBe(true);
  }
  for (const filename of ['works-intro-20260928.jpg', 'works-intro-20260928-768.jpg']) {
    const introResponse = await page.request.get(`${base}works/${filename}`);
    expect(introResponse.ok()).toBe(true);
    expect(introResponse.headers()['content-type']).toContain('image/jpeg');
  }
  const response = await page.request.get(`${base}works/works-social-20260926.jpg`);
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('image/jpeg');
});

test('works hero CTA moves focus to the finder', async ({ page }) => {
  test.skip(visibleItems.length === 0, 'The finder is only rendered when works are visible');
  await page.goto(`${base}works/`);
  await expect(page.locator('.works-hero-inner > *').nth(0)).toHaveClass(/works-heading-copy/);
  await expect(page.locator('.works-hero-inner > *').nth(1)).toHaveClass(/works-hero-media/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/本の問いを、\s*今日の自分へ。/);
  await expect(page.locator('.works-heading-lead')).toHaveText('本から生まれた問いを、手元で試せる短いワークにしました。今の気分や気がかりから、合いそうなひとつを選べます。');
  await expect(page.locator('.works-howto li')).toHaveText([
    '01 困りごとを一つ選ぶ',
    '02 本の問いから生まれたワークをひらく',
    '03 数分試し、見方の変化や残った壁を一行にする',
    '04 今選べる小さな一歩を一つ選ぶ',
  ]);
  await page.getByRole('link', { name: '気分からワークを探す' }).click();
  await expect(page).toHaveURL(/#work-finder$/);
  await expect(page.locator('#work-finder')).toBeFocused();
  await expect(page.locator('[data-work-finder-status]')).toHaveText(`全${visibleItems.length}件のワークを表示しています。`);
});

test('work finder ranks matching works and clears back to the full list', async ({ page }) => {
  test.skip(!preview && visibleItems.length === 0, 'The finder is only rendered when works are visible');
  await page.goto(`${base}works/`);
  await expect(page.locator('[data-work-finder]')).toBeVisible();
  const mood = taxonomy.moods[0].id;
  const concern = taxonomy.concerns.find((candidate) => visibleItems.some((item) => item.moods.includes(mood) && item.concerns.includes(candidate.id)))?.id;
  expect(concern).toBeDefined();
  const moodMatches = items.filter((item) => visibleItems.includes(item) && item.moods.includes(mood));
  const bothMatches = items.filter((item) => visibleItems.includes(item) && item.moods.includes(mood) && item.concerns.includes(concern!));
  const unionMatches = items.filter((item) => visibleItems.includes(item) && (item.moods.includes(mood) || item.concerns.includes(concern!)));
  const originalSlugs = await page.locator('[data-work-entry] h2 a').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).pathname.split('/').filter(Boolean).at(-1)));
  const orderedSlugs = (expected: typeof moodMatches) => expected.map((item) => item.slug).sort((a, b) => originalSlugs.indexOf(a) - originalSlugs.indexOf(b));
  const moodAny = page.locator('input[name="work-mood"][value=""]');
  await moodAny.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator(`input[name="work-mood"][value="${mood}"]`)).toBeChecked();
  const moodVisibleEntries = page.locator('[data-work-entry]:not([hidden])');
  await expect(moodVisibleEntries).toHaveCount(moodMatches.length);
  await expect(page.locator('[data-work-finder-status]')).toHaveText(`${moodMatches.length}件のワークを表示しています。`);
  const visibleSlugs = async () => (await page.locator('[data-work-entry]:not([hidden]) h2 a').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).pathname.split('/').filter(Boolean).at(-1)))) as string[];
  expect(await visibleSlugs()).toEqual(orderedSlugs(moodMatches));
  await page.locator(`input[name="work-concern"][value="${concern!}"]`).check();
  const visibleEntries = page.locator('[data-work-entry]:not([hidden])');
  await expect(visibleEntries).toHaveCount(unionMatches.length);
  expect(bothMatches.length).toBeGreaterThan(0);
  const scores = await visibleEntries.evaluateAll((entries) => entries.map((entry) => Number(entry.getAttribute('data-match-score'))));
  expect(scores[0]).toBe(2);
  expect(scores.slice(0, bothMatches.length).every((score) => score === 2)).toBe(true);
  expect(await visibleSlugs()).toEqual([...orderedSlugs(bothMatches), ...orderedSlugs(unionMatches.filter((item) => !bothMatches.includes(item)))]);
  await expect(page.locator('[data-work-finder-status]')).toHaveText(`${unionMatches.length}件のワーク。選択に近い順に表示しています。`);
  await page.locator(`input[name="work-concern"][value="${concern!}"]`).focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: '選択をクリア' })).toBeFocused();
  await page.getByRole('button', { name: '選択をクリア' }).click();
  await expect(page.locator('[data-work-entry]:not([hidden])')).toHaveCount(visibleItems.length);
  await expect(page.locator('[data-work-finder-status]')).toHaveText(`全${visibleItems.length}件のワークを表示しています。`);
});

test('work finder keeps the full list available without JavaScript', async ({ browser }) => {
  test.skip(visibleItems.length === 0, 'The list is empty');
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${base}works/`);
  await expect(page.locator('[data-work-finder]')).toBeHidden();
  await expect(page.getByRole('link', { name: '今の気分から探す' })).toBeHidden();
  await expect(page.locator('[data-work-entry]')).toHaveCount(visibleItems.length);
  await expect(page.locator('[data-work-entry]').first().getByRole('link').first()).toBeVisible();
  await context.close();
});

for (const { slug, review, gallery, title, book, published, steps } of items) test(`work and book round trip: ${slug}`, async ({ page }) => {
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
  const expectedGalleries = gallery ? [gallery] : readdirSync('src/content/gallery').filter((name) => {
    const source = readFileSync(`src/content/gallery/${name}`, 'utf8');
    return new RegExp(`^relatedReview: ["']?${review}["']?\\s*$`, 'm').test(source) && /^published: true$/m.test(source) && /^(?:description|note): .+/m.test(source);
  }).map((name) => name.replace(/\.md$/, ''));
  for (const expectedGallery of expectedGalleries) {
    const galleryLink = bookSection.locator(`a[href="${base}gallery/${expectedGallery}/"]`);
    await expect(galleryLink).toBeVisible();
    await galleryLink.click();
    await expect(page).toHaveURL(`${base}gallery/${expectedGallery}/`);
    await page.goBack();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  }
  const bookPath = review ? `reviews/${review}` : `gallery/${gallery}`;
  await expect(bookSection.locator(`a[href="${base}${bookPath}/"]`)).toContainText(book);
  if (!review) await expect(bookSection.locator('a[href*="/reviews/"]')).toHaveCount(0);
  const purchaseLinks = bookSection.locator('a[href^="https://af.moshimo.com/"]');
  const expectedPurchaseUrls = [...readFileSync(`src/content/${bookPath}.md`, 'utf8').matchAll(/^\s+url: "(https:\/\/af\.moshimo\.com\/[^"]+)"$/gm)].map((match) => match[1]);
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
  await picture.scrollIntoViewIfNeeded();
  await picture.evaluate((img: HTMLImageElement) => img.decode());
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: `test-results/works-${slug}-${test.info().project.name}.png`, fullPage: true });
  await bookSection.locator(`a[href="${base}${bookPath}/"]`).click();
  await expect(page).toHaveURL(`${base}${bookPath}/`);
  await page.getByRole('link', { name: title, exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
});
