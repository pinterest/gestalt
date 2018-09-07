import assert from 'assert';
import selectors from './lib/selectors.js';

jest.setTimeout(10000);

describe('Masonry > Null items', () => {
  it.each([
    ['Masonry', 'http://localhost:3001/Masonry'],
    ['MasonryInfinite', 'http://localhost:3001/MasonryInfinite'],
  ])(
    'Should not throw an error when null/undefined items are inserted - %s',
    async (name, url) => {
      await page.setViewport({
        width: 3000,
        height: 2000,
      });
      await page.goto(url);

      const initialErrors = await page.evaluate(() => window.ERROR_COUNT);
      assert.equal(initialErrors, 0);
      // click the insert null items button
      const insertTrigger = await page.$(selectors.insertNullItems);
      await insertTrigger.click();

      const afterErrors = await page.evaluate(() => window.ERROR_COUNT);
      assert.equal(afterErrors, 0);
    }
  );
});
