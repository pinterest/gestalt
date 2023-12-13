#!/usr/bin/env node
require('@babel/register');
const globby = require('globby');
const siteIndex = require('../docs/docs-components/siteIndex');

const specFileGlob = 'playwright/accessibility/*.spec.mjs';

// Note How this works: https://github.com/pinterest/gestalt/pull/2316#issuecomment-1223356379

/**
 * Helper function to get a list of all the site paths.
 * Returns a list of page paths matching the format of the spec files,
 * e.g. get_started__developers__releases
 * */
const getRoutes = (index) => {
  const pagePaths = [];

  const addUrlPaths = (pageItems, pages) => {
    pageItems.forEach((page) => {
      if (page.sectionName) {
        const siteIndexSection = page;
        addUrlPaths(siteIndexSection.pages, pages.concat([siteIndexSection.sectionName]));
      } else {
        pagePaths.push(pages.concat([page]));
      }
    });
  };

  index.forEach((section) => {
    const startPath = [section.sectionName];
    addUrlPaths(section.pages, startPath);
  });

  return pagePaths.map((path) =>
    // join path parts with __ instead of /, replace spaces with underscores
    path.join('__').toLowerCase().replace(/\s+/g, '_'),
  );
};

async function validate() {
  // get a list of all of the site paths
  const routes = getRoutes(siteIndex.default);

  const a11ySpecFiles = (await globby([specFileGlob])).map((file) =>
    file
      .toLowerCase()
      // remove the playwright/accessibility/ prefix
      .replace(/^playwright\/accessibility\//, '')
      // remove the .spec.mjs suffix
      .replace(/\.spec\.mjs$/, ''),
  );

  const pagesWithoutA11ySpecFiles = routes.filter((page) => !a11ySpecFiles.includes(page));

  if (pagesWithoutA11ySpecFiles.length) {
    // replace __ with / to match the actual path for readability
    const pagesToReport = pagesWithoutA11ySpecFiles.map((page) => page.replace(/__/g, '/'));

    throw new Error(
      `❌ The following ${pagesToReport.length} docs ${
        pagesToReport.length > 1 ? 'pages do' : 'page does'
      } not have an accessibility integration test: ${pagesToReport.join(',')}`,
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
