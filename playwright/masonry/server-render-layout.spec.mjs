// @flow strict
import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems.mjs';
import getServerURL from './utils/getServerURL.mjs';
import getStaticGridItems from './utils/getStaticGridItems.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

test.describe('Masonry: Server Render Layout', () => {
  test('renders items in the same position on the server and after mounting', async ({
    page,
  }) => {
    // First load the page with javascript disabled to get the item position
    await page.setViewportSize({ width: 1000, height: 1000 });
    await page.goto(getServerURL({ virtualize: true, deferMount: true }));

    const serverItems = await getStaticGridItems(page);

    // Hard-coded value for initial items in server.js
    expect(serverItems.length).toEqual(20);

    const serverItem1Rect = await serverItems[0].boundingBox();
    const serverItem2Rect = await serverItems[1].boundingBox();
    const serverItem1Text = await serverItems[0].textContent();
    const serverItem2Text = await serverItems[1].textContent();

    expect(serverItem1Rect.x).toBeGreaterThanOrEqual(0);
    expect(serverItem2Rect.x).toBeGreaterThanOrEqual(
      serverItem1Rect.x + serverItem1Rect.width
    );

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    const gridItems = await getGridItems(page);
    expect(gridItems.length).toBeGreaterThan(2);

    const gridItem1Rect = await gridItems[0].boundingBox();
    const gridItem2Rect = await gridItems[1].boundingBox();
    const gridItem1Text = await gridItems[0].textContent();
    const gridItem2Text = await gridItems[1].textContent();

    expect(gridItem1Rect.x).toEqual(serverItem1Rect.x);
    // key shouldn't change.  slotIdx shouldn't change
    expect(gridItem1Text).toEqual(serverItem1Text);
    expect(gridItem2Text).toEqual(serverItem2Text);
    // Simple placement assertion for now because we position masonry with transforms.
    expect(gridItem2Rect.x).toBeGreaterThan(0);
  });

  test('[flexible] items rendered on the server start with columnWidth', async ({
    page,
  }) => {
    // First load the page with javascript disabled to get the item position
    await page.setViewportSize({ width: 1200, height: 1000 });
    await page.goto(getServerURL({ flexible: true, deferMount: true }));

    const serverItems = await getStaticGridItems(page);
    const serverItem1Rect = await serverItems[0].boundingBox();
    const serverItem2Rect = await serverItems[1].boundingBox();

    expect(serverItem1Rect.x).toBeGreaterThanOrEqual(0);
    expect(serverItem2Rect.x).toBeGreaterThanOrEqual(
      serverItem1Rect.x + serverItem1Rect.width
    );

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    await waitForRenderedItems(page, { targetItems: 20 });
    const gridItems = await getGridItems(page);

    const gridItem1Rect = await gridItems[0].boundingBox();
    const gridItem2Rect = await gridItems[1].boundingBox();
    expect(gridItem1Rect.x).toEqual(serverItem1Rect.x);
    expect(gridItem1Rect.width).toEqual(serverItem1Rect.width);
    expect(gridItem2Rect.width).toEqual(serverItem2Rect.width);
  });
});
