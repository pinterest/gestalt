/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe('ExerimentalMasonry > Server Render Layout', () => {
  it('items rendered on the server maintain position after mounting', async () => {
    ghost.close();
    // First load the page with javascript disabled to get the item position
    await ghost.open('http://localhost:3001/ExperimentalMasonry?deferMount=1', {
      viewportSize: {
        width: 1000,
        height: 1000,
      },
    });

    const serverItems = await ghost.findElements(selectors.staticItem);

    // Hard-coded value for initial pins in server.js
    assert.equal(serverItems.length, 20);

    const serverItem1Rect = await serverItems[0].rect();
    const serverItem2Rect = await serverItems[1].rect();
    const serverItem1Text = await serverItems[0].text();
    const serverItem2Text = await serverItems[1].text();

    assert(serverItem1Rect.left >= 0);
    assert(serverItem2Rect.left >= serverItem1Rect.right);

    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    const gridItems = await ghost.findElements(selectors.gridItem);
    assert.ok(gridItems.length > 2);

    const gridItem1Rect = await gridItems[0].rect();
    const gridItem2Rect = await gridItems[1].rect();
    const gridItem1Text = await gridItems[0].text();
    const gridItem2Text = await gridItems[1].text();

    assert.equal(gridItem1Rect.left, serverItem1Rect.left);
    // key shouldn't change.  slotIdx shouldn't change
    assert.equal(gridItem1Text, serverItem1Text);
    assert.equal(gridItem2Text, serverItem2Text);
    // Simple placement assertion for now because we position masonry with transforms.
    assert.ok(gridItem2Rect.left > 0);
  });

  it('[flexible] items rendered on the server start with columnWidth', async () => {
    ghost.close();
    // First load the page with javascript disabled to get the item position
    await ghost.open(
      'http://localhost:3001/ExperimentalFlexibleMasonry?deferMount=1&flexible=1',
      {
        viewportSize: {
          width: 1200,
          height: 1000,
        },
      }
    );

    const serverItems = await ghost.findElements(selectors.staticItem);
    const serverItem1Rect = await serverItems[0].rect();
    const serverItem2Rect = await serverItems[1].rect();

    assert(serverItem1Rect.left >= 0);
    assert(serverItem2Rect.left >= serverItem1Rect.right);

    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    const gridItems = await ghost.findElements(selectors.gridItem);

    const gridItem1Rect = await gridItems[0].rect();
    const gridItem2Rect = await gridItems[1].rect();
    assert.equal(gridItem1Rect.left, serverItem1Rect.left);
    assert.equal(gridItem1Rect.width, serverItem1Rect.width);
    assert.equal(gridItem2Rect.width, serverItem2Rect.width);
  });
});
