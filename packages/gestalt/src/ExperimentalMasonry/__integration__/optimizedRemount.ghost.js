/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe('ExerimentalMasonry > External cache', () => {
  it('should only mount visible items on remount', async () => {
    ghost.close();
    await ghost.open(
      'http://localhost:3001/ExperimentalMasonry?virtualize=1&externalCache=1',
      {
        viewportSize: {
          width: 800,
          height: 800,
        },
      }
    );
    const initialMountCount = await ghost.script(() => window.ITEM_MOUNT_COUNT);

    // scroll a few times
    await ghost.script(() => window.scrollTo(0, window.scrollMaxY));
    await ghost.wait(50);
    await ghost.script(() => window.scrollTo(0, window.scrollMaxY));
    await ghost.wait(50);

    // mount count should be increased
    let updatedMountCount = await ghost.script(() => window.ITEM_MOUNT_COUNT);
    assert.ok(updatedMountCount > initialMountCount);

    // unmount/remount the grid
    const toggleMountTrigger = await ghost.findElement(selectors.toggleMount);
    await toggleMountTrigger.click();

    // wait for grid to be unmounted
    await ghost.wait(500);
    updatedMountCount = await ghost.script(() => window.ITEM_MOUNT_COUNT);
    assert.equal(updatedMountCount, 0);
    await toggleMountTrigger.click();

    // wait for grid to be remounted
    await ghost.wait(async () => {
      updatedMountCount = await ghost.script(
        () => (window.MASONRY_DID_MOUNT ? window.ITEM_MOUNT_COUNT : null)
      );
      return updatedMountCount !== null ? updatedMountCount : false;
    });
    assert.ok(updatedMountCount <= initialMountCount);
  });
});
