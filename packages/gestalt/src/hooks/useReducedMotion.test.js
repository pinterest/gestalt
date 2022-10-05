// @flow strict
import { renderHook } from '@testing-library/react-hooks';
import useReducedMotion from './useReducedMotion.js';

describe('useReducedMotion', () => {
  test('Returns false during SSR (Server Side Render)', () => {
    const { result } = renderHook(useReducedMotion);
    expect(result.current).toBe(false);
  });
});
