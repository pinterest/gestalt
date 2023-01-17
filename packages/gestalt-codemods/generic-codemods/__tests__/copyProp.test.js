import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../copyProp', () =>
  Object.assign(jest.requireActual('../copyProp'), {
    parser: 'flow',
  }),
);

describe('copyProp: noObjectnoObject', () => {
  [
    'copyProp/noObjectnoObjectBoolean',
    'copyProp/noObjectnoObjectText',
    'copyProp/noObjectnoObjectNumber',
  ].forEach((test) => {
    defineTest(
      __dirname,
      'copyProp',
      {
        quote: 'single',
        component: 'IconButton',
        previousProp: 'good',
        nextProp: 'test',
      },
      test,
      {},
    );
  });
});

describe('copyProp: noObjectObject', () => {
  ['copyProp/noObjectObject'].forEach((test) => {
    defineTest(
      __dirname,
      'copyProp',
      {
        quote: 'single',
        component: 'IconButton',
        previousProp: 'good',
        nextProp: 'test',
        nextPropNode: 'text',
      },
      test,
      {},
    );
  });
});

describe('copyProp: ObjectNoObject', () => {
  ['copyProp/objectNoObject'].forEach((test) => {
    defineTest(
      __dirname,
      'copyProp',
      {
        quote: 'single',
        component: 'IconButton',
        previousProp: 'good',
        previousPropNode: 'test',
        nextProp: 'test',
      },
      test,
      {},
    );
  });
});

describe('copyProp: ObjectObject', () => {
  ['copyProp/objectObject'].forEach((test) => {
    defineTest(
      __dirname,
      'copyProp',
      {
        quote: 'single',
        component: 'IconButton',
        previousProp: 'good',
        previousPropNode: 'test',
        nextProp: 'test',
        nextPropNode: 'text',
      },
      test,
      {},
    );
  });
});
