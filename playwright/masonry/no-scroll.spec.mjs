// @flow strict
import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems.mjs';
import getServerURL from './utils/getServerURL.mjs';

test.describe('Masonry: No scroll', () => {
  test('should do nothing on scroll', async ({ page }) => {
    // First load the page with javascript disabled to get the item position
    await page.setViewportSize({ width: 500, height: 500 });
    await page.goto(getServerURL({ noScroll: true }));

    const serverItems = await getGridItems(page);

    // Check hard-coded value for initial items.
    expect(serverItems.length).toEqual(20); // everything should be shown

    // Scroll a few times to triggle multiple scrolls.
    await page.evaluate(() => {
      const { documentElement } = document;
      return window.scrollTo(
        0,
        (documentElement ? documentElement.scrollHeight : 0) -
          (documentElement ? documentElement.clientHeight : 0)
      );
    });

    await page.evaluate(() => {
      const { documentElement } = document;
      return window.scrollTo(
        0,
        (documentElement ? documentElement.scrollHeight : 0) -
          (documentElement ? documentElement.clientHeight : 0) -
          50
      );
    });

    await page.evaluate(() => {
      const { documentElement } = document;
      return window.scrollTo(
        0,
        (documentElement ? documentElement.scrollHeight : 0) -
          (documentElement ? documentElement.clientHeight : 0)
      );
    });

    const newFetchCount = await page.evaluate(() => window.TEST_FETCH_COUNTS);
    expect(newFetchCount).toBe(0);
  });
});
