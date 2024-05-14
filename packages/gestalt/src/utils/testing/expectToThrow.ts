export default function expectToThrow(func: () => void, message?: string | Error | RegExp) {
  // @ts-expect-error - TS2339 - Property '_virtualConsole' does not exist on type 'Window & typeof globalThis'.
  // eslint-disable-next-line no-underscore-dangle
  const virtualConsoleSpy = jest.spyOn(window._virtualConsole, 'emit').mockImplementation(() => {});
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(func).toThrow(message);
  consoleErrorSpy.mockRestore();
  virtualConsoleSpy.mockRestore();
}
