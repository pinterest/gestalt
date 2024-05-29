import { defineTest } from 'jscodeshift/src/testUtils';
import buildCustomApplyTransform, { buildInputPath } from './utils';

jest.mock('../modifyPropValue', () =>
  Object.assign(jest.requireActual('../modifyPropValue'), {
    parser: 'jsx',
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
        { parser: 'tsx' },
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
      { parser: 'tsx' },
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
      { parser: 'tsx' },
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
      { parser: 'tsx' },
    );
  });
});

describe('modifyPropValue: rename value string', () => {
  ['modifyPropValue/renamePropValueStringValue'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyPropValue',
      {
        quote: 'single',
        component: 'Box',
        previousProp: 'height',
        previousValue: '100%',
        nextValue: '200%',
      },
      test,
      { parser: 'tsx' },
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
      { parser: 'tsx' },
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
      { parser: 'tsx' },
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
      { parser: 'tsx' },
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
      { parser: 'tsx' },
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
      { parser: 'tsx' },
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
      { parser: 'tsx' },
    );
  });
});

describe('modifyPropValue: throws error on spread props', () => {
  ['modifyPropValue/errorSpreadProp'].forEach((test) => {
    it(`throws error message correctly using "${test}" data`, async () => {
      expect(
        buildCustomApplyTransform({
          transformName: 'modifyPropValue',
          moduleOptions: {
            quote: 'single',
            component: 'Box',
            nextProp: 'variant',
            nextValue: 'error',
          },
          test,
        }),
      ).toThrow(
        new Error(`Remove dynamic properties and rerun codemod.
Location: ${buildInputPath({ test })} @line: 8
Location: ${buildInputPath({ test })} @line: 9
Location: ${buildInputPath({ test })} @line: 9`),
      );
    });
  });
});
