/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe('Masonry > Render Height', () => {
  it('Items can be positioned under the grid', async () => {
    ghost.close();
    await ghost.open('http://localhost:3001/Masonry?finiteLength=1');

    const gridItems = await ghost.findElements(selectors.gridItem);
    assert.ok(gridItems.length > 0);

    let bottomItem = 0;
    gridItems.forEach(async item => {
      const itemRect = await item.rect();
      if (itemRect.bottom > bottomItem) {
        bottomItem = itemRect.bottom;
      }
    });

    const afterGrid = await ghost.findElement(selectors.afterGrid);
    const afterGridRect = await afterGrid.rect();
    assert.ok(afterGridRect.top >= bottomItem);
  });
});
