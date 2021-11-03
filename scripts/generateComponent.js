#!/usr/bin/env node
require('@babel/register');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const currentDirectory = __dirname;
const root = path.join(__dirname, '../');
const accessibilityIntegrationTests = path.join(root, 'cypress/integration');
const accessibilityVisualIntegrationTests = path.join(root, 'cypress/integration/visual-test');
const docs = path.join(root, 'docs/pages');
const visualtestingPages = path.join(root, 'docs/pages/visual-test');

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
    (await fs.promises.readFile(path.join(currentDirectory, template), 'utf-8')).replace(
      /ComponentName/g,
      componentName,
    ),
  );

  logSuccess(log);
}

async function appendToExportIndex({ componentName }) {
  const [imports, exports] = (await fs.promises.readFile(indexFile, 'utf-8')).split('export {');

  const importsTransformed = imports
    .split('\n')
    .concat(`import ${componentName} from './${componentName}.js';`)
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
    generateFile({
      componentName,
      outputPath: path.join(gestaltPackages, `${componentName}.js`),
      template: 'templates/ComponentName.js',
      log: 'Generated React component',
    }),
    generateFile({
      componentName,
      outputPath: path.join(gestaltPackages, `${componentName}.test.js`),
      template: 'templates/ComponentName.test.js',
      log: 'Generated React test',
    }),
    generateFile({
      componentName,
      outputPath: path.join(gestaltPackages, `${componentName}.flowtest.js`),
      template: 'templates/ComponentName.flowtest.js',
      log: 'Generated flow test',
    }),
    generateFile({
      componentName,
      outputPath: path.join(gestaltPackages, `${componentName}.css`),
      template: 'templates/ComponentName.css',
      log: 'Generated css',
    }),
    generateFile({
      componentName,
      outputPath: path.join(gestaltPackages, `${componentName}.css.flow`),
      template: 'templates/ComponentName.css.flow',
      log: 'Generated flow css',
    }),
    generateFile({
      componentName,
      outputPath: path.join(
        accessibilityIntegrationTests,
        `accessibility_${componentName}_spec.js`,
      ),
      template: 'templates/accessibility_ComponentName_spec.js',
      log: 'Generated accessibility integration test',
    }),
    generateFile({
      componentName,
      outputPath: path.join(docs, `${componentName.toLowerCase()}.js`),
      template: 'templates/lowercasecomponentname.js',
      log: 'Generated component documentation',
    }),
    generateFile({
      componentName,
      outputPath: path.join(accessibilityVisualIntegrationTests, `${componentName}-light_spec.js`),
      template: 'templates/ComponentName-light_spec.js',
      log: 'Generated light mode visual testing integration test',
    }),
    generateFile({
      componentName,
      outputPath: path.join(accessibilityVisualIntegrationTests, `${componentName}-dark_spec.js`),
      template: 'templates/ComponentName-dark_spec.js',
      log: 'Generated dark mode visual testing integration test',
    }),
    generateFile({
      componentName,
      outputPath: path.join(visualtestingPages, `${componentName}-light.js`),
      template: 'templates/ComponentName-light.js',
      log: 'Generated light mode visual testing page',
    }),
    generateFile({
      componentName,
      outputPath: path.join(visualtestingPages, `${componentName}-dark.js`),
      template: 'templates/ComponentName-dark.js',
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
