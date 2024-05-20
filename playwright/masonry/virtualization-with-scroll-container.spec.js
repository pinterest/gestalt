// @flow strict
import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems.mjs';
import getServerURL from './utils/getServerURL.mjs';
import selectors from './utils/selectors.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

const VIRTUALIZED_TOP = 800;

test.describe('Masonry: virtualization with scroll container', () => {
  test('calculates correct virtual bounds when masonry is offset', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(
      getServerURL({
        virtualize: true,
        scrollContainer: true,
        offsetTop: VIRTUALIZED_TOP,
      })
    );

    // Virtualization should prevent all items from showing initially.
    const initialGridItems = await getGridItems(page);
    expect(initialGridItems.length).toBeLessThan(20);

    await page.evaluate(
      ({ scrollToY, selector }) => {
        const container = document.querySelector(selector);
        // eslint-disable-next-line playwright/no-conditional-in-test
        if (container) {
          container.scrollTop = scrollToY;
        }
      },
      {
        scrollToY: VIRTUALIZED_TOP,
        selector: selectors.scrollContainer,
      }
    );
    await waitForRenderedItems(page, { targetItems: 12 });
    const afterGridItems = await getGridItems(page);
    expect(afterGridItems.length).toBe(12);
  });

  test('calculates correct virtual bounds when masonry is offset and scrolled', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(
      getServerURL({
        virtualize: true,
        scrollContainer: true,
        virtualBoundsTop: 300,
        virtualBoundsBottom: 300,
        offsetTop: VIRTUALIZED_TOP,
      })
    );

    // Should not render anything initially
    const initialGridItems = await getGridItems(page);
    expect(initialGridItems.length).toBeLessThan(20);

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
    await waitForRenderedItems(page, { targetItems: 20 });
    const afterGridItems = await getGridItems(page);
    expect(afterGridItems.length).toBe(20);
  });
});
