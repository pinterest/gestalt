// @flow strict
import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems.mjs';
import getServerURL from './utils/getServerURL.mjs';
import getStaticGridItems from './utils/getStaticGridItems.mjs';

test.describe('Masonry: slot index', () => {
  test('should start slot index at 0', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(getServerURL({ virtualize: true, deferMount: true }));

    // first item should have a slot index of 0 and increase from there
    // server render pass
    let gridItems = await getStaticGridItems(page);
    for (let i = 0; i < gridItems.length; i += 1) {
      const text = await gridItems[i].textContent();
      expect(text).toMatch(`Slot Index: ${i}`);
    }

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    // client hydration pass
    gridItems = await getGridItems(page);
    for (let i = 0; i < gridItems.length; i += 1) {
      const text = await gridItems[i].textContent();
      expect(text).toMatch(`Slot Index: ${i}`);
    }
  });
});
