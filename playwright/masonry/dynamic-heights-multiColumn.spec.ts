import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems';
import getServerURL from './utils/getServerURL';
import selectors from './utils/selectors';
import waitForRenderedItems from './utils/waitForRenderedItems';

function getExpectedDelta({ itemToResize, newHeight, itemToReposition }) {
  const gutter = 16;
  const newY = itemToResize.y + newHeight + gutter;
  const delta = newY - itemToReposition.y;

  return delta;
}

test.describe('Masonry: Dynamic heights with multi-columns items', () => {
  test(`Resizing the item 2 (415px), it should affect 0 items`, async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 1700 });
    await page.goto(
      getServerURL({
        dynamicHeights: true,
        dynamicHeightsV2: true,
        fixedThreeColItems: true,
        manualFetch: true,
      }),
    );
    await waitForRenderedItems(page, { targetItems: 40 });

    const itemIndexToResize = 2;
    const newHeight = 415;

    const gridItemsBefore = await getGridItems(page);
    expect(gridItemsBefore.length).toBe(40);

    // Check size of initial grid items.
    const originalItemsPositions = await Promise.all(
      gridItemsBefore.map((gridItemAfter) => gridItemAfter.boundingBox()),
    );

    const itemToResize = gridItemsBefore[itemIndexToResize];

    // Resize the item
    await itemToResize.evaluate((node, height) => {
      const element = node as HTMLElement;
      (element.children[0].children[0].children[0] as HTMLElement).style.height = `${height}px`;
    }, newHeight);

    // Masonry will re-position the items below the resized item. Unfortunately, using
    // waitForRenderedItems doesn't work because we're not adding or removing
    // any items and waitForRenderedItems could return before the actual re-layout
    // happens. Instead, we wait for the item to actually change it's position.
    await page.waitForFunction(
      ({ selector, currentItemHeight, item }) => {
        const gridItem = document.querySelectorAll(selector)[item];

        const rect = gridItem?.getBoundingClientRect();
        return rect?.height !== currentItemHeight;
      },
      {
        selector: selectors.gridItem,
        currentItemHeight: originalItemsPositions[itemIndexToResize]?.height,
        item: itemIndexToResize,
      },
      { polling: 'raf' },
    );

    // After resposition, Masonry will remeasure/layout.
    await waitForRenderedItems(page, { targetItems: 40 });

    // Test item size.
    const gridItemsAfter = await getGridItems(page);
    expect(gridItemsAfter.length).toBe(40);

    const newItemsPositions = await Promise.all(
      gridItemsAfter.map((gridItemAfter) => gridItemAfter.boundingBox()),
    );
    expect(newItemsPositions[itemIndexToResize]?.height).toBe(newHeight + 16);

    for (let i = 0; i < originalItemsPositions.length; i += 1) {
      expect(newItemsPositions[i].y).toBe(originalItemsPositions[i].y);
    }
  });

  [
    {
      itemIndexToResize: 5,
      itemIndexToReposition: 9,
      newHeight: 400,
      affectedItemsIndex: [
        9, 10, 11, 12, 15, 16, 19, 20, 21, 23, 22, 24, 25, 28, 29, 30, 31, 33, 34, 35, 36, 38, 39,
      ],
    },
    {
      itemIndexToResize: 7,
      itemIndexToReposition: 13,
      newHeight: 415,
      affectedItemsIndex: [13, 18],
    },
    {
      itemIndexToResize: 7,
      itemIndexToReposition: 13,
      newHeight: 500,
      affectedItemsIndex: [13, 18, 21, 23, 24, 25, 29, 30, 31, 33, 34, 36, 38, 39],
    },
    {
      itemIndexToResize: 9,
      itemIndexToReposition: 10,
      newHeight: 400,
      affectedItemsIndex: [
        10, 11, 12, 15, 16, 19, 20, 21, 23, 22, 24, 25, 28, 29, 30, 31, 33, 34, 35, 36, 38, 39,
      ],
    },
    {
      itemIndexToResize: 20,
      itemIndexToReposition: 22,
      newHeight: 250,
      affectedItemsIndex: [22, 28, 35],
    },
  ].forEach(({ itemIndexToResize, newHeight, affectedItemsIndex, itemIndexToReposition }) => {
    test(`Resizing the item ${itemIndexToResize} (${newHeight}px), it should affect ${affectedItemsIndex.length} items`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1200, height: 1700 });
      await page.goto(
        getServerURL({
          dynamicHeights: true,
          dynamicHeightsV2: true,
          fixedThreeColItems: true,
          manualFetch: true,
        }),
      );
      await waitForRenderedItems(page, { targetItems: 40 });

      const gridItemsBefore = await getGridItems(page);

      // Check size of initial grid items.
      const originalItemsPositions = await Promise.all(
        gridItemsBefore.map((gridItemAfter) => gridItemAfter.boundingBox()),
      );

      const expectedDeltaReposition = getExpectedDelta({
        itemToResize: originalItemsPositions[itemIndexToResize],
        newHeight,
        itemToReposition: originalItemsPositions[itemIndexToReposition],
      });

      const itemToResize = gridItemsBefore[itemIndexToResize];

      // Resize the item
      await itemToResize.evaluate((node, height) => {
        const element = node as HTMLElement;
        (element.children[0].children[0].children[0] as HTMLElement).style.height = `${height}px`;
      }, newHeight);

      // Masonry will re-position the items below the resized item. Unfortunately, using
      // waitForRenderedItems doesn't work because we're not adding or removing
      // any items and waitForRenderedItems could return before the actual re-layout
      // happens. Instead, we wait for the item to actually change it's position.
      await page.waitForFunction(
        ({ selector, previousItemY, item, expectedDelta }) => {
          const gridItem = document.querySelectorAll(selector)[item];

          const rect = gridItem?.getBoundingClientRect();
          return rect?.y === previousItemY + expectedDelta;
        },
        {
          selector: selectors.gridItem,
          previousItemY: originalItemsPositions[itemIndexToReposition].y,
          item: itemIndexToReposition,
          expectedDelta: expectedDeltaReposition,
        },
        { polling: 'raf' },
      );

      // After resposition, Masonry will remeasure/layout.
      await waitForRenderedItems(page, { targetItems: 40 });

      // Test item size.
      const gridItemsAfter = await getGridItems(page);
      expect(gridItemsAfter.length).toBe(40);

      const newItemsPositions = await Promise.all(
        gridItemsAfter.map((gridItemAfter) => gridItemAfter.boundingBox()),
      );
      expect(newItemsPositions[itemIndexToResize]?.height).toBe(newHeight + 16);

      const DELTA =
        newItemsPositions[itemIndexToResize].height -
        originalItemsPositions[itemIndexToResize].height;
      const affectedItemsOrinals = originalItemsPositions.filter((_, index) =>
        affectedItemsIndex.includes(index),
      );
      const affectedItemsNew = newItemsPositions.filter((_, index) =>
        affectedItemsIndex.includes(index),
      );
      const unaffectedItemsOriginals = originalItemsPositions.filter(
        (_, index) => !affectedItemsIndex.includes(index),
      );
      const unaffectedItemsNew = newItemsPositions.filter(
        (_, index) => !affectedItemsIndex.includes(index),
      );

      for (let i = 0; i < unaffectedItemsOriginals.length; i += 1) {
        expect(unaffectedItemsNew[i].y).toBe(unaffectedItemsOriginals[i].y);
      }

      for (let i = 0; i < affectedItemsOrinals.length; i += 1) {
        expect(affectedItemsNew[i].y).toBeGreaterThan(affectedItemsOrinals[i].y);
        expect(affectedItemsNew[i].y).toBeLessThanOrEqual(affectedItemsOrinals[i].y + DELTA);
      }
    });
  });

  [
    {
      itemsIndexToResize: [2, 13],
      itemsIndexToReposition: [9, 18],
      newHeights: [500, 350],
      affectedItemsIndex: [
        [9, 10, 11, 12, 15, 16, 19, 20, 21, 22, 23, 24, 25, 28, 29, 30, 31, 33, 34, 35, 36, 38, 39],
        [18],
      ],
    },
    {
      itemsIndexToResize: [2, 13],
      itemsIndexToReposition: [9, 18],
      newHeights: [500, 500],
      affectedItemsIndex: [
        [9, 10, 11, 12, 15, 16, 19, 20, 21, 22, 23, 24, 25, 28, 29, 30, 31, 33, 34, 35, 36, 38, 39],
        [18, 21, 23, 24, 25, 29, 30, 31, 33, 34, 36, 38, 39],
      ],
    },
    {
      itemsIndexToResize: [15, 17],
      itemsIndexToReposition: [20, 26],
      newHeights: [353, 550],
      affectedItemsIndex: [
        [20, 22, 28, 35],
        [26, 27, 32, 37],
      ],
    },
    {
      itemsIndexToResize: [0, 3],
      itemsIndexToReposition: [7, 6],
      newHeights: [400, 300],
      affectedItemsIndex: [
        [7, 13, 18, 21, 23, 24, 25, 29, 30, 31, 33, 34, 36, 38, 39],
        [6, 9, 10, 11, 12, 15, 16, 19, 20, 22, 28, 35],
      ],
    },
    {
      itemsIndexToResize: [0, 3],
      itemsIndexToReposition: [7, 6],
      newHeights: [300, 300],
      affectedItemsIndex: [
        [7, 13, 18, 21, 23, 24, 25, 29, 30, 31, 33, 34, 36, 38, 39],
        [
          6, 9, 10, 11, 12, 15, 16, 19, 20, 21, 22, 23, 24, 25, 28, 29, 30, 31, 33, 34, 35, 36, 38,
          39,
        ],
      ],
    },
  ].forEach(({ itemsIndexToResize, newHeights, affectedItemsIndex, itemsIndexToReposition }) => {
    test(`Resizing the items ${itemsIndexToResize[0]} and ${itemsIndexToResize[1]}, it should affect ${affectedItemsIndex[0].length} and ${affectedItemsIndex[1].length} items`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1200, height: 1700 });
      await page.goto(
        getServerURL({
          dynamicHeights: true,
          dynamicHeightsV2: true,
          fixedThreeColItems: true,
          manualFetch: true,
        }),
      );
      await waitForRenderedItems(page, { targetItems: 40 });

      const gridItemsBefore = await getGridItems(page);
      expect(gridItemsBefore.length).toBe(40);

      // Check size of initial grid items.
      const originalItemsPositions = await Promise.all(
        gridItemsBefore.map((gridItemAfter) => gridItemAfter.boundingBox()),
      );

      const expectedDeltaFirstReposition = getExpectedDelta({
        itemToResize: originalItemsPositions[itemsIndexToResize[0]],
        newHeight: newHeights[0],
        itemToReposition: originalItemsPositions[itemsIndexToReposition[0]],
      });

      const itemToResizeFirst = gridItemsBefore[itemsIndexToResize[0]];

      // Resize the item
      await itemToResizeFirst.evaluate((node, height) => {
        const element = node as HTMLElement;
        (element.children[0].children[0].children[0] as HTMLElement).style.height = `${height}px`;
      }, newHeights[0]);

      // Masonry will re-position the items below the resized item. Unfortunately, using
      // waitForRenderedItems doesn't work because we're not adding or removing
      // any items and waitForRenderedItems could return before the actual re-layout
      // happens. Instead, we wait for the item to actually change it's position.
      await page.waitForFunction(
        ({ selector, previousItemY, item, expectedDelta }) => {
          const gridItem = document.querySelectorAll(selector)[item];

          const rect = gridItem?.getBoundingClientRect();
          return rect?.y === previousItemY + expectedDelta;
        },
        {
          selector: selectors.gridItem,
          previousItemY: originalItemsPositions[itemsIndexToReposition[0]].y,
          item: itemsIndexToReposition[0],
          expectedDelta: expectedDeltaFirstReposition,
        },
        { polling: 'raf' },
      );

      // After resposition, Masonry will remeasure/layout.
      await waitForRenderedItems(page, { targetItems: 40 });

      // Test item size.
      const gridItemsAfterFirstResize = await getGridItems(page);
      expect(gridItemsAfterFirstResize.length).toBe(40);

      const firstRepositionItemsPositions = await Promise.all(
        gridItemsAfterFirstResize.map((gridItemAfter) => gridItemAfter.boundingBox()),
      );
      expect(firstRepositionItemsPositions[itemsIndexToResize[0]]?.height).toBe(newHeights[0] + 16);

      const FIRST_DELTA =
        firstRepositionItemsPositions[itemsIndexToResize[0]].height -
        originalItemsPositions[itemsIndexToResize[0]].height;
      const affectedItemsOrinals = originalItemsPositions.filter((_, index) =>
        affectedItemsIndex[0].includes(index),
      );
      const affectedItemsFirstReposition = firstRepositionItemsPositions.filter((_, index) =>
        affectedItemsIndex[0].includes(index),
      );
      const unaffectedItemsOriginals = originalItemsPositions.filter(
        (_, index) => !affectedItemsIndex[0].includes(index),
      );
      const unaffectedItemsFirstReposition = firstRepositionItemsPositions.filter(
        (_, index) => !affectedItemsIndex[0].includes(index),
      );

      for (let i = 0; i < unaffectedItemsOriginals.length; i += 1) {
        expect(unaffectedItemsFirstReposition[i].y).toBe(unaffectedItemsOriginals[i].y);
      }

      for (let i = 0; i < affectedItemsOrinals.length; i += 1) {
        expect(affectedItemsFirstReposition[i].y).toBeGreaterThan(affectedItemsOrinals[i].y);
        expect(affectedItemsFirstReposition[i].y).toBeLessThanOrEqual(
          affectedItemsOrinals[i].y + FIRST_DELTA,
        );
      }

      // * Second Resize
      const itemToResizeSecond = gridItemsBefore[itemsIndexToResize[1]];

      // Resize the item
      await itemToResizeSecond.evaluate((node, height) => {
        const element = node as HTMLElement;
        (element.children[0].children[0].children[0] as HTMLElement).style.height = `${height}px`;
      }, newHeights[1]);

      const expectedDeltaSecondReposition = getExpectedDelta({
        itemToResize: originalItemsPositions[itemsIndexToResize[1]],
        newHeight: newHeights[1],
        itemToReposition: originalItemsPositions[itemsIndexToReposition[1]],
      });

      // Masonry will re-position the items below the resized item. Unfortunately, using
      // waitForRenderedItems doesn't work because we're not adding or removing
      // any items and waitForRenderedItems could return before the actual re-layout
      // happens. Instead, we wait for the item to actually change it's position.
      await page.waitForFunction(
        ({ selector, previousItemY, item, expectedDelta }) => {
          const gridItem = document.querySelectorAll(selector)[item];

          const rect = gridItem?.getBoundingClientRect();
          return rect?.y === previousItemY + expectedDelta;
        },
        {
          selector: selectors.gridItem,
          previousItemY: originalItemsPositions[itemsIndexToReposition[1]].y,
          item: itemsIndexToReposition[1],
          expectedDelta: expectedDeltaSecondReposition,
        },
        { polling: 'raf' },
      );

      // After resposition, Masonry will remeasure/layout.
      await waitForRenderedItems(page, { targetItems: 40 });

      // Test item size.
      const gridItemsAfterSecondResize = await getGridItems(page);
      expect(gridItemsAfterSecondResize.length).toBe(40);

      const secondRepositionItemsPositions = await Promise.all(
        gridItemsAfterSecondResize.map((gridItemAfter) => gridItemAfter.boundingBox()),
      );
      expect(secondRepositionItemsPositions[itemsIndexToResize[1]]?.height).toBe(
        newHeights[1] + 16,
      );

      const SECOND_DELTA =
        secondRepositionItemsPositions[itemsIndexToResize[1]].height -
        originalItemsPositions[itemsIndexToResize[1]].height;
      const affectedItemsOriginalsSecondReposition = firstRepositionItemsPositions.filter(
        (_, index) => affectedItemsIndex[1].includes(index),
      );
      const affectedItemsSecondReposition = secondRepositionItemsPositions.filter((_, index) =>
        affectedItemsIndex[1].includes(index),
      );
      const unaffectedItemsOriginalSecondReposition = firstRepositionItemsPositions.filter(
        (_, index) => !affectedItemsIndex[1].includes(index),
      );
      const unaffectedItemsSecondReposition = secondRepositionItemsPositions.filter(
        (_, index) => !affectedItemsIndex[1].includes(index),
      );

      for (let i = 0; i < unaffectedItemsOriginalSecondReposition.length; i += 1) {
        expect(unaffectedItemsSecondReposition[i].y).toBe(
          unaffectedItemsOriginalSecondReposition[i].y,
        );
      }

      for (let i = 0; i < affectedItemsOriginalsSecondReposition.length; i += 1) {
        expect(affectedItemsSecondReposition[i].y).toBeGreaterThan(
          affectedItemsOriginalsSecondReposition[i].y,
        );
        expect(affectedItemsSecondReposition[i].y).toBeLessThanOrEqual(
          affectedItemsOriginalsSecondReposition[i].y + SECOND_DELTA,
        );
      }
    });
  });
});
