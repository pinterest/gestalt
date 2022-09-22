// @flow strict

export default function expectToThrow(
  func: () => void,
  message?: string | Error | Class<Error> | RegExp,
) {
  const virtualConsoleSpy = jest.spyOn(window._virtualConsole, 'emit').mockImplementation(() => {});
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(func).toThrow(message);
  consoleErrorSpy.mockRestore();
  virtualConsoleSpy.mockRestore();
}
