import { defineTest, runTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../replace-typography-sizes', () =>
  Object.assign(jest.requireActual('../replace-typography-sizes'), {
    parser: 'flow',
  }),
);

describe('replace-typography-sizes', () => {
  ['text', 'heading'].forEach((test) => {
    it(`transforms correctly using ${test} data`, () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      runTest(__dirname, 'replace-typography-sizes', { quote: 'single' }, test);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Manually check any Heading and Text non-literal properties for size and rerun codemod',
        ),
      );
    });
  });

  ['text-renamed', 'heading-renamed'].forEach((test) => {
    defineTest(__dirname, 'replace-typography-sizes', { quote: 'single' }, test);
  });
});
