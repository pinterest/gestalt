// @flow strict
import selectors from './selectors.mjs';

export default function getStaticGridItems(
  // $FlowExpectedError[unclear-type] flow-typed def for playwright is…lacking
  page /*: Object */
  // $FlowExpectedError[unclear-type] flow-typed def for playwright is…lacking
) /*: Promise<any> */ {
  return page.locator(selectors.staticItem).all();
}
