import assert from 'assert';
import selectors from './lib/selectors';

describe('Masonry > handle item updates', () => {
  it('should correctly update grid item heights', async () => {
    await page.setViewport({
      width: 800,
      height: 800,
    });
    await page.goto('http://localhost:3001/Masonry?virtualize=1');

    // get initial size of first element
    const gridItems = await page.$$(selectors.gridItem);
    const itemRectBefore = await gridItems[0].boundingBox();

    // trigger item expand
    const pushTrigger = await page.$(selectors.expandGridItems);
    await pushTrigger.click();

    const gridItemsAfter = await page.$$(selectors.gridItem);
    const itemRectAfter = await gridItemsAfter[0].boundingBox();

    assert.ok(
      itemRectAfter.height > itemRectBefore.height,
      'item height should have increased'
    );

    // trigger item collapse
    await pushTrigger.click();

    const gridItemsAfterAfter = await page.$$(selectors.gridItem);
    const itemRectAfterAfter = await gridItemsAfterAfter[0].boundingBox();

    assert.ok(
      itemRectAfterAfter.height === itemRectBefore.height,
      'item height should have reverted to original'
    );
  });
});
