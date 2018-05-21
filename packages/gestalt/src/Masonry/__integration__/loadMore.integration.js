import selectors from './lib/selectors';

const PIN_INSERTION_TIME = 500;

describe('Masonry > Scrolls', () => {
  it('Loads more when it gets to the bottom of the viewport', async () => {
    // First load the page with javascript disabled to get the item position
    await page.setViewport({
      width: 3000,
      height: 2000,
    });
    await page.goto('http://localhost:3000/Masonry?deferMount=1&manualFetch=1');

    // Hard-coded value for initial pins in server.js
    const initialServerItemCount = 20;

    // We should fetch more items on render to fill the viewport.
    await page.waitFor(PIN_INSERTION_TIME);
    await page.evaluate(() => window.NEXT_FETCH());
    const gridItems = await page.$$(selectors.gridItem);
    const afterLoadItemCount = gridItems.length;
    expect(afterLoadItemCount).toBeGreaterThan(initialServerItemCount);
    await page.waitFor(PIN_INSERTION_TIME);
    await page.evaluate(() => window.NEXT_FETCH());

    const initialFetchCount = await page.evaluate(
      () => window.TEST_FETCH_COUNTS
    );
    expect(initialFetchCount).toBeGreaterThanOrEqual(1);

    // Scroll a few times to triggle multiple scrolls.
    await page.evaluate(() => window.scrollTo(0, window.scrollMaxY));
    await page.waitFor(50);
    await page.evaluate(() => window.scrollTo(0, window.scrollMaxY - 50));
    await page.waitFor(50);
    await page.evaluate(() => window.scrollTo(0, window.scrollMaxY));
    await page.waitFor(PIN_INSERTION_TIME);
    await page.evaluate(() => window.NEXT_FETCH());

    const newFetchCount = await page.evaluate(() => window.TEST_FETCH_COUNTS);
    expect(newFetchCount).toBeGreaterThanOrEqual(initialFetchCount + 1);

    const gridItemsAfter = await page.$$(selectors.gridItem);
    expect(gridItemsAfter.length).toBeGreaterThan(afterLoadItemCount);
  });
});
