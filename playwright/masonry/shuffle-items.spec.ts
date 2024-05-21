import { expect, Page, test } from '@playwright/test';
import getGridItems from './utils/getGridItems';
import getServerURL from './utils/getServerURL';
import selectors from './utils/selectors';
import waitForRenderedItems from './utils/waitForRenderedItems';

const getItemColumnMap = async (page: Page) => {
  const gridItems = await getGridItems(page);
  const itemLeftMap: Record<string, any> = {};

  for (let i = 0; i < gridItems.length; i += 1) {
    const boundingBox = await gridItems[i].boundingBox();
    if (boundingBox) {
      itemLeftMap[boundingBox.x] = itemLeftMap[boundingBox.x] || [];
      itemLeftMap[boundingBox.x].push({
        ...boundingBox,
        itemIndex: i,
        text: await gridItems[i].textContent(),
      });
    }
  }

  return itemLeftMap;
};

test.describe('Masonry > Shuffle items', () => {
  test('should reflow the grid when items are shuffled', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(getServerURL({ manualFetch: true }));
    await waitForRenderedItems(page, { targetItems: 20 });

    const originalItemMap = await getItemColumnMap(page);

    const shuffleTrigger = await page.locator(selectors.shuffleItems);
    await shuffleTrigger.click();

    await waitForRenderedItems(page, { targetItems: 20 });

    const newItemMap = await getItemColumnMap(page);
    // assert that the first row of items has changed
    Object.keys(originalItemMap).forEach((col) => {
      expect(originalItemMap[col][0].text).not.toEqual(newItemMap[col][0].text);
    });
  });
});
