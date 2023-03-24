// @flow strict
import { expect, test } from '@playwright/test';
import getServerURL from './utils/getServerURL.mjs';
import selectors from './utils/selectors.mjs';

test.describe('Masonry: Null items', () => {
  test('should not throw an error when null/undefined items are inserted', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1000, height: 1000 });
    await page.goto(getServerURL({ virtualize: true }));

    const initialErrors = await page.evaluate(() => window.ERROR_COUNT);
    expect(initialErrors).toEqual(0);

    // click the insert null items button
    const insertTrigger = await page.locator(selectors.insertNullItems);
    await insertTrigger.click();

    const afterErrors = await page.evaluate(() => window.ERROR_COUNT);
    expect(afterErrors).toEqual(0);
  });
});
