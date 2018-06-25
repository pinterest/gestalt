import assert from 'assert';
import selectors from './lib/selectors';

const masonryItemData = [
  { name: 'fake1', height: 100, color: '#f00' },
  { name: 'fake2', height: 200, color: '#f00' },
  { name: 'fake3', height: 300, color: '#f00' },
];

describe('Masonry > Item prop removal', () => {
  it('Masonry will update when items are removed.', async () => {
    await page.goto('http://localhost:3001/Masonry?finiteLength=1');

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

    page.waitFor(200);
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
    page.waitFor(200);
    const newItems = await page.$$(selectors.gridItem);
    assert.equal(newItems.length, 2);
  });
});
