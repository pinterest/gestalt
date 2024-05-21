export default async function clickButton(
  // @ts-expect-error - TS7006 - Parameter 'page' implicitly has an 'any' type.
  page /*: Object */,
  // @ts-expect-error - TS7006 - Parameter 'selector' implicitly has an 'any' type.
  selector /*: string */,
) /*: Promise<any> */ {
  // @ts-expect-error - TS7006 - Parameter 'elementSelector' implicitly has an 'any' type.
  await page.evaluate((elementSelector) => {
    document.querySelector(elementSelector)?.click();
  }, selector);
}
