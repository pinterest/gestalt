import assert from 'assert';
import selectors from './lib/selectors';

jest.setTimeout(10000);

describe('Masonry > Server Render Layout', () => {
  it('items rendered on the server maintain position after mounting', async () => {
    // First load the page with javascript disabled to get the item position

    await page.setViewport({
      width: 1000,
      height: 1000,
    });
    await page.goto('http://localhost:3001/Masonry?deferMount=1');

    const serverItems = await page.$$(selectors.staticItem);

    // Hard-coded value for initial pins in server.js
    assert.equal(serverItems.length, 20);

    const serverItem1Rect = await serverItems[0].boundingBox();
    const serverItem2Rect = await serverItems[1].boundingBox();
    const serverItem1Text = await (await serverItems[0].getProperty(
      'textContent'
    )).jsonValue();
    const serverItem2Text = await (await serverItems[1].getProperty(
      'textContent'
    )).jsonValue();

    assert(serverItem1Rect.x >= 0);
    assert(serverItem2Rect.x >= serverItem1Rect.x + serverItem1Rect.width);

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    const gridItems = await page.$$(selectors.gridItem);
    assert.ok(gridItems.length > 2);

    const gridItem1Rect = await gridItems[0].boundingBox();
    const gridItem2Rect = await gridItems[1].boundingBox();
    const gridItem1Text = await (await serverItems[0].getProperty(
      'textContent'
    )).jsonValue();
    const gridItem2Text = await (await serverItems[1].getProperty(
      'textContent'
    )).jsonValue();

    assert.equal(gridItem1Rect.x, serverItem1Rect.x);
    // key shouldn't change.  slotIdx shouldn't change
    assert.equal(gridItem1Text, serverItem1Text);
    assert.equal(gridItem2Text, serverItem2Text);
    // Simple placement assertion for now because we position masonry with transforms.
    assert.ok(gridItem2Rect.x > 0);
  });

  it('[flexible] items rendered on the server start with columnWidth', async () => {
    // First load the page with javascript disabled to get the item position
    await page.setViewport({
      width: 1200,
      height: 1000,
    });
    await page.goto(
      'http://localhost:3001/FlexibleMasonry?deferMount=1&flexible=1'
    );

    const serverItems = await page.$$(selectors.staticItem);
    const serverItem1Rect = await serverItems[0].boundingBox();
    const serverItem2Rect = await serverItems[1].boundingBox();

    assert(serverItem1Rect.x >= 0);
    assert(serverItem2Rect.x >= serverItem1Rect.x + serverItem1Rect.width);

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    const gridItems = await page.$$(selectors.gridItem);

    const gridItem1Rect = await gridItems[0].boundingBox();
    const gridItem2Rect = await gridItems[1].boundingBox();
    assert.equal(gridItem1Rect.x, serverItem1Rect.x);
    assert.equal(gridItem1Rect.width, serverItem1Rect.width);
    assert.equal(gridItem2Rect.width, serverItem2Rect.width);
  });
});
