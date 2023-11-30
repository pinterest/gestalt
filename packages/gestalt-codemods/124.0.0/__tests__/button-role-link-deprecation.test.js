import { defineTest } from 'jscodeshift/dist/testUtils';

jest.mock('../button-role-link-deprecation', () =>
  Object.assign(jest.requireActual('../button-role-link-deprecation'), {
    parser: 'flow',
  }),
);

describe('button-role-link-deprecation', () => {
  ['button-role-link-deprecation/button-role-link-deprecation'].forEach((test) => {
    defineTest(
      __dirname,
      'button-role-link-deprecation',
      {
        quote: 'single',
      },
      test,
      {},
    );
  });
});
