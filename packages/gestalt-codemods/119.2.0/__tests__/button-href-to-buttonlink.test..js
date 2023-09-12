import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../button-href-to-buttonlink', () =>
  Object.assign(jest.requireActual('../button-href-to-buttonlink'), {
    parser: 'flow',
  }),
);

describe('button-href-to-buttonlink', () => {
  [
    'button-href-to-buttonlink/button-href-to-buttonlink',
    'button-href-to-buttonlink/button-href-to-buttonlinkAlias',
  ].forEach((test) => {
    defineTest(
      __dirname,
      'button-href-to-buttonlink',
      {
        quote: 'single',
        componentName: 'Button',
        nextComponentName: 'ButtonLink',
      },
      test,
      {},
    );
  });
});
