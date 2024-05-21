import selectors from './selectors';

// When Masonry is given a list of items, it uses dynamic rendering to measure
// them offscreen in batches. Sometimes this takes many renders and happens
// asyncronously. waitForRenderedItems waits for a specified number of items to
// be added to the DOM with no others waiting for measurement.
// GT = greater than
// GTE = greater than or equal to
// LT = less than
// LTE = less than or equal to

export default async function waitForRenderedItems(
  // @ts-expect-error - TS7006 - Parameter 'page' implicitly has an 'any' type.
  page,
  // @ts-expect-error - TS7006 - Parameter 'args' implicitly has an 'any' type.
  args,
  timeout = 5000,
) {
  return (
    page
      .waitForFunction(
        ({
          // @ts-expect-error - TS7031 - Binding element 'selector' implicitly has an 'any' type.
          selector,
          args: {
            // @ts-expect-error - TS7031 - Binding element 'targetItems' implicitly has an 'any' type.
            targetItems,
            // @ts-expect-error - TS7031 - Binding element 'targetItemsLT' implicitly has an 'any' type.
            targetItemsLT,
            // @ts-expect-error - TS7031 - Binding element 'targetItemsLTE' implicitly has an 'any' type.
            targetItemsLTE,
            // @ts-expect-error - TS7031 - Binding element 'targetItemsGT' implicitly has an 'any' type.
            targetItemsGT,
            // @ts-expect-error - TS7031 - Binding element 'targetItemsGTE' implicitly has an 'any' type.
            targetItemsGTE,
            // @ts-expect-error - TS7031 - Binding element 'scrollHeight' implicitly has an 'any' type.
            scrollHeight,
          },
        }) => {
          const items = Array.from(document.querySelectorAll(selector));
          const loadedItems = items.filter((item) => item.style.visibility !== 'hidden');
          const loadingItems = items.filter((item) => item.style.visibility === 'hidden');

          if (loadingItems.length > 0) {
            return false;
          }

          if (typeof targetItems !== 'undefined' && loadedItems.length !== targetItems) {
            return false;
          }
          if (typeof targetItemsLT !== 'undefined' && loadedItems.length >= targetItemsLT) {
            return false;
          }
          if (typeof targetItemsLTE !== 'undefined' && loadedItems.length > targetItemsLTE) {
            return false;
          }
          if (typeof targetItemsGT !== 'undefined' && loadedItems.length <= targetItemsGT) {
            return false;
          }
          if (typeof targetItemsGTE !== 'undefined' && loadedItems.length < targetItemsGTE) {
            return false;
          }

          const { documentElement } = document;
          if (typeof scrollHeight !== 'undefined' && documentElement?.scrollHeight > scrollHeight) {
            return false;
          }

          return true;
        },
        { selector: selectors.gridItem, args },
        { polling: 'raf', timeout },
      )
      // @ts-expect-error - TS7006 - Parameter 'err' implicitly has an 'any' type.
      .catch(async (err) => {
        const {
          targetItems,
          targetItemsLT,
          targetItemsLTE,
          targetItemsGT,
          targetItemsGTE,
          scrollHeight,
        } = args;

        let error = '';

        // Count the number of loading items.
        const loadingItems = await page.evaluate(
          // @ts-expect-error - TS7006 - Parameter 'selector' implicitly has an 'any' type.
          (selector) =>
            Array.from(document.querySelectorAll(selector)).filter(
              (item) => item.style.visibility === 'hidden',
            ).length,
          selectors.gridItem,
        );

        if (loadingItems > 0) {
          error = `Grid items still loading (${loadingItems}).`;
          return false;
        }

        // Count the number of rendered items.
        const renderedItems = await page.evaluate(
          // @ts-expect-error - TS7006 - Parameter 'selector' implicitly has an 'any' type.
          (selector) =>
            Array.from(document.querySelectorAll(selector)).filter(
              (item) => item.style.visibility !== 'hidden',
            ).length,
          selectors.gridItem,
        );

        if (typeof targetItems !== 'undefined' && renderedItems !== targetItems) {
          error = `${renderedItems} items rendered -- expected ${targetItems}.`;
          return false;
        }
        if (typeof targetItemsLT !== 'undefined' && renderedItems >= targetItemsLT) {
          error = `${renderedItems} items rendered -- expected < ${targetItemsLT}.`;
          return false;
        }
        if (typeof targetItemsLTE !== 'undefined' && renderedItems > targetItemsLTE) {
          error = `${renderedItems} items rendered -- expected <= ${targetItemsLTE}.`;
          return false;
        }
        if (typeof targetItemsGT !== 'undefined' && renderedItems <= targetItemsGT) {
          error = `${renderedItems} items rendered -- expected > ${targetItemsGT}.`;
          return false;
        }
        if (typeof targetItemsGTE !== 'undefined' && renderedItems < targetItemsGTE) {
          error = `${renderedItems} items rendered -- expected >= ${targetItemsGTE}.`;
          return false;
        }

        if (typeof scrollHeight !== 'undefined') {
          // Get the actual content height.
          const actualScrollHeight = await page.evaluate(() => {
            const { documentElement } = document;
            return documentElement?.scrollHeight;
          });

          error = `scrollHeight = ${actualScrollHeight} -- expected ${scrollHeight}.`;
        }

        await page.screenshot({ path: 'items-timeout.png' });

        throw new Error(`
waitForRenderedItems timed out. ${error}

See items-timeout.png for a screenshot of the page.

System error: ${err.message}
`);
      })
  );
}
