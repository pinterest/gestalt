const { RuleTester } = require('eslint');
const { readFileSync } = require('fs');
const path = require('path');
const rule = require('./button-icon-restrictions');

const ruleTester = new RuleTester();

const parserOptions = {
  sourceType: 'module',
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

const validWithSize = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/valid/valid-size.js'),
  'utf-8',
);

const invalidMissingColor = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/button-icon-restrictions/invalid/invalid-no-color.js',
  ),
  'utf-8',
);
const invalidWrongColor = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/button-icon-restrictions/invalid/invalid-wrong-color.js',
  ),
  'utf-8',
);
const invalidRenamed = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/button-icon-restrictions/invalid/invalid-renamed.js',
  ),
  'utf-8',
);
const invalidWrongIcon = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/button-icon-restrictions/invalid/invalid-wrong-icon.js',
  ),
  'utf-8',
);
const invalidWrongSize = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/button-icon-restrictions/invalid/invalid-wrong-size.js',
  ),
  'utf-8',
);
const invalidWithoutSize = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/invalid/invalid-no-size.js'),
  'utf-8',
);

ruleTester.run('button-icon-restrictions', rule, {
  valid: [validWithSize].map((code) => ({
    code,
    parserOptions,
  })),
  invalid: [
    invalidMissingColor,
    invalidWrongColor,
    invalidRenamed,
    invalidWrongIcon,
    invalidWrongSize,
    invalidWithoutSize,
  ].map((code) => ({
    code,
    parserOptions,
    errors: [
      {
        message: 'Buttons using iconEnd must use "arrow-down", color "white", and size "lg"',
      },
    ],
  })),
});
