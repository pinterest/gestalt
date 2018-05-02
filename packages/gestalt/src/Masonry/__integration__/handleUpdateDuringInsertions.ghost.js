/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe('Masonry > Update during insertions', () => {
  it('Should not throw an error when Masonry is updated during insertions', async () => {
    ghost.close();
    await ghost.open('http://localhost:3001/Masonry');

    const initialErrors = await ghost.script(() => window.ERROR_COUNT);
    assert.equal(initialErrors, 0);
    // click the insert null items button
    const insertTrigger = await ghost.findElement(selectors.updateGridItems);
    await insertTrigger.click();

    const afterErrors = await ghost.script(() => window.ERROR_COUNT);
    assert.equal(afterErrors, 0);
  });
});
