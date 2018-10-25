import assert from 'assert';
import selectors from './lib/selectors.js';

describe('Masonry > External cache', () => {
  it.each([
    ['Masonry', 'http://localhost:3001/Masonry?virtualize=1&externalCache=1'],
    [
      'MasonryInfinite',
      'http://localhost:3001/MasonryInfinite?virtualize=1&externalCache=1',
    ],
  ])('should only mount visible items on remount - %s', async (name, url) => {
    await page.setViewport({
      width: 800,
      height: 800,
    });
    await page.goto(url);

    const initialMountCount = await page.evaluate(
      () => window.ITEM_MOUNT_COUNT
    );

    // scroll a few times
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
          document.documentElement.clientHeight
      )
    );

    // mount count should be increased
    let updatedMountCount = await page.evaluate(() => window.ITEM_MOUNT_COUNT);
    assert.ok(updatedMountCount > initialMountCount);

    // unmount/remount the grid
    const toggleMountTrigger = await page.$(selectors.toggleMount);
    await toggleMountTrigger.click();

    // wait for grid to be unmounted
    updatedMountCount = await page.evaluate(() => window.ITEM_MOUNT_COUNT);
    assert.equal(updatedMountCount, 0);
    await toggleMountTrigger.click();

    // wait for grid to be remounted
    const updatedCount = await page.evaluate(() => window.ITEM_MOUNT_COUNT);
    expect(updatedCount).toBeLessThanOrEqual(initialMountCount);
  });
});
