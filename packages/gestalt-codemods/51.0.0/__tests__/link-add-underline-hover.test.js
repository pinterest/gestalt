import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../link-add-underline-hover', () =>
  Object.assign(jest.requireActual('../link-add-underline-hover'), {
    parser: 'flow',
  }),
);

describe('link-add-underline-hover', () => {
  ['link-add-underline-hover'].forEach((test) => {
    defineTest(__dirname, 'link-add-underline-hover', { quote: 'single' }, test);
  });
});
