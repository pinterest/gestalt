// @flow strict
import { expect, test } from '@playwright/test';
import selectors from './utils/selectors.mjs';
import getServerURL from './utils/getServerURL.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

test.describe('Masonry: Item prop change', () => {
  test('generates new keys when item object refs change', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(getServerURL({ virtualize: true }));
    await waitForRenderedItems(page, { targetItemsGTE: 18 });

    const firstCounterValueStart = await page.locator(selectors.itemCounter(1));

    expect(await firstCounterValueStart.textContent()).toEqual('0');

    const firstCounterUpdateButton = await page.locator(
      selectors.incrementItemCounter(1)
    );

    await firstCounterUpdateButton.click();

    const firstCounterValueMiddle = await page.locator(
      selectors.itemCounter(1)
    );
    expect(await firstCounterValueMiddle.textContent()).toEqual('1');

    await page.evaluate(() => {
      window.dispatchEvent(
        new CustomEvent('set-masonry-items', {
          detail: {
            items: [{ name: 'replaced item', height: 100, color: '#f00' }],
          },
        })
      );
    });

    // Wait for the replaced item to be rendered as part of the layout.
    await page.waitForFunction(
      ({ selector }) => {
        // $FlowFixMe[method-unbinding] flow 0.158.0 upgrade
        const items = [...document.querySelectorAll(selector)];
        return (
          // eslint-disable-next-line playwright/no-conditional-in-test
          items.length > 0 && items[0].innerText?.startsWith('replaced item')
        );
      },
      { selector: selectors.gridItem },
      { polling: 'raf' }
    );
    await waitForRenderedItems(page, { targetItemsGTE: 19 });

    const firstCounterValueLast = await page.locator(selectors.itemCounter(1));

    expect(await firstCounterValueLast.textContent()).toEqual('0');
  });
});
