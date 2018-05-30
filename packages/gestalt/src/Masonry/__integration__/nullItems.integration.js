import assert from 'assert';
import selectors from './lib/selectors';

describe('Masonry > Null items', () => {
  it('Should not throw an error when null/undefined items are inserted', async () => {
    await page.setViewport({
      width: 3000,
      height: 2000,
    });
    await page.goto('http://localhost:3001/Masonry');

    const initialErrors = await page.evaluate(() => window.ERROR_COUNT);
    assert.equal(initialErrors, 0);
    // click the insert null items button
    const insertTrigger = await page.$(selectors.insertNullItems);
    await insertTrigger.click();

    const afterErrors = await page.evaluate(() => window.ERROR_COUNT);
    assert.equal(afterErrors, 0);
  });
});
