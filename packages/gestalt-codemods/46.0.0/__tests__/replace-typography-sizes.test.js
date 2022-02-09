import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../replace-typography-sizes', () =>
  Object.assign(jest.requireActual('../replace-typography-sizes'), {
    parser: 'flow',
  }),
);

describe('replace-typography-sizes', () => {
  ['text', 'heading', 'text-renamed', 'heading-renamed'].forEach((test) => {
    defineTest(__dirname, 'replace-typography-sizes', { quote: 'single' }, test);
  });
});
