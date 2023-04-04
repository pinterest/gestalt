// @flow strict
import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems.mjs';
import getServerURL from './utils/getServerURL.mjs';
import selectors from './utils/selectors.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

const VIRTUALIZED_TOP = 1600;

test.describe('Masonry: virtual bounds visibility', () => {
  test('calculates correct virtual bounds when Masonry is offset in window', async ({
    page,
  }) => {
    // First load the page with javascript disabled to get the item position
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(
      getServerURL({ virtualize: true, offsetTop: VIRTUALIZED_TOP })
    );
    await waitForRenderedItems(page, { targetItems: 0 });

    const items = await getGridItems(page);
    expect(items.length).toBe(0);

    await page.evaluate(({ scrollToY }) => window.scrollTo(0, scrollToY), {
      scrollToY: VIRTUALIZED_TOP,
    });
    await waitForRenderedItems(page, { targetItems: 18, scrollHeight: 5012 });

    const nextItems = await getGridItems(page);
    expect(nextItems.length).toBe(18);
  });

  test('calculates correct virtual bounds when Masonry is offset in scroll container', async ({
    page,
  }) => {
    // First load the page with javascript disabled to get the item position
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(
      getServerURL({
        virtualize: true,
        scrollContainer: true,
        offsetTop: VIRTUALIZED_TOP,
      })
    );

    // Server rendered items are always display: block initially to reduce startup thrashing
    // because we don't have DOM measurements yet. Scroll down a bit to trigger virtualization.
    const items = await getGridItems(page);
    expect(items.length).toBeLessThan(20);

    await page.evaluate(
      ({ scrollToY, selector }) => {
        const container = document.querySelector(selector);
        // eslint-disable-next-line playwright/no-conditional-in-test
        if (container) {
          container.scrollTop = scrollToY;
        }
      },
      { scrollToY: VIRTUALIZED_TOP, selector: selectors.scrollContainer }
    );
    await waitForRenderedItems(page, { targetItems: 12 });
    const nextItems = await getGridItems(page);
    expect(nextItems.length).toBe(12);
  });
});
