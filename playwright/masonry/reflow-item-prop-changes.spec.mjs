// @flow strict
import { expect, test } from '@playwright/test';
import selectors from './utils/selectors.mjs';
import getGridItems from './utils/getGridItems.mjs';
import getServerURL from './utils/getServerURL.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

const masonryItemData = [
  { name: 'fake1', height: 100, color: '#f00' },
  { name: 'fake2', height: 200, color: '#f00' },
  { name: 'fake3', height: 300, color: '#f00' },
];

test.describe('Masonry: Item prop changes', () => {
  test('reflows Masonry when changing prop items', async ({ page }) => {
    await page.goto(getServerURL({ finiteLength: true, virtualize: true }));

    const originalItems = await getGridItems(page);
    expect(originalItems.length).toBeGreaterThan(0);

    await page.evaluate((proxiedItemData) => {
      window.dispatchEvent(
        new CustomEvent('set-masonry-items', {
          detail: {
            items: proxiedItemData,
          },
        })
      );
    }, masonryItemData);

    // Wait for the grid to be updated with the new items.
    await page.waitForFunction(
      ({ selector }) => {
        const items = [...document.querySelectorAll(selector)];
        return Boolean(
          // This isn't a conditional?
          // eslint-disable-next-line playwright/no-conditional-in-test
          items.length === 3 && items[0].innerText?.startsWith('fake1')
        );
      },
      { selector: selectors.gridItem },
      { polling: 'raf' }
    );
    await waitForRenderedItems(page, { targetItems: 3 });

    const newItems = await getGridItems(page);
    expect(newItems.length).toBeGreaterThan(0);

    for (let i = 0; i < newItems.length; i += 1) {
      const { height: renderedheight } = await newItems[i].boundingBox();
      const expectedHeight =
        masonryItemData[i].height + 16; /* border size + padding */
      // `item ${i} has a height of ${expectedHeight}`
      expect(renderedheight).toEqual(expectedHeight);
    }
  });

  test('removes all items', async ({ page }) => {
    await page.evaluate(() => {
      window.dispatchEvent(
        new CustomEvent('set-masonry-items', {
          detail: {
            items: [],
          },
        })
      );
    });

    // Wait for the grid to be updated with the new items.
    await waitForRenderedItems(page, { targetItems: 0 });

    const newItems = await getGridItems(page);
    // This isn't a conditional?
    // eslint-disable-next-line playwright/no-conditional-in-test
    expect(!newItems || newItems.length === 0).toBeTruthy();
  });
});
