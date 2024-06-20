#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const enhancedResolve = require('enhanced-resolve');

const reactDocsImport = import('react-docgen'); // v6 forces to use `import`

const resolveSync = enhancedResolve.create.sync({
  extensions: ['.tsx', '.ts', '.js'],
  fullySpecified: false,
});

const root = path.join(__dirname, '../');
const docsPath = path.join(root, '/docs');

/**
 * IMPORTANT: When migrating to TypeScript we are going to need to find a way of detecting files without appending .js
 */

// Files/components that doesn't have data to parse
const excludedPaths = [
  '/packages/gestalt/src/contexts/ExperimentProvider.ts',
  '/packages/gestalt/src/useReducedMotion.ts',
  '/packages/gestalt/src/useInExperiment.ts',
  '/packages/gestalt/src/useFocusVisible.ts',
  '/packages/gestalt/src/zIndex.ts',
].map((filePath) => path.join(root, filePath));

function logError(message) {
  // eslint-disable-next-line no-console
  console.log(chalk.red(`❌  Error: ${message}`));
}

function logSuccess(message) {
  // eslint-disable-next-line no-console
  console.log(chalk.green(`✅ ${message}`));
}

async function docgen(filePath) {
  if (excludedPaths.includes(filePath)) {
    return null;
  }

  const contents = await fs.promises.readFile(filePath, 'utf-8');
  const reactDocs = await reactDocsImport;
  const resolver = new reactDocs.builtinResolvers.FindExportedDefinitionsResolver();

  // Not all files have data to parse
  try {
    // Take only the first exported component
    const [parsed] = reactDocs.parse(contents, {
      resolver,
      filename: filePath, // so that react-docgen knows code is in TypeScript, not Flow.
    });

    if (parsed.description) {
      parsed.description = parsed.description
        // Remove the first markdown link from the description so we don't link to the page itself
        .replace(/\[(.*?)\][[(].*?[\])]/, '$1')
        // Remove images from the description
        .replace(/!\[(.*?)\][[(].*?[\])]/g, '')
        .replace(/(\*\*NOTE\*\*)[\S\s]+(\*\*NOTE\*\*)/, ''); // Remove NOTES for the Docs but keep them for VSCode description
    }

    return parsed;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`'DocGen Error: ${error} at ${filePath}`);
    return null;
  }
}

const getComponentNameFromFile = (file) => path.basename(file).replace(/\.tsx$/, '');

/** Analyzes subcomponents of a component in given path and extracts paths they're imported from. */
function getSubcomponentPaths(componentPath) {
  const componentName = getComponentNameFromFile(componentPath);

  /** Matches lines that are like `Component.Subcomponent = Subcomponent` */
  const subcomponentRegExp = new RegExp(
    `(${componentName}\\.[A-Z]\\w+) = (?<subcomponentName>\\w+)`,
    'g',
  );

  const subcomponentWithRefRegExp = new RegExp(
    `(\\(${componentName}WithForwardRef as ${componentName}WithSubComponents\\)\\.[A-Z]\\w+) = (?<subcomponentName>\\w+)`,
    'g',
  );

  const fileContent = fs.readFileSync(componentPath, 'utf-8');
  const subcomponentNameMatches = [
    ...fileContent.matchAll(subcomponentRegExp),
    ...fileContent.matchAll(subcomponentWithRefRegExp),
  ];

  const subcomponentNames = [...subcomponentNameMatches].map((a) => a.groups.subcomponentName);

  if (!subcomponentNames.length) return [];

  /** Matches lines that are like `Subcomponent from './path/to/subcomponent';` */
  const subcomponentPathRegExp = new RegExp(
    `(${subcomponentNames.join('|')}) from '(?<path>[.\\w\\/-]+)';`,
    'g',
  );

  const subcomponentPathMatches = fileContent.matchAll(subcomponentPathRegExp);
  const subcomponentPaths = [...subcomponentPathMatches].map((match) =>
    resolveSync(path.dirname(componentPath), match.groups.path),
  );

  return subcomponentPaths;
}

/**
 * Gets components that are imported in `index.ts` of given directory (assuming they're all exported).
 */
function getExposedFilesFromDirectory(directoryPath) {
  const indexFile = fs.readFileSync(path.join(root, directoryPath, 'index.ts'), 'utf-8');
  const importMatches = indexFile.matchAll(/from '(?<path>.+)'/g);
  const filePaths = [...importMatches].map((match) =>
    resolveSync(path.join(root, directoryPath), match.groups.path),
  );
  const subcomponentPaths = filePaths.map(getSubcomponentPaths).flat();

  return [...filePaths, ...subcomponentPaths];
}

(async function generateComponentsMetadata() {
  const files = [
    ...getExposedFilesFromDirectory('/packages/gestalt/src/'),
    ...getExposedFilesFromDirectory('/packages/gestalt-charts/src/'),
    ...getExposedFilesFromDirectory('/packages/gestalt-datepicker/src/'),
  ];

  const parsedDataArray = await Promise.all(
    files.map(async (file) => {
      const parsedFile = await docgen(file);

      return parsedFile ? { [getComponentNameFromFile(file)]: parsedFile } : null;
    }),
  );

  // Filter null and convert to object
  const formattedData = parsedDataArray
    .filter((data) => data)
    .reduce((previousValue, currentValue) => ({ ...previousValue, ...currentValue }), {});

  const fileContent = `// This file is autogenerated, please don't modify it directly
// For more information in the generation logic please refer to /scripts/generateMetadata.js
const metadata = ${JSON.stringify(formattedData)};
export default metadata;`;

  fs.writeFile(path.join(docsPath, `docs-components/metadata.js`), fileContent, (err) => {
    if (err) {
      logError(err);
    } else {
      logSuccess('Docs metadata file created successfully');
    }
  });
})();
