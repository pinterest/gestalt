import { expect, test } from '@playwright/test';
import getServerURL from './utils/getServerURL';
import selectors from './utils/selectors';

test.describe('Masonry: Null items', () => {
  // If the execution of the command that runs the test is not
  // on the right directory, the retries will not work, so we need it
  // to be configured here.
  test.describe.configure({retries: 3})

  test('should not throw an error when null/undefined items are inserted', async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 1000 });
    await page.goto(getServerURL({ virtualize: true }));

    // @ts-expect-error - TS2339 - Property 'ERROR_COUNT' does not exist on type 'Window & typeof globalThis'.
    const initialErrors = await page.evaluate(() => window.ERROR_COUNT);
    // expect(initialErrors).toBeFalsy();
    expect(initialErrors).toEqual(0);

    // click the insert null items button
    const insertTrigger = await page.locator(selectors.insertNullItems);
    await insertTrigger.click();

    // @ts-expect-error - TS2339 - Property 'ERROR_COUNT' does not exist on type 'Window & typeof globalThis'.
    const afterErrors = await page.evaluate(() => window.ERROR_COUNT);
    expect(afterErrors).toEqual(0);
  });
});
