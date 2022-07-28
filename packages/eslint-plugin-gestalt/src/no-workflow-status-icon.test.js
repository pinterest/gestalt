// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule, { errorMessage as defaultOutputMessage } from './no-workflow-status-icon.js';
import { parserOptions } from './helpers/testHelpers.js';

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

/** Invalid cases */
const invalidDefaultSize = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/invalid/default-size.js'),
  'utf-8',
);

const invalidMatchProperties = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/invalid/match-properties.js'),
  'utf-8',
);

ruleTester.run('no-workflow-status-icon', rule, {
  valid: [noMatchColor, noMatchIcon, noMatchSize],
  invalid: [
    [invalidDefaultSize, defaultOutputMessage],
    [invalidMatchProperties, defaultOutputMessage],
  ].map(([code, errorMessage]) => ({ code, errors: [{ message: errorMessage }] })),
});
