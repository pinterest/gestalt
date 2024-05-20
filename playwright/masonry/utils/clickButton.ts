export default async function clickButton(page /*: Object */, selector /*: string */) /*: Promise<any> */ {
  await page.evaluate((elementSelector) => {
    document.querySelector(elementSelector)?.click();
  }, selector);
}
