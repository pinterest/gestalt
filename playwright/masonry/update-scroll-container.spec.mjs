// @flow strict
import { expect, test } from '@playwright/test';
import selectors from './utils/selectors.mjs';
import getGridItems from './utils/getGridItems.mjs';
import getServerURL from './utils/getServerURL.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

test.describe('Masonry: Update scroll container', () => {
  test('should handle updating the scroll container', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(getServerURL({ virtualize: true }));
    await waitForRenderedItems(page, { targetItems: 18, scrollHeight: 3412 });

    // Scroll container should be set to window initially.
    let gridItems = await getGridItems(page);
    let firstItemText = await gridItems[0].innerText();
    expect(firstItemText).toMatch('InitialPin 0');

    // Toggle the scroll container.
    const trigger = await page.locator(selectors.toggleScrollContainer);
    await trigger.click();

    await waitForRenderedItems(page, { targetItems: 12 });

    // Update scroll container and scroll back to 0.
    await page.evaluate((scrollContainer) => {
      const container = document.querySelector(scrollContainer);

      // eslint-disable-next-line playwright/no-conditional-in-test
      if (container) {
        container.scrollTop = 1500;
      }
    }, selectors.scrollContainer);

    // Wait for a re-render with new virtual bounds.
    await waitForRenderedItems(page, { targetItems: 15 });

    gridItems = await getGridItems(page);
    firstItemText = await gridItems[0].innerText();
    expect(firstItemText).toMatch('InitialPin 15');
  });
});
