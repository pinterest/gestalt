// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule from './prefer-box.js';
import { parserOptions } from './testHelpers.js';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box/valid.js'),
  'utf-8',
);
const invalidBackgroundColor = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box/invalid/invalid-backgroundColor.js'),
  'utf-8',
);
const invalidBorderRadius = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box/invalid/invalid-borderRadius.js'),
  'utf-8',
);
const invalidBorder = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box/invalid/invalid-border.js'),
  'utf-8',
);

ruleTester.run('prefer-box', rule, {
  valid: [{ code: validCode }],
  invalid: [
    {
      code: invalidBackgroundColor,
      errors: [
        {
          message:
            'Replace this div with a gestalt Box. https://gestalt.netlify.app/Box\n' +
            '  Use prop `color="white"` instead',
        },
      ],
    },
    {
      code: invalidBorderRadius,
      errors: [
        {
          message:
            'Replace this div with a gestalt Box. https://gestalt.netlify.app/Box\n' +
            '  Use prop `rounding="circle"` instead',
        },
      ],
    },
    {
      code: invalidBorder,
      errors: [
        {
          message:
            'Replace this div with a gestalt Box. https://gestalt.netlify.app/Box\n' +
            '  Use prop `borderStyle="lg"` instead',
        },
      ],
    },
  ],
});
