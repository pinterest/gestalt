#!/usr/bin/env node
require('@babel/register');
const fs = require('fs');

async function generate(page) {
  return await fs.promises.writeFile(
    `./playwright/accessibility/${page}.spec.mjs`,
    `// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('${page} Accessibility check', async ({ page }) => {
  await page.goto('/${page.toLowerCase()}');
  await expectAccessiblePage({ page });
});
`,
  );
}

(async function generateAccessibilitySpecs() {
  const component = process.argv[2];

  if (!component) {
    throw new Error('Please provide a component name');
  }

  try {
    await generate(component);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
})();
