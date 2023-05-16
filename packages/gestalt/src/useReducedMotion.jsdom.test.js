// @flow strict
import { renderHook, act } from '@testing-library/react-hooks';
import useReducedMotion from './useReducedMotion.js';

const mediaqueryDefaults = {
  matches: false,
  onchange: null,
  addEventListener: jest.fn<$ReadOnlyArray<$FlowFixMe>, mixed>(),
  removeEventListener: jest.fn<$ReadOnlyArray<$FlowFixMe>, mixed>(),
};

describe('useReducedMotion', () => {
  test('returns true if "Reduced Motion" is enabled', () => {
    window.matchMedia = jest
      // $FlowFixMe[underconstrained-implicit-instantiation]
      .fn<
        _,
        {|
          addEventListener: JestMockFn<$ReadOnlyArray<$FlowFixMe>, mixed>,
          matches: boolean,
          media: $FlowFixMe,
          onchange: null,
          removeEventListener: JestMockFn<$ReadOnlyArray<$FlowFixMe>, mixed>,
        |},
      >()
      .mockImplementation((query) => ({
        ...mediaqueryDefaults,
        matches: true,
        media: query,
      }));

    const { result } = renderHook(useReducedMotion);
    expect(result.current).toBe(true);
  });

  test('returns false if "Reduced Motion" is disabled', () => {
    window.matchMedia = jest
      // $FlowFixMe[underconstrained-implicit-instantiation]
      .fn<
        _,
        {|
          addEventListener: JestMockFn<$ReadOnlyArray<$FlowFixMe>, mixed>,
          matches: boolean,
          media: $FlowFixMe,
          onchange: null,
          removeEventListener: JestMockFn<$ReadOnlyArray<$FlowFixMe>, mixed>,
        |},
      >()
      .mockImplementation((query) => ({
        ...mediaqueryDefaults,
        media: query,
      }));

    const { result } = renderHook(useReducedMotion);
    expect(result.current).toBe(false);
  });

  test('handles change of "prefers-reduce-motion" media query value', () => {
    let change;
    // $FlowFixMe[underconstrained-implicit-instantiation]
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      ...mediaqueryDefaults,
      matches: false,
      addEventListener(event, listener) {
        // $FlowFixMe[object-this-reference]
        this.matches = true;
        change = listener;
      },
      media: query,
    }));

    const { result } = renderHook(useReducedMotion);

    expect(result.current).toBe(false);

    act(() => {
      change();
    });

    expect(result.current).toBe(true);
  });
});
