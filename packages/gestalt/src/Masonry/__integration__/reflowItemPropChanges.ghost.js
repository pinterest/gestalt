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

describe('Masonry > Item prop changes', () => {
  it('Masonry will reflow when changing prop items.', async () => {
    ghost.close();
    await ghost.open('http://localhost:3001/Masonry?finiteLength=1');

    const originalItems = await ghost.findElements(selectors.gridItem);
    assert.ok(originalItems.length > 0);

    await ghost.script(
      proxiedItemData => {
        window.dispatchEvent(
          new CustomEvent('set-masonry-items', {
            detail: {
              items: proxiedItemData,
            },
          })
        );
      },
      [masonryItemData]
    );

    const newItems = await ghost.findElements(selectors.gridItem);
    assert.ok(newItems.length > 0);

    for (let i = 0; i < newItems.length; i += 1) {
      const { height: renderedheight } = await newItems[i].rect();
      const expectedHeight = masonryItemData[i].height + 2 /* border size */;
      assert.equal(
        renderedheight,
        expectedHeight,
        `item ${i} has a height of ${expectedHeight}`
      );
    }
  });

  it('removes all items', async () => {
    await ghost.script(() => {
      window.dispatchEvent(
        new CustomEvent('set-masonry-items', {
          detail: {
            items: [],
          },
        })
      );
    });

    await ghost.wait(async () => {
      const newItems = await ghost.findElements(selectors.gridItem);
      return !newItems || newItems.length === 0;
    });
  });
});
