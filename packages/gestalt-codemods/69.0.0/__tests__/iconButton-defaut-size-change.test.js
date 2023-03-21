import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../iconButton-defaut-size-change', () =>
  Object.assign(jest.requireActual('../iconButton-defaut-size-change'), {
    parser: 'flow',
  }),
);

describe('iconButton-defaut-size-change', () => {
  ['iconButton-defaut-size-change', 'iconButton-defaut-size-change-renamed'].forEach((test) => {
    defineTest(__dirname, 'iconButton-defaut-size-change', { quote: 'single' }, test);
  });
});
