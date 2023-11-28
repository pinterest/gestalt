import { defineTest } from 'jscodeshift/dist/testUtils';

jest.mock('../segmentedcontrol-size', () =>
  Object.assign(jest.requireActual('../segmentedcontrol-size'), {
    parser: 'flow',
  }),
);

describe('segmentedcontrol-size', () => {
  ['segmentedcontrol-size', 'segmentedcontrol-size-renamed'].forEach((test) => {
    defineTest(__dirname, 'segmentedcontrol-size', { quote: 'single' }, test);
  });
});
