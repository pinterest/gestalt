#!/usr/bin/env node
require('@babel/register');
const fs = require('fs');
const sidebarIndex = require('../docs/components/sidebarIndex.js');

async function generate() {
  const pages = sidebarIndex.default.reduce(
    (acc, currentValue) => [...acc, ...currentValue.pages],
    [],
  );

  await Promise.all(
    pages.map(async (page) => {
      return await fs.promises.writeFile(
        `./cypress/integration/accessibility_${page}_spec.js`,
        `describe('${page} Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/${page.toLowerCase()}');
    cy.injectAxe();
  });

  it('Tests accessibility on the ${page} page', () => {
    cy.checkA11y();
  });
});
`,
      );
    }),
  );
}

(async function generateAccessibilitySpecs() {
  try {
    await generate();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
})();
