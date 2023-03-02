// @flow strict
import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems.mjs';
import getServerURL from './utils/getServerURL.mjs';
import selectors from './utils/selectors.mjs';

test.describe('Masonry: Render height', () => {
  test('allows items to be positioned under the grid', async ({ page }) => {
    await page.goto(getServerURL({ virtualize: true, finiteLength: true }));

    const gridItems = await getGridItems(page);
    expect(gridItems.length).toBeGreaterThan(0);

    let bottomItem = 0;
    for (let i = 0; i < gridItems.length; i += 1) {
      const itemRect = await gridItems[i].boundingBox();
      // eslint-disable-next-line playwright/no-conditional-in-test
      if (itemRect.y > bottomItem) {
        bottomItem = itemRect.y + itemRect.height;
      }
    }

    const afterGrid = await page.locator(selectors.afterGrid);
    const afterGridRect = await afterGrid.boundingBox();
    expect(afterGridRect.y).toBeGreaterThanOrEqual(bottomItem);
  });
});
