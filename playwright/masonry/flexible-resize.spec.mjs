// @flow strict
import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems.mjs';
import getServerURL from './utils/getServerURL.mjs';
import resizeWidth from './utils/resizeWidth.mjs';
import selectors from './utils/selectors.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

// $FlowFixMe[unclear-type]
async function getItemColumnMap(gridItems: any) {
  const itemLeftMap = {};
  for (let i = 0; i < gridItems.length; i += 1) {
    const boundingBox = await gridItems[i].boundingBox();
    if (boundingBox) {
      itemLeftMap[boundingBox.x] = itemLeftMap[boundingBox.x] || [];
      itemLeftMap[boundingBox.x].push({
        ...boundingBox,
        itemIndex: i,
        text: await gridItems[i].innerText(),
      });
    }
  }

  return itemLeftMap;
}

test.describe('Masonry: flexible resize', () => {
  test('should resize item width and height on window resize', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(getServerURL({ flexible: true }));
    await waitForRenderedItems(page, { targetItems: 40 });

    // Test item size.
    const gridItemsBefore = await getGridItems(page);
    expect(gridItemsBefore.length).toBe(40);

    const itemRectsBefore = await Promise.all(
      gridItemsBefore.map((gridItemBefore) => gridItemBefore.boundingBox())
    );
    // expect(itemRectsBefore[0].width).toBe(266);
    expect(itemRectsBefore[0].height).toBe(216);

    // Check size of initial grid items.
    const originalItemMap = await getItemColumnMap(gridItemsBefore);
    const originalColumns = Object.keys(originalItemMap);

    // Trigger slight resize -- enough to resize, but not reflow columns. Mock
    // out the window width for the next resize calculation. Wait for debounce.
    await resizeWidth(page, 820);

    // Masonry will re-layout after the resize. Unfortunately, using
    // waitForRenderedItems doesn't work because we're not adding or removing
    // any items and waitForRenderedItems could return before the actual
    // re-layout happens. Instead, we wait for the first item to actually change
    // size.
    await page.waitForFunction(
      ({ selector, previousItemWidth }) => {
        const gridItem = document.querySelector(selector);

        const rect = gridItem?.getBoundingClientRect();
        return rect?.width !== previousItemWidth;
      },
      {
        selector: selectors.gridItem,
        previousItemWidth: itemRectsBefore[0].width,
      },
      { polling: 'raf' }
    );

    // After resize, Masonry will remeasure/layout.
    await waitForRenderedItems(page, { targetItems: 40 });

    // Test item size.
    const gridItemsAfter = await getGridItems(page);
    expect(gridItemsAfter.length).toBe(40);

    const itemRectsAfter = await Promise.all(
      gridItemsAfter.map((gridItemAfter) => gridItemAfter.boundingBox())
    );
    expect(itemRectsAfter[0].width).toBe(273);
    expect(itemRectsAfter[0].height).toBe(216);

    // Get new sizes of grid items.
    const newItemMap = await getItemColumnMap(gridItemsAfter);
    const newColumns = Object.keys(newItemMap);

    for (let i = 0; i < originalColumns.length; i += 1) {
      const originalCol = originalItemMap[originalColumns[i]];
      const newCol = newItemMap[newColumns[i]];
      // $FlowFixMe[missing-local-annot]
      originalCol.forEach((item, row: number) => {
        const newItem = newCol[row];
        expect(newItem).not.toBeUndefined();
        expect(item.text).toEqual(newItem.text);
        expect(item.height).toEqual(newItem.height);
        expect(item.width).not.toEqual(newItem.width);
      });
    }
  });
});
