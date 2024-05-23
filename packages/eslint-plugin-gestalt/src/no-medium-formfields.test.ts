import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers';
import rule from './no-medium-formfields';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-medium-formfields/valid.tsx'),
  'utf-8',
);
const invalidComboBoxDefault = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-medium-formfields/invalid/invalid-combobox-default.tsx',
  ),
  'utf-8',
);
const invalidComboBoxMedium = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-medium-formfields/invalid/invalid-combobox-medium.tsx',
  ),
  'utf-8',
);
const invalidComboBoxRenamed = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-medium-formfields/invalid/invalid-combobox-renamed.tsx',
  ),
  'utf-8',
);
const invalidTextfieldDefault = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-medium-formfields/invalid/invalid-textfield-default.tsx',
  ),
  'utf-8',
);
const invalidTextfieldMedium = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-medium-formfields/invalid/invalid-textfield-medium.tsx',
  ),
  'utf-8',
);
const invalidTextfieldRenamed = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-medium-formfields/invalid/invalid-textfield-renamed.tsx',
  ),
  'utf-8',
);
const invalidSearchFieldDefault = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-medium-formfields/invalid/invalid-searchfield-default.tsx',
  ),
  'utf-8',
);
const invalidSelectListDefault = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-medium-formfields/invalid/invalid-selectlist-default.tsx',
  ),
  'utf-8',
);

const errorMessage = 'Gestalt form fields should always have size="lg" set on them';

ruleTester.run('no-medium-formfields', rule, {
  valid: [{ code: validCode }],
  invalid: [
    invalidTextfieldDefault,
    invalidTextfieldMedium,
    invalidTextfieldRenamed,
    invalidComboBoxDefault,
    invalidComboBoxMedium,
    invalidComboBoxRenamed,
    invalidSearchFieldDefault,
    invalidSelectListDefault,
  ].map((code: any) => ({ code, errors: [{ message: errorMessage }] })),
});
