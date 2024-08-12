import { type Locator, type Page } from '@playwright/test';
import selectors from './selectors';

export default function getGridItems(page: Page): Promise<Array<Locator>> {
  return page.locator(selectors.gridItem).all();
}
