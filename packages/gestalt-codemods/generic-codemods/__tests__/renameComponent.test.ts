import { defineTest } from 'jscodeshift/src/testUtils';

jest.mock('../renameComponent', () =>
  Object.assign(jest.requireActual('../renameComponent'), {
    parser: 'tsx',
  }),
);

describe('renameComponent', () => {
  ['renameComponent/renameComponent', 'renameComponent/renameComponentAlias']
    .slice(0, 1) // TODO remove me
    .forEach((test) => {
      defineTest(
        __dirname,
        'renameComponent',
        {
          quote: 'single',
          componentName: 'ScrollableContainer',
          nextComponentName: 'ScrollBoundaryContainer',
        },
        test,
        { parser: 'tsx' },
      );
    });
});
