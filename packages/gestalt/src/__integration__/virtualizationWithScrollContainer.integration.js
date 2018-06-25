import assert from 'assert';
import selectors from './lib/selectors';

describe('Masonry > virtualization /w scroll container', () => {
  it('Calculates correct virtual bounds when masonry is offset', async () => {
    const VIRTUALIZED_TOP = 800;
    await page.setViewport({
      width: 800,
      height: 800,
    });
    await page.goto(
      `http://localhost:3001/Masonry?virtualize=1&scrollContainer=1&offsetTop=${VIRTUALIZED_TOP}`
    );

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
  });
});
