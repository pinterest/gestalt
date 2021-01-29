// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule from './prefer-box.js';

const ruleTester = new RuleTester();

const parserOptions = {
  sourceType: 'module',
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

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

ruleTester.run('prefer-box', rule, {
  valid: [
    {
      code: validCode,
      parserOptions,
    },
  ],
  invalid: [
    {
      code: invalidBackgroundColor,
      parserOptions,
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
      parserOptions,
      errors: [
        {
          message:
            'Replace this div with a gestalt Box. https://gestalt.netlify.app/Box\n' +
            '  Use prop `rounding="circle"` instead',
        },
      ],
    },
  ],
});
