export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoTypeScriptErrors(): R;
    }
  }
}
