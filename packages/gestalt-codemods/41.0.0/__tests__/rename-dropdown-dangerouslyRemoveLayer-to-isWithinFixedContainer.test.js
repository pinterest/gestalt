import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../rename-dropdown-dangerouslyRemoveLayer-to-isWithinFixedContainer', () =>
  Object.assign(
    jest.requireActual('../rename-dropdown-dangerouslyRemoveLayer-to-isWithinFixedContainer'),
    {
      parser: 'flow',
    },
  ),
);

describe('rename-dropdown-dangerouslyRemoveLayer-to-isWithinFixedContainer', () => {
  ['rename-dropdown-dangerouslyRemoveLayer-to-isWithinFixedContainer'].forEach((test) => {
    defineTest(
      __dirname,
      'rename-dropdown-dangerouslyRemoveLayer-to-isWithinFixedContainer',
      { quote: 'single' },
      test,
    );
  });
});
