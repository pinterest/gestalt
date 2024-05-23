import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers';
import rule from './no-box-disallowed-props';

const ruleTester = new RuleTester({ parserOptions });

const validId = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-box-disallowed-props/valid-id.tsx'),
  'utf-8',
);

const validAs = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-box-disallowed-props/valid-as.tsx'),
  'utf-8',
);

const validAsRenamed = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-box-disallowed-props/valid-as-renamed.tsx'),
  'utf-8',
);

const validData = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-box-disallowed-props/valid-data.tsx'),
  'utf-8',
);

const validAria = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-box-disallowed-props/valid-aria.tsx'),
  'utf-8',
);

const disallowedProps = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-box-disallowed-props/invalid/disallowed-props.tsx'),
  'utf-8',
);

const disallowedPropsRenamed = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-box-disallowed-props/invalid/disallowed-props-renamed.tsx',
  ),
  'utf-8',
);

const disallowedPropsInvalid = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-box-disallowed-props/invalid/disallowed-props-invalid-prop.tsx',
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
    // @ts-expect-error - TS2345 - Argument of type '([code, errorMessage]: [any, any]) => { code: any; errors: { message: any; }[]; }' is not assignable to parameter of type '(value: string[], index: number, array: string[][]) => { code: any; errors: { message: any; }[]; }'.
  ].map(([code, errorMessage]: [any, any]) => ({ code, errors: [{ message: errorMessage }] })),
});
