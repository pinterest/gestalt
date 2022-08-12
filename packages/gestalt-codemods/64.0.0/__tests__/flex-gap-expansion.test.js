import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../flex-gap-expansion', () =>
  Object.assign(jest.requireActual('../flex-gap-expansion'), {
    parser: 'flow',
  }),
);

describe('flex-gap-expansion', () => {
  ['flex-gap-expansion', 'flex-gap-expansion-renamed'].forEach((test) => {
    defineTest(__dirname, 'flex-gap-expansion', { quote: 'single' }, test);
  });
});
