// @flow strict
import selectors from './selectors.mjs';

// $FlowExpectedError[unclear-type] flow-typed def for playwright is…lacking
export default function getGridItems(page /*: Object */) /*: Promise<any> */ {
  return page.locator(selectors.gridItem).all();
}
