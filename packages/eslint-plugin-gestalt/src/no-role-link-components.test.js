// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule from './no-role-link-components.js';
import { parserOptions } from './testHelpers.js';

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

ruleTester.run('no-role-link-components', rule, {
  valid: [{ code: validCode }],
  invalid: [
    {
      code: invalidButton,
      errors: [
        {
          message:
            'Button Components with role-link are disallowed in Pinboard. Please use app/common/react/ui/ButtonLink.js instead.',
        },
      ],
    },
    {
      code: invalidIconButton,
      errors: [
        {
          message:
            'IconButton Components with role-link are disallowed in Pinboard. Please use app/common/react/ui/IconButtonLink.js instead.',
        },
      ],
    },
    {
      code: invalidTapArea,
      errors: [
        {
          message:
            'TapArea Components with role-link are disallowed in Pinboard. Please use app/common/react/ui/TapAreaLink.js instead.',
        },
      ],
    },
  ],
});
