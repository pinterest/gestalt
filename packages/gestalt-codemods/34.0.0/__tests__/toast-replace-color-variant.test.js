import { defineTest, runTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../toast-replace-color-variant', () =>
  Object.assign(jest.requireActual('../toast-replace-color-variant'), {
    parser: 'flow',
  }),
);

describe('toast-replace-color-variant', () => {
  ['color-red', 'color-white', 'no-color', 'renamed'].forEach((test) => {
    defineTest(__dirname, 'toast-replace-color-variant', { quote: 'single' }, test);
  });

  it(`transforms correctly using "empty-string-color" data`, () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    runTest(__dirname, 'toast-replace-color-variant', { quote: 'single' }, 'empty-string-color');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Toast component with color prop used an invalid or empty value'),
    );
  });

  it(`transforms correctly using "null-color" data`, () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    runTest(__dirname, 'toast-replace-color-variant', { quote: 'single' }, 'null-color');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Toast component with color prop passed "undefined" or "null"'),
    );
  });

  it(`transforms correctly using "undefined-color" data`, () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    runTest(__dirname, 'toast-replace-color-variant', { quote: 'single' }, 'undefined-color');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Toast component with color prop passed "undefined" or "null"'),
    );
  });

  it(`transforms correctly using "ternary-color" data`, () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    runTest(__dirname, 'toast-replace-color-variant', { quote: 'single' }, 'ternary-color');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Toast component with color prop used a dynamic value'),
    );
  });

  it(`transforms correctly using "variable-color" data`, () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    runTest(__dirname, 'toast-replace-color-variant', { quote: 'single' }, 'variable-color');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Toast component with color prop used a dynamic value'),
    );
  });
});
