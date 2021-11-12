import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../text-replace-truncate-lineClamp', () =>
  Object.assign(jest.requireActual('../text-replace-truncate-lineClamp'), {
    parser: 'flow',
  }),
);

describe('text-replace-truncate-lineClamp', () => {
  ['text-replace-truncate-lineClamp'].forEach((test) => {
    defineTest(__dirname, 'text-replace-truncate-lineClamp', { quote: 'single' }, test);
  });
});
