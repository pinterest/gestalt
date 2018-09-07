import assert from 'assert';
import selectors from './lib/selectors.js';

describe('Masonry > handle offset update', () => {
  it.each([
    ['Masonry', 'http://localhost:3001/Masonry?virtualize=1'],
    ['MasonryInfinite', 'http://localhost:3001/MasonryInfinite?virtualize=1'],
  ])(
    'Should correctly account for relative position changes - %s',
    async (name, url) => {
      let gridItems;
      let firstItemText;

      // First load the page with javascript disabled to get the item position
      await page.setViewport({
        width: 800,
        height: 800,
      });
      await page.goto(url);

      const pushTrigger = await page.$(selectors.pushGridDown);
      await pushTrigger.click();

      await page.evaluate(() => window.scrollTo(0, 500));
      gridItems = await page.$$(selectors.gridItem);
      firstItemText = (await gridItems[0].getProperty('innerText')).toString();
      assert.ok(firstItemText.includes('foo 0'));

      await page.evaluate(() => window.scrollTo(0, 1000));
      gridItems = await page.$$(selectors.gridItem);
      firstItemText = (await gridItems[0].getProperty('innerText')).toString();
      assert.ok(firstItemText.includes('foo 0'));
    }
  );
});
