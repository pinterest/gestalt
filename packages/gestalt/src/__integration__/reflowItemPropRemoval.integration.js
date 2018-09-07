import assert from 'assert';
import selectors from './lib/selectors.js';

const masonryItemData = [
  { name: 'fake1', height: 100, color: '#f00' },
  { name: 'fake2', height: 200, color: '#f00' },
  { name: 'fake3', height: 300, color: '#f00' },
];

describe('Masonry > Item prop removal', () => {
  it.each([
    ['Masonry', 'http://localhost:3001/Masonry?finiteLength=1'],
    ['MasonryInfinite', 'http://localhost:3001/MasonryInfinite?finiteLength=1'],
  ])('Masonry will update when items are removed. - %s', async (name, url) => {
    await page.goto(url);

    const originalItems = await page.$$(selectors.gridItem);
    assert.ok(originalItems.length > 0);

    await page.evaluate(proxiedItemData => {
      window.TEST_MASONRY_ITEMS = proxiedItemData;
      window.dispatchEvent(
        new CustomEvent('set-masonry-items', {
          detail: {
            items: window.TEST_MASONRY_ITEMS,
          },
        })
      );
    }, masonryItemData);

    await page.waitFor(200);
    const newItems = await page.$$(selectors.gridItem);
    assert.ok(newItems.length === 3);
  });

  it('removes an item (3 -> 2)', async () => {
    await page.evaluate(() => {
      window.dispatchEvent(
        new CustomEvent('set-masonry-items', {
          detail: {
            items: window.TEST_MASONRY_ITEMS.slice(0, 2),
          },
        })
      );
    });
    await page.waitFor(200);
    const newItems = await page.$$(selectors.gridItem);
    assert.equal(newItems.length, 2);
  });
});
