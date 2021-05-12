// @flow strict
import { RuleTester } from 'eslint';
import rule from './no-box-disallowed-props.js';

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('no-box-disallowedProps', rule, {
  valid: [
    {
      code: `
import { Box } from 'gestalt';

export default function TestElement() {
  return <Box as="main">Test</Box>;
}
    `,
    },
    {
      code: `
import { Box } from 'gestalt';

export default function TestElement() {
  return <Box data-pinId="12345">Test</Box>;
}
    `,
    },
    {
      code: `
import { Box } from 'gestalt';

export default function TestElement() {
  return <Box aria-label="Accessibility Label">Test</Box>;
}
    `,
    },
  ],
  invalid: [
    {
      code: `
import { Box } from 'gestalt';

export default function TestElement() {
  return <Box backgroundColor="#fff">Test</Box>;
}
      `,
      errors: [
        {
          message:
            'backgroundColor is not allowed on Box. Please see https://gestalt.netlify.app/Box for all allowed props.',
        },
      ],
    },
    {
      code: `
import { Box } from 'gestalt';

export default function TestElement() {
  return <Box backgroundColor="#fff" invalidProp="Invalid">Test</Box>;
}
      `,
      errors: [
        {
          message:
            'backgroundColor, invalidProp are not allowed on Box. Please see https://gestalt.netlify.app/Box for all allowed props.',
        },
      ],
    },
  ],
});
