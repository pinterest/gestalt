import assert from 'assert';
import selectors from './lib/selectors';

describe('Masonry > Update during insertions', () => {
  it('Should not throw an error when Masonry is updated during insertions', async () => {
    await page.setViewport({
      width: 800,
      height: 800,
    });
    await page.goto('http://localhost:3001/Masonry');

    const initialErrors = await page.evaluate(() => window.ERROR_COUNT);
    assert.equal(initialErrors, 0);
    // click the insert null items button
    const insertTrigger = await page.$(selectors.updateGridItems);
    await insertTrigger.click();

    const afterErrors = await page.evaluate(() => window.ERROR_COUNT);
    assert.equal(afterErrors, 0);
  });
});
