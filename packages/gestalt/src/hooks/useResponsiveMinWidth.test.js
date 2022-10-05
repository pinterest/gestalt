// @flow strict
import { renderHook } from '@testing-library/react-hooks';
import useResponsiveMinWidth from './useResponsiveMinWidth.js';

describe('useResponsiveMinWidth', () => {
  test('Returns false during SSR (Server Side Render)', () => {
    const { result } = renderHook(useResponsiveMinWidth);
    expect(result.current).toBe(undefined);
  });
});
