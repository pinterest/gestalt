/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe('ExerimentalMasonry > Null items', () => {
  it('Should not throw an error when null/undefined items are inserted', async () => {
    ghost.close();
    await ghost.open('http://localhost:3001/ExperimentalMasonry', {
      viewportSize: {
        width: 3000,
        height: 2000,
      },
    });

    const initialErrors = await ghost.script(() => window.ERROR_COUNT);
    assert.equal(initialErrors, 0);
    // click the insert null items button
    const insertTrigger = await ghost.findElement(selectors.insertNullItems);
    await insertTrigger.click();

    const afterErrors = await ghost.script(() => window.ERROR_COUNT);
    assert.equal(afterErrors, 0);
  });
});
