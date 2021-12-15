import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../rename-dropdown-dangerouslyRemoveLayer-to-isWithinFixed', () =>
  Object.assign(jest.requireActual('../rename-dropdown-dangerouslyRemoveLayer-to-isWithinFixed'), {
    parser: 'flow',
  }),
);

describe('rename-dropdown-dangerouslyRemoveLayer-to-isWithinFixed', () => {
  ['rename-dropdown-dangerouslyRemoveLayer-to-isWithinFixed'].forEach((test) => {
    defineTest(
      __dirname,
      'rename-dropdown-dangerouslyRemoveLayer-to-isWithinFixed',
      { quote: 'single' },
      test,
    );
  });
});
