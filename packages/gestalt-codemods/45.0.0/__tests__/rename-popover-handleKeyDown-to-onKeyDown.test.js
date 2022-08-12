import { runTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../rename-popover-handleKeyDown-to-onKeyDown', () =>
  Object.assign(jest.requireActual('../rename-popover-handleKeyDown-to-onKeyDown'), {
    parser: 'flow',
  }),
);

describe('rename-popover-handleKeyDown-to-onKeyDown', () => {
  [
    'rename-popover-handleKeyDown-to-onKeyDown',
    'rename-renamed-popover-handleKeyDown-to-onKeyDown',
  ].forEach((test) => {
    it(`transforms correctly using "${test}" data`, () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      runTest(__dirname, 'rename-popover-handleKeyDown-to-onKeyDown', { quote: 'single' }, test);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Popover prop handleKeyDown has being renamed to onKeyDown'),
      );
    });
  });
});
