/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

const masonryItemData = [
  { name: 'fake1', height: 100, color: '#f00' },
  { name: 'fake2', height: 200, color: '#f00' },
  { name: 'fake3', height: 300, color: '#f00' },
];

describe('ExerimentalMasonry > Item prop removal', () => {
  it('Masonry will update when items are removed.', async () => {
    ghost.close();
    await ghost.open(
      'http://localhost:3001/ExperimentalMasonry?finiteLength=1'
    );

    const originalItems = await ghost.findElements(selectors.gridItem);
    assert.ok(originalItems.length > 0);

    await ghost.script(
      proxiedItemData => {
        window.TEST_MASONRY_ITEMS = proxiedItemData;
        window.dispatchEvent(
          new CustomEvent('set-masonry-items', {
            detail: {
              items: window.TEST_MASONRY_ITEMS,
            },
          })
        );
      },
      [masonryItemData]
    );

    await ghost.wait(async () => {
      const newItems = await ghost.findElements(selectors.gridItem);
      return newItems.length === 3;
    });
  });

  it('removes an item (3 -> 2)', async () => {
    await ghost.script(() => {
      window.dispatchEvent(
        new CustomEvent('set-masonry-items', {
          detail: {
            items: window.TEST_MASONRY_ITEMS.slice(0, 2),
          },
        })
      );
    });

    await ghost.wait(async () => {
      const newItems = await ghost.findElements(selectors.gridItem);
      return newItems.length === 2;
    });
  });
});
