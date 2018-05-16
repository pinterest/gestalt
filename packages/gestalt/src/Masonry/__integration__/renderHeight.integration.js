import assert from 'assert';
import selectors from './lib/selectors';

describe('Masonry > Render Height', () => {
  it('Items can be positioned under the grid', async () => {
    await page.goto('http://localhost:3001/Masonry?finiteLength=1');

    const gridItems = await page.$$(selectors.gridItem);
    assert.ok(gridItems.length > 0);

    let bottomItem = 0;
    gridItems.forEach(async item => {
      const itemRect = await item.boundingBox();
      if (itemRect.y > bottomItem) {
        bottomItem = itemRect.y + itemRect.height;
      }
    });

    const afterGrid = await page.$(selectors.afterGrid);
    const afterGridRect = await afterGrid.boundingBox();
    assert.ok(afterGridRect.y >= bottomItem);
  });
});
