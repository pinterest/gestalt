import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../modifyProp', () =>
  Object.assign(jest.requireActual('../modifyProp'), {
    parser: 'flow',
  }),
);

describe('modifyProp: deprecate', () => {
  ['modifyProp/deprecateProp'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyProp',
      {
        quote: 'single',
        componentName: 'Box',
        previousPropName: 'height',
      },
      test,
      {},
    );
  });
});

describe('modifyProp: rename', () => {
  ['modifyProp/renameProp', 'modifyProp/renamePropAlias'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyProp',
      {
        quote: 'single',
        componentName: 'Box',
        previousPropName: 'height',
        nextPropName: 'renameHeight',
      },
      test,
      {},
    );
  });
});

describe('modifyProp: rename with subcomponent', () => {
  ['modifyProp/subcomponentProp'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyProp',
      {
        quote: 'single',
        componentName: 'Dropdown',
        subcomponentName: 'Item',
        previousPropName: 'height',
        nextPropName: 'renameHeight',
      },
      test,
      {},
    );
  });
});
