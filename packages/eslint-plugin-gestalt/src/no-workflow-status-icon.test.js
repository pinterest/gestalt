// @flow strict
import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers.js';
import rule, { errorMessage as defaultOutputMessage } from './no-workflow-status-icon.js';

const ruleTester = new RuleTester({ parserOptions });

/** Valid cases */
const noMatchColor = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/valid/no-match-color.js'),
  'utf-8',
);

const noMatchIcon = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/valid/no-match-icon.js'),
  'utf-8',
);

const noMatchSize = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/valid/no-match-size.js'),
  'utf-8',
);

const renamedIcon = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/valid/renamed-icon.js'),
  'utf-8',
);

/** Invalid cases */
const invalidDefaultSize = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/invalid/default-size.js'),
  'utf-8',
);

const invalidMatchProperties = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/invalid/match-properties.js'),
  'utf-8',
);

const invalidRenamedIcon = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/invalid/renamed-icon.js'),
  'utf-8',
);

ruleTester.run('no-workflow-status-icon', rule, {
  valid: [noMatchColor, noMatchIcon, noMatchSize, renamedIcon],
  invalid: [
    [invalidDefaultSize, defaultOutputMessage],
    [invalidMatchProperties, defaultOutputMessage],
    [invalidRenamedIcon, defaultOutputMessage],
  ].map(([code, errorMessage]) => ({ code, errors: [{ message: errorMessage }] })),
});
