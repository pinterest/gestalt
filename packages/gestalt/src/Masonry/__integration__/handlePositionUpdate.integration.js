import assert from 'assert';
import selectors from './lib/selectors';

describe('Masonry > handle offset update', () => {
  it('Should correctly account for relative position changes', async () => {
    let gridItems;
    let firstItemText;

    // First load the page with javascript disabled to get the item position
    await page.setViewport({
      width: 800,
      height: 800,
    });
    await page.goto('http://localhost:3001/Masonry?virtualize=1');

    const pushTrigger = await page.$(selectors.pushGridDown);
    await pushTrigger.click();

    await page.evaluate(() => window.scrollTo(0, 500));
    gridItems = await page.$$(selectors.gridItem);
    firstItemText = (await gridItems[0].getProperty('innerText')).toString();
    assert.ok(firstItemText.includes('foo 0'));

    await page.evaluate(() => window.scrollTo(0, 1000));
    gridItems = await page.$$(selectors.gridItem);
    firstItemText = (await gridItems[0].getProperty('innerText')).toString();
    assert.ok(firstItemText.includes('foo 0'));
  });
});
