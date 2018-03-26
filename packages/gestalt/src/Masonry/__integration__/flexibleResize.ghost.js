/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';
import triggerResize from './lib/triggerResize';

const getItemColumnMap = async () => {
  const gridItems = await ghost.findElements(selectors.gridItem);
  const itemLeftMap = {};
  for (let i = 0; i < gridItems.length; i += 1) {
    const isVisible = await gridItems[i].isVisible();
    if (isVisible) {
      const itemRect = await gridItems[i].rect();
      itemLeftMap[itemRect.left] = itemLeftMap[itemRect.left] || [];
      itemLeftMap[itemRect.left].push({
        ...itemRect,
        itemIndex: i,
        text: await gridItems[i].text(),
      });
    }
  }

  return itemLeftMap;
};

describe('Masonry > Flexible resize', () => {
  it('Should resize item width and height on resize ', async () => {
    ghost.close();
    await ghost.open('http://localhost:3001/FlexibleMasonry', {
      viewportSize: {
        width: 800,
        height: 800,
      },
    });

    // Wait for the grid to be hydrated.
    // TODO: Break this out into a utility /w wait() instead.
    await ghost.wait(1000);

    // check size of initial grid items
    const originalItemMap = await getItemColumnMap();
    const originalColumns = Object.keys(originalItemMap);
    // trigger slight resize.  enough to resize, but not reflow columns
    await triggerResize(820);

    // Wait for the resize measurements to be finished
    await ghost.wait(() => ghost.script(() => window.RESIZE_MEASUREMENT_DONE));

    const newItemMap = await getItemColumnMap();
    const newColumns = Object.keys(newItemMap);

    const numColumns = originalColumns.length;

    for (let i = 0; i < numColumns; i += 1) {
      const originalCol = originalItemMap[originalColumns[i]];
      const newCol = newItemMap[newColumns[i]];
      originalCol.forEach((item, row) => {
        const newItem = newCol[row];
        assert.notEqual(item.height, newItem.height);
        assert.notEqual(item.width, newItem.width);
        // just to make sure we're comparing the same items
        assert.equal(item.text, newItem.text);
      });
    }
  });
});
