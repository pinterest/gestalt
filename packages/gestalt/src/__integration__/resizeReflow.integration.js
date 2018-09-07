import assert from 'assert';

import countColumns from './lib/countColumns.js';
import triggerResize from './lib/triggerResize.js';

const PIN_SIZE = 235;

describe('Masonry > Resize', () => {
  it.each([
    ['Masonry', 'http://localhost:3001/Masonry'],
    ['MasonryInfinite', 'http://localhost:3001/MasonryInfinite'],
  ])('Reflows the grid after a resize - %s', async (name, url) => {
    const GRID_WIDTH = 1000;

    // This test cares about page size, so close the previous instance to ensure
    // we open a new window with the correct dimensions.

    await page.setViewport({
      width: GRID_WIDTH,
      height: 800,
    });
    await page.goto(url);

    // Wait for the grid to be hydrated.
    // TODO: Break this out into a utility /w wait() instead.
    await page.waitFor(1000);

    const expectedColumns = Math.floor(GRID_WIDTH / PIN_SIZE);
    assert.equal(
      await countColumns(page),
      expectedColumns,
      `expected ${expectedColumns} columns`
    );

    await triggerResize(GRID_WIDTH - PIN_SIZE, page);

    // Wait for the resize measurements to be finished
    await page.waitForFunction(() => window.RESIZE_MEASUREMENT_DONE);
    assert.equal(
      await countColumns(page),
      expectedColumns - 1,
      `expected ${expectedColumns - 1} columns after resize`
    );
  });
});
