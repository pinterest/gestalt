#!/usr/bin/env node
const fs = require('fs');
const postcss = require('postcss');
const globby = require('globby');

const duplicateVariablesDifferentValues = async () => {
  const files = await globby([
    'packages/gestalt/src/**/*.css',
    'packages/gestalt-datepicker/src/**/*.css',
  ]);

  const combined = (
    await Promise.all(
      files.map(async file => {
        return await fs.promises.readFile(file, 'utf8');
      })
    )
  ).join('');

  const astRoot = postcss.parse(combined);

  const lookup = {};
  astRoot.walkDecls(/^--gestalt/, ({ prop, value }) => {
    if (lookup[prop] && lookup[prop] !== value) {
      throw new Error(
        `CSS Validate error: ${prop} is defined multiple times with different values: ${lookup[prop]} & ${value}.\nPlease make these the same`
      );
    }
    lookup[prop] = value;
  });
};

const noVarInLegacyCSS = async () => {
  const combined = (
    await Promise.all(
      [
        'packages/gestalt/dist/gestalt.css',
        'packages/gestalt-datepicker/dist/gestalt-datepicker.css',
      ].map(async file => {
        return await fs.promises.readFile(file, 'utf8');
      })
    )
  ).join('');

  const astRoot = postcss.parse(combined);

  astRoot.walkDecls(/^--gestalt/, ({ prop, value }) => {
    throw new Error(
      `CSS Validate error: ${prop} CSS variable with value ${value} is defined in the legacy CSS - this will break IE and older browsers`
    );
  });
};

(async function cssValidate() {
  try {
    await duplicateVariablesDifferentValues();
    await noVarInLegacyCSS();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
})();
