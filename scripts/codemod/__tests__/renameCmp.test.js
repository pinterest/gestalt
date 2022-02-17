import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../renameCmp', () =>
  Object.assign(jest.requireActual('../renameCmp'), {
    parser: 'flow',
  }),
);

describe('renameCmp', () => {
  ['renameCmp/renameCmp', 'renameCmp/renameCmpAlias'].forEach((test) => {
    defineTest(
      __dirname,
      'renameCmp',
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
