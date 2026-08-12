import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Browser, type Locator, type Page } from '@playwright/test';

const SITE_BASE = '/codex-coco-s-site/';
const REVIEW_PATH = `${SITE_BASE}reviews/`;

type ExplorerLayout = {
  display: string;
  gridTrackCount: number;
  minWidth: string;
  copyDisplay: string;
  copyMinWidth: string;
  orderDisplay: string;
  childrenStayWithinCard: boolean;
  cardStaysWithinViewport: boolean;
};

const reviewItems = (page: Page) => page.locator('[data-review-list] .review-item');

const expectNoHorizontalOverflow = async (page: Page) => {
  const metrics = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));

  expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
};

const expectExplorerBoundsInViewport = async (page: Page) => {
  const overflow = await page.locator(
    '[data-review-explorer], [data-review-explorer] .review-controls, [data-review-list], [data-review-list] .review-item, [data-review-list] .review-link, [data-review-more]'
  ).evaluateAll((elements) => {
    const viewportWidth = window.innerWidth;

    return elements.some((element) => {
      if (!(element instanceof HTMLElement) || getComputedStyle(element).display === 'none') return false;
      const rect = element.getBoundingClientRect();
      return rect.left < -1 || rect.right > viewportWidth + 1;
    });
  });

  expect(overflow).toBe(false);
};

const getExplorerLayout = async (item: Locator): Promise<ExplorerLayout> => {
  return item.evaluate((element) => {
    if (!(element instanceof HTMLElement)) throw new Error('Expected review item element.');

    const copy = element.querySelector<HTMLElement>('.review-copy');
    const order = element.querySelector<HTMLElement>('.review-order');
    const cardRect = element.getBoundingClientRect();
    const visibleChildren = Array.from(element.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement && getComputedStyle(child).display !== 'none'
    );
    const style = getComputedStyle(element);

    return {
      display: style.display,
      gridTrackCount: style.gridTemplateColumns.trim().split(/\s+/).filter(Boolean).length,
      minWidth: style.minWidth,
      copyDisplay: copy ? getComputedStyle(copy).display : '',
      copyMinWidth: copy ? getComputedStyle(copy).minWidth : '',
      orderDisplay: order ? getComputedStyle(order).display : '',
      childrenStayWithinCard: visibleChildren.every((child) => {
        const rect = child.getBoundingClientRect();
        return rect.left >= cardRect.left - 1 && rect.right <= cardRect.right + 1;
      }),
      cardStaysWithinViewport: cardRect.left >= -1 && cardRect.right <= window.innerWidth + 1,
    };
  });
};

const expectReadableExplorerLayout = async (page: Page, mobile: boolean) => {
  const items = reviewItems(page);
  await expect(items).toHaveCount(4);
  const layout = await getExplorerLayout(items.first());

  expect(layout.display).toBe('grid');
  expect(layout.gridTrackCount).toBe(mobile ? 2 : 3);
  expect(layout.minWidth).toBe('0px');
  expect(layout.copyDisplay).toBe('grid');
  expect(layout.copyMinWidth).toBe('0px');
  expect(layout.childrenStayWithinCard).toBe(true);
  expect(layout.cardStaysWithinViewport).toBe(true);

  if (mobile) expect(layout.orderDisplay).toBe('none');

  await expectNoHorizontalOverflow(page);
  await expectExplorerBoundsInViewport(page);
};

const expectReviewStreamStartsSoon = async (page: Page, foldCount: number) => {
  const top = await page.locator('#review-stream').evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return rect.top + window.scrollY;
  });
  const viewportHeight = await page.evaluate(() => window.innerHeight);

  expect(top).toBeLessThanOrEqual(viewportHeight * foldCount);
};

const expectKeyboardPathIntoFirstReview = async (page: Page) => {
  const search = page.getByRole('searchbox', { name: 'レビューを検索' });
  const situation = page.locator('[data-review-explorer] select[name="situation"]');
  const submit = page.getByRole('button', { name: '探す', exact: true });
  const reset = page.getByRole('button', { name: '条件を戻す', exact: true });
  const firstTitle = reviewItems(page).first().locator('h3 a');

  await search.focus();
  await expect(search).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(situation).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(submit).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(reset).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(firstTitle).toBeFocused();
};

const getFirstSituationOption = async (page: Page) => {
  return page.locator('[data-review-explorer] select[name="situation"]').evaluate((element) => {
    if (!(element instanceof HTMLSelectElement)) throw new Error('Expected situation select.');
    const option = Array.from(element.options).find((candidate) => candidate.value);
    if (!option) throw new Error('Expected at least one situation option.');
    return { label: option.text.trim(), value: option.value };
  });
};

const expectLongCopyWraps = async (page: Page) => {
  const worries = page.locator('[data-review-list] .review-worry');
  const longestIndex = await worries.evaluateAll((elements) => {
    return elements.reduce(
      (longest, element, index) => (element.textContent?.length ?? 0) > longest.length ? { index, length: element.textContent?.length ?? 0 } : longest,
      { index: 0, length: 0 }
    ).index;
  });
  const worry = worries.nth(longestIndex);
  const metrics = await worry.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return {
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      lineCount: range.getClientRects().length,
      whiteSpace: getComputedStyle(element).whiteSpace,
    };
  });

  expect(metrics.clientWidth).toBeGreaterThan(0);
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
  expect(metrics.whiteSpace).not.toBe('nowrap');
  expect(metrics.lineCount).toBeGreaterThan(1);
};

test('desktop review explorer keeps its client-rendered three-column reading layout', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop contract');

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(REVIEW_PATH);

  await expect(page.locator('#review-stream > .section-header h2')).toHaveCount(1);
  await expectReadableExplorerLayout(page, false);
  await expect(reviewItems(page).locator('h3')).toHaveCount(4);
  await expectReviewStreamStartsSoon(page, 2);
  await expectKeyboardPathIntoFirstReview(page);
});

test('mobile review explorer keeps its dynamic two-column cards inside 360px and 390px viewports', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile contract');

  for (const viewport of [{ width: 360, height: 800 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto(REVIEW_PATH);

    await expectReadableExplorerLayout(page, true);
    await expectReviewStreamStartsSoon(page, 3);
    await expectKeyboardPathIntoFirstReview(page);
  }
});

test('review explorer keeps the same initial hierarchy without JavaScript', async ({ browser, isMobile }) => {
  test.skip(isMobile, 'one browser context checks both desktop and mobile SSR contracts');

  for (const [viewport, mobile] of [
    [{ width: 1440, height: 1000 }, false],
    [{ width: 390, height: 844 }, true],
  ] as const) {
    const context = await (browser as Browser).newContext({ javaScriptEnabled: false, viewport });
    const page = await context.newPage();

    try {
      await page.goto(`http://127.0.0.1:4321${REVIEW_PATH}`);
      await expect(page.locator('[data-review-results]')).toContainText('4冊を表示');
      await expect(page.getByRole('button', { name: 'さらにレビューを読む', exact: true })).toBeVisible();
      await expectReadableExplorerLayout(page, mobile);
      await expectReviewStreamStartsSoon(page, mobile ? 3 : 2);
    } finally {
      await context.close();
    }
  }
});

test('search, short select, reset, load more, and browser back preserve explorer readability', async ({ page, isMobile }) => {
  const mobile = isMobile;
  await page.setViewportSize(mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 });
  await page.goto(REVIEW_PATH);

  const search = page.getByRole('searchbox', { name: 'レビューを検索' });
  const situation = page.locator('[data-review-explorer] select[name="situation"]');
  const submit = page.getByRole('button', { name: '探す', exact: true });
  const reset = page.getByRole('button', { name: '条件を戻す', exact: true });

  await search.fill('ノンフィクション');
  await submit.click();
  await expect(page).toHaveURL(/\?q=%E3%83%8E%E3%83%B3%E3%83%95%E3%82%A3%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3/);
  expect(await reviewItems(page).count()).toBeGreaterThan(0);
  await expectNoHorizontalOverflow(page);
  await expectExplorerBoundsInViewport(page);

  await reset.click();
  await expect(search).toHaveValue('');
  await expect(situation).toHaveValue('');
  await expect(page).toHaveURL(/\/reviews\/$/);
  await expectReadableExplorerLayout(page, mobile);

  const firstOption = await getFirstSituationOption(page);
  expect(firstOption.label.length).toBeLessThanOrEqual(18);
  await situation.selectOption(firstOption.value);
  await submit.click();
  await expect(page).toHaveURL(/\?situation=/);
  expect(await reviewItems(page).count()).toBeGreaterThan(0);
  await expectNoHorizontalOverflow(page);
  await expectExplorerBoundsInViewport(page);

  await reset.click();
  await expectReadableExplorerLayout(page, mobile);

  await page.getByRole('button', { name: 'さらにレビューを読む', exact: true }).click();
  await expect(page).toHaveURL(/\?page=2$/);
  await expect(reviewItems(page)).toHaveCount(8);
  await expectNoHorizontalOverflow(page);
  await expectExplorerBoundsInViewport(page);
  await expectLongCopyWraps(page);

  await page.goBack();
  await expect(page).toHaveURL(/\/reviews\/$/);
  await expectReadableExplorerLayout(page, mobile);
});

test('review explorer has no serious or critical accessibility violations', async ({ page, isMobile }) => {
  test.skip(isMobile, 'the same semantic explorer is covered by the desktop project');

  await page.goto(REVIEW_PATH);
  const results = await new AxeBuilder({ page }).include('[data-review-explorer]').withTags(['wcag2a', 'wcag2aa']).analyze();
  const serious = results.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact ?? ''));

  expect(serious).toEqual([]);
});
