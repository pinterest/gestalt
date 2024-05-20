import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems';
import getServerURL from './utils/getServerURL';
import selectors from './utils/selectors';
import waitForRenderedItems from './utils/waitForRenderedItems';

const masonryItemData = [
  { name: 'fake1', height: 100, color: '#f00' },
  { name: 'fake2', height: 200, color: '#f00' },
  { name: 'fake3', height: 300, color: '#f00' },
];

test.describe('Masonry: Item prop removal', () => {
  test('updates Masonry when items are removed', async ({ page }) => {
    await page.goto(getServerURL({ finiteLength: true, virtualize: true }));

    const originalItems = await getGridItems(page);
    expect(originalItems.length).toBeGreaterThan(0);

    // Relay the fake items data to the host page.
    await page.evaluate((proxiedItemData) => {
      // @ts-expect-error - TS2339 - Property 'TEST_MASONRY_ITEMS' does not exist on type 'Window & typeof globalThis'.
      window.TEST_MASONRY_ITEMS = proxiedItemData;
    }, masonryItemData);

    // Set the fake items data in Masonry.
    await page.evaluate(() => {
      window.dispatchEvent(
        new CustomEvent('set-masonry-items', {
          detail: {
            // @ts-expect-error - TS2339 - Property 'TEST_MASONRY_ITEMS' does not exist on type 'Window & typeof globalThis'.
            items: window.TEST_MASONRY_ITEMS,
          },
        }),
      );
    });

    // Wait for the grid to be updated with the new items.
    await page.waitForFunction(
      ({ selector }) => {
        // @ts-expect-error - TS2488 - Type 'NodeListOf<Element>' must have a '[Symbol.iterator]()' method that returns an iterator.
        const items = [...document.querySelectorAll(selector)];
        return Boolean(
          // This isn't a conditional?
          // eslint-disable-next-line playwright/no-conditional-in-test
          items.length === 3 && items[0].innerText?.startsWith('fake1'),
        );
      },
      { selector: selectors.gridItem },
      { polling: 'raf' },
    );
    await waitForRenderedItems(page, { targetItems: 3 });

    const newItems = await getGridItems(page);
    expect(newItems.length).toEqual(3);

    // Remove an item (3 -> 2).
    await page.evaluate(() => {
      window.dispatchEvent(
        new CustomEvent('set-masonry-items', {
          detail: {
            // @ts-expect-error - TS2339 - Property 'TEST_MASONRY_ITEMS' does not exist on type 'Window & typeof globalThis'.
            items: window.TEST_MASONRY_ITEMS.slice(0, 2),
          },
        }),
      );
    });

    // Wait for the grid to be updated with the new items.
    await page.waitForFunction(
      ({ selector }) => {
        // @ts-expect-error - TS2488 - Type 'NodeListOf<Element>' must have a '[Symbol.iterator]()' method that returns an iterator.
        const items = [...document.querySelectorAll(selector)];
        return Boolean(
          // This isn't a conditional?
          // eslint-disable-next-line playwright/no-conditional-in-test
          items.length === 2 && items[0].innerText?.startsWith('fake1'),
        );
      },
      { selector: selectors.gridItem },
      { polling: 'raf' },
    );
    await waitForRenderedItems(page, { targetItems: 2 });

    const nextItems = await getGridItems(page);
    expect(nextItems.length).toEqual(2);
  });
});
