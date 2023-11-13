// @flow strict
import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers';
import rule from './no-box-disallowed-props';

const ruleTester = new RuleTester({ parserOptions });

const validId = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-box-disallowed-props/valid-id'),
  'utf-8',
);

const validAs = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-box-disallowed-props/valid-as'),
  'utf-8',
);

const validAsRenamed = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-box-disallowed-props/valid-as-renamed'),
  'utf-8',
);

const validData = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-box-disallowed-props/valid-data'),
  'utf-8',
);

const validAria = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-box-disallowed-props/valid-aria'),
  'utf-8',
);

const disallowedProps = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-box-disallowed-props/invalid/disallowed-props'),
  'utf-8',
);

const disallowedPropsRenamed = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-box-disallowed-props/invalid/disallowed-props-renamed',
  ),
  'utf-8',
);

const disallowedPropsInvalid = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-box-disallowed-props/invalid/disallowed-props-invalid-prop',
  ),
  'utf-8',
);

ruleTester.run('no-box-disallowedProps', rule, {
  valid: [validAria, validAs, validAsRenamed, validId, validData],
  invalid: [
    [
      disallowedProps,
      'backgroundColor is not allowed on Box. Please see https://gestalt.pinterest.systems/Box for all allowed props.',
    ],
    [
      disallowedPropsRenamed,
      'backgroundColor is not allowed on Box (imported as GestaltBox). Please see https://gestalt.pinterest.systems/Box for all allowed props.',
    ],
    [
      disallowedPropsInvalid,
      'backgroundColor, invalidProp are not allowed on Box. Please see https://gestalt.pinterest.systems/Box for all allowed props.',
    ],
  ].map(([code, errorMessage]) => ({ code, errors: [{ message: errorMessage }] })),
});
