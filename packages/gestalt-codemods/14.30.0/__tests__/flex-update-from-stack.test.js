import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../flex-update-from-stack', () =>
  Object.assign(jest.requireActual('../flex-update-from-stack'), {
    parser: 'flow',
  }),
);

describe('flex-update-from-stack', () => {
  ['flex-update-from-stack'].forEach((test) => {
    defineTest(__dirname, 'flex-update-from-stack', { quote: 'single' }, test);
  });
});
