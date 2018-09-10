import assert from 'assert';
import selectors from './lib/selectors.js';

const getFirstItem = async () => await page.$(selectors.gridItem);
const VIRTUALIZED_TOP = 1600;

describe('Masonry > virtual bounds visibility', () => {
  it.each([
    ['Masonry', `http://localhost:3001/Masonry?offsetTop=${VIRTUALIZED_TOP}`],
    [
      'MasonryInfinite',
      `http://localhost:3001/MasonryInfinite?offsetTop=${VIRTUALIZED_TOP}`,
    ],
  ])(
    'Calculates correct virtual bounds when masonry is offset - %s',
    async (name, url) => {
      // This test cares about page size, so close the previous instance to ensure
      // we open a new window with the correct dimensions.

      // First load the page with javascript disabled to get the item position
      await page.setViewport({
        width: 800,
        height: 800,
      });
      await page.goto(url);

      // Server rendered items are always display: block initially to reduce startup thrashing
      // because we don't have DOM measurements yet. Scroll down a bit to trigger virtualization.
      await page.evaluate(() => window.scrollTo(0, window.scrollY + 1));
      assert.ok((await getFirstItem()) === null);

      await page.evaluate(scrollToY => window.scrollTo(0, scrollToY), [
        VIRTUALIZED_TOP,
      ]);
      await page.waitFor(100);
      assert.ok((await getFirstItem()) !== null);
    }
  );
});
