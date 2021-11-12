// @flow strict
import { renderHook, act } from '@testing-library/react-hooks';
import useResponsiveMinWidth from './useResponsiveMinWidth.js';

const mediaqueryDefaults = {
  matches: false,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

describe('useResponsiveMinWidth', () => {
  test('returns `xs` for extra small screens', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      ...mediaqueryDefaults,
      matches: query === '(min-width: 240px)',
      media: query,
    }));

    const { result } = renderHook(useResponsiveMinWidth);
    expect(result.current).toBe('xs');
  });

  test('returns `sm` for small screens', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      ...mediaqueryDefaults,
      matches: query === '(min-width: 576px)',
      media: query,
    }));

    const { result } = renderHook(useResponsiveMinWidth);
    expect(result.current).toBe('sm');
  });

  test('returns `md` for medium screens', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      ...mediaqueryDefaults,
      matches: query === '(min-width: 768px)',
      media: query,
    }));

    const { result } = renderHook(useResponsiveMinWidth);
    expect(result.current).toBe('md');
  });

  test('returns `lg` for large screens', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      ...mediaqueryDefaults,
      matches: query === '(min-width: 1312px)',
      media: query,
    }));

    const { result } = renderHook(useResponsiveMinWidth);
    expect(result.current).toBe('lg');
  });

  test('handles the resize of screen', () => {
    let change;
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      ...mediaqueryDefaults,
      matches: false,
      addEventListener(event, listener) {
        // $FlowFixMe[object-this-reference]
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
