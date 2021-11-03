import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../box_deprecate_size_props', () => Object.assign(jest.requireActual('../box_deprecate_size_props'), {
    parser: 'flow',
  }));

describe('box_deprecate_size_props', () => {
  ['box_deprecate_size_props'].forEach((test) => {
    defineTest(__dirname, 'box_deprecate_size_props', { quote: 'single' }, test);
  });
});
