#!/usr/bin/env node
const chalk = require('chalk');

const reactDocs = require('react-docgen');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../');
const docsPath = path.join(root, '/docs');

function logError(message) {
  // eslint-disable-next-line no-console
  console.log(chalk.red(`❌  Error: ${message}`));
}

function logSuccess(message) {
  // eslint-disable-next-line no-console
  console.log(chalk.green(`✅ ${message}`));
}

async function docgen(filePath) {
  // Return if file is not supported (no js files and test files)
  if (!filePath.match(/\.(js)$/i) || filePath.match(/\.(test\.js)$/i)) {
    return null;
  }

  const contents = await fs.promises.readFile(filePath, 'utf-8');

  // Not all files have data to parse
  try {
    const parsed = reactDocs.parse(contents);

    if (parsed.description) {
      parsed.description = parsed.description
        // Remove the first markdown link from the description so we don't link to the page itself
        .replace(/\[(.*?)\][[(].*?[\])]/, '$1')
        // Remove images from the description
        .replace(/!\[(.*?)\][[(].*?[\])]/g, '');
    }

    return parsed;
  } catch {
    return null;
  }
}

(async function generateComponentsMetadata() {
  const folders = ['/packages/gestalt/src/'];
  const files = [
    '/packages/gestalt/src/contexts/ColorSchemeProvider.js',
    '/packages/gestalt-datepicker/src/DatePicker.js',
    '/packages/gestalt/src/contexts/OnLinkNavigationProvider.js',
  ];

  const data = {};

  // Add files inside folders
  await Promise.all(
    folders.map(async (folder) => {
      const folderFiles = await fs.promises.readdir(path.join(root, folder));
      files.push(...folderFiles.map((fileName) => path.join(folder, fileName)));
    }),
  );

  // Generate docs for every file
  await Promise.all(
    files.map(async (file) => {
      const doc = await docgen(path.join(root, file));

      if (doc) {
        const componentName = file.replace(/^.*[\\/]/, '').replace(/\.js/, '');
        data[componentName] = doc;
      }
    }),
  );

  const fileContent = `const metadata = ${JSON.stringify(data)}; export default metadata;`;

  fs.writeFile(path.join(docsPath, `components/metadata.js`), fileContent, (err) => {
    if (err) {
      logError(err);
    } else {
      logSuccess('Docs metadata file created successfully');
    }
  });
})();
