// @flow strict
import { renderHook, act } from '@testing-library/react-hooks';
import useReducedMotion from './useReducedMotion.js';

const mediaqueryDefaults = {
  matches: false,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

describe('useReducedMotion', () => {
  test('returns true if "Reduced Motion" is enabled', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
        ...mediaqueryDefaults,
        matches: true,
        media: query,
      }));

    const { result } = renderHook(useReducedMotion);
    expect(result.current).toBe(true);
  });

  test('returns false if "Reduced Motion" is disabled', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
        ...mediaqueryDefaults,
        media: query,
      }));

    const { result } = renderHook(useReducedMotion);
    expect(result.current).toBe(false);
  });

  test('handles change of "prefers-reduce-motion" media query value', () => {
    let change;
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
