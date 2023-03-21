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
        component: 'Box',
        previousProp: 'height',
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
        component: 'Box',
        previousProp: 'height',
        nextProp: 'renameHeight',
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
        component: 'Dropdown',
        subcomponent: 'Item',
        previousProp: 'height',
        nextProp: 'renameHeight',
      },
      test,
      {},
    );
  });
});
