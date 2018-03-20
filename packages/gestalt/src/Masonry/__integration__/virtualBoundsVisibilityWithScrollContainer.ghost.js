/* global describe */
/* global it */
import ghost from 'ghostjs';
import selectors from './lib/selectors';

const getFirstItemDisplay = async () => {
  const gridItems = await ghost.findElements(selectors.gridItem);
  return await gridItems[0].script(element => element.style.display);
};

describe('Masonry > virtual bounds visibility /w scroll container', () => {
  it('Calculates correct virtual bounds when masonry is offset', async () => {
    ghost.close();

    // First load the page with javascript disabled to get the item position
    const VIRTUALIZED_TOP = 800;
    await ghost.open(
      `http://localhost:3001/Masonry?scrollContainer=1&offsetTop=${VIRTUALIZED_TOP}`,
      {
        viewportSize: {
          width: 800,
          height: 800,
        },
      }
    );

    // Server rendered items are always display: block initially to reduce startup thrashing
    // because we don't have DOM measurements yet. Scroll down a bit to trigger virtualization.
    await ghost.wait(async () => {
      await ghost.script(
        selector => {
          const container = document.querySelector(selector);
          container.scrollTop += 1;
        },
        [selectors.scrollContainer]
      );
      return (await getFirstItemDisplay()) === 'none';
    });

    await ghost.script(
      (scrollToY, selector) => {
        const container = document.querySelector(selector);
        container.scrollTop = scrollToY;
      },
      [VIRTUALIZED_TOP, selectors.scrollContainer]
    );
    await ghost.wait(async () => (await getFirstItemDisplay()) !== 'none');
  });
});
