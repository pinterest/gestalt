import {expect, test} from '@playwright/test';
import getServerURL from './utils/getServerURL';
import selectors from './utils/selectors';

test.describe('Masonry: Update during insertions', () => {
  test('should not throw an error when Masonry is updated during insertions', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(getServerURL({ virtualize: true }));

    const initialErrors = await page.evaluate(() => window.ERROR_COUNT);
    expect(initialErrors).toEqual(0);
    // click the insert null items button
    const insertTrigger = await page.locator(selectors.updateGridItems);
    await insertTrigger.click();

    const afterErrors = await page.evaluate(() => window.ERROR_COUNT);
    expect(afterErrors).toEqual(0);
  });
});
