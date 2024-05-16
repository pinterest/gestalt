import { Flow } from 'flow-to-typescript-codemod';

export default function expectToThrow(
  func: () => void,
  message?: string | Error | Flow.Class<Error> | RegExp,
) {
  /* eslint-disable-next-line no-underscore-dangle */
  const virtualConsoleSpy = jest.spyOn(window._virtualConsole, 'emit').mockImplementation(() => {});
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(func).toThrow(message);
  consoleErrorSpy.mockRestore();
  virtualConsoleSpy.mockRestore();
}
