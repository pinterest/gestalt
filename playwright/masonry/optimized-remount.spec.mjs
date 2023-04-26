// @flow strict
import { expect, test } from '@playwright/test';
import clickButton from './utils/clickButton.mjs';
import getServerURL from './utils/getServerURL.mjs';
import selectors from './utils/selectors.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

const documentElement = document.documentElement ?? {
  scrollHeight: 0,
  clientHeight: 0,
};

test.describe('Masonry: external cache', () => {
  test('should only mount visible items on remount', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(getServerURL({ externalCache: true, virtualize: true }));

    // Wait for dynamic loading. Not only do we need to wait for the right
    // number of items to be displayed, but we also need to wait for fetch more
    // calls to finish and items to be measured/virtualized.
    await waitForRenderedItems(page, { targetItems: 18, scrollHeight: 3431 });

    // Scroll a couple of times.
    await page.evaluate(() => {
      const scrollTo =
        documentElement.scrollHeight - documentElement.clientHeight - 50;
      window.scrollTo(0, scrollTo);
    });
    await waitForRenderedItems(page, { targetItems: 30, scrollHeight: 5064 });

    await page.evaluate(() => {
      const scrollTo =
        documentElement.scrollHeight - documentElement.clientHeight;
      window.scrollTo(0, scrollTo);
    });
    await waitForRenderedItems(page, { targetItems: 30, scrollHeight: 9161 });

    // Get initial mount count.
    const initialMountCount = await page.evaluate(
      () => window.ITEM_MOUNT_COUNT
    );
    expect(initialMountCount).toBeGreaterThan(0);

    // Unmount the grid.
    await clickButton(page, selectors.toggleMount);
    await waitForRenderedItems(page, { targetItems: 0, scrollHeight: 800 });

    // Wait for grid to be unmounted.
    const updatedMountCount = await page.evaluate(
      () => window.ITEM_MOUNT_COUNT
    );
    expect(updatedMountCount).toBe(0);
    await clickButton(page, selectors.toggleMount);

    // Wait for Masonry multi-stage rendering.
    await waitForRenderedItems(page, { targetItemsGTE: 18 });

    // Wait for grid to be remounted. It should only mount 18 items despite
    // there being >100 in the grid.
    const updatedCount = await page.evaluate(() => window.ITEM_MOUNT_COUNT);
    expect(updatedCount).toBeGreaterThanOrEqual(18);
  });
});
