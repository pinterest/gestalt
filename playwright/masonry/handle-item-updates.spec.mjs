// @flow strict
import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems.mjs';
import getServerURL from './utils/getServerURL.mjs';
import selectors from './utils/selectors.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

test.describe('Masonry: handle item updates', () => {
  test('should correctly update grid item heights', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(getServerURL({ virtualize: true }));
    await waitForRenderedItems(page, { targetItemsGT: 10 });

    // get initial size of first element
    const gridItems1 = await getGridItems(page);
    const itemRect1 = await gridItems1[0].boundingBox();

    // trigger item expand
    const pushTrigger = await page.locator(selectors.expandGridItems);
    await pushTrigger.click();
    await waitForRenderedItems(page, { targetItemsGT: 8 });

    // get new size of first element
    const gridItems2 = await getGridItems(page);
    const itemRect2 = await gridItems2[0].boundingBox();

    // verify that the first element has grown in height
    expect(itemRect2.height).toBeGreaterThan(itemRect1.height);

    // trigger item collapse
    await pushTrigger.click();
    await waitForRenderedItems(page, { targetItemsGT: 10 });

    const gridItems3 = await getGridItems(page);
    const itemRect3 = await gridItems3[0].boundingBox();

    // item height should have reverted to original
    expect(itemRect3.height).toEqual(itemRect1.height);
  });
});
