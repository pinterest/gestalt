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

const getComponentNameFromFile = (file) => file.replace(/^.*[\\/]/, '').replace(/\.js/, '');

// Get files recursively as an array
const getFilesFromDirectory = (directoryPath) => {
  const filesInDirectory = fs.readdirSync(path.join(root, directoryPath));
  const files = filesInDirectory.map((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(path.join(root, filePath));

    if (stats.isDirectory()) {
      return getFilesFromDirectory(filePath);
    }

    return filePath;
  });

  return files.filter((file) => file.length).flat();
};

(async function generateComponentsMetadata() {
  // Specific files that need to be added outside gestalt/src folder.
  // When adding a new folder/file also add to dev-metadata command in package.json
  const extraFiles = ['/packages/gestalt-datepicker/src/DatePicker.js'];

  const files = [...getFilesFromDirectory('/packages/gestalt/src/'), ...extraFiles];

  const parsedDataArray = await Promise.all(
    files.map(async (file) => {
      const parsedFile = await docgen(path.join(root, file));
      return parsedFile ? { [getComponentNameFromFile(file)]: parsedFile } : null;
    }),
  );

  // Filter null and convert to object
  const formattedData = parsedDataArray
    .filter((data) => data)
    .reduce((previousValue, currentValue) => ({ ...previousValue, ...currentValue }), {});

  const fileContent = `const metadata = ${JSON.stringify(formattedData)}; export default metadata;`;

  fs.writeFile(path.join(docsPath, `components/metadata.js`), fileContent, (err) => {
    if (err) {
      logError(err);
    } else {
      logSuccess('Docs metadata file created successfully');
    }
  });
})();
