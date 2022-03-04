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

describe('modifyPropValue: rename omitted boolean', () => {
  ['modifyPropValue/renamePropValueTrueBoolean'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyPropValue',
      {
        quote: 'single',
        component: 'Box',
        previousProp: 'fit',
        nextProp: 'left',
        previousValue: true,
        nextValue: false,
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

describe('modifyPropValue: remove omitted boolean', () => {
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

/**  We skip this test as it's only purpose is to throw an error on spread props. Errors cannot be tested with current jscodeshift testing API. Unskip to see the following error message:

  Remove dynamic properties and rerun codemod.
  Location: /Users/acarreras/code/gestalt/packages/gestalt-codemods/generic-codemods/__testfixtures__/modifyPropValue/errorSpreadProp.input.js @line: 6
  Location: /Users/acarreras/code/gestalt/packages/gestalt-codemods/generic-codemods/__testfixtures__/modifyPropValue/errorSpreadProp.input.js @line: 7
  */
describe.skip('modifyPropValue: throws error on spread props', () => {
  ['modifyPropValue/errorSpreadProp'].forEach((test) => {
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
