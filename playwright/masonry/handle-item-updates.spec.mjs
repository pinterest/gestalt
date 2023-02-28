// @flow strict
import { expect, test } from '@playwright/test';
import selectors from './utils/selectors.mjs';
import getServerURL from './utils/getServerURL.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

test.describe('Masonry: handle item updates', () => {
  test('should correctly update grid item heights', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(getServerURL({ virtualize: true }));
    await waitForRenderedItems(page, { targetItems: 18, scrollHeight: 3412 });

    // get initial size of first element
    const gridItems1 = await page.locator(selectors.gridItem);
    const itemRect1 = await gridItems1[0].boundingBox();

    // trigger item expand
    const pushTrigger = await page.locator(selectors.expandGridItems);
    await pushTrigger.click();
    await waitForRenderedItems(page, { targetItems: 12, scrollHeight: 4812 });

    // get new size of first element
    const gridItems2 = await page.locator(selectors.gridItem);
    const itemRect2 = await gridItems2[0].boundingBox();

    // verify that the first element has grown in height
    expect(itemRect2.height).toBeGreaterThan(itemRect1.height);

    // trigger item collapse
    await pushTrigger.click();
    await waitForRenderedItems(page, { targetItems: 18, scrollHeight: 3412 });

    const gridItems3 = await page.locator(selectors.gridItem);
    const itemRect3 = await gridItems3[0].boundingBox();

    // item height should have reverted to original
    expect(itemRect3.height).toEqual(itemRect1.height);
  });
});
