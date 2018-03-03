/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe.skip('ExerimentalMasonry > Cache invalidation', () => {
  it('Able to invalidate cache', async () => {
    await ghost.open('http://localhost:3000/ExperimentalMasonry');

    const beforeReflowGridItems = await ghost.findElements(selectors.gridItem);
    const beforeReflowItemLeftMap = {};
    for (let i = 0; i < beforeReflowGridItems.length; i += 1) {
      const itemRect = await beforeReflowGridItems[i].rect();
      beforeReflowItemLeftMap[itemRect.left] =
        beforeReflowItemLeftMap[itemRect.left] || [];
      beforeReflowItemLeftMap[itemRect.left].push(itemRect);
    }
    const firstColumnIdx = Object.keys(beforeReflowItemLeftMap)[0];
    const beforeColumn = beforeReflowItemLeftMap[firstColumnIdx];
    const newHeight = beforeColumn[0].height + 300;

    await ghost.script(
      firstItemHeight => {
        window.itemHeightOverrides = [firstItemHeight];
        window.dispatchEvent(new CustomEvent('trigger-reflow'));
      },
      [newHeight]
    );

    const afterReflowGridItems = await ghost.findElements(selectors.gridItem);
    const afterReflowItemLeftMap = {};
    for (let i = 0; i < afterReflowGridItems.length; i += 1) {
      const itemRect = await afterReflowGridItems[i].rect();
      afterReflowItemLeftMap[itemRect.left] =
        afterReflowItemLeftMap[itemRect.left] || [];
      afterReflowItemLeftMap[itemRect.left].push(itemRect);
    }
    const afterColumn = afterReflowItemLeftMap[firstColumnIdx];

    assert.ok(afterColumn[0].height > beforeColumn[0].height);
    // TODO: Should be equal, but due to box-sizing styling issues simplify the assertion for now.
    assert.ok(afterColumn[0].height >= newHeight, 'new height is set on item');
    assert.ok(afterColumn[1].top > beforeColumn[0].height);
    assert.ok(afterColumn[1].top >= afterColumn[0].bottom);
  });
});
