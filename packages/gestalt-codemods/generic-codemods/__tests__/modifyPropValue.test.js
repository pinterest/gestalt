import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../modifyPropValue', () =>
  Object.assign(jest.requireActual('../modifyPropValue'), {
    parser: 'flow',
  }),
);

describe('modifyPropValue: xx', () => {
  ['modifyPropValue/renamePropValue'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyPropValue',
      {
        quote: 'single',
        component: 'Box',
        previousProp: 'color',
        nextProp: 'variant',
        previousValue: 'red',
        nextValue: 'error',
      },
      test,
      {},
    );
  });
});
