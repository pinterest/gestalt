import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../modifyPropValue', () =>
  Object.assign(jest.requireActual('../modifyPropValue'), {
    parser: 'flow',
  }),
);

describe('modifyPropValue: rename string', () => {
  ['modifyPropValue/renamePropValueString', 'modifyPropValue/renamePropValueStringAlias'].forEach(
    (test) => {
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
    },
  );
});

describe('modifyPropValue: rename number', () => {
  ['modifyPropValue/renamePropValueNumber'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyPropValue',
      {
        quote: 'single',
        component: 'Box',
        previousProp: 'width',
        nextProp: 'height',
        previousValue: '100%',
        nextValue: 40,
      },
      test,
      {},
    );
  });
});

describe('modifyPropValue: rename boolean', () => {
  ['modifyPropValue/renamePropValueBoolean'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyPropValue',
      {
        quote: 'single',
        component: 'Box',
        previousProp: 'fit',
        nextProp: 'left',
        previousValue: false,
        nextValue: true,
      },
      test,
      {},
    );
  });
});

describe('modifyPropValue: remove string', () => {
  ['modifyPropValue/deprecatePropValueString'].forEach((test) => {
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

describe('modifyPropValue: remove number', () => {
  ['modifyPropValue/deprecatePropValueNumber'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyPropValue',
      {
        quote: 'single',
        component: 'Box',
        previousProp: 'width',
        previousValue: 400,
      },
      test,
      {},
    );
  });
});

describe('modifyPropValue: remove boolean', () => {
  ['modifyPropValue/deprecatePropValueBoolean'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyPropValue',
      {
        quote: 'single',
        component: 'Box',
        previousProp: 'fit',
        previousValue: false,
      },
      test,
      {},
    );
  });
});

describe.only('modifyPropValue: remove omitted boolean', () => {
  ['modifyPropValue/deprecatePropValueTrueBoolean'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyPropValue',
      {
        quote: 'single',
        component: 'Box',
        previousProp: 'fit',
        previousValue: true,
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

describe('modifyPropValue: add prop values (string)', () => {
  ['modifyPropValue/addPropValueString'].forEach((test) => {
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
