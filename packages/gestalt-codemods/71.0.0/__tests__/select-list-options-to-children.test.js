import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../select-list-options-to-children', () =>
  Object.assign(jest.requireActual('../select-list-options-to-children'), {
    parser: 'flow',
  }),
);

describe('select-list-options-to-children', () => {
  [
    'select-list-options-to-children-inline',
    'select-list-options-to-children-inline-renamed',
    'select-list-options-to-children-variable',
  ].forEach((test) => {
    defineTest(__dirname, 'select-list-options-to-children', { quote: 'single' }, test);
  });
});
