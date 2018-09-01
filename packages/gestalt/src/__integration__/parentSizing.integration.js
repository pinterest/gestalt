import assert from 'assert';
import selectors from './lib/selectors.js';

describe('Masonry > Parent Sizing', () => {
  it.each([
    ['Masonry', 'http://localhost:3001/Masonry?finiteLength=1&constrained=1'],
    [
      'MasonryInfinite',
      'http://localhost:3001/MasonryInfinite?finiteLength=1&constrained=1',
    ],
  ])(
    'The grid starts from the left bounding box of the parent',
    async (name, url) => {
      await page.goto(url);

      // Assert that all items follow the indentation of the grid.
      const gridItems = await page.$$(selectors.gridItem);

      // Hard-coded in the ExampleGrid component.
      const EXPECTED_LEFT_MARGIN = 200;

      for (let i = 0; i < gridItems.length; i += 1) {
        const itemRect = await gridItems[i].boundingBox();
        assert.ok(itemRect.x >= EXPECTED_LEFT_MARGIN);
      }
    }
  );
});
