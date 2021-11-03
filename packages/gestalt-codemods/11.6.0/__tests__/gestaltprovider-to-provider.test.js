import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../gestaltprovider-to-provider', () => Object.assign(jest.requireActual('../gestaltprovider-to-provider'), {
    parser: 'flow',
  }));

describe('gestaltprovider-to-provider', () => {
  [
    'gestaltprovider-to-provider-1',
    'gestaltprovider-to-provider-2',
    'gestaltprovider-to-provider-3',
  ].forEach((test) => {
    defineTest(__dirname, 'gestaltprovider-to-provider', { quote: 'single' }, test);
  });
});
