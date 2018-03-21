/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe('ExerimentalMasonry > Update scroll container', () => {
  it('Should handle updating the scroll container', async () => {
    ghost.close();
    await ghost.open('http://localhost:3001/ExperimentalMasonry?virtualize=1', {
      viewportSize: {
        width: 800,
        height: 800,
      },
    });

    // scroll container should be set to window initially
    let gridItems = await ghost.findElements(selectors.gridItem);
    let firstItemText = await gridItems[0].text();
    assert.ok(firstItemText.includes('foo 0'));

    const trigger = await ghost.findElement(selectors.toggleScrollContainer);
    await trigger.click();

    // update scroll container and scroll back to 0
    await ghost.script(
      scrollContainer => {
        const container = document.querySelector(scrollContainer);
        container.scrollTop = 1500;
      },
      [selectors.scrollContainer]
    );

    gridItems = await ghost.findElements(selectors.gridItem);
    firstItemText = await gridItems[0].text();
    assert.ok(firstItemText.includes('foo 15'));
  });
});
