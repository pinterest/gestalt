import selectors from './selectors';

/*::
type GridItems = $ReadOnlyArray<{|
  innerText: () => void,
  textContent: () => void,
  boundingBox: () => Promise<{| [string]: number |}>,
|}>;

type Page = { locator: (string) => { all: () => Promise<GridItems> } };
*/

// @ts-expect-error - TS7006 - Parameter 'page' implicitly has an 'any' type.
export default function getGridItems(page /*: Page */) /*: Promise<GridItems> */ {
  return page.locator(selectors.gridItem).all();
}
