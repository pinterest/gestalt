import { type Page } from '@playwright/test';

export default async function clickButton(page: Page, selector: string): Promise<any> {
  await page.evaluate((elementSelector) => {
    // @ts-expect-error - TS2339
    document.querySelector(elementSelector)?.click();
  }, selector);
}
