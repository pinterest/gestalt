// @flow strict
import { expect, test } from '@playwright/test';
import getServerURL from './utils/getServerURL.mjs';
import selectors from './utils/selectors.mjs';

test.describe('Masonry: two columns module', () => {
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
});
