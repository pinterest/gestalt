// @flow strict
import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems.mjs';
import getServerURL from './utils/getServerURL.mjs';

// Hard-coded in docs/integration-test-helpers/masonry/MasonryContainer.js
const EXPECTED_LEFT_MARGIN = 200;

test.describe('Masonry: Parent Sizing', () => {
  test('starts the grid from the left bounding box of the parent', async ({
    page,
  }) => {
    await page.goto(
      getServerURL({ virtualize: true, finiteLength: true, constrained: true })
    );

    // Assert that all items follow the indentation of the grid.
    const gridItems = await getGridItems(page);

    for (let i = 0; i < gridItems.length; i += 1) {
      const itemRect = await gridItems[i].boundingBox();
      expect(itemRect.x).toBeGreaterThanOrEqual(EXPECTED_LEFT_MARGIN);
    }
  });
});
