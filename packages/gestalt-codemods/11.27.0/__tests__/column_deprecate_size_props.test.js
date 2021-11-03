import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../column_deprecate_size_props', () => Object.assign(jest.requireActual('../column_deprecate_size_props'), {
    parser: 'flow',
  }));

describe('column_deprecate_size_props', () => {
  ['column_deprecate_size_props'].forEach((test) => {
    defineTest(__dirname, 'column_deprecate_size_props', { quote: 'single' }, test);
  });
});
