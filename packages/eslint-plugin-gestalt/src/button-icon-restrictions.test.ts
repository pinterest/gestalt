import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import rule, { errorMessage, errorMessage2 } from './button-icon-restrictions';
import { parserOptions } from './helpers/testHelpers';

const ruleTester = new RuleTester({ parserOptions });

const validWithSize = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/valid/valid-size.tsx'),
  'utf-8',
);
const invalidRenamed = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/invalid/invalid-renamed.tsx'),
  'utf-8',
);
const invalidWrongIcon = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/invalid/invalid-wrong-icon.tsx'),
  'utf-8',
);

const invalidWrongIconLinkRole = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/button-icon-restrictions/invalid/invalid-wrong-link-role-icon.tsx',
  ),
  'utf-8',
);

ruleTester.run('button-icon-restrictions', rule, {
  valid: [validWithSize].map((code: any) => ({ code })),
  invalid: [invalidRenamed, invalidWrongIcon].map((code: any) => ({
    code,
    errors: [{ message: errorMessage2 }],
  })),
});

ruleTester.run('button-icon-restrictions', rule, {
  valid: [validWithSize].map((code: any) => ({ code })),
  invalid: [invalidWrongIconLinkRole].map((code: any) => ({
    code,
    errors: [{ message: errorMessage }],
  })),
});
