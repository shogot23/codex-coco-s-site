import { expect, test, type Locator, type Page } from '@playwright/test';

const SITE_BASE = '/codex-coco-s-site/';

const expectNoHorizontalOverflow = async (page: Page) => {
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 4;
  });

  expect(hasOverflow).toBe(false);
};

const expectVisibleInViewport = async (page: Page, locator: Locator) => {
  await expect(locator).toBeVisible();

  const bounds = await locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
    };
  });
  const viewportHeight = await page.evaluate(() => window.innerHeight);

  expect(bounds.top).toBeGreaterThanOrEqual(0);
  expect(bounds.bottom).toBeLessThanOrEqual(viewportHeight);
};

const expectMediaHeightsAligned = async (locator: Locator, sampleCount = 3, tolerance = 2) => {
  const heights = await locator.evaluateAll((elements, count) => {
    return elements
      .slice(0, Number(count))
      .map((element) => Math.round(element.getBoundingClientRect().height));
  }, sampleCount);

  expect(heights.length).toBeGreaterThan(0);
  expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(tolerance);
};

const expectImageObjectFitCover = async (locator: Locator) => {
  const objectFit = await locator.evaluate((element) => {
    const image =
      element instanceof HTMLImageElement ? element : element.querySelector('img');

    if (!(image instanceof HTMLImageElement)) {
      throw new Error('Expected gallery media to include an image element.');
    }

    return getComputedStyle(image).objectFit;
  });

  expect(objectFit).toBe('cover');
};

const expectVideoCardsFitViewport = async (page: Page) => {
  const videoCards = page.locator('.fragment-card').filter({ has: page.locator('video') });
  await expect(videoCards).toHaveCount(3);

  const cardMetrics = await videoCards.evaluateAll((elements) => {
    return elements.map((element) => {
      const rect = element.getBoundingClientRect();
      const video = element.querySelector('video');
      return {
        height: Math.ceil(rect.height),
        viewportHeight: window.innerHeight,
        title: element.querySelector('h3')?.textContent?.trim() ?? 'untitled',
        videoObjectFit: video ? getComputedStyle(video).objectFit : '',
      };
    });
  });

  for (const metric of cardMetrics) {
    expect(metric.height, `${metric.title} card should fit in one viewport`).toBeLessThanOrEqual(
      metric.viewportHeight
    );
    expect(metric.videoObjectFit).toBe('contain');
  }
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
  await expect(page.getByRole('heading', { name: '今日の小さな一歩' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '最近の余韻' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'これまでの棚' })).toBeVisible();
  await expect(page.locator('#review-stream')).toBeVisible();
});

test('home offers a secondary shortcut to the 3books landing page', async ({ page }) => {
  await page.goto(SITE_BASE);

  const threeBooksLink = page.getByRole('link', { name: '3booksへ', exact: true });
  await expect(threeBooksLink).toBeVisible();
  await threeBooksLink.click();

  await expect(page).toHaveURL(/\/codex-coco-s-site\/3books\/$/);
  await expect(page.getByRole('heading', { name: '忙しい日々に、本で視界を整える最初の3冊。' })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test('primary navigation keeps review-led links and excludes the video library shortcut', async ({ page }) => {
  await page.goto(SITE_BASE);

  const primaryNav = page.getByRole('navigation', { name: 'Primary' });

  await primaryNav.getByRole('link', { name: 'Reviews', exact: true }).click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/reviews\/$/);
  await expect(page.getByRole('heading', { name: '次の一冊をひらく前に、言葉の余韻をひとくち。' })).toBeVisible();

  await expect(primaryNav.getByRole('link', { name: 'Videos', exact: true })).toHaveCount(0);
  await primaryNav.getByRole('link', { name: 'Gallery', exact: true }).click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/gallery\/$/);
  await expect(page.getByRole('heading', { name: '読後の景色を、ココちゃんと静かに見返す。' })).toBeVisible();

  await expectNoHorizontalOverflow(page);
});

test('about page guides interested readers to the moving fragments room', async ({ page }) => {
  await page.goto(`${SITE_BASE}about/`);

  const fragmentsLink = page.getByRole('link', { name: '動く断片を見る', exact: true });
  await expect(fragmentsLink).toBeVisible();
  await fragmentsLink.click();

  await expect(page).toHaveURL(/\/codex-coco-s-site\/videos\/$/);
  await expect(page.getByRole('heading', { name: '読後の余韻を、少しだけ動かして置いておく。' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'レビューへ戻る', exact: true })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test('videos page keeps self-hosted video cards inside one viewport', async ({ page }) => {
  await page.goto(`${SITE_BASE}videos/`);

  await expect(page.getByRole('heading', { name: '読後の余韻を、少しだけ動かして置いておく。' })).toBeVisible();
  await expect(page.locator('.fragment-card video').first()).toBeVisible();
  await expectVideoCardsFitViewport(page);
  await expectNoHorizontalOverflow(page);
});

test('profile introduces coco as the site guide and keeps review/gallery as the next paths', async ({ page }) => {
  await page.goto(`${SITE_BASE}profile/`);

  const hero = page.locator('.profile-hero');

  await expect(page.getByRole('heading', { name: 'ココちゃんについて' })).toBeVisible();
  await expect(hero.getByText('ココちゃんは、このサイトの案内役です。', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'このサイトでのおしごと' })).toBeVisible();
  await expect(page.getByText('いっしょに、次の一冊の景色を見にいこう。')).toBeVisible();
  await expect(page.getByRole('link', { name: /Fragments/ })).toHaveCount(0);
  await expect(hero.getByRole('link', { name: 'レビューを見る', exact: true })).toBeVisible();
  await expect(hero.getByRole('link', { name: 'ギャラリーを見る', exact: true })).toBeVisible();

  await hero.getByRole('link', { name: 'レビューを見る', exact: true }).click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/reviews\/$/);
  await expect(page.getByRole('heading', { name: '次の一冊をひらく前に、言葉の余韻をひとくち。' })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test('review detail keeps the reading flow and afterglow link intact', async ({ page }) => {
  await page.goto(`${SITE_BASE}reviews/seiten/`);

  // `seiten` is the review fixture that intentionally defines purchaseLinks.
  const purchaseShelf = page.getByTestId('review-purchase-shelf');

  await expect(page.locator('#review-title')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'ページに入る前の、短い手がかり。' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'ことばの散歩道' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '言葉を読み終えたあと、景色のほうへ。' })).toBeVisible();
  await expect(purchaseShelf).toBeVisible();
  await expect(purchaseShelf.getByRole('heading', { name: '読み返したくなったら、この本を手元に。' })).toBeVisible();
  await expect(purchaseShelf.getByTestId('review-purchase-link')).toHaveText('楽天で見る');
  await expect(purchaseShelf.getByTestId('review-purchase-link')).toHaveAttribute('href', /book%2F18471502%2F/);
  await expect(purchaseShelf.getByText('外部ストアへ移動します。')).toBeVisible();
  await expect(page.getByText('「青天」とはアメフト用語で')).toBeVisible();

  await expectNoHorizontalOverflow(page);

  const galleryBridgeLink = page.getByRole('link', { name: 'この本から広がる景色へ' });
  await expect(galleryBridgeLink).toBeVisible();
  await galleryBridgeLink.click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/gallery\/novel-seiten\/$/);
  await expect(page.getByRole('heading', { name: '青天', exact: true }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'この景色の向こうにある言葉を読む。' })).toBeVisible();

  const reviewReturnLink = page.getByRole('link', { name: 'この景色の言葉を読む', exact: true });
  await expect(reviewReturnLink).toBeVisible();
  await reviewReturnLink.click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/reviews\/seiten\/$/);
  await expect(page.locator('#review-title')).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test('gallery works as a scenic side path without breaking the review-led structure', async ({ page }) => {
  await page.goto(`${SITE_BASE}gallery/`);
  const browse = page.getByTestId('gallery-browse');
  const browseStatus = page.locator('[data-gallery-browse-shell] [data-browse-status]');

  await expect(page.getByRole('heading', { name: '読後の景色を、ココちゃんと静かに見返す。' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '本から生まれた景色を、先に3つだけひらく。' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'レビューを読む', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'About へ', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: '一覧で探す', exact: true })).toBeVisible();
  await expect(browse).toBeVisible();
  await expect(page.getByRole('button', { name: '章で見る', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(browseStatus).toHaveText('章ごとのまとまりから景色をめくる');

  const fictionChapter = browse.locator('[data-chapter-section="fiction"]');
  const fictionMoreButton = browse.locator('[data-chapter-more="fiction"]');
  const leadPiece = fictionChapter.locator('[data-gallery-piece]').first();

  await expect(fictionChapter).toBeVisible();
  await expect(fictionMoreButton).toBeVisible();
  await expect(leadPiece.locator('[data-gallery-piece-media]')).toHaveCount(1);
  await expect(leadPiece.locator('[data-gallery-piece-caption]')).toHaveCount(1);
  await expectImageObjectFitCover(leadPiece.locator('[data-gallery-piece-media]'));
  await expect(fictionChapter.locator('[data-curated-item]').first().locator('[data-gallery-piece-media]')).toHaveCount(1);
  await expect(fictionChapter.locator('[data-curated-item]').first().locator('[data-gallery-piece-caption]')).toHaveCount(1);

  const trailCountBefore = await fictionChapter.locator('[data-curated-item]').count();
  await fictionMoreButton.click();
  await expect(browse.locator('[data-chapter-more="fiction"]')).toHaveText('閉じる');
  const trailCountAfter = await fictionChapter.locator('[data-curated-item]').count();
  expect(trailCountAfter).toBeGreaterThan(trailCountBefore);
  await expect(fictionChapter.locator('[data-curated-item]').last().locator('[data-gallery-piece-media]')).toHaveCount(1);
  await expect(fictionChapter.locator('[data-curated-item]').last().locator('[data-gallery-piece-caption]')).toHaveCount(1);

  await page.getByRole('button', { name: '一覧で見る', exact: true }).click();
  await expect(page.getByRole('button', { name: '一覧で見る', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(browseStatus).toHaveText('作品を並べて比べながら探す');
  await expect(browse.locator('[data-browse-panel="curated"]')).toBeHidden();
  await expect(browse.locator('[data-grid-card]').first()).toBeVisible();
  await expect(browse.locator('[data-grid-card]').first().locator('[data-gallery-piece-media]')).toHaveCount(1);
  await expect(browse.locator('[data-grid-card]').first().locator('[data-gallery-piece-caption]')).toHaveCount(1);
  await expect(browse.locator('[data-grid-card]').first().locator('.scene-action, .scene-status')).toHaveCount(1);

  await page.getByRole('button', { name: 'ビジネス', exact: true }).click();
  await expect(page.getByRole('button', { name: 'ビジネス', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: '一覧で見る', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(browseStatus).toHaveText('ビジネスの景色を一覧で比べながら探す');

  const currentUrl = new URL(page.url());
  expect(currentUrl.searchParams.get('view')).toBe('grid');
  expect(currentUrl.searchParams.get('genre')).toBe('ビジネス');

  const gridBadges = await browse.locator('.grid-card .grid-badge').allTextContents();
  expect(gridBadges.every((badge) => badge === 'ビジネス')).toBe(true);

  await page.getByRole('button', { name: '章で見る', exact: true }).click();
  await expect(page.getByRole('button', { name: '章で見る', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(browseStatus).toHaveText('ビジネスの景色を章の流れで眺める');
  await expect(browse.locator('[data-chapter-section]')).toHaveCount(1);
  await expect(browse.getByRole('heading', { name: '学びを持ち帰る' })).toBeVisible();
  await expect(browse.getByRole('heading', { name: '物語にひたる' })).toHaveCount(0);
  await expectImageObjectFitCover(
    browse.locator('[data-chapter-section]').first().locator('.chapter-lead [data-gallery-piece-media]')
  );

  await page.goBack();
  await expect(page.getByRole('button', { name: '一覧で見る', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'ビジネス', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(browse.locator('[data-grid-card]').first()).toBeVisible();

  await page.goForward();
  await expect(page.getByRole('button', { name: '章で見る', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'ビジネス', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(browse.locator('[data-chapter-section]')).toHaveCount(1);
  await expectImageObjectFitCover(
    browse.locator('[data-chapter-section]').first().locator('.chapter-lead [data-gallery-piece-media]')
  );

  await expectNoHorizontalOverflow(page);

  await page.getByRole('link', { name: 'レビューを読む', exact: true }).click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/reviews\/$/);
  await expect(page.getByRole('heading', { name: '次の一冊をひらく前に、言葉の余韻をひとくち。' })).toBeVisible();
});

test('gallery archive works as a searchable catalog with grid-first state sync', async ({ page }) => {
  await page.goto(`${SITE_BASE}gallery/`);
  await page.getByRole('link', { name: '一覧で探す', exact: true }).click();

  const browse = page.getByTestId('gallery-archive-browse');
  const browseStatus = page.locator('[data-gallery-browse-shell] [data-browse-status]');
  const sortSelect = page.getByLabel('並び順');

  await expect(page).toHaveURL(/\/codex-coco-s-site\/gallery\/archive\/$/);
  await expect(page.getByRole('heading', { name: '気になった景色を、目録として探し直す。' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '一覧で比べながら、気になる景色を探す。' })).toBeVisible();
  await expect(page.getByRole('link', { name: '展示室を見る', exact: true })).toBeVisible();
  await expect(browse).toBeVisible();
  await expect(page.getByRole('button', { name: '一覧で見る', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(browseStatus).toHaveText('作品を並べて比べながら探す');
  await expect(sortSelect).toHaveValue('latest');
  await expect(browse.locator('[data-grid-card]').first()).toBeVisible();
  await expect(browse.locator('[data-browse-panel="curated"]')).toBeHidden();
  await expect(browse.locator('[data-grid-card]').first().locator('[data-gallery-piece-media]')).toHaveCount(1);
  await expect(browse.locator('[data-grid-card]').first().locator('[data-gallery-piece-caption]')).toHaveCount(1);
  await expectMediaHeightsAligned(browse.locator('[data-grid-card] [data-gallery-piece-media]'));

  await page.getByRole('button', { name: 'ビジネス', exact: true }).click();
  await expect(page.getByRole('button', { name: 'ビジネス', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(browseStatus).toHaveText('ビジネスの景色を一覧で比べながら探す');
  await expect(browse.locator('.grid-card .grid-badge').first()).toHaveText('ビジネス');
  await expectMediaHeightsAligned(browse.locator('[data-grid-card] [data-gallery-piece-media]'));

  await sortSelect.selectOption('title');
  await expect(sortSelect).toHaveValue('title');

  const currentUrl = new URL(page.url());
  expect(currentUrl.searchParams.get('genre')).toBe('ビジネス');
  expect(currentUrl.searchParams.get('sort')).toBe('title');
  expect(currentUrl.searchParams.get('view')).toBeNull();

  await page.getByRole('button', { name: '章で見る', exact: true }).click();
  await expect(page.getByRole('button', { name: '章で見る', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(browseStatus).toHaveText('ビジネスの景色を章の流れで眺める');
  await expect(browse.locator('[data-chapter-section]')).toHaveCount(1);
  await expectImageObjectFitCover(
    browse.locator('[data-chapter-section]').first().locator('.chapter-lead [data-gallery-piece-media]')
  );

  const curatedUrl = new URL(page.url());
  expect(curatedUrl.searchParams.get('view')).toBe('curated');
  expect(curatedUrl.searchParams.get('genre')).toBe('ビジネス');
  expect(curatedUrl.searchParams.get('sort')).toBe('title');

  await page.goBack();
  await expect(page.getByRole('button', { name: '一覧で見る', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'ビジネス', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(sortSelect).toHaveValue('title');
  await expect(browse.locator('[data-grid-card]').first()).toBeVisible();

  await page.goForward();
  await expect(page.getByRole('button', { name: '章で見る', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'ビジネス', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(sortSelect).toHaveValue('title');
  await expect(browse.locator('[data-chapter-section]')).toHaveCount(1);

  await expectNoHorizontalOverflow(page);
});

test('gallery detail keeps the review bridge intact for review-linked scenes', async ({ page }) => {
  await page.goto(`${SITE_BASE}gallery/novel-seiten/`);

  await expect(page.getByRole('heading', { name: '青天', exact: true }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: '画像の前で立ち止まるための、短いメモ。' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'この景色の向こうにある言葉を読む。' })).toBeVisible();

  const sceneImage = page.locator('.scene-visual img');
  await expect(sceneImage).toBeVisible();
  await expect(sceneImage).toHaveAttribute('src', /Blue_Sky_Wakabayashi_Masayasu\.png/);

  await expectNoHorizontalOverflow(page);

  const reviewBridgeLink = page.getByRole('link', { name: 'この景色の言葉を読む', exact: true });
  await expect(reviewBridgeLink).toBeVisible();
  await reviewBridgeLink.click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/reviews\/seiten\/$/);
  await expect(page.locator('#review-title')).toBeVisible();
});

test('3books landing guides readers into the three new reviews', async ({ page }) => {
  await page.goto(`${SITE_BASE}3books/`);

  await expect(page.getByRole('heading', { name: '忙しい日々に、本で視界を整える最初の3冊。' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '今日は、どの入口からひらく？' })).toBeVisible();

  const chapterTitles = page.locator('.chapter h3');
  await expect(chapterTitles).toHaveText([
    '偶然はどのようにあなたをつくるのか',
    'イン・ザ・メガチャーチ',
    '人生後半の戦略書',
  ]);

  await expect(page.getByRole('link', { name: 'レビューを読む', exact: true }).nth(0)).toBeVisible();
  await expect(page.getByRole('link', { name: 'レビューを読む', exact: true }).nth(1)).toBeVisible();
  await expect(page.getByRole('link', { name: 'レビューを読む', exact: true }).nth(2)).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole('link', { name: 'レビューを読む', exact: true }).nth(0).click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/reviews\/guzen-ha-donoyouni-anata-wo-tsukurunoka\/$/);
  await expect(page.locator('#review-title')).toHaveText('偶然はどのようにあなたをつくるのか');
  await expect(page.getByTestId('review-purchase-shelf')).toBeVisible();
  await expect(page.getByRole('link', { name: 'この本から広がる景色へ' })).toBeVisible();
});

test('new review details preserve gallery links and fallback reading flow', async ({ page }) => {
  await page.goto(`${SITE_BASE}reviews/jinsei-kouhan-no-senryakusho/`);

  await expect(page.locator('#review-title')).toHaveText('人生後半の戦略書');
  await expect(page.getByTestId('review-purchase-shelf')).toBeVisible();
  await expect(page.getByRole('link', { name: 'この本から広がる景色へ' })).toBeVisible();
  await page.getByRole('link', { name: 'この本から広がる景色へ' }).click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/gallery\/business-193591\/$/);
  await expect(page.getByRole('heading', { name: '人生後半の戦略書', exact: true }).first()).toBeVisible();

  await page.goto(`${SITE_BASE}reviews/in-the-megachurch/`);
  await expect(page.locator('#review-title')).toHaveText('イン・ザ・メガチャーチ');
  await expect(page.getByRole('link', { name: '次の一冊を探す', exact: true })).toBeVisible();
  await expect(page.getByTestId('review-purchase-shelf')).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test('gallery detail falls back to purchase links when no related review exists', async ({ page }) => {
  await page.goto(`${SITE_BASE}gallery/business-0d597c/`);

  await expect(page.getByRole('heading', { name: 'モモ', exact: true }).first()).toBeVisible();

  const sceneImage = page.locator('.scene-visual img');
  await expect(sceneImage).toBeVisible();
  await expect(sceneImage).toHaveAttribute('src', /Momo_Michael_Ende\.jpeg/);

  const topPurchaseLink = page.getByRole('link', { name: 'この本を見る', exact: true });
  await expect(topPurchaseLink).toBeVisible();
  await expect(topPurchaseLink).toHaveAttribute('href', /rakuten/i);
  await expect(topPurchaseLink).toHaveAttribute('target', '_blank');
  await expect(topPurchaseLink).toHaveAttribute('rel', /noopener/);

  const bridgePurchaseLink = page.getByRole('link', { name: 'モモの購入先: 楽天で見る', exact: true });
  await expect(bridgePurchaseLink).toBeVisible();
  await expect(bridgePurchaseLink).toHaveAttribute('href', /rakuten/i);

  await expectNoHorizontalOverflow(page);

  const reviewListLink = page.getByRole('link', { name: 'レビュー一覧を見る', exact: true });
  await expect(reviewListLink).toBeVisible();
  await reviewListLink.click();
  await expect(page).toHaveURL(/\/codex-coco-s-site\/reviews\/$/);
  await expect(page.getByRole('heading', { name: '次の一冊をひらく前に、言葉の余韻をひとくち。' })).toBeVisible();
});

test('about page remains readable on small and large viewports', async ({ page }) => {
  await page.goto(`${SITE_BASE}about/`);

  await expect(page.getByRole('heading', { name: '本を閉じたあとも、ココちゃんと世界はつづいていく。' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '本 × ココちゃん × 学び は、余韻のなかでゆっくり交わる。' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'レビューを見る', exact: true }).first()).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test('home keeps nav and hero CTAs usable on mobile-chrome', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile-chrome only');

  await page.goto(SITE_BASE);

  const primaryNav = page.getByRole('navigation', { name: 'Primary' });
  const hero = page.locator('.hero');
  const brandLink = page.getByRole('link', { name: '読書 with Coco' });
  const reviewLink = primaryNav.getByRole('link', { name: 'Reviews', exact: true });
  const galleryLink = primaryNav.getByRole('link', { name: 'Gallery', exact: true });
  const heroReviewCta = hero.getByRole('link', { name: 'レビューを見る', exact: true });
  const heroGalleryCta = hero.getByRole('link', { name: 'ギャラリーを見る', exact: true });

  await expect(page.locator('main')).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await expectVisibleInViewport(page, brandLink);
  await expectVisibleInViewport(page, primaryNav);
  await expectVisibleInViewport(page, reviewLink);
  await expectVisibleInViewport(page, galleryLink);
  await expectVisibleInViewport(page, heroReviewCta);
  await expectVisibleInViewport(page, heroGalleryCta);
});
