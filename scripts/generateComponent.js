#!/usr/bin/env node
require('@babel/register');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const currentDirectory = __dirname;
const root = path.join(__dirname, '../');
const accessibilityIntegrationTests = path.join(root, 'playwright/accessibility');
const visualIntegrationTests = path.join(root, 'playwright/visual-test');
const docs = path.join(root, 'docs/pages/web');
const visualtestingPages = path.join(root, 'docs/pages/visual-test');
const getExamplesPath = (componentName) => path.join(root, `docs/examples/${componentName}/`);

const gestaltPackages = path.join(root, 'packages/gestalt/src');
const indexFile = path.join(gestaltPackages, 'index.js');

function logError(message) {
  // eslint-disable-next-line no-console
  console.log(chalk.red(`❌  Error: ${message}`));
}

function logSuccess(message) {
  // eslint-disable-next-line no-console
  console.log(chalk.green(`✅ ${message}`));
}

async function generateFile({ componentName, outputPath, template, log }) {
  await fs.promises.writeFile(
    outputPath,
    (await fs.promises.readFile(path.join(currentDirectory, template), 'utf-8'))
      .replace(/ComponentName/g, componentName)
      .replace(/componentname/g, componentName.toLowerCase()),
  );

  logSuccess(log);
}

async function generateDirectory({ componentName, log }) {
  await fs.promises.mkdir(getExamplesPath(componentName.toLowerCase()));

  logSuccess(log);
}

async function appendToExportIndex({ componentName }) {
  const [imports, exports] = (await fs.promises.readFile(indexFile, 'utf-8')).split('export {');

  const importsTransformed = imports
    .split('\n')
    .concat(`import ${componentName} from './${componentName}';`)
    .sort()
    .join('\n');

  const exportsTransformed = exports
    .split('\n')
    .reduce((d, i, idx, l) => (idx < l.length - 2 ? [...d, i] : d), [])
    .filter(Boolean)
    .concat(`  ${componentName},`)
    .sort()
    .join('\n');

  await fs.promises.writeFile(
    indexFile,
    `${importsTransformed}

export {
${exportsTransformed}
};
`,
  );
}

async function generateComponentFiles(componentName) {
  return await Promise.all([
    generateDirectory({
      componentName,
      log: 'Generated example directory',
    }),
    generateFile({
      componentName,
      outputPath: path.join(gestaltPackages, `README_DELETE_${componentName}.md`),
      template: 'templates/README.md',
      log: 'Generated ReadMe',
    }),
    generateFile({
      componentName,
      outputPath: path.join(gestaltPackages, `${componentName}.svg`),
      template: 'templates/ComponentName.svg',
      log: 'Generated SVG',
    }),
    generateFile({
      componentName,
      outputPath: path.join(getExamplesPath(componentName), 'main.tsx'),
      template: 'templates/main.tsx',
      log: 'Generated main example',
    }),
    generateFile({
      componentName,
      outputPath: path.join(gestaltPackages, `${componentName}.ts`),
      template: 'templates/ComponentName.tsx',
      log: 'Generated React component',
    }),
    generateFile({
      componentName,
      outputPath: path.join(gestaltPackages, `${componentName}.test.tsx`),
      template: 'templates/ComponentName.test.tsx',
      log: 'Generated React test',
    }),
    generateFile({
      componentName,
      outputPath: path.join(gestaltPackages, `${componentName}.css`),
      template: 'templates/ComponentName.css',
      log: 'Generated css',
    }),
    generateFile({
      componentName,
      outputPath: path.join(accessibilityIntegrationTests, `${componentName}.spec.ts`),
      template: 'templates/accessibility_ComponentName.spec.ts',
      log: 'Generated accessibility integration test',
    }),
    generateFile({
      componentName,
      outputPath: path.join(docs, `${componentName.toLowerCase()}.ts`),
      template: 'templates/lowercasecomponentname.tsx',
      log: 'Generated component documentation',
    }),
    generateFile({
      componentName,
      outputPath: path.join(visualIntegrationTests, `${componentName}.spec.ts`),
      template: 'templates/ComponentName-light.spec.ts',
      log: 'Generated light mode visual testing integration test',
    }),
    generateFile({
      componentName,
      outputPath: path.join(visualIntegrationTests, `${componentName}-dark.spec.ts`),
      template: 'templates/ComponentName-dark.spec.ts',
      log: 'Generated dark mode visual testing integration test',
    }),
    generateFile({
      componentName,
      outputPath: path.join(visualtestingPages, `${componentName}-light.tsx`),
      template: 'templates/ComponentName-light.tsx',
      log: 'Generated light mode visual testing page',
    }),
    generateFile({
      componentName,
      outputPath: path.join(visualtestingPages, `${componentName}-dark.tsx`),
      template: 'templates/ComponentName-dark.tsx',
      log: 'Generated dark mode visual testing page',
    }),

    appendToExportIndex({ componentName, log: 'Appended to exports' }),
  ]);
}

(async function generateComponent() {
  const [componentName] = process.argv.slice(2);

  if (!componentName) {
    logError('Pass in a component name');
    return;
  }

  if (!componentName.match(/^[$A-Z_][0-9A-Z_$]*$/i)) {
    logError('Pass in a valid component name');
    return;
  }

  await generateComponentFiles(componentName);

  logSuccess(`${componentName} was generated`);
})();
