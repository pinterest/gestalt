import assert from 'assert';
import selectors from './lib/selectors';

describe('Masonry > Update during insertions', () => {
  it('Should not throw an error when Masonry is updated during insertions', async () => {
<<<<<<< HEAD:packages/gestalt/src/Masonry/__integration__/handleUpdateDuringInsertions.integration.js
    await page.setViewport({
      width: 800,
      height: 800,
    });
    await page.goto('http://localhost:3000/Masonry');
=======
    ghost.close();
    await ghost.open('http://localhost:3000/Masonry');
>>>>>>> Update integration test ports:packages/gestalt/src/Masonry/__integration__/handleUpdateDuringInsertions.ghost.js

    const initialErrors = await page.evaluate(() => window.ERROR_COUNT);
    assert.equal(initialErrors, 0);
    // click the insert null items button
    const insertTrigger = await page.$(selectors.updateGridItems);
    await insertTrigger.click();

    const afterErrors = await page.evaluate(() => window.ERROR_COUNT);
    assert.equal(afterErrors, 0);
  });
});
