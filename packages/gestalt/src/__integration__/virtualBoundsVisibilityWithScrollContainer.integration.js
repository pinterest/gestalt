import assert from 'assert';
import selectors from './lib/selectors';

const getFirstItem = async () => await page.$(selectors.gridItem);

describe('Masonry > virtual bounds visibility /w scroll container', () => {
  it('Calculates correct virtual bounds when masonry is offset', async () => {
    // First load the page with javascript disabled to get the item position
    const VIRTUALIZED_TOP = 800;
    await page.setViewport({
      width: 800,
      height: 800,
    });
    await page.goto(
      `http://localhost:3001/Masonry?scrollContainer=1&offsetTop=${VIRTUALIZED_TOP}`
    );

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
  });
});
