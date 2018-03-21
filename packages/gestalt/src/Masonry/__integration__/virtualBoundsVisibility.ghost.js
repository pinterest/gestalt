/* global describe */
/* global it */
import ghost from 'ghostjs';
import selectors from './lib/selectors';

const getFirstItemDisplay = async () => {
  const gridItems = await ghost.findElements(selectors.gridItem);
  return await gridItems[0].script(element => element.style.display);
};

describe('Masonry > virtual bounds visibility', () => {
  it('Calculates correct virtual bounds when masonry is offset', async () => {
    // This test cares about page size, so close the previous instance to ensure
    // we open a new window with the correct dimensions.
    ghost.close();

    // First load the page with javascript disabled to get the item position
    const VIRTUALIZED_TOP = 1600;
    await ghost.open(
      `http://localhost:3001/Masonry?offsetTop=${VIRTUALIZED_TOP}`,
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
      await ghost.script(() => window.scrollTo(0, window.scrollY + 1));
      return (await getFirstItemDisplay()) === 'none';
    });

    await ghost.script(scrollToY => window.scrollTo(0, scrollToY), [
      VIRTUALIZED_TOP,
    ]);
    await ghost.wait(async () => (await getFirstItemDisplay()) !== 'none');
  });
});
