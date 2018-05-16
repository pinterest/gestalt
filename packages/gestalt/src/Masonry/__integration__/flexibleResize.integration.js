import assert from 'assert';
import selectors from './lib/selectors';
import triggerResize from './lib/triggerResize';

jest.setTimeout(10000);

const getItemColumnMap = async () => {
  const gridItems = await page.$$(selectors.gridItem);
  const itemLeftMap = {};
  for (let i = 0; i < gridItems.length; i += 1) {
    const boundingBox = await gridItems[i].boundingBox();
    itemLeftMap[boundingBox.x] = itemLeftMap[boundingBox.x] || [];
    itemLeftMap[boundingBox.x].push({
      ...boundingBox,
      itemIndex: i,
      text: (await gridItems[i].getProperty('innerText')).toString(),
    });
  }

  return itemLeftMap;
};

describe('Masonry > Flexible resize', () => {
  it('Should resize item width and height on resize ', async () => {
    await page.setViewport({
      width: 800,
      height: 800,
    });
    await page.goto('http://localhost:3001/FlexibleMasonry');

    // Wait for the grid to be hydrated.
    // TODO: Break this out into a utility /w wait() instead.
    await page.waitFor(1000);

    // check size of initial grid items
    const originalItemMap = await getItemColumnMap();
    const originalColumns = Object.keys(originalItemMap);

    // trigger slight resize.  enough to resize, but not reflow columns
    // Mock out the window width for the next resize calculation.
    await triggerResize(820, page);

    // Wait for the resize measurements to be finished
    await page.waitForFunction(() => window.RESIZE_MEASUREMENT_DONE);

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
