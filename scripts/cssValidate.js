#!/usr/bin/env node
const fs = require('fs');
const globby = require('globby');
const postcss = require('postcss');

const duplicateVariablesDifferentValues = async () => {
  const files = await globby([
    'packages/gestalt/src/**/*.css',
    'packages/gestalt-charts/src/**/*.css',
    'packages/gestalt-datepicker/src/**/*.css',
  ]);

  const combined = (
    await Promise.all(files.map(async (file) => await fs.promises.readFile(file, 'utf8')))
  ).join('');

  const astRoot = postcss.parse(combined);

  const lookup = {};
  astRoot.walkDecls(/^--g/, ({ prop, value }) => {
    if (lookup[prop] && lookup[prop] !== value) {
      throw new Error(
        `CSS Validate error: ${prop} is defined multiple times with different values: ${lookup[prop]} & ${value}.\nPlease make these the same`,
      );
    }
    lookup[prop] = value;
  });
};

(async function cssValidate() {
  try {
    await duplicateVariablesDifferentValues();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
})();
