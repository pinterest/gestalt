import { defineTest } from 'jscodeshift/dist/testUtils';

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
        componentName: 'ScrollableContainer',
        nextComponentName: 'ScrollBoundaryContainer',
      },
      test,
      {},
    );
  });
});
