import assert from 'assert';
import selectors from './lib/selectors.js';

describe('Masonry > Slot Index', () => {
  it.each([
    ['Masonry', 'http://localhost:3001/Masonry?deferMount=1'],
    ['MasonryInfinite', 'http://localhost:3001/MasonryInfinite?deferMount=1'],
  ])('Should start slot index at 0 - %s', async (name, url) => {
    await page.setViewport({
      width: 800,
      height: 800,
    });
    await page.goto(url);

    // first item should have a slot index of 0 and increase from there
    // server render pass
    let gridItems = await page.$$(selectors.gridItem);
    for (let i = 0; i < gridItems.length; i += 1) {
      const text = await (await gridItems[i].getProperty(
        'textContent'
      )).jsonValue();
      assert.ok(text.includes(`Slot Index: ${i}`));
    }

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    // client hydration pass
    gridItems = await page.$$(selectors.gridItem);
    for (let i = 0; i < gridItems.length; i += 1) {
      const text = await (await gridItems[i].getProperty(
        'textContent'
      )).jsonValue();
      assert.ok(text.includes(`Slot Index: ${i}`));
    }
  });
});
