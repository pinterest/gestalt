import { defineTest } from 'jscodeshift/src/testUtils';

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
      { parser: 'tsx' },
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
      { parser: 'tsx' },
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
      { parser: 'tsx' },
    );
  });
});
