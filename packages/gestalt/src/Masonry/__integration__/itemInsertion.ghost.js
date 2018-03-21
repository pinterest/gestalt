/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

const getItemColumnMap = async () => {
  const gridItems = await ghost.findElements(selectors.gridItem);
  const itemLeftMap = {};
  for (let i = 0; i < gridItems.length; i += 1) {
    const itemRect = await gridItems[i].rect();
    itemLeftMap[itemRect.left] = itemLeftMap[itemRect.left] || [];
    itemLeftMap[itemRect.left].push(itemRect);
  }
  return itemLeftMap;
};

describe('Masonry > Insert items', () => {
  it('Can insert items into the grid', async () => {
    ghost.close();
    await ghost.open('http://localhost:3001/Masonry', {
      viewportSize: {
        width: 3000,
        height: 2000,
      },
    });

    const originalItemMap = await getItemColumnMap();

    const insertTrigger = await ghost.findElement(selectors.insertItem);
    await insertTrigger.click();

    const newItemMap = await getItemColumnMap();

    const firstCol = Object.keys(originalItemMap)[0];
    assert.ok(newItemMap[firstCol][1].top > newItemMap[firstCol][0].height);
    assert.ok(
      newItemMap[firstCol][0].height > originalItemMap[firstCol][0].height
    );

    const gridItems = await ghost.findElements(selectors.gridItem);
    const insertedItemText = await gridItems[0].text();
    assert.ok(insertedItemText.includes('Inserted'));
  });
});
