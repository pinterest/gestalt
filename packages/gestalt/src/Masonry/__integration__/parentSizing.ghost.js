/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe('Masonry > Parent Sizing', () => {
  it('The grid starts from the left bounding box of the parent', async () => {
    await ghost.open(
      'http://localhost:3001/Masonry?finiteLength=1&constrained=1'
    );

    // Assert that all items follow the indentation of the grid.
    const gridItems = await ghost.findElements(selectors.gridItem);

    // Hard-coded in the ExampleGrid component.
    const EXPECTED_LEFT_MARGIN = 200;

    for (let i = 0; i < gridItems.length; i += 1) {
      const isVisible = await gridItems[i].isVisible();
      if (isVisible) {
        const itemRect = await gridItems[i].rect();
        assert.ok(itemRect.left >= EXPECTED_LEFT_MARGIN);
      }
    }
  });
});
