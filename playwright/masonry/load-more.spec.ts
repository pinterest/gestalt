import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems';
import getServerURL from './utils/getServerURL';
import getStaticGridItems from './utils/getStaticGridItems';
import selectors from './utils/selectors';
import waitForRenderedItems from './utils/waitForRenderedItems';

test.describe('Masonry: scrolls', () => {
  test('loads more when it gets to the bottom of the viewport', async ({ page }) => {
    // First load the page with javascript disabled to get the item position
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto(getServerURL({ virtualize: true, deferMount: true, manualFetch: true }));

    // Wait for server-rendered items to load.
    const serverItems = await getStaticGridItems(page);
    expect(serverItems.length).toEqual(20);

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });
    await waitForRenderedItems(page, { targetItems: 20 });

    // Add more items. Not all of them will be rendered because they fall below
    // the virtual bounds.

    await page.evaluate(
      // @ts-expect-error - TS2339 - Property 'click' does not exist on type 'Element'.
      (selector) => document.querySelector(selector)?.click(),
      selectors.addItems,
    );
    await waitForRenderedItems(page, { targetItems: 35 });

    const gridItems1 = await getGridItems(page);
    expect(gridItems1.length).toBe(35);

    // Add more items. They'll be measured, but will not be rendered to the grid
    // because they fall below the virtual bounds.

    await page.evaluate(
      // @ts-expect-error - TS2339 - Property 'click' does not exist on type 'Element'.
      (selector) => document.querySelector(selector)?.click(),
      selectors.addItems,
    );
    await waitForRenderedItems(page, { targetItems: 35 });

    const gridItems2 = await getGridItems(page);
    expect(gridItems2.length).toBe(35);

    // Verify that we've actually called to add more items.
    // @ts-expect-error - TS2339 - Property 'TEST_FETCH_COUNTS' does not exist on type 'Window & typeof globalThis'.
    const initialFetchCount = await page.evaluate(() => window.TEST_FETCH_COUNTS);
    expect(initialFetchCount).toBe(2);

    // It's unfortunate that we need a wait here, but there's not a great way
    // otherwise to ensure that Masonry has measured all new items and then
    // removed them from the DOM entirely. Maybe we could check to see if some
    // were added to the DOM and later removed?
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(1000);

    const documentElement = await page.evaluateHandle('document.documentElement');

    // Scroll a few times to triggle multiple scrolls.
    await page.evaluate((docEl) => {
      // @ts-expect-error - TS2571 - Object is of type 'unknown'. | TS2571 - Object is of type 'unknown'.
      window.scrollTo(0, docEl.scrollHeight - docEl.clientHeight);
    }, documentElement);
    await waitForRenderedItems(page, { targetItems: 30 });

    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await waitForRenderedItems(page, { targetItems: 35 });

    await page.evaluate((docEl) => {
      // @ts-expect-error - TS2571 - Object is of type 'unknown'. | TS2571 - Object is of type 'unknown'.
      window.scrollTo(0, docEl.scrollHeight - docEl.clientHeight);
    }, documentElement);
    await waitForRenderedItems(page, { targetItems: 30 });

    // Now that we're at the bottom of the page, add more items and expect to see them.

    await page.evaluate(
      // @ts-expect-error - TS2339 - Property 'click' does not exist on type 'Element'.
      (selector) => document.querySelector(selector)?.click(),
      selectors.addItems,
    );
    await waitForRenderedItems(page, { targetItems: 45 });

    const gridItems3 = await getGridItems(page);
    expect(gridItems3.length).toBe(45);

    // @ts-expect-error - TS2339 - Property 'TEST_FETCH_COUNTS' does not exist on type 'Window & typeof globalThis'.
    const newFetchCount = await page.evaluate(() => window.TEST_FETCH_COUNTS);
    expect(newFetchCount).toBe(3);
  });
});
