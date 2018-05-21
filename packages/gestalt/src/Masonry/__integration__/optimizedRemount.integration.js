import selectors from './lib/selectors';

describe('Masonry > External cache', () => {
  it('should only mount visible items on remount', async () => {
    await page.setViewport({
      width: 800,
      height: 800,
    });
    await page.goto(
      'http://localhost:3000/Masonry?virtualize=1&externalCache=1'
    );

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
    expect(updatedMountCount).toBeGreaterThan(initialMountCount);

    // unmount/remount the grid
    const toggleMountTrigger = await page.$(selectors.toggleMount);
    await toggleMountTrigger.click();

    // wait for grid to be unmounted
    updatedMountCount = await page.evaluate(() => window.ITEM_MOUNT_COUNT);
    expect(updatedMountCount).toEqual(0);
    await toggleMountTrigger.click();

    // wait for grid to be remounted
    const updatedCount = await page.evaluate(() => window.ITEM_MOUNT_COUNT);
    expect(updatedCount).toBeLessThanOrEqual(initialMountCount);
  });
});
