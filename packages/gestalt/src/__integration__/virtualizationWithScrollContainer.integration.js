import assert from 'assert';
import selectors from './lib/selectors.js';

const VIRTUALIZED_TOP = 800;

describe('Masonry > virtualization /w scroll container', () => {
  it.each([
    [
      'Masonry',
      `http://localhost:3001/Masonry?virtualize=1&scrollContainer=1&offsetTop=${VIRTUALIZED_TOP}`,
    ],
    [
      'MasonryInfinite',
      `http://localhost:3001/MasonryInfinite?virtualize=1&scrollContainer=1&offsetTop=${VIRTUALIZED_TOP}`,
    ],
  ])(
    'Calculates correct virtual bounds when masonry is offset - %s',
    async (name, url) => {
      await page.setViewport({
        width: 800,
        height: 800,
      });
      await page.goto(url);

      // should not render anything initially
      const initialGridItems = await page.$$(selectors.gridItem);
      assert.equal(initialGridItems.length, 0);

      await page.evaluate(
        (scrollToY, selector) => {
          const container = document.querySelector(selector);
          container.scrollTop = scrollToY;
        },
        VIRTUALIZED_TOP,
        selectors.scrollContainer
      );
      await page.waitFor(100);
      const afterGridItems = await page.$$(selectors.gridItem);
      assert.ok(afterGridItems.length > 0);
    }
  );

  it.each([
    [
      'Masonry',
      `http://localhost:3001/Masonry?virtualize=1&scrollContainer=1&virtualBoundsTop=300&virtualBoundsBottom=300&offsetTop=${VIRTUALIZED_TOP}`,
    ],
    [
      'MasonryInfinite',
      `http://localhost:3001/MasonryInfinite?virtualize=1&scrollContainer=1&virtualBoundsTop=300&virtualBoundsBottom=300&offsetTop=${VIRTUALIZED_TOP}`,
    ],
  ])(
    'Calculates correct virtual bounds when masonry is offset with custom virtual bounds - %s',
    async (name, url) => {
      await page.setViewport({
        width: 800,
        height: 800,
      });
      await page.goto(url);

      // should not render anything initially
      const initialGridItems = await page.$$(selectors.gridItem);
      assert.equal(initialGridItems.length, 0);

      await page.evaluate(
        (scrollToY, selector) => {
          const container = document.querySelector(selector);
          container.scrollTop = scrollToY;
        },
        VIRTUALIZED_TOP,
        selectors.scrollContainer
      );
      await page.waitFor(100);
      const afterGridItems = await page.$$(selectors.gridItem);
      assert.ok(afterGridItems.length > 0);
    }
  );
});
