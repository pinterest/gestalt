import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../heading-replace-truncate-lineClamp', () => {
  return Object.assign(jest.requireActual('../heading-replace-truncate-lineClamp'), {
    parser: 'flow',
  });
});

describe('heading-replace-truncate-lineClamp', () => {
  ['heading-replace-truncate-lineClamp'].forEach((test) => {
    defineTest(__dirname, 'heading-replace-truncate-lineClamp', { quote: 'single' }, test);
  });
});
