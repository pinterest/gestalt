import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../table-border-size-replace-border-style', () => {
  return Object.assign(jest.requireActual('../table-border-size-replace-border-style'), {
    parser: 'flow',
  });
});

describe('table-border-size-replace-border-style', () => {
  ['table-border-size-replace-border-style'].forEach((test) => {
    defineTest(__dirname, 'table-border-size-replace-border-style', { quote: 'single' }, test);
  });
});
