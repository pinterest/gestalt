import selectors from './lib/selectors.js';

describe('Masonry > External cache', () => {
  it.each([
    ['Masonry', 'http://localhost:3001/Masonry?virtualize=1&externalCache=1'],
    [
      'MasonryInfinite',
      'http://localhost:3001/MasonryInfinite?virtualize=1&externalCache=1',
    ],
  ])('should only mount visible items on remount - %s', async (name, url) => {
    expect.assertions(3);

    await page.setViewport({
      width: 800,
      height: 800,
    });
    await page.goto(url);

    // Wait for Masonry multi-stage rendering.
    await page.waitFor(1000);

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

    // Wait for Masonry multi-stage rendering.
    await page.waitFor(1000);

    // mount count should be increased
    let updatedMountCount = await page.evaluate(() => window.ITEM_MOUNT_COUNT);
    expect(updatedMountCount).toBeGreaterThan(initialMountCount);

    // unmount/remount the grid
    const toggleMountTrigger = await page.$(selectors.toggleMount);
    await toggleMountTrigger.click();

    // wait for grid to be unmounted
    updatedMountCount = await page.evaluate(() => window.ITEM_MOUNT_COUNT);
    expect(updatedMountCount).toBe(0);
    await toggleMountTrigger.click();

    // Wait for Masonry multi-stage rendering.
    await page.waitFor(1000);

    // wait for grid to be remounted
    const updatedCount = await page.evaluate(() => window.ITEM_MOUNT_COUNT);
    expect(updatedCount).toBeLessThanOrEqual(initialMountCount);
  });
});
