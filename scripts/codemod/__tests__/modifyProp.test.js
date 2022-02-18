import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../modifyProp', () =>
  Object.assign(jest.requireActual('../modifyProp'), {
    parser: 'flow',
  }),
);

describe('modifyCmp: deprecate', () => {
  ['modifyProp/deprecateProp'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyProp',
      {
        quote: 'single',
        action: 'deprecate',
        componentName: 'Box',
        previousPropName: 'height',
      },
      test,
      {},
    );
  });
});

describe('modifyCmp: rename', () => {
  ['modifyProp/renameProp', 'modifyProp/renamePropAlias'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyProp',
      {
        quote: 'single',
        action: 'rename',
        componentName: 'Box',
        previousPropName: 'height',
        nextPropName: 'renameHeight',
      },
      test,
      {},
    );
  });
});

describe('modifyCmp: rename with subcomponent', () => {
  ['modifyProp/subcomponentProp'].forEach((test) => {
    defineTest(
      __dirname,
      'modifyProp',
      {
        quote: 'single',
        action: 'rename',
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
