import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../tabs-size', () => {
  return Object.assign(jest.requireActual('../tabs-size'), {
    parser: 'flow',
  });
});

describe('tabs-size', () => {
  ['tabs-size', 'tabs-size-renamed'].forEach((test) => {
    defineTest(__dirname, 'tabs-size', { quote: 'single' }, test);
  });
});
