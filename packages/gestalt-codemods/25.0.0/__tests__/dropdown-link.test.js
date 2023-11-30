import { defineTest } from 'jscodeshift/dist/testUtils';

jest.mock('../dropdown-link', () =>
  Object.assign(jest.requireActual('../dropdown-link'), {
    parser: 'flow',
  }),
);

describe('dropdown-link', () => {
  ['dropdown-link', 'dropdown-link-renamed'].forEach((test) => {
    defineTest(__dirname, 'dropdown-link', { quote: 'single' }, test);
  });
});
