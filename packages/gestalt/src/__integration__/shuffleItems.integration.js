import assert from 'assert';
import selectors from './lib/selectors.js';

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

describe('Masonry > Shuffle items', () => {
  it.each([
    ['Masonry', 'http://localhost:3001/Masonry'],
    ['MasonryInfinite', 'http://localhost:3001/MasonryInfinite'],
  ])(
    'Should reflow the grid when items are shuffled - %s',
    async (name, url) => {
      await page.setViewport({
        width: 800,
        height: 800,
      });
      await page.goto(url);

      const originalItemMap = await getItemColumnMap();

      const insertTrigger = await page.$(selectors.shufflePins);
      await insertTrigger.click();

      await page.waitFor(50);
      const newItemMap = await getItemColumnMap();
      // assert that the first row of items has changed
      // todo (yen) - this can be a more thorough test
      Object.keys(originalItemMap).forEach(col => {
        assert.notEqual(originalItemMap[col][0].text, newItemMap[col][0].text);
      });
    }
  );
});
