import { act, renderHook } from '@testing-library/react-hooks';
import useReducedMotion from './useReducedMotion';

const mediaqueryDefaults = {
  matches: false,
  onchange: null,
  // @ts-expect-error - TS2344 - Type 'unknown' does not satisfy the constraint 'any[]'.
  addEventListener: jest.fn<ReadonlyArray<any>, unknown>(),
  // @ts-expect-error - TS2344 - Type 'unknown' does not satisfy the constraint 'any[]'.
  removeEventListener: jest.fn<ReadonlyArray<any>, unknown>(),
} as const;

describe('useReducedMotion', () => {
  test('returns true if "Reduced Motion" is enabled', () => {
    window.matchMedia = jest
      .fn<
        MediaQueryList,
        // @ts-expect-error - TS2344 - Type '{ addEventListener: any; matches: boolean; media: any; onchange: null; removeEventListener: any; }' does not satisfy the constraint 'any[]'.
        {
          addEventListener: jest.MockedFunction<any>;
          matches: boolean;
          media: any;
          onchange: null;
          removeEventListener: jest.MockedFunction<any>;
        }
      >()
      .mockImplementation((query: any) => ({
        ...mediaqueryDefaults,
        matches: true,
        media: query,
      }));

    const { result } = renderHook(useReducedMotion);
    expect(result.current).toBe(true);
  });

  test('returns false if "Reduced Motion" is disabled', () => {
    window.matchMedia = jest
      .fn<
        MediaQueryList,
        // @ts-expect-error - TS2344 - Type '{ addEventListener: any; matches: boolean; media: any; onchange: null; removeEventListener: any; }' does not satisfy the constraint 'any[]'.
        {
          addEventListener: jest.MockedFunction<any>;
          matches: boolean;
          media: any;
          onchange: null;
          removeEventListener: jest.MockedFunction<any>;
        }
      >()
      .mockImplementation((query: any) => ({
        ...mediaqueryDefaults,
        media: query,
      }));

    const { result } = renderHook(useReducedMotion);
    expect(result.current).toBe(false);
  });

  test('handles change of "prefers-reduce-motion" media query value', () => {
    let change: any;
    window.matchMedia = jest.fn().mockImplementation((query: any) => ({
      ...mediaqueryDefaults,
      matches: false,
      // @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type. | TS7006 - Parameter 'listener' implicitly has an 'any' type.
      addEventListener(event, listener) {
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
