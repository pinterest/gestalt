// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule from './no-role-link-components.js';

const ruleTester = new RuleTester();

const parserOptions = {
  sourceType: 'module',
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-role-link-components/valid.js'),
  'utf-8'
);
const invalidButton = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-role-link-components/invalid/invalid-button.js'
  ),
  'utf-8'
);
const invalidIconButton = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-role-link-components/invalid/invalid-iconbutton.js'
  ),
  'utf-8'
);
const invalidTapArea = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-role-link-components/invalid/invalid-taparea.js'
  ),
  'utf-8'
);

ruleTester.run('no-role-link-components', rule, {
  valid: [
    {
      code: validCode,
      parserOptions,
    },
  ],
  invalid: [
    {
      code: invalidButton,
      parserOptions,
      errors: [
        {
          message:
            'Button Components with role-link are disallowed in Pinboard. Please use app/common/react/ui/ButtonLink.js instead.',
        },
      ],
    },
    {
      code: invalidIconButton,
      parserOptions,
      errors: [
        {
          message:
            'IconButton Components with role-link are disallowed in Pinboard. Please use app/common/react/ui/IconButtonLink.js instead.',
        },
      ],
    },
    {
      code: invalidTapArea,
      parserOptions,
      errors: [
        {
          message:
            'TapArea Components with role-link are disallowed in Pinboard. Please use app/common/react/ui/TapAreaLink.js instead.',
        },
      ],
    },
  ],
});
