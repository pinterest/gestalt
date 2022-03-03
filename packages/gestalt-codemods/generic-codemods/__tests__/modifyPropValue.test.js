import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../modifyPropValue', () =>
  Object.assign(jest.requireActual('../modifyPropValue'), {
    parser: 'flow',
  }),
);

describe('modifyPropValue: rename', () => {
  ['modifyPropValue/renamePropValue', 'modifyPropValue/renamePropValueAlias'].forEach((test) => {
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

describe('modifyPropValue: remove', () => {
  ['modifyPropValue/deprecatePropValue'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyPropValue',
      {
        quote: 'single',
        component: 'Box',
        previousProp: 'color',
        previousValue: 'red',
      },
      test,
      {},
    );
  });
});

describe('modifyPropValue: subcomponent rename', () => {
  ['modifyPropValue/subcomponentPropValue'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyPropValue',
      {
        quote: 'single',
        component: 'Dropdown',
        subcomponent: 'Item',
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

describe('modifyPropValue: add prop values', () => {
  ['modifyPropValue/addPropValue'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyPropValue',
      {
        quote: 'single',
        component: 'Box',
        nextProp: 'variant',
        nextValue: 'error',
      },
      test,
      {},
    );
  });
});
