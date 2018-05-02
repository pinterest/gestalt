/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe('ExerimentalMasonry > handle item updates', () => {
  it('should correctly update grid item heights', async () => {
    ghost.close();

    await ghost.open('http://localhost:3001/ExperimentalMasonry?virtualize=1', {
      viewportSize: {
        width: 800,
        height: 800,
      },
    });

    // get initial size of first element
    const gridItems = await ghost.findElements(selectors.gridItem);
    const itemRectBefore = await gridItems[0].rect();

    // trigger item expand
    const pushTrigger = await ghost.findElement(selectors.expandGridItems);
    await pushTrigger.click();

    const itemRectAfter = await gridItems[0].rect();

    assert.ok(
      itemRectAfter.bottom > itemRectBefore.bottom,
      'item height should have increased'
    );

    // trigger item collapse
    await pushTrigger.click();

    const itemRectAfterAfter = await gridItems[0].rect();

    assert.ok(
      itemRectAfterAfter.bottom === itemRectBefore.bottom,
      'item height should have reverted to original'
    );
  });
});
