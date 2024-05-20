// @flow strict

export default async function clickButton(
  // $FlowFixMe[unclear-type] flow-typed def for playwright is…lacking
  page /*: Object */,
  selector /*: string */
  // $FlowFixMe[unclear-type] flow-typed def for playwright is…lacking
) /*: Promise<any> */ {
  await page.evaluate((elementSelector) => {
    document.querySelector(elementSelector)?.click();
  }, selector);
}
