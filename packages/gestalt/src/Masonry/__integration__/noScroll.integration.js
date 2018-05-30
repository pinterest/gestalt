import assert from 'assert';
import selectors from './lib/selectors';

describe('ExerimentalMasonry > No scroll', () => {
  it('should do nothing on scroll', async () => {
    // First load the page with javascript disabled to get the item position
    await page.setViewport({
      width: 500,
      height: 500,
    });
    await page.goto('http://localhost:3001/Masonry?noScroll=1&virtualize=1');

    const serverItems = await page.$$(selectors.gridItem);

    // Hard-coded value for initial pins in server.js
    const initialServerItemCount = 20;
    assert.equal(serverItems.length, initialServerItemCount); // everything should be shown

    // Scroll a few times to triggle multiple scrolls.
    await page.evaluate(() =>
      window.scrollTo(
        0,
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight
      )
    );
    await page.evaluate(() =>
      window.scrollTo(
        0,
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight -
          50
      )
    );
    await page.evaluate(() =>
      window.scrollTo(
        0,
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight
      )
    );

    const newFetchCount = await page.evaluate(() => window.TEST_FETCH_COUNTS);
    assert.equal(newFetchCount, null);
  });
});
