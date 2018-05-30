import assert from 'assert';
import selectors from './lib/selectors';

const PIN_INSERTION_TIME = 500;

describe('Masonry > Scrolls', () => {
  it('Loads more when it gets to the bottom of the viewport', async () => {
    // First load the page with javascript disabled to get the item position
    await page.setViewport({
      width: 3000,
      height: 2000,
    });
    await page.goto('http://localhost:3001/Masonry?deferMount=1&manualFetch=1');

    const serverItems = await page.$$(selectors.staticItem);

    // Hard-coded value for initial pins in server.js
    const initialServerItemCount = 20;
    assert.equal(serverItems.length, initialServerItemCount);

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    // We should fetch more items on render to fill the viewport.
    await page.waitFor(PIN_INSERTION_TIME);
    await page.evaluate(() => window.NEXT_FETCH());
    const gridItems = await page.$$(selectors.gridItem);
    const afterLoadItemCount = gridItems.length;
    assert.ok(afterLoadItemCount > initialServerItemCount);
    await page.waitFor(PIN_INSERTION_TIME);
    await page.evaluate(() => window.NEXT_FETCH());

    const initialFetchCount = await page.evaluate(
      () => window.TEST_FETCH_COUNTS
    );
    assert.ok(initialFetchCount >= 1);

    // Scroll a few times to triggle multiple scrolls.
    await page.evaluate(() => window.scrollTo(0, window.scrollMaxY));
    await page.waitFor(50);
    await page.evaluate(() => window.scrollTo(0, window.scrollMaxY - 50));
    await page.waitFor(50);
    await page.evaluate(() => window.scrollTo(0, window.scrollMaxY));
    await page.waitFor(PIN_INSERTION_TIME);
    await page.evaluate(() => window.NEXT_FETCH());

    const newFetchCount = await page.evaluate(() => window.TEST_FETCH_COUNTS);
    assert.ok(newFetchCount >= initialFetchCount + 1);

    const gridItemsAfter = await page.$$(selectors.gridItem);
    assert.ok(gridItemsAfter.length > afterLoadItemCount);
  });
});
