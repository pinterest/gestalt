import { expect, test } from '@playwright/test';
import clickButton from './utils/clickButton';
import getServerURL from './utils/getServerURL';
import selectors from './utils/selectors';
import waitForRenderedItems from './utils/waitForRenderedItems';

test.describe('Masonry: external cache', () => {
  test('should only mount visible items on remount', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(getServerURL({ externalCache: true, virtualize: true }));

    // Wait for dynamic loading. Not only do we need to wait for the right
    // number of items to be displayed, but we also need to wait for fetch more
    // calls to finish and items to be measured/virtualized.
    await waitForRenderedItems(page, { targetItems: 18, scrollHeight: 3431 });

    // Scroll a couple of times.
    const documentElement = await page.evaluateHandle('document.documentElement');
    await page.evaluate((docEl) => {
      // @ts-expect-error - TS2571 - Object is of type 'unknown'. | TS2571 - Object is of type 'unknown'.
      window.scrollTo(0, docEl.scrollHeight - docEl.clientHeight - 50);
    }, documentElement);
    await waitForRenderedItems(page, { targetItems: 30, scrollHeight: 5064 });

    await page.evaluate((docEl) => {
      // @ts-expect-error - TS2571 - Object is of type 'unknown'. | TS2571 - Object is of type 'unknown'.
      window.scrollTo(0, docEl.scrollHeight - docEl.clientHeight);
    }, documentElement);
    await waitForRenderedItems(page, { targetItems: 30, scrollHeight: 9161 });
    // Get initial mount count.
    // @ts-expect-error - TS2339 - Property 'ITEM_MOUNT_COUNT' does not exist on type 'Window & typeof globalThis'.
    const initialMountCount = await page.evaluate(() => window.ITEM_MOUNT_COUNT);
    expect(initialMountCount).toBeGreaterThan(0);

    // Unmount the grid.
    await clickButton(page, selectors.toggleMount);
    await waitForRenderedItems(page, { targetItems: 0, scrollHeight: 800 });

    // Wait for grid to be unmounted.
    // @ts-expect-error - TS2339 - Property 'ITEM_MOUNT_COUNT' does not exist on type 'Window & typeof globalThis'.
    const updatedMountCount = await page.evaluate(() => window.ITEM_MOUNT_COUNT);
    expect(updatedMountCount).toBe(0);
    await clickButton(page, selectors.toggleMount);

    // Wait for Masonry multi-stage rendering.
    await waitForRenderedItems(page, { targetItemsGTE: 18 });

    // Wait for grid to be remounted. It should only mount 18 items despite
    // there being >100 in the grid.
    // @ts-expect-error - TS2339 - Property 'ITEM_MOUNT_COUNT' does not exist on type 'Window & typeof globalThis'.
    const updatedCount = await page.evaluate(() => window.ITEM_MOUNT_COUNT);
    expect(updatedCount).toBeGreaterThanOrEqual(18);
  });
});
