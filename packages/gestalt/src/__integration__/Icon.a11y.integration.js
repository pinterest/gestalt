/* global page */
import assert from 'assert';

describe('Icon > a11y', () => {
  beforeAll(async () => {
    await page.addScriptTag({ path: require.resolve('axe-core') });
  });
  it('Loads at least 5 icons on the test page', async () => {
    await page.goto('http://localhost:3001/A11y?component=icon');

    const svgIcons = await page.$$('svg');
    assert.ok(svgIcons.length >= 5);
  });

  it('Does not have any a11y issues', async () => {
    await page.addScriptTag({ path: require.resolve('axe-core') });
    const results = await page.evaluate(
      () =>
        new Promise(resolve => {
          window.axe.run((err, axeResults) => {
            if (err) throw err;
            resolve(axeResults);
          });
        })
    );

    const beautifyErrors = `
        A11Y Violations:
        ${JSON.stringify(results.violations, null, 4)}`;
    assert(results.violations.length === 0, beautifyErrors);
  });
});
