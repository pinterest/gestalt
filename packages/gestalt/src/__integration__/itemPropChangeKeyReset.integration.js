import assert from 'assert';
import selectors from './lib/selectors.js';

describe('Masonry > Item prop change', () => {
  it.each([
    ['Masonry', 'http://localhost:3001/Masonry'],
    ['MasonryInfinite', 'http://localhost:3001/MasonryInfinite'],
  ])('Key generation when item object ref changes - %s', async (name, url) => {
    await page.goto(url);

    const firstCounterValueStart = await page.$(selectors.itemCounter(1));

    assert.equal(
      await (await firstCounterValueStart.getProperty(
        'textContent'
      )).jsonValue(),
      '0'
    );

    const firstCounterUpdateButton = await page.$(
      selectors.incrementItemCounter(1)
    );

    await firstCounterUpdateButton.click();

    const firstCounterValueMiddle = await page.$(selectors.itemCounter(1));
    assert.equal(
      await (await firstCounterValueMiddle.getProperty(
        'textContent'
      )).jsonValue(),
      '1'
    );

    await page.evaluate(() => {
      window.dispatchEvent(
        new CustomEvent('set-masonry-items', {
          detail: {
            items: [{ name: 'replaced item', height: 100, color: '#f00' }],
          },
        })
      );
    });

    await page.waitFor(100);
    const firstCounterValueLast = await page.$(selectors.itemCounter(1));

    assert.equal(
      await (await firstCounterValueLast.getProperty(
        'textContent'
      )).jsonValue(),
      '0'
    );
  });
});
