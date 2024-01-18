// @flow strict
import selectors from './selectors.mjs';

// When Masonry is given a list of items, it uses dynamic rendering to measure
// them offscreen in batches. Sometimes this takes many renders and happens
// asyncronously. waitForRenderedItems waits for a specified number of items to
// be added to the DOM with no others waiting for measurement.
// GT = greater than
// GTE = greater than or equal to
// LT = less than
// LTE = less than or equal to
/*::
type Args = {|
  scrollHeight?: number,
  targetItems?: number,
  targetItemsGT?: number,
  targetItemsGTE?: number,
  targetItemsLT?: number,
  targetItemsLTE?: number,
|};

type WaitForRenderedItemsArgs = {|
  // $FlowExpectedError[unclear-type]
  page: Object,
  args: Args,
  timeout?: number,
  debug?: boolean,
  |};

  // $FlowExpectedError[unclear-type]
  type WaitForRenderedItemsOutput = Promise<any>;
*/

export default async function waitForRenderedItems(
  { page, args, timeout = 5000, debug } /*: WaitForRenderedItemsArgs */
) /*: WaitForRenderedItemsOutput */ {
  return page
    .waitForFunction(
      ({
        selector,
        args: {
          targetItems,
          targetItemsLT,
          targetItemsLTE,
          targetItemsGT,
          targetItemsGTE,
          scrollHeight,
        },
        debugMode,
      }) => {
        const log = (message /*: string */) =>
          debugMode
            ? console.log(`waitForRenderedItems: ${message}`)
            : undefined;

        const items = Array.from(document.querySelectorAll(selector));
        const loadedItems = items.filter(
          (item) => item.style.visibility !== 'hidden'
        );
        const loadingItems = items.filter(
          (item) => item.style.visibility === 'hidden'
        );

        if (loadingItems.length > 0) {
          log(`Still loading: ${loadingItems.length} items.`);
          return false;
        }

        if (
          typeof targetItems !== 'undefined' &&
          loadedItems.length !== targetItems
        ) {
          log(
            `targetItems failed: ${loadedItems.length} items loaded, expected ${targetItems}`
          );
          return false;
        }
        if (
          typeof targetItemsLT !== 'undefined' &&
          loadedItems.length >= targetItemsLT
        ) {
          log(
            `targetItemsLT failed: ${loadedItems.length} items loaded, expected < ${targetItemsLT}`
          );
          return false;
        }
        if (
          typeof targetItemsLTE !== 'undefined' &&
          loadedItems.length > targetItemsLTE
        ) {
          log(
            `targetItemsLTE failed: ${loadedItems.length} items loaded, expected <= ${targetItemsLTE}`
          );
          return false;
        }
        if (
          typeof targetItemsGT !== 'undefined' &&
          loadedItems.length <= targetItemsGT
        ) {
          log(
            `targetItemsGT failed: ${loadedItems.length} items loaded, expected > ${targetItemsGT}`
          );
          return false;
        }
        if (
          typeof targetItemsGTE !== 'undefined' &&
          loadedItems.length < targetItemsGTE
        ) {
          log(
            `targetItemsGTE failed: ${loadedItems.length} items loaded, expected >= ${targetItemsGTE}`
          );
          return false;
        }
        if (
          typeof scrollHeight !== 'undefined' &&
          document.body?.scrollHeight < scrollHeight
        ) {
          log(
            `scrollHeight failed: ${
              document.body?.scrollHeight ?? 'undefined'
            } < ${scrollHeight}`
          );
          return false;
        }

        log(`
Success!
  ${loadedItems.length} items loaded
  ${scrollHeight ? `${scrollHeight} achieved` : ''}
`);
        return true;
      },
      {
        timeout,
      },
      {
        selector: selectors.gridItem,
        args,
        debugMode: debug,
      }
    )
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
        (selector) =>
          Array.from(document.querySelectorAll(selector)).filter(
            (item) => item.style.visibility === 'hidden'
          ).length,
        selectors.gridItem
      );

      if (loadingItems > 0) {
        error = `Grid items still loading (${loadingItems}).`;
        return false;
      }

      // Count the number of rendered items.
      const renderedItems = await page.evaluate(
        (selector) =>
          Array.from(document.querySelectorAll(selector)).filter(
            (item) => item.style.visibility !== 'hidden'
          ).length,
        selectors.gridItem
      );

      if (typeof targetItems !== 'undefined' && renderedItems !== targetItems) {
        error = `${renderedItems} items rendered -- expected ${targetItems}.`;
        return false;
      }
      if (
        typeof targetItemsLT !== 'undefined' &&
        renderedItems >= targetItemsLT
      ) {
        error = `${renderedItems} items rendered -- expected < ${targetItemsLT}.`;
        return false;
      }
      if (
        typeof targetItemsLTE !== 'undefined' &&
        renderedItems > targetItemsLTE
      ) {
        error = `${renderedItems} items rendered -- expected <= ${targetItemsLTE}.`;
        return false;
      }
      if (
        typeof targetItemsGT !== 'undefined' &&
        renderedItems <= targetItemsGT
      ) {
        error = `${renderedItems} items rendered -- expected > ${targetItemsGT}.`;
        return false;
      }
      if (
        typeof targetItemsGTE !== 'undefined' &&
        renderedItems < targetItemsGTE
      ) {
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
    });
}
