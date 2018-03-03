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
    itemLeftMap[itemRect.left].push({
      ...itemRect,
      itemIndex: i,
      text: await gridItems[i].text(),
    });
  }

  return itemLeftMap;
};

describe('Masonry > Add related items', () => {
  it('Can insert related items into the grid', async () => {
    ghost.close();
    await ghost.open('http://localhost:3000/Masonry', {
      viewportSize: {
        width: 3000,
        height: 2000,
      },
    });

    // get a random grid item
    const originalItemMap = await getItemColumnMap();
    const columns = Object.keys(originalItemMap);
    const firstCol = columns[0];
    const firstRow = 0;
    const randomGridItem = originalItemMap[firstCol][firstRow];

    // click the add more button for that grid item
    const addMoreButtonSelector = selectors.addMoreButton(
      randomGridItem.itemIndex
    );
    const insertTrigger = await ghost.findElement(addMoreButtonSelector);
    await insertTrigger.click();

    // test that all other items in that row have moved down
    // test that all other items below randomGridItem have moved down
    const newItems = await ghost.findElements(selectors.gridItem);
    const newItemMap = await getItemColumnMap(newItems);

    columns.forEach(column => {
      const before = originalItemMap[column][firstRow];
      const after = newItemMap[column][firstRow];

      assert.equal(before.top, after.top);
      if (column === firstCol) {
        // item in firstCol, firstRow should not have moved
        assert.equal(before.height, after.height);
        assert.equal(before.text, after.text);

        const itemBelow = newItemMap[column][firstRow + 1];
        // item should have been inserted below
        assert.equal(itemBelow.text.indexOf('Insertion'), 0);

        // original item below should have been pushed down
        const originalItemBelow = originalItemMap[column][firstRow + 1];
        const itemBelowBelow = newItemMap[column][firstRow + 2];
        assert.equal(originalItemBelow.text, itemBelowBelow.text);
      } else {
        // everything else should have moved down
        assert.notEqual(before.text, after.text);
        assert.equal(after.text.indexOf('Insertion'), 0);
      }
    });
  });
});
