import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems';
import getServerURL from './utils/getServerURL';

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
        // eslint-disable-next-line playwright/no-conditional-in-test
        (documentElement ? documentElement.scrollHeight : 0) -
          // eslint-disable-next-line playwright/no-conditional-in-test
          (documentElement ? documentElement.clientHeight : 0),
      );
    });

    await page.evaluate(() => {
      const { documentElement } = document;
      return window.scrollTo(
        0,
        // eslint-disable-next-line playwright/no-conditional-in-test
        (documentElement ? documentElement.scrollHeight : 0) -
          // eslint-disable-next-line playwright/no-conditional-in-test
          (documentElement ? documentElement.clientHeight : 0) -
          50,
      );
    });

    await page.evaluate(() => {
      const { documentElement } = document;
      return window.scrollTo(
        0,
        // eslint-disable-next-line playwright/no-conditional-in-test
        (documentElement ? documentElement.scrollHeight : 0) -
          // eslint-disable-next-line playwright/no-conditional-in-test
          (documentElement ? documentElement.clientHeight : 0),
      );
    });

    // @ts-expect-error - TS2339 - Property 'TEST_FETCH_COUNTS' does not exist on type 'Window & typeof globalThis'.
    const newFetchCount = await page.evaluate(() => window.TEST_FETCH_COUNTS);
    expect(newFetchCount).toBe(0);
  });
});
