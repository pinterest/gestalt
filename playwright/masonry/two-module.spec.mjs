// @flow strict
import { expect, test } from '@playwright/test';
import getServerURL from './utils/getServerURL.mjs';
import selectors from './utils/selectors.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

test.describe('Masonry: two colums module', () => {
  test('render the two column module', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto(
      getServerURL({
        manualFetch: true,
        twoColItems: true,
      })
    );

    // The two modules items appear after the 50th pin, we add at least 60 items
    const addItemsButton = await page.locator(selectors.addItems);
    await addItemsButton.click();
    await addItemsButton.click();
    await addItemsButton.click();

    await expect(page.getByText('columnSpan: 2')).toBeVisible();
  });

  test('position two module on specific place', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto(
      getServerURL({
        manualFetch: true,
        twoColItems: true,
      })
    );

    const addItemsButton = await page.locator(selectors.addItems);
    await addItemsButton.click();
    await addItemsButton.click();

    const masonryItemData = [
      { name: 'fake1', height: 100, color: '#f00' },
      { name: 'fake2', height: 200, color: '#f00' },
      { name: 'fake3', height: 300, color: '#f00', columnSpan: 2 },
    ];

    await page.evaluate((proxiedItemData) => {
      window.dispatchEvent(
        new CustomEvent('set-masonry-items', {
          detail: {
            items: proxiedItemData,
            index: 5,
          },
        })
      );
    }, masonryItemData);

    await expect(page.getByText('columnSpan: 2')).toBeVisible();
  });
});
