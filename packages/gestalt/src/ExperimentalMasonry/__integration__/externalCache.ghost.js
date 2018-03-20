/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe('ExerimentalMasonry > External cache', () => {
  it('should restore from position cache on remount', async () => {
    ghost.close();
    await ghost.open(
      'http://localhost:3001/ExperimentalMasonry?externalCache=1',
      {
        viewportSize: {
          width: 3000,
          height: 2000,
        },
      }
    );

    // shift first column down
    const pushDownTrigger = await ghost.findElement(
      selectors.pushFirstItemDown
    );
    await pushDownTrigger.click();

    // wait for reflow
    await ghost.wait(500);

    // get position of first grid item
    const gridItems = await ghost.findElements(selectors.gridItem);
    const firstItemPosition = await gridItems[0].rect();
    const firstItemText = await gridItems[0].text();

    // unmount/remount the grid
    const toggleMountTrigger = await ghost.findElement(selectors.toggleMount);
    await toggleMountTrigger.click();
    // wait for grid to be unmounted
    await ghost.wait(500);
    await toggleMountTrigger.click();
    // wait for grid to be re-mounted
    await ghost.wait(500);

    // get updated position of first grid item
    const newGridItems = await ghost.findElements(selectors.gridItem);
    const newFirstItemPosition = await newGridItems[0].rect();
    const newFirstItemText = await newGridItems[0].text();

    assert.equal(firstItemPosition.top, newFirstItemPosition.top);
    assert.equal(firstItemPosition.left, newFirstItemPosition.left);
    assert.equal(firstItemPosition.bottom, newFirstItemPosition.bottom);
    assert.equal(firstItemText, newFirstItemText);
  });
  it('should reset position cache if new items are passed in', async () => {
    ghost.close();
    await ghost.open(
      'http://localhost:3001/ExperimentalMasonry?externalCache=1',
      {
        viewportSize: {
          width: 3000,
          height: 2000,
        },
      }
    );

    // get position of first grid item
    const gridItems = await ghost.findElements(selectors.gridItem);
    const firstItemPosition = await gridItems[0].rect();
    const firstItemText = await gridItems[0].text();

    // unmount the grid
    const toggleMountTrigger = await ghost.findElement(selectors.toggleMount);
    await toggleMountTrigger.click();

    // click the shuffle button
    const shuffleTrigger = await ghost.findElement(selectors.shufflePins);
    await shuffleTrigger.click();

    // remount the grid
    await toggleMountTrigger.click();
    // wait for grid to be re-mounted
    await ghost.wait(500);

    // get updated position of first grid item
    const newGridItems = await ghost.findElements(selectors.gridItem);
    const newFirstItemPosition = await newGridItems[0].rect();
    const newFirstItemText = await newGridItems[0].text();

    assert.equal(firstItemPosition.top, newFirstItemPosition.top);
    assert.equal(firstItemPosition.left, newFirstItemPosition.left);
    assert.notEqual(firstItemPosition.bottom, newFirstItemPosition.bottom);
    assert.notEqual(firstItemText, newFirstItemText);
  });
});
