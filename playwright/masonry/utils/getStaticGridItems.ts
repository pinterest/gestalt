import selectors from './selectors';

// @ts-expect-error - TS7006 - Parameter 'page' implicitly has an 'any' type.
export default function getStaticGridItems(page /*: Object */) /*: Promise<any> */ {
  return page.locator(selectors.staticItem).all();
}
