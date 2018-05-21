import assert from 'assert';
import selectors from './lib/selectors';

describe('Masonry > Slot Index', () => {
  it('Should start slot index at 0', async () => {
    await page.setViewport({
      width: 800,
      height: 800,
    });
    await page.setJavaScriptEnabled(false);
    await page.goto('http://localhost:3000/Masonry');

    // first item should have a slot index of 0 and increase from there
    // server render pass
    let gridItems = await page.$$(selectors.gridItem);
    for (let i = 0; i < gridItems.length; i += 1) {
      const text = await (await gridItems[i].getProperty(
        'textContent'
      )).jsonValue();
      assert.ok(text.includes(`Slot Index: ${i}`));
    }

    await page.setJavaScriptEnabled(true);
    await page.reload();

    // client hydration pass
    gridItems = await page.$$(selectors.gridItem);
    for (let i = 0; i < gridItems.length; i += 1) {
      const text = await (await gridItems[i].getProperty(
        'textContent'
      )).jsonValue();
      assert.ok(text.includes(`Slot Index: ${i}`));
    }
  });
});
