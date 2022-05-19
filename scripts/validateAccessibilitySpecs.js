#!/usr/bin/env node
require('@babel/register');
const globby = require('globby');
const sidebarIndex = require('../docs/components/sidebarIndex.js');

const specFile = 'playwright/accessibility/*.spec.mjs';

async function validate() {
  const pages = sidebarIndex.default.reduce(
    (acc, currentValue) => [...acc, ...currentValue.pages],
    [],
  );

  const a11ySpecFiles = (await globby([specFile])).map((file) => file.toLocaleLowerCase());

  const pagesWithoutA11ySpecFiles = pages.filter(
    (page) => !a11ySpecFiles.includes(specFile.replace('*', page.toLocaleLowerCase())),
  );

  if (pagesWithoutA11ySpecFiles.length) {
    throw new Error(
      `❌ The following doc ${
        pagesWithoutA11ySpecFiles.length > 1 ? 'pages do not have' : 'page does not have'
      } an accessibility integration test: ${pagesWithoutA11ySpecFiles.join(',')}`,
    );
  }
  // eslint-disable-next-line no-console
  console.log(`✅ All doc pages have an accessibility integration test`);
}

/**
 * Validate that we have an accessibility integration test for each docs page.
 */
(async function validateAccessibilitySpecs() {
  try {
    await validate();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
})();
