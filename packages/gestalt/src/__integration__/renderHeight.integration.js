import assert from 'assert';
import selectors from './lib/selectors.js';

describe('Masonry > Render Height', () => {
  it.each([
    ['Masonry', 'http://localhost:3001/Masonry?finiteLength=1'],
    ['MasonryInfinite', 'http://localhost:3001/MasonryInfinite?finiteLength=1'],
  ])('Items can be positioned under the grid - %s', async (name, url) => {
    await page.goto(url);

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
