import { defineTest } from 'jscodeshift/dist/testUtils';

jest.mock('../scrollableContainer-rename-scrollBoundaryContainer', () =>
  Object.assign(jest.requireActual('../scrollableContainer-rename-scrollBoundaryContainer'), {
    parser: 'flow',
  }),
);

describe('scrollableContainer-rename-scrollBoundaryContainer', () => {
  [
    'scrollableContainer-rename-scrollBoundaryContainer',
    'scrollableContainerAlias-rename-scrollBoundaryContainer',
  ].forEach((test) => {
    defineTest(
      __dirname,
      'scrollableContainer-rename-scrollBoundaryContainer',
      { quote: 'single' },
      test,
    );
  });
});
