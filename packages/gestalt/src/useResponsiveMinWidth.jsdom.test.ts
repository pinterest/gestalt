import {act, renderHook} from '@testing-library/react-hooks';
import useResponsiveMinWidth from './useResponsiveMinWidth';

const mediaqueryDefaults = {
  matches: false,
  onchange: null,
  addEventListener: jest.fn<ReadonlyArray<any>, unknown>(),
  removeEventListener: jest.fn<ReadonlyArray<any>, unknown>(),
} as const;

describe('useResponsiveMinWidth', () => {
  test('returns `xs` for extra small screens', () => {
    window.matchMedia = jest
      .fn<_, {
      addEventListener: jest.MockedFunction<any>,
      matches: boolean,
      media: any,
      onchange: null,
      removeEventListener: jest.MockedFunction<any>
    }>()
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
      .fn<_, {
      addEventListener: jest.MockedFunction<any>,
      matches: boolean,
      media: any,
      onchange: null,
      removeEventListener: jest.MockedFunction<any>
    }>()
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
      .fn<_, {
      addEventListener: jest.MockedFunction<any>,
      matches: boolean,
      media: any,
      onchange: null,
      removeEventListener: jest.MockedFunction<any>
    }>()
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
      .fn<_, {
      addEventListener: jest.MockedFunction<any>,
      matches: boolean,
      media: any,
      onchange: null,
      removeEventListener: jest.MockedFunction<any>
    }>()
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
