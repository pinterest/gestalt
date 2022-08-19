import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../iconButton-defaut-iconColor-change', () =>
  Object.assign(jest.requireActual('../iconButton-defaut-iconColor-change'), {
    parser: 'flow',
  }),
);

describe('iconButton-defaut-iconColor-change', () => {
  ['iconButton-defaut-iconColor-change', 'iconButton-defaut-iconColor-change-renamed'].forEach(
    (test) => {
      defineTest(__dirname, 'iconButton-defaut-iconColor-change', { quote: 'single' }, test);
    },
  );
});
