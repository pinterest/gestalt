import selectors from './selectors';

export default function getStaticGridItems(page /*: Object */) /*: Promise<any> */ {
  return page.locator(selectors.staticItem).all();
}
