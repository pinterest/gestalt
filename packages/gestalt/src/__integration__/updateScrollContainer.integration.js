import assert from 'assert';
import selectors from './lib/selectors';

describe('Masonry > Update scroll container', () => {
  it('Should handle updating the scroll container', async () => {
    await page.setViewport({
      width: 800,
      height: 800,
    });
    await page.goto('http://localhost:3001/Masonry?virtualize=1');

    // scroll container should be set to window initially
    let gridItems = await page.$$(selectors.gridItem);
    let firstItemText = await (await gridItems[0].getProperty(
      'textContent'
    )).jsonValue();
    assert.ok(firstItemText.includes('foo 0'));

    const trigger = await page.$(selectors.toggleScrollContainer);
    await trigger.click();

    // update scroll container and scroll back to 0
    await page.evaluate(
      scrollContainer => {
        const container = document.querySelector(scrollContainer);
        container.scrollTop = 1500;
      },
      [selectors.scrollContainer]
    );

    await page.waitFor(100);
    gridItems = await page.$$(selectors.gridItem);
    firstItemText = await (await gridItems[0].getProperty(
      'textContent'
    )).jsonValue();
    assert.ok(firstItemText.includes('foo 15'));
  });
});
