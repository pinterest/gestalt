// @flow strict
import { Page } from '@playwright/test';
import selectors from './selectors.mjs';

export default function getGridItems(page: typeof Page): Promise<
  $ReadOnlyArray<{|
    innerText: () => void,
    textContent: () => void,
    boundingBox: () => Promise<{| [string]: number |}>,
  |}>
> {
  return page.locator(selectors.gridItem).all();
}
