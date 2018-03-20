/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe('ExerimentalMasonry > virtualization /w scroll container', () => {
  it('Calculates correct virtual bounds when masonry is offset', async () => {
    ghost.close();

    const VIRTUALIZED_TOP = 800;
    await ghost.open(
      `http://localhost:3001/ExperimentalMasonry?virtualize=1&scrollContainer=1&offsetTop=${VIRTUALIZED_TOP}`,
      {
        viewportSize: {
          width: 800,
          height: 800,
        },
      }
    );

    // should not render anything initially
    const initialGridItems = await ghost.findElements(selectors.gridItem);
    assert.equal(initialGridItems, null);

    await ghost.script(
      (scrollToY, selector) => {
        const container = document.querySelector(selector);
        container.scrollTop = scrollToY;
      },
      [VIRTUALIZED_TOP, selectors.scrollContainer]
    );
    const afterGridItems = await ghost.findElements(selectors.gridItem);
    assert.ok(afterGridItems.length > 0);
  });
});
