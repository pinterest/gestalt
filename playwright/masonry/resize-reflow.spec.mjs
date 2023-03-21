// @flow strict
import { expect, test } from '@playwright/test';
import countColumns from './utils/countColumns.mjs';
import getServerURL from './utils/getServerURL.mjs';
import resizeWidth from './utils/resizeWidth.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

const PIN_SIZE = 240;
const GRID_WIDTH = 1000;

test.describe('Masonry: Resize', () => {
  test('Rerenders Masonry after a resize', async ({ page }) => {
    await page.setViewportSize({ width: GRID_WIDTH, height: 800 });

    // Use manual fetching so we don't end up counting columns while we're
    // measuring more content.
    await page.goto(getServerURL({ virtualize: true, manualFetch: true }));

    await waitForRenderedItems(page, { targetItems: 20 });

    const expectedColumns = Math.floor(GRID_WIDTH / PIN_SIZE);
    const actualColumns = await countColumns(page);
    expect(actualColumns).toEqual(expectedColumns);

    // Trigger a resize.
    await resizeWidth(page, GRID_WIDTH - PIN_SIZE);

    await waitForRenderedItems(page, { targetItems: 0 });
    await waitForRenderedItems(page, { targetItems: 18 });

    const newExpectedColumns = Math.floor((GRID_WIDTH - PIN_SIZE) / PIN_SIZE);
    const newActualColumns = await countColumns(page);
    expect(newActualColumns).toEqual(newExpectedColumns);
  });

  test('Rerenders Masonry after a resize with scroll container', async ({
    page,
  }) => {
    await page.setViewportSize({ width: GRID_WIDTH, height: 800 });

    // Use manual fetching so we don't end up counting columns while we're
    // measuring more content.
    await page.goto(
      getServerURL({
        virtualize: true,
        manualFetch: true,
        scrollContainer: true,
      })
    );

    await waitForRenderedItems(page, { targetItems: 16 });

    // Trigger a resize.
    const expectedColumns = Math.floor(GRID_WIDTH / PIN_SIZE);
    expect(await countColumns(page)).toEqual(expectedColumns);

    await resizeWidth(page, GRID_WIDTH - PIN_SIZE);

    await waitForRenderedItems(page, { targetItems: 0 });
    await waitForRenderedItems(page, { targetItems: 12 });

    const newExpectedColumns = Math.floor((GRID_WIDTH - PIN_SIZE) / PIN_SIZE);
    expect(await countColumns(page)).toEqual(newExpectedColumns);
  });
});
