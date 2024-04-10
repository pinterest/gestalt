// @flow strict
import { useEffect, useLayoutEffect } from 'react';

// workaround to prevent useLayoutEffect from throwing on the server
// can be removed whenever the next React release happens: https://github.com/facebook/react/pull/26395
const useIsomorphicLayoutEffect: typeof useEffect | typeof useLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
