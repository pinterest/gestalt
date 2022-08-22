#!/usr/bin/env node
require('@babel/register');
const globby = require('globby');
const siteIndex = require('../docs/docs-components/siteIndex.js');

const specFile = 'playwright/accessibility/*.spec.mjs';

const getAllSitePaths = (index) => {
  const pagePaths = [];

  const addUrlPaths = (pageItems, pages) => {
    // for each choice
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

  return pagePaths;
};

async function validate() {
  // get a list of all of the site paths. Only use the leaf nodes for simplicty
  // if there's a collision (e.g. web/avatar and iOS/Avatar)
  // expect two separate files to exist (e..g Avatar_Web, Avatar_iOS)
  const uniqueFlatPages = {};

  const listOfPaths = getAllSitePaths(siteIndex.default);

  listOfPaths.forEach((path) => {
    const lastNode = path.pop();

    // if it exists, then use the n-1 path as the name of the file
    if (uniqueFlatPages[lastNode]) {
      // the first time this happens, we need to add it back to our list
      if (uniqueFlatPages[lastNode] !== 'collision') {
        const existingPath = uniqueFlatPages[lastNode];
        uniqueFlatPages[`${lastNode}_${existingPath.pop()}`] = existingPath;
      }

      uniqueFlatPages[`${lastNode}_${path.pop()}`] = path;
      uniqueFlatPages[lastNode] = 'collision';
    } else {
      uniqueFlatPages[lastNode] = path;
    }
  });

  const pages = Object.keys(uniqueFlatPages).filter((key) => uniqueFlatPages[key] !== 'collision');

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
