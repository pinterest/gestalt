import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../box-border-size-replace-border-style', () => {
  return Object.assign(jest.requireActual('../box-border-size-replace-border-style'), {
    parser: 'flow',
  });
});

describe('box-border-size-replace-border-style', () => {
  ['box-border-size-replace-border-style'].forEach((test) => {
    defineTest(__dirname, 'box-border-size-replace-border-style', { quote: 'single' }, test);
  });
});
