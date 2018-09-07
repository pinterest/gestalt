import assert from 'assert';
import selectors from './lib/selectors.js';

const masonryItemData = [
  { name: 'fake1', height: 100, color: '#f00' },
  { name: 'fake2', height: 200, color: '#f00' },
  { name: 'fake3', height: 300, color: '#f00' },
];

describe('Masonry > Item prop changes', () => {
  it.each([
    ['Masonry', 'http://localhost:3001/Masonry?finiteLength=1'],
    ['MasonryInfinite', 'http://localhost:3001/MasonryInfinite?finiteLength=1'],
  ])(
    'Masonry will reflow when changing prop items. - %s',
    async (name, url) => {
      await page.goto(url);

      const originalItems = await page.$$(selectors.gridItem);
      assert.ok(originalItems.length > 0);

      await page.evaluate(proxiedItemData => {
        window.dispatchEvent(
          new CustomEvent('set-masonry-items', {
            detail: {
              items: proxiedItemData,
            },
          })
        );
      }, masonryItemData);

      await page.waitFor(200);
      const newItems = await page.$$(selectors.gridItem);
      assert.ok(newItems.length > 0);

      for (let i = 0; i < newItems.length; i += 1) {
        const { height: renderedheight } = await newItems[i].boundingBox();
        const expectedHeight = masonryItemData[i].height + 2 /* border size */;
        assert.equal(
          renderedheight,
          expectedHeight,
          `item ${i} has a height of ${expectedHeight}`
        );
      }
    }
  );

  it('removes all items', async () => {
    await page.evaluate(() => {
      window.dispatchEvent(
        new CustomEvent('set-masonry-items', {
          detail: {
            items: [],
          },
        })
      );
    });

    await page.waitFor(200);
    const newItems = await page.$$(selectors.gridItem);
    assert.ok(!newItems || newItems.length === 0);
  });
});
