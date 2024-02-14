// @flow strict
import selectors from './selectors.mjs';

/*::
type GridItems = $ReadOnlyArray<{|
  innerText: () => void,
  textContent: () => void,
  boundingBox: () => Promise<{| [string]: number |}>,
|}>;

type Page = { locator: (string) => { all: () => Promise<GridItems> } };
*/

export default function getGridItems(
  page /*: Page */
) /*: Promise<GridItems> */ {
  return page.locator(selectors.gridItem).all();
}
