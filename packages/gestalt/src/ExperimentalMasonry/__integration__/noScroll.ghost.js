/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import selectors from './lib/selectors';

describe('ExerimentalMasonry > No scroll', () => {
  it('should do nothing on scroll', async () => {
    // First load the page with javascript disabled to get the item position
    ghost.close();
    await ghost.open(
      'http://localhost:3001/ExperimentalMasonry?noScroll=1&virtualize=1',
      {
        viewportSize: {
          width: 500,
          height: 500,
        },
      }
    );

    const serverItems = await ghost.findElements(selectors.gridItem);

    // Hard-coded value for initial pins in server.js
    const initialServerItemCount = 20;
    assert.equal(serverItems.length, initialServerItemCount); // everything should be shown

    // Scroll a few times to triggle multiple scrolls.
    await ghost.script(() => window.scrollTo(0, window.scrollMaxY));
    await ghost.wait(50);
    await ghost.script(() => window.scrollTo(0, window.scrollMaxY - 50));
    await ghost.wait(50);
    await ghost.script(() => window.scrollTo(0, window.scrollMaxY));

    const newFetchCount = await ghost.script(() => window.TEST_FETCH_COUNTS);
    assert.equal(newFetchCount, null);
  });
});
