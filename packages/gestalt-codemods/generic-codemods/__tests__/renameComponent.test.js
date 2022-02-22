import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../renameComponent', () =>
  Object.assign(jest.requireActual('../renameComponent'), {
    parser: 'flow',
  }),
);

describe('renameComponent', () => {
  ['renameComponent/renameComponent', 'renameComponent/renameComponentAlias'].forEach((test) => {
    defineTest(
      __dirname,
      'renameComponent',
      {
        quote: 'single',
        previousCmpName: 'ScrollableContainer',
        nextCmpName: 'ScrollBoundaryContainer',
      },
      test,
      {},
    );
  });
});
