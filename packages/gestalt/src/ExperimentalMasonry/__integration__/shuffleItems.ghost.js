/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

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

describe('ExerimentalMasonry > Shuffle items', () => {
  it('Should reflow the grid when items are shuffled ', async () => {
    ghost.close();
    await ghost.open('http://localhost:3001/ExperimentalMasonry', {
      viewportSize: {
        width: 800,
        height: 800,
      },
    });

    const originalItemMap = await getItemColumnMap();

    const insertTrigger = await ghost.findElement(selectors.shufflePins);
    await insertTrigger.click();

    const newItemMap = await getItemColumnMap();

    // assert that the first row of items has changed
    // todo (yen) - this can be a more thorough test
    Object.keys(originalItemMap).forEach(col => {
      assert.notEqual(originalItemMap[col][0].text, newItemMap[col][0].text);
    });
  });
});
