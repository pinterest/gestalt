import { act, renderHook } from '@testing-library/react-hooks';
import useResponsiveMinWidth from './useResponsiveMinWidth';

const mediaqueryDefaults = {
  matches: false,
  onchange: null,
// @ts-expect-error - TS2344 - Type 'unknown' does not satisfy the constraint 'any[]'.
  addEventListener: jest.fn<ReadonlyArray<any>, unknown>(),
// @ts-expect-error - TS2344 - Type 'unknown' does not satisfy the constraint 'any[]'.
  removeEventListener: jest.fn<ReadonlyArray<any>, unknown>(),
} as const;

describe('useResponsiveMinWidth', () => {
  test('returns `xs` for extra small screens', () => {
    window.matchMedia = jest
      .fn<
        _,
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
        matches: query === '(min-width: 240px)',
        media: query,
      }));

    const { result } = renderHook(useResponsiveMinWidth);
    expect(result.current).toBe('xs');
  });

  test('returns `sm` for small screens', () => {
    window.matchMedia = jest
      .fn<
        _,
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
        matches: query === '(min-width: 576px)',
        media: query,
      }));

    const { result } = renderHook(useResponsiveMinWidth);
    expect(result.current).toBe('sm');
  });

  test('returns `md` for medium screens', () => {
    window.matchMedia = jest
      .fn<
        _,
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
        matches: query === '(min-width: 768px)',
        media: query,
      }));

    const { result } = renderHook(useResponsiveMinWidth);
    expect(result.current).toBe('md');
  });

  test('returns `lg` for large screens', () => {
    window.matchMedia = jest
      .fn<
        _,
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
        matches: query === '(min-width: 1312px)',
        media: query,
      }));

    const { result } = renderHook(useResponsiveMinWidth);
    expect(result.current).toBe('lg');
  });

  test('handles the resize of screen', () => {
    let change: any;
    window.matchMedia = jest.fn().mockImplementation((query: any) => ({
      ...mediaqueryDefaults,
      matches: false,
// @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type. | TS7006 - Parameter 'listener' implicitly has an 'any' type.
      addEventListener(event, listener) {
        this.matches = query === '(min-width: 768px)';
        change = listener;
      },
      media: query,
    }));

    const { result } = renderHook(useResponsiveMinWidth);

    expect(result.current).toBe('xs');

    act(() => {
      change();
    });

    expect(result.current).toBe('md');
  });
});
