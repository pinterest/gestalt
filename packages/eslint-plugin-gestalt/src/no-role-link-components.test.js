// @flow strict
import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers.js';
import rule from './no-role-link-components.js';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-role-link-components/valid.js'),
  'utf-8',
);
const invalidButton = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-role-link-components/invalid/invalid-button.js'),
  'utf-8',
);
const invalidIconButton = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-role-link-components/invalid/invalid-iconbutton.js'),
  'utf-8',
);
const invalidTapArea = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-role-link-components/invalid/invalid-taparea.js'),
  'utf-8',
);

const getErrorMessage = (cmp: string) =>
  `${cmp} Components with role-link are disallowed in Pinboard. Please use app/common/react/ui/${cmp}Link.js instead.`;

ruleTester.run('no-role-link-components', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [invalidButton, 'Button'],
    [invalidIconButton, 'IconButton'],
    [invalidTapArea, 'TapArea'],
  ].map(([code, errorMessage]) => ({ code, errors: [{ message: getErrorMessage(errorMessage) }] })),
});
