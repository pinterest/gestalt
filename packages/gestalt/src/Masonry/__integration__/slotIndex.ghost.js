/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe('Masonry > Slot Index', () => {
  it('Should start slot index at 0', async () => {
    ghost.close();
    await ghost.open('http://localhost:3001/Masonry?deferMount=1', {
      viewportSize: {
        width: 800,
        height: 800,
      },
    });

    // first item should have a slot index of 0 and increase from there
    // server render pass
    let gridItems = await ghost.findElements(selectors.gridItem);
    for (let i = 0; i < gridItems.length; i += 1) {
      const text = await gridItems[i].text();
      assert.ok(text.includes(`Slot Index: ${i}`));
    }

    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    // client hydration pass
    gridItems = await ghost.findElements(selectors.gridItem);
    for (let i = 0; i < gridItems.length; i += 1) {
      const text = await gridItems[i].text();
      assert.ok(text.includes(`Slot Index: ${i}`));
    }
  });
});
