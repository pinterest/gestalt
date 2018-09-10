import assert from 'assert';
import selectors from './lib/selectors.js';

const VIRTUALIZED_TOP = 800;
const getFirstItem = async () => await page.$(selectors.gridItem);

describe('Masonry > virtual bounds visibility /w scroll container', () => {
  it.each([
    [
      'Masonry',
      `http://localhost:3001/Masonry?scrollContainer=1&offsetTop=${VIRTUALIZED_TOP}`,
    ],
    [
      'MasonryInfinite',
      `http://localhost:3001/MasonryInfinite?scrollContainer=1&offsetTop=${VIRTUALIZED_TOP}`,
    ],
  ])(
    'Calculates correct virtual bounds when masonry is offset - %s',
    async (name, url) => {
      // First load the page with javascript disabled to get the item position
      await page.setViewport({
        width: 800,
        height: 800,
      });
      await page.goto(url);

      // Server rendered items are always display: block initially to reduce startup thrashing
      // because we don't have DOM measurements yet. Scroll down a bit to trigger virtualization.
      await page.evaluate(selector => {
        const container = document.querySelector(selector);
        container.scrollTop += 1;
      }, selectors.scrollContainer);
      await page.waitFor(100);
      assert.ok((await getFirstItem()) === null);

      await page.evaluate(
        (scrollToY, selector) => {
          const container = document.querySelector(selector);
          container.scrollTop = scrollToY;
        },
        VIRTUALIZED_TOP,
        selectors.scrollContainer
      );
      await page.waitFor(100);
      assert.ok((await getFirstItem()) !== null);
    }
  );
});
