import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../flex-update-from-row', () =>
  Object.assign(jest.requireActual('../flex-update-from-row'), {
    parser: 'flow',
  }),
);

describe('flex-update-from-row', () => {
  ['flex-update-from-row'].forEach((test) => {
    defineTest(__dirname, 'flex-update-from-row', { quote: 'double' }, test);
  });
});
