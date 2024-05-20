import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems';
import getServerURL from './utils/getServerURL';
import selectors from './utils/selectors';
import waitForRenderedItems from './utils/waitForRenderedItems';

test.describe('Masonry: handle offset update', () => {
  test('should correctly account for relative position changes', async ({ page }) => {
    let gridItems;
    let firstItemText;

    // First load the page with javascript disabled to get the item position
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(getServerURL({ virtualize: true }));
    await waitForRenderedItems(page, { scrollHeight: 3412 });

    const pushTrigger = await page.locator(selectors.pushGridDown);
    await pushTrigger.click();

    await page.evaluate(() => window.scrollTo(0, 500));
    await waitForRenderedItems(page, { scrollHeight: 4412 });
    gridItems = await getGridItems(page);
    firstItemText = await gridItems[0].innerText();
    expect(firstItemText).toMatch('InitialPin 0');

    await page.evaluate(() => window.scrollTo(0, 1000));
    await waitForRenderedItems(page, { scrollHeight: 4412 });
    gridItems = await getGridItems(page);
    firstItemText = await gridItems[0].innerText();
    expect(firstItemText).toMatch('InitialPin 0');
  });
});
