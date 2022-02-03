#!/usr/bin/env node

const reactDocs = require('react-docgen');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../');
const docsPath = path.join(root, '/docs');

async function docgen(filePath) {
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

async function getFilesFromFolder(folder) {
  const folderPath = path.join(root, folder);
  const folderFiles = await fs.promises.readdir(folderPath);

  const supportedFiles = [];

  for (let i = 0; i < folderFiles.length; i++) {
    // Filter no js files and test files
    const fileName = folderFiles[i];
    if (fileName.match(/\.(js)$/i) && !fileName.match(/\.(test\.js)$/i)) {
      supportedFiles.push(path.join(folder, fileName));
    }
  }

  return supportedFiles;
}

(async function generateComponentsMetadata() {
  const folders = ['/packages/gestalt/src/'];
  const files = [
    '/packages/gestalt/src/contexts/ColorSchemeProvider.js',
    '/packages/gestalt-datepicker/src/DatePicker.js',
    '/packages/gestalt/src/contexts/OnLinkNavigationProvider.js',
  ];

  let data = {};

  // Add files inside folders and filter unsoported files
  for (let i = 0; i < folders.length; i++) {
    const filesFromFolder = await getFilesFromFolder(folders[i]);
    files.push(...filesFromFolder);
  }

  // Generate docs for every file
  for (let i = 0; i < files.length; i++) {
    const doc = await docgen(path.join(root, files[i]));

    if (doc) {
      const componentName = files[i].replace(/^.*[\\\/]/, '').replace(/\.js/, '');
      data[componentName] = doc;
    }
  }

  fs.writeFile(
    path.join(docsPath, `components/metadata.json`),
    JSON.stringify(data),
    function (err) {
      if (err) {
        console.log(err);
      }
    },
  );
})();
