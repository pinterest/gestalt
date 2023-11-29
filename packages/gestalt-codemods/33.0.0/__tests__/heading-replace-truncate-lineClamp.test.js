import { defineTest } from 'jscodeshift/dist/testUtils';

jest.mock('../heading-replace-truncate-lineClamp', () =>
  Object.assign(jest.requireActual('../heading-replace-truncate-lineClamp'), {
    parser: 'flow',
  }),
);

describe('heading-replace-truncate-lineClamp', () => {
  ['heading-replace-truncate-lineClamp', 'heading-replace-truncate-lineClamp-renamed'].forEach(
    (test) => {
      defineTest(__dirname, 'heading-replace-truncate-lineClamp', { quote: 'single' }, test);
    },
  );
});
