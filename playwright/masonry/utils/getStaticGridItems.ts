import { Locator, Page } from '@playwright/test';
import selectors from './selectors';

export default function getStaticGridItems(page: Page): Promise<Array<Locator>> {
  return page.locator(selectors.staticItem).all();
}
