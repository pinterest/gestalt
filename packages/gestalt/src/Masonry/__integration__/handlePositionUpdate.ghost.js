/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe('Masonry > handle offset update', () => {
  it('Should correctly account for relative position changes', async () => {
    let gridItems;
    let firstItemText;
    ghost.close();

    // First load the page with javascript disabled to get the item position
    await ghost.open('http://localhost:3001/Masonry?virtualize=1', {
      viewportSize: {
        width: 800,
        height: 800,
      },
    });

    const pushTrigger = await ghost.findElement(selectors.pushGridDown);
    await pushTrigger.click();

    await ghost.script(() => window.scrollTo(0, 500));
    gridItems = await ghost.findElements(selectors.gridItem);
    firstItemText = await gridItems[0].text();
    assert.ok(firstItemText.includes('foo 0'));

    await ghost.script(() => window.scrollTo(0, 1000));
    gridItems = await ghost.findElements(selectors.gridItem);
    firstItemText = await gridItems[0].text();
    assert.ok(firstItemText.includes('foo 0'));
  });
});
