import selectors from './lib/selectors';

jest.setTimeout(10000);

describe('Masonry > Server Render Layout', () => {
  it('items rendered on the server maintain position after mounting', async () => {
    // First load the page with javascript disabled to get the item position

    await page.setViewport({
      width: 1000,
      height: 1000,
    });
    await page.setJavaScriptEnabled(false);
    await page.goto('http://localhost:3000/Masonry');

    const serverItems = await page.$$(selectors.staticItem);

    // Hard-coded value for initial pins in server.js
    expect(serverItems).toHaveLength(20);

    const serverItem1Rect = await serverItems[0].boundingBox();
    const serverItem2Rect = await serverItems[1].boundingBox();

    expect(serverItem1Rect.x).toBeGreaterThanOrEqual(0);
    expect(serverItem2Rect.x).toBeGreaterThanOrEqual(
      serverItem1Rect.x + serverItem1Rect.width
    );

    await page.setJavaScriptEnabled(true);
    await page.reload();

    const gridItems = await page.$$(selectors.gridItem);
    expect(gridItems.length).toBeGreaterThan(2);

    const gridItem1Rect = await gridItems[0].boundingBox();

    expect(gridItem1Rect.x).toEqual(serverItem1Rect.x);

    // Simple placement assertion for now because we position masonry with transforms.
    expect(gridItem1Rect.x).toBeGreaterThan(0);
  });

  it('[flexible] items rendered on the server start with columnWidth', async () => {
    // First load the page with javascript disabled to get the item position
    await page.setViewport({
      width: 1200,
      height: 1000,
    });
    await page.setJavaScriptEnabled(false);
    await page.goto('http://localhost:3000/FlexibleMasonry?flexible=1');

    const serverItems = await page.$$(selectors.staticItem);
    const serverItem1Rect = await serverItems[0].boundingBox();
    const serverItem2Rect = await serverItems[1].boundingBox();

    expect(serverItem1Rect.x).toBeGreaterThanOrEqual(0);
    expect(serverItem2Rect.x).toBeGreaterThanOrEqual(
      serverItem1Rect.x + serverItem1Rect.width
    );

    await page.setJavaScriptEnabled(false);
    await page.reload();

    const gridItems = await page.$$(selectors.gridItem);

    const gridItem1Rect = await gridItems[0].boundingBox();
    const gridItem2Rect = await gridItems[1].boundingBox();
    expect(gridItem1Rect.x).toEqual(serverItem1Rect.x);
    expect(gridItem1Rect.width).toEqual(serverItem1Rect.width);
    expect(gridItem2Rect.width).toEqual(serverItem2Rect.width);

    expect(gridItem1Rect.x).toEqual(serverItem1Rect.x);
    expect(gridItem1Rect.width).toEqual(serverItem1Rect.width);
    expect(gridItem2Rect.width).toEqual(serverItem2Rect.width);
  });
});
