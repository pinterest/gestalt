// @ts-expect-error - TS2307 - Cannot find module 'flow-to-typescript-codemod' or its corresponding type declarations.
import { Flow } from 'flow-to-typescript-codemod';

export default function expectToThrow(
  func: () => void,
  message?: string | Error | Flow.Class<Error> | RegExp,
) {
  /* eslint-disable-next-line no-underscore-dangle */
// @ts-expect-error - TS2339 - Property '_virtualConsole' does not exist on type 'Window & typeof globalThis'.
  const virtualConsoleSpy = jest.spyOn(window._virtualConsole, 'emit').mockImplementation(() => {});
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(func).toThrow(message);
  consoleErrorSpy.mockRestore();
  virtualConsoleSpy.mockRestore();
}
