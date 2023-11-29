import { defineTest } from 'jscodeshift/dist/testUtils';

jest.mock('../tabs-size', () =>
  Object.assign(jest.requireActual('../tabs-size'), {
    parser: 'flow',
  }),
);

describe('tabs-size', () => {
  ['tabs-size', 'tabs-size-renamed'].forEach((test) => {
    defineTest(__dirname, 'tabs-size', { quote: 'single' }, test);
  });
});
