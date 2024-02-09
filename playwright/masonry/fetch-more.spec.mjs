// @flow strict
import { expect, test } from '@playwright/test';
import getServerURL from './utils/getServerURL.mjs';
import selectors from './utils/selectors.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

test.describe('Masonry: fetch more', () => {
  test('trigger a call to "fetchMore" when container resizes', async ({
    page,
  }) => {
    // Start with a small screen.
    await page.setViewportSize({ width: 400, height: 400 });
    await page.goto(getServerURL());
    await waitForRenderedItems(page, { targetItemsGTE: 20 });

    const initialFetchCount = await page.evaluate(
      () => window.TEST_FETCH_COUNTS
    );
    // TODO[@rjames]: re-enable this eventually (possibly needs better SSR support?)
    // expect(initialFetchCount).toBe(0);

    // Fetches more if the viewport is big enough.
    await page.setViewportSize({ width: 2000, height: 1000 });
    await waitForRenderedItems(page, { targetItemsGTE: 40 });

    const newFetchCount = await page.evaluate(() => window.TEST_FETCH_COUNTS);
    expect(newFetchCount).toBeGreaterThan(initialFetchCount);
  });

  // TODO[@rjames]: fix this test, currently timing out

  test('trigger a call to "fetchMore" when scrolling far enough', async ({
    page,
  }) => {
    // Start with a small screen.
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(
      getServerURL({ virtualize: true, scrollContainer: true, offsetTop: 800 })
    );
    await waitForRenderedItems(page, { targetItems: 0 });

    let fetchCount = 0;

    // Scroll a little bit. This should trigger the virtual bounds but not the
    // fetch bounds.
    const scrollContainer = await page.evaluateHandle(
      (selector) => document.querySelector(selector),
      selectors.scrollContainer
    );

    await scrollContainer.evaluate((node) => node.scrollBy(0, 400));
    await waitForRenderedItems(page, { targetItems: 6 });

    fetchCount = await page.evaluate(() => window.TEST_FETCH_COUNTS);
    expect(fetchCount).toBe(0);

    // Scroll a little more. This should finally trigger the fetch bounds.
    await scrollContainer.evaluate((node) => node.scrollBy(0, 800));
    await waitForRenderedItems(page, { targetItems: 15 });

    fetchCount = await page.evaluate(() => window.TEST_FETCH_COUNTS);
    expect(fetchCount).toBe(1);
  });
});
