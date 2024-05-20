// @flow strict
import { expect, test } from '@playwright/test';
import getServerURL from './utils/getServerURL';
import selectors from './utils/selectors';

test.describe('Masonry: two columns module', () => {
  test('render the two column module', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto(
      getServerURL({
        manualFetch: true,
        twoColItems: true,
      }),
    );

    // The two modules items appear after the 50th pin, we add at least 60 items
    const addItemsButton = await page.locator(selectors.addItems);
    await addItemsButton.click();
    await addItemsButton.click();
    await addItemsButton.click();

    await expect(page.getByText('columnSpan: 2')).toBeVisible();
  });

  test('render the two column module on second batch with hydration', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto(
      getServerURL({
        manualFetch: true,
        twoColItems: true,
      }),
    );

    const testItems = [
      { name: 'Pin 0', height: 200, color: '#E230BA' },
      { name: 'Pin 1', height: 202, color: '#FAB032' },
      { name: 'Pin 2', height: 206, color: '#EDF21D' },
      { name: 'Pin 3', height: 204, color: '#CF4509' },
      { name: 'Pin 4', height: 205, color: '#230BAF' },
      { name: 'Pin 5', height: 209, color: '#67076F' },
      { name: 'Pin 6', height: 207, color: '#AB032E' },
      { name: 'Pin 7', height: 208, color: '#DF21DC' },
      { name: 'Pin 8', height: 209, color: '#F45098' },
      { name: 'Pin 9', height: 201, color: '#F67076', columnSpan: 2 },
      { name: 'Pin 10', height: 209, color: '#67076F' },
      { name: 'Pin 11', height: 207, color: '#AB032E' },
      { name: 'Pin 12', height: 208, color: '#DF21DC' },
      { name: 'Pin 13', height: 209, color: '#F45098' },
      { name: 'Pin 14', height: 200, color: '#E230BA' },
      { name: 'Pin 15', height: 202, color: '#FAB032' },
    ];

    const toogleMountButton = await page.locator(selectors.toggleMount);
    await toogleMountButton.click();

    await page.evaluate((proxiedItemData) => {
      window.dispatchEvent(
        new CustomEvent('set-masonry-items', {
          detail: {
            items: proxiedItemData,
          },
        }),
      );
    }, testItems);

    await toogleMountButton.click();

    await expect(page.getByText('columnSpan: 2')).toBeVisible();
  });
});
