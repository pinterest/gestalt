/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe('ExerimentalMasonry > Item prop change', () => {
  it('Key generation when item object ref changes', async () => {
    ghost.close();
    await ghost.open('http://localhost:3001/ExperimentalMasonry');

    const firstCounterValue = await ghost.findElement(selectors.itemCounter(1));
    assert.equal(await firstCounterValue.text(), '0');

    const firstCounterUpdateButton = await ghost.findElement(
      selectors.incrementItemCounter(1)
    );
    await firstCounterUpdateButton.click();

    await ghost.wait(async () => (await firstCounterValue.text()) === '1');

    await ghost.script(() => {
      window.dispatchEvent(
        new CustomEvent('set-masonry-items', {
          detail: {
            items: [{ name: 'replaced item', height: 100, color: '#f00' }],
          },
        })
      );
    });
    await ghost.wait(async () => (await firstCounterValue.text()) === '0');
  });
});
